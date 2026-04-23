import type {
  IPlugin,
  IPluginCommand,
  IPluginContext,
  IPluginMetadata,
  IPluginResult,
  PluginFactory,
} from './plugin_interface.js';
import path from 'path';

interface FileStatsLike {
  isFile(): boolean;
  isDirectory(): boolean;
}

class ProjectSimulatorPlugin implements IPlugin {
  metadata: IPluginMetadata = {
    id: 'project-simulator',
    name: 'Project Simulator',
    version: '1.1.0',
    description: 'Deterministic project analysis and runtime simulation',
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
        description: 'Analyze project structure and metrics',
        options: [{ name: 'path', description: 'Path to the project directory', type: 'string', required: false, default: '.' }],
        handler: this.handleAnalyze.bind(this),
      },
      {
        name: 'simulate-scenario',
        description: 'Run deterministic simulation',
        options: [{ name: 'scenario', description: 'Scenario name to simulate', type: 'string', required: true }],
        handler: this.handleSimulate.bind(this),
      },
    ];
  }

  private async handleAnalyze(args: any, context: IPluginContext): Promise<IPluginResult> {
    const projectPath = path.resolve(context.cwd, args.path || '.');
    const files = await this.getAllFiles(projectPath, context);

    return {
      success: true,
      message: 'Analysis complete',
      data: { totalFiles: files.length },
    };
  }

  private async handleSimulate(args: any): Promise<IPluginResult> {
    return {
      success: true,
      message: `Simulated ${args.scenario}`,
      data: { scenario: args.scenario, result: 'ok' },
    };
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

  async cleanup(): Promise<void> {}
}

const createProjectSimulatorPlugin: PluginFactory = () => new ProjectSimulatorPlugin();

export default createProjectSimulatorPlugin;
