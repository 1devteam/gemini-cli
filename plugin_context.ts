import { promises as fs } from 'fs';
import path from 'path';
import { 
  IPluginContext, 
  IGeminiAPI, 
  IFileSystemAPI, 
  ILogger, 
  IProjectContext 
} from './plugin_interface.js';

export class PluginContext implements IPluginContext {
  public gemini: IGeminiAPI;
  public fs: IFileSystemAPI;
  public logger: ILogger;
  public cwd: string;
  public config: any;
  public project?: IProjectContext;

  constructor(
    geminiAPI: IGeminiAPI,
    logger: ILogger,
    cwd: string,
    config: any,
    project?: IProjectContext
  ) {
    this.gemini = geminiAPI;
    this.fs = new FileSystemAPI();
    this.logger = logger;
    this.cwd = cwd;
    this.config = config;
    this.project = project;
  }
}

export class GeminiAPI implements IGeminiAPI {
  private geminiCore: any; // This would be the actual Gemini core instance

  constructor(geminiCore: any) {
    this.geminiCore = geminiCore;
  }

  async generateText(prompt: string, options?: any): Promise<string> {
    // This would integrate with the actual Gemini API
    // For now, we'll provide a placeholder implementation
    try {
      // Assuming the geminiCore has a generateText method
      if (this.geminiCore && this.geminiCore.generateText) {
        return await this.geminiCore.generateText(prompt, options);
      }
      
      // Fallback implementation
      throw new Error('Gemini API not available');
    } catch (error) {
      throw new Error(`Failed to generate text: ${error}`);
    }
  }

  async generateCode(prompt: string, language?: string, options?: any): Promise<string> {
    const codePrompt = language 
      ? `Generate ${language} code for the following request:\n\n${prompt}`
      : `Generate code for the following request:\n\n${prompt}`;
    
    return this.generateText(codePrompt, options);
  }

  async chat(messages: any[], options?: any): Promise<string> {
    try {
      if (this.geminiCore && this.geminiCore.chat) {
        return await this.geminiCore.chat(messages, options);
      }
      
      // Fallback: convert messages to a single prompt
      const prompt = messages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
      return this.generateText(prompt, options);
    } catch (error) {
      throw new Error(`Failed to chat: ${error}`);
    }
  }
}

export class FileSystemAPI implements IFileSystemAPI {
  async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  async writeFile(filePath: string, content: string): Promise<void> {
    try {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to write file ${filePath}: ${error}`);
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
      throw new Error(`Failed to create directory ${dirPath}: ${error}`);
    }
  }

  async readdir(dirPath: string): Promise<string[]> {
    try {
      return await fs.readdir(dirPath);
    } catch (error) {
      throw new Error(`Failed to read directory ${dirPath}: ${error}`);
    }
  }

  async stat(filePath: string): Promise<any> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      throw new Error(`Failed to get stats for ${filePath}: ${error}`);
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

  info(message: string, ...args: any[]): void {
    console.log(this.formatMessage('info', message), ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage('error', message), ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.DEBUG || process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message), ...args);
    }
  }
}

export class ProjectContextBuilder {
  static async buildProjectContext(rootPath: string): Promise<IProjectContext | undefined> {
    try {
      const context: IProjectContext = {
        root: rootPath
      };

      // Detect project type
      context.type = await this.detectProjectType(rootPath);

      // Load project configuration
      context.config = await this.loadProjectConfig(rootPath, context.type);

      // Get Git information
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
        // File doesn't exist, continue
      }
    }

    return undefined;
  }

  private static async loadProjectConfig(rootPath: string, projectType?: string): Promise<any> {
    const configFiles = [
      'package.json',
      'pyproject.toml',
      'Cargo.toml',
      'go.mod',
      '.gemini-cli.json',
      'gemini-cli.config.js'
    ];

    for (const configFile of configFiles) {
      try {
        const configPath = path.join(rootPath, configFile);
        await fs.access(configPath);
        
        if (configFile.endsWith('.json')) {
          const content = await fs.readFile(configPath, 'utf-8');
          return JSON.parse(content);
        }
        // For other file types, we'd need specific parsers
        // For now, just return the file path
        return { configFile: configPath };
      } catch {
        // File doesn't exist or can't be parsed, continue
      }
    }

    return {};
  }

  private static async getGitInfo(rootPath: string): Promise<any> {
    try {
      // Check if it's a git repository
      await fs.access(path.join(rootPath, '.git'));
      
      // For a full implementation, we'd use a git library like simple-git
      // For now, return a placeholder
      return {
        branch: 'main', // Would get actual branch
        remote: 'origin', // Would get actual remote
        lastCommit: 'abc123' // Would get actual last commit hash
      };
    } catch {
      return undefined;
    }
  }
}

