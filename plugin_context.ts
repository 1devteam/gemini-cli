import { promises as fs } from 'fs';
import path from 'path';
import {
  IFileSystemAPI,
  IGeminiAPI,
  ILogger,
  IPluginContext,
  IProjectContext,
  PluginPermission,
} from './plugin_interface.js';

export class PluginContext implements IPluginContext {
  public gemini: IGeminiAPI;
  public fs: IFileSystemAPI;
  public logger: ILogger;
  public cwd: string;
  public config: Record<string, unknown>;
  public project?: IProjectContext;
  public permissions?: PluginPermission[];

  constructor(
    geminiAPI: IGeminiAPI,
    logger: ILogger,
    cwd: string,
    config: Record<string, unknown>,
    project?: IProjectContext,
    permissions?: PluginPermission[],
  ) {
    this.gemini = geminiAPI;
    this.fs = new FileSystemAPI();
    this.logger = logger;
    this.cwd = cwd;
    this.config = config;
    this.project = project;
    this.permissions = permissions;
  }
}

export class GeminiAPI implements IGeminiAPI {
  private geminiCore: unknown;

  constructor(geminiCore: unknown) {
    this.geminiCore = geminiCore;
  }

  async generateText(prompt: string, options?: unknown): Promise<string> {
    try {
      const core = this.geminiCore as { generateText?: (prompt: string, options?: unknown) => Promise<string> };
      if (core?.generateText) {
        return await core.generateText(prompt, options);
      }

      throw new Error('Gemini API not available');
    } catch (error) {
      throw new Error(`Failed to generate text: ${String(error)}`);
    }
  }

  async generateCode(prompt: string, language?: string, options?: unknown): Promise<string> {
    const codePrompt = language
      ? `Generate ${language} code for the following request:\n\n${prompt}`
      : `Generate code for the following request:\n\n${prompt}`;

    return this.generateText(codePrompt, options);
  }

  async chat(messages: unknown[], options?: unknown): Promise<string> {
    try {
      const core = this.geminiCore as { chat?: (messages: unknown[], options?: unknown) => Promise<string> };
      if (core?.chat) {
        return await core.chat(messages, options);
      }

      const prompt = messages
        .map((msg) => {
          if (typeof msg === 'object' && msg !== null && 'role' in msg && 'content' in msg) {
            const entry = msg as { role: string; content: string };
            return `${entry.role}: ${entry.content}`;
          }
          return String(msg);
        })
        .join('\n');

      return this.generateText(prompt, options);
    } catch (error) {
      throw new Error(`Failed to chat: ${String(error)}`);
    }
  }
}

export class FileSystemAPI implements IFileSystemAPI {
  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${String(error)}`);
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${String(error)}`);
    }
  }

  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async mkdir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${String(error)}`);
    }
  }

  async readdir(dirPath: string): Promise<string[]> {
    try {
      return await fs.readdir(dirPath);
    } catch (error) {
      throw new Error(`Failed to read directory ${dirPath}: ${String(error)}`);
    }
  }

  async stat(filePath: string): Promise<unknown> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      throw new Error(`Failed to get stats for ${filePath}: ${String(error)}`);
    }
  }
}

export class PluginLogger implements ILogger {
  private pluginId: string;

  constructor(pluginId: string) {
    this.pluginId = pluginId;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.pluginId}] ${message}`;
  }

  info(message: string, ...args: unknown[]): void {
    console.log(this.formatMessage('info', message), ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(this.formatMessage('error', message), ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (process.env.DEBUG || process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export class ProjectContextBuilder {
  static async buildProjectContext(rootPath: string): Promise<IProjectContext | undefined> {
    try {
      const context: IProjectContext = {
        root: rootPath,
      };

      context.type = await this.detectProjectType(rootPath);
      context.config = await this.loadProjectConfig(rootPath);
      context.git = await this.getGitInfo(rootPath);

      return context;
    } catch (error) {
      console.warn(`Failed to build project context for ${rootPath}:`, error);
      return undefined;
    }
  }

  private static async detectProjectType(rootPath: string): Promise<string | undefined> {
    const indicators = [
      { file: 'package.json', type: 'node' },
      { file: 'requirements.txt', type: 'python' },
      { file: 'Pipfile', type: 'python' },
      { file: 'pyproject.toml', type: 'python' },
      { file: 'Cargo.toml', type: 'rust' },
      { file: 'go.mod', type: 'go' },
      { file: 'pom.xml', type: 'java' },
      { file: 'build.gradle', type: 'java' },
      { file: 'Gemfile', type: 'ruby' },
      { file: 'composer.json', type: 'php' },
    ];

    for (const indicator of indicators) {
      try {
        await fs.access(path.join(rootPath, indicator.file));
        return indicator.type;
      } catch {
        // continue
      }
    }

    return undefined;
  }

  private static async loadProjectConfig(rootPath: string): Promise<Record<string, unknown>> {
    const configFiles = [
      'package.json',
      'pyproject.toml',
      'Cargo.toml',
      'go.mod',
      '.gemini-cli.json',
      'gemini-cli.config.js',
    ];

    for (const configFile of configFiles) {
      try {
        const configPath = path.join(rootPath, configFile);
        await fs.access(configPath);

        if (configFile.endsWith('.json')) {
          const content = await fs.readFile(configPath, 'utf-8');
          return JSON.parse(content) as Record<string, unknown>;
        }

        return { configFile: configPath };
      } catch {
        // continue
      }
    }

    return {};
  }

  private static async getGitInfo(rootPath: string): Promise<IProjectContext['git'] | undefined> {
    try {
      const gitDir = path.join(rootPath, '.git');
      await fs.access(gitDir);

      const headPath = path.join(gitDir, 'HEAD');
      const headContent = await fs.readFile(headPath, 'utf-8');
      const headValue = headContent.trim();

      let branch = 'detached';
      let lastCommit = headValue;

      if (headValue.startsWith('ref: ')) {
        const ref = headValue.replace('ref: ', '');
        branch = ref.split('/').pop() ?? 'unknown';
        const refPath = path.join(gitDir, ref);
        lastCommit = (await fs.readFile(refPath, 'utf-8')).trim();
      }

      let remote = 'unknown';
      try {
        const configText = await fs.readFile(path.join(gitDir, 'config'), 'utf-8');
        const match = configText.match(/\[remote "origin"\][\s\S]*?url = (.+)/);
        if (match?.[1]) {
          remote = match[1].trim();
        }
      } catch {
        // ignore remote parse issues
      }

      return { branch, remote, lastCommit };
    } catch {
      return undefined;
    }
  }
}
