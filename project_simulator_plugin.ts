import type {
  IPlugin,
  IPluginCommand,
  IPluginContext,
  IPluginMetadata,
  IPluginResult,
  PluginFactory,
} from './plugin_interface.js';
import path from 'path';
import { analyzePackageJson } from './dependency_inspector.js';
import { inspectEnvironment } from './environment_inspector.js';

interface FileStatsLike {
  isFile(): boolean;
  isDirectory(): boolean;
}

interface AnalyzeProjectArgs extends Record<string, unknown> {
  path?: string;
}

interface SimulateScenarioArgs extends Record<string, unknown> {
  scenario?: string;
}

interface ProjectAnalysisData {
  projectPath: string;
  totalFiles: number;
  dependencyCount: number;
  isNodeProject: boolean;
  environment: ReturnType<typeof inspectEnvironment>;
}

interface SimulationData {
  scenario: string;
  result: 'ok';
  timestamp: string;
  riskLevel: 'low' | 'medium' | 'high';
  signals: string[];
}

class ProjectSimulatorPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'project-simulator',
    name: 'Project Simulator',
    version: '1.4.0',
    description: 'Deterministic project analysis with dependency, environment, and constraint-aware simulation',
    author: 'Gemini CLI Team',
    minCliVersion: '0.2.0',
    category: 'simulation',
    capabilities: ['commands', 'analysis', 'simulation'],
    permissions: ['project:read'],
  };

  async initialize(context: IPluginContext): Promise<void> {
    context.logger.info('Project Simulator initialized');
  }

  getCommands(): IPluginCommand[] {
    return [
      {
        name: 'analyze-project',
        description: 'Analyze project structure, dependencies, and environment',
        options: [
          {
            name: 'path',
            description: 'Path to the project directory',
            type: 'string',
            required: false,
            default: '.',
          },
        ],
        handler: this.handleAnalyze.bind(this),
      },
      {
        name: 'simulate-scenario',
        description: 'Run deterministic constraint-aware simulation',
        options: [
          {
            name: 'scenario',
            description: 'Scenario name to simulate',
            type: 'string',
            required: true,
          },
        ],
        handler: this.handleSimulate.bind(this),
      },
    ];
  }

  private async handleAnalyze(args: AnalyzeProjectArgs, context: IPluginContext): Promise<IPluginResult> {
    const requestedPath = typeof args.path === 'string' && args.path.trim() ? args.path : '.';
    const projectPath = path.resolve(context.cwd, requestedPath);
    const files = await this.getAllFiles(projectPath, context);
    const dependencySummary = await this.readDependencySummary(projectPath, context);
    const environment = inspectEnvironment();

    const data: ProjectAnalysisData = {
      projectPath,
      totalFiles: files.length,
      dependencyCount: dependencySummary.dependencyCount,
      isNodeProject: dependencySummary.isNodeProject,
      environment,
    };

    return {
      success: true,
      message: 'Analysis complete',
      data,
    };
  }

  private async handleSimulate(args: SimulateScenarioArgs): Promise<IPluginResult> {
    const scenario = typeof args.scenario === 'string' && args.scenario.trim() ? args.scenario : 'default';
    const environment = inspectEnvironment();
    const signals: string[] = [];

    if (environment.cpuCount < 2) signals.push('low-cpu');
    if (environment.memoryMB < 4096) signals.push('low-memory');
    if (scenario.includes('load') && environment.memoryMB < 8192) signals.push('load-memory-pressure');

    const riskLevel: SimulationData['riskLevel'] = signals.length >= 2 ? 'high' : signals.length === 1 ? 'medium' : 'low';

    const data: SimulationData = {
      scenario,
      result: 'ok',
      timestamp: new Date().toISOString(),
      riskLevel,
      signals,
    };

    return {
      success: true,
      message: `Simulated ${scenario}`,
      data,
    };
  }

  private async readDependencySummary(
    projectPath: string,
    context: IPluginContext,
  ): Promise<{ dependencyCount: number; isNodeProject: boolean }> {
    const packageJsonPath = path.join(projectPath, 'package.json');

    if (!(await context.fs.exists(packageJsonPath))) {
      return { dependencyCount: 0, isNodeProject: false };
    }

    try {
      const packageJson = JSON.parse(await context.fs.readFile(packageJsonPath)) as Record<string, unknown>;
      return analyzePackageJson(packageJson);
    } catch {
      return { dependencyCount: 0, isNodeProject: false };
    }
  }

  private async getAllFiles(dir: string, context: IPluginContext): Promise<string[]> {
    const entries = await context.fs.readdir(dir);
    const results: string[] = [];

    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = (await context.fs.stat(full)) as FileStatsLike;

      if (stat.isDirectory()) {
        results.push(...(await this.getAllFiles(full, context)));
      } else if (stat.isFile()) {
        results.push(full);
      }
    }

    return results;
  }

  async cleanup(): Promise<void> {
    return;
  }
}

const createProjectSimulatorPlugin: PluginFactory = () => new ProjectSimulatorPlugin();

export default createProjectSimulatorPlugin;
