/**
 * Plugin interface for Gemini CLI plugins
 * All plugins must implement this interface to be recognized by the CLI
 */

export interface IPluginMetadata {
  /** Unique identifier for the plugin */
  id: string;
  /** Human-readable name of the plugin */
  name: string;
  /** Plugin version */
  version: string;
  /** Plugin description */
  description: string;
  /** Plugin author */
  author: string;
  /** Minimum required Gemini CLI version */
  minCliVersion: string;
  /** Plugin dependencies */
  dependencies?: string[];
}

export interface IPluginCommand {
  /** Command name (e.g., 'generate-code') */
  name: string;
  /** Command description */
  description: string;
  /** Command aliases */
  aliases?: string[];
  /** Command options/arguments schema */
  options?: IPluginCommandOption[];
  /** Command handler function */
  handler: (args: any, context: IPluginContext) => Promise<IPluginResult>;
}

export interface IPluginCommandOption {
  /** Option name */
  name: string;
  /** Option description */
  description: string;
  /** Option type */
  type: 'string' | 'number' | 'boolean' | 'array';
  /** Whether the option is required */
  required?: boolean;
  /** Default value */
  default?: any;
  /** Option aliases */
  aliases?: string[];
}

export interface IPluginContext {
  /** Access to Gemini API */
  gemini: IGeminiAPI;
  /** File system utilities */
  fs: IFileSystemAPI;
  /** Logger instance */
  logger: ILogger;
  /** Current working directory */
  cwd: string;
  /** User configuration */
  config: any;
  /** Project context (if available) */
  project?: IProjectContext;
}

export interface IPluginResult {
  /** Whether the command succeeded */
  success: boolean;
  /** Result message */
  message?: string;
  /** Result data */
  data?: any;
  /** Error information (if failed) */
  error?: string;
  /** Files created/modified */
  files?: string[];
}

export interface IGeminiAPI {
  /** Generate text using Gemini */
  generateText(prompt: string, options?: any): Promise<string>;
  /** Generate code using Gemini */
  generateCode(prompt: string, language?: string, options?: any): Promise<string>;
  /** Chat with Gemini */
  chat(messages: any[], options?: any): Promise<string>;
}

export interface IFileSystemAPI {
  /** Read file content */
  readFile(path: string): Promise<string>;
  /** Write file content */
  writeFile(path: string, content: string): Promise<void>;
  /** Check if file exists */
  exists(path: string): Promise<boolean>;
  /** Create directory */
  mkdir(path: string): Promise<void>;
  /** List directory contents */
  readdir(path: string): Promise<string[]>;
  /** Get file stats */
  stat(path: string): Promise<any>;
}

export interface ILogger {
  /** Log info message */
  info(message: string, ...args: any[]): void;
  /** Log warning message */
  warn(message: string, ...args: any[]): void;
  /** Log error message */
  error(message: string, ...args: any[]): void;
  /** Log debug message */
  debug(message: string, ...args: any[]): void;
}

export interface IProjectContext {
  /** Project root directory */
  root: string;
  /** Project type (e.g., 'node', 'python', 'web') */
  type?: string;
  /** Project configuration */
  config?: any;
  /** Git information */
  git?: {
    branch: string;
    remote: string;
    lastCommit: string;
  };
}

/**
 * Main plugin interface that all plugins must implement
 */
export interface IPlugin {
  /** Plugin metadata */
  metadata: IPluginMetadata;
  
  /** Initialize the plugin */
  initialize(context: IPluginContext): Promise<void>;
  
  /** Get commands provided by this plugin */
  getCommands(): IPluginCommand[];
  
  /** Cleanup when plugin is unloaded */
  cleanup?(): Promise<void>;
  
  /** Plugin configuration schema */
  getConfigSchema?(): any;
  
  /** Validate plugin configuration */
  validateConfig?(config: any): boolean;
}

/**
 * Plugin factory function type
 * Each plugin module should export a default function of this type
 */
export type PluginFactory = () => IPlugin;

