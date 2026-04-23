/**
 * Phase 1 hardened plugin runtime contracts for Power Build.
 */

export type PluginCategory =
  | 'prompt'
  | 'spec'
  | 'project-model'
  | 'dependency'
  | 'environment'
  | 'scaffold'
  | 'simulation'
  | 'repair'
  | 'validation'
  | 'reporting'
  | 'integration'
  | 'utility';

export type PluginPermission =
  | 'project:read'
  | 'project:write'
  | 'fs:read'
  | 'fs:write'
  | 'env:read'
  | 'process:exec'
  | 'report:emit'
  | 'network:access';

export type PluginCapability =
  | 'commands'
  | 'analysis'
  | 'spec-generation'
  | 'project-modeling'
  | 'dependency-analysis'
  | 'environment-probing'
  | 'simulation'
  | 'repair-planning'
  | 'validation'
  | 'reporting';

export type PluginLifecycleStatus =
  | 'discovered'
  | 'validated'
  | 'loaded'
  | 'initialized'
  | 'active'
  | 'disabled'
  | 'failed'
  | 'unloaded';

export type PluginHealthStatus = 'healthy' | 'degraded' | 'unhealthy' | 'unknown';

export type PluginCommandOptionType = 'string' | 'number' | 'boolean' | 'array';

export interface IPluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  minCliVersion: string;
  category: PluginCategory;
  capabilities: PluginCapability[];
  permissions: PluginPermission[];
  dependencies?: string[];
  enabledByDefault?: boolean;
}

export interface IPluginCommandOption {
  name: string;
  description: string;
  type: PluginCommandOptionType;
  required?: boolean;
  default?: unknown;
  aliases?: string[];
}

export interface IPluginCommand {
  name: string;
  description: string;
  aliases?: string[];
  options?: IPluginCommandOption[];
  handler: (
    args: Record<string, unknown>,
    context: IPluginContext,
  ) => Promise<IPluginResult>;
}

export interface IPluginResultFinding {
  category: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  description: string;
  affectedFiles?: string[];
  evidence?: string[];
  assumptions?: string[];
}

export interface IPluginResult {
  success: boolean;
  message?: string;
  data?: unknown;
  error?: string;
  files?: string[];
  findings?: IPluginResultFinding[];
  inferred?: boolean;
}

export interface IGeminiAPI {
  generateText(prompt: string, options?: unknown): Promise<string>;
  generateCode(prompt: string, language?: string, options?: unknown): Promise<string>;
  chat(messages: unknown[], options?: unknown): Promise<string>;
}

export interface IFileSystemAPI {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  exists(path: string): Promise<boolean>;
  mkdir(path: string): Promise<void>;
  readdir(path: string): Promise<string[]>;
  stat(path: string): Promise<unknown>;
}

export interface ILogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}

export interface IProjectContext {
  root: string;
  type?: string;
  config?: Record<string, unknown>;
  git?: {
    branch: string;
    remote: string;
    lastCommit: string;
  };
}

export interface IPluginHealth {
  status: PluginHealthStatus;
  message?: string;
  details?: Record<string, unknown>;
}

export interface IPluginContext {
  gemini: IGeminiAPI;
  fs: IFileSystemAPI;
  logger: ILogger;
  cwd: string;
  config: Record<string, unknown>;
  project?: IProjectContext;
  permissions?: PluginPermission[];
}

export interface IPlugin {
  metadata: IPluginMetadata;

  initialize(context: IPluginContext): Promise<void>;

  getCommands(): IPluginCommand[];

  cleanup?(): Promise<void>;

  getConfigSchema?(): unknown;

  validateConfig?(config: unknown): boolean;

  healthCheck?(): Promise<IPluginHealth>;
}

export type PluginFactory = () => IPlugin;
