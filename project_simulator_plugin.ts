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
}

interface SimulationData {
  scenario: string;
  result: 'ok';
  timestamp: string;
}

class ProjectSimulatorPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'project-simulator',
    name: 'Project Simulator',
    version: '1.2.0',
    description: 'Deterministic project analysis with dependency awareness and runtime simulation',
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
        description: 'Analyze project structure, metrics, and dependencies',
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
        description: 'Run deterministic simulation',
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

    const data: ProjectAnalysisData = {
      projectPath,
      totalFiles: files.length,
      dependencyCount: dependencySummary.dependencyCount,
      isNodeProject: dependencySummary.isNodeProject,
    };

    return {
      success: true,
      message: 'Analysis complete',
      data,
    };
  }

  private async handleSimulate(args: SimulateScenarioArgs): Promise<IPluginResult> {
    const scenario = typeof args.scenario === 'string' && args.scenario.trim() ? args.scenario : 'default';
    const data: SimulationData = {
      scenario,
      result: 'ok',
      timestamp: new Date().toISOString(),
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
