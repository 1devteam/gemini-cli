import {
  IPlugin,
  IPluginContext,
  IPluginHealth,
  IProjectContext,
  PluginPermission,
} from './plugin_interface.js';
import { PluginLoader, IPluginLoader } from './plugin_loader.js';
import { PluginRegistry, IPluginRegistry } from './plugin_registry.js';
import { PluginContext, GeminiAPI, PluginLogger, ProjectContextBuilder } from './plugin_context.js';

export interface IPluginManager {
  initialize(geminiCore: unknown, config: Record<string, unknown>): Promise<void>;
  loadPlugins(): Promise<void>;
  loadPlugin(pluginPath: string): Promise<void>;
  unloadPlugin(pluginId: string): Promise<void>;
  reloadPlugin(pluginId: string): Promise<void>;
  getRegistry(): IPluginRegistry;
  getLoader(): IPluginLoader;
  executeCommand(commandName: string, args: Record<string, unknown>): Promise<unknown>;
  listCommands(): { command: string; plugin: string; description: string }[];
  getContext(): IPluginContext;
  getPlugins(): IPlugin[];
  getPlugin(id: string): IPlugin | undefined;
  listPluginStates(): Array<{
    id: string;
    name: string;
    version: string;
    description: string;
    status: string;
    enabled: boolean;
    health?: IPluginHealth;
    permissions: PluginPermission[];
  }>;
  enablePlugin(pluginId: string): void;
  disablePlugin(pluginId: string): void;
  refreshPluginHealth(pluginId: string): Promise<IPluginHealth | undefined>;
}

export class PluginManager implements IPluginManager {
  private loader: IPluginLoader;
  private registry: IPluginRegistry;
  private context: IPluginContext | null = null;
  private geminiCore: unknown;
  private config: Record<string, unknown> = {};

  constructor(pluginDirectories?: string[]) {
    this.loader = new PluginLoader(pluginDirectories);
    this.registry = new PluginRegistry();
  }

  async initialize(geminiCore: unknown, config: Record<string, unknown>): Promise<void> {
    this.geminiCore = geminiCore;
    this.config = config;

    const geminiAPI = new GeminiAPI(geminiCore);
    const logger = new PluginLogger('plugin-manager');
    const cwd = process.cwd();
    const projectContext = await ProjectContextBuilder.buildProjectContext(cwd);

    this.context = new PluginContext(geminiAPI, logger, cwd, config, projectContext);
    logger.info('Plugin manager initialized');
  }

  async loadPlugins(): Promise<void> {
    const context = this.requireContext();

    try {
      const plugins = await this.loader.loadAllPlugins();
      for (const plugin of plugins) {
        await this.registerPlugin(plugin);
      }

      context.logger.info(`Loaded ${plugins.length} plugins`);
    } catch (error) {
      context.logger.error('Failed to load plugins:', error);
      throw error;
    }
  }

  async loadPlugin(pluginPath: string): Promise<void> {
    const context = this.requireContext();

    try {
      const plugin = await this.loader.loadPlugin(pluginPath);
      await this.registerPlugin(plugin);
      context.logger.info(`Loaded plugin: ${plugin.metadata.name}`);
    } catch (error) {
      context.logger.error(`Failed to load plugin from ${pluginPath}:`, error);
      throw error;
    }
  }

  private async registerPlugin(plugin: IPlugin): Promise<void> {
    const context = this.requireContext();
    const pluginId = plugin.metadata.id;

    const pluginContext = this.buildPluginContext(plugin);

    await this.registry.registerPlugin(plugin, 'loaded');
    this.registry.updatePluginStatus(pluginId, 'loaded');

    try {
      await plugin.initialize(pluginContext);
      this.registry.updatePluginStatus(pluginId, 'initialized');

      if (plugin.metadata.enabledByDefault === false) {
        this.registry.disablePlugin(pluginId);
      } else {
        this.registry.enablePlugin(pluginId);
        this.registry.updatePluginStatus(pluginId, 'active');
      }

      if (plugin.healthCheck) {
        const health = await plugin.healthCheck();
        this.registry.setPluginHealth(pluginId, health);
      }
    } catch (error) {
      this.registry.updatePluginStatus(pluginId, 'failed', String(error));
      context.logger.error(`Failed to initialize plugin ${pluginId}:`, error);
      throw error;
    }
  }

  private buildPluginContext(plugin: IPlugin): IPluginContext {
    const context = this.requireContext();
    const pluginLogger = new PluginLogger(plugin.metadata.id);

    return new PluginContext(
      context.gemini,
      pluginLogger,
      context.cwd,
      context.config,
      context.project,
      [...plugin.metadata.permissions],
    );
  }

  async unloadPlugin(pluginId: string): Promise<void> {
    const context = this.requireContext();

    try {
      await this.registry.unregisterPlugin(pluginId);
      await this.loader.unloadPlugin(pluginId);
      context.logger.info(`Unloaded plugin: ${pluginId}`);
    } catch (error) {
      context.logger.error(`Failed to unload plugin ${pluginId}:`, error);
      throw error;
    }
  }

  async reloadPlugin(pluginId: string): Promise<void> {
    const context = this.requireContext();
    const pluginPath = this.loader.getPluginPath(pluginId);

    if (!pluginPath) {
      throw new Error(`Plugin '${pluginId}' path not found`);
    }

    await this.unloadPlugin(pluginId);

    try {
      const plugin = await this.loader.loadPlugin(pluginPath);
      await this.registerPlugin(plugin);
      context.logger.info(`Reloaded plugin: ${pluginId}`);
    } catch (error) {
      context.logger.error(`Failed to reload plugin ${pluginId}:`, error);
      throw error;
    }
  }

  getRegistry(): IPluginRegistry {
    return this.registry;
  }

  getLoader(): IPluginLoader {
    return this.loader;
  }

  async executeCommand(commandName: string, args: Record<string, unknown>): Promise<unknown> {
    const context = this.requireContext();
    return this.registry.executeCommand(commandName, args, context);
  }

  listCommands(): { command: string; plugin: string; description: string }[] {
    return this.registry.listCommands();
  }

  getContext(): IPluginContext {
    return this.requireContext();
  }

  getPlugins(): IPlugin[] {
    return this.registry.getPlugins();
  }

  getPlugin(id: string): IPlugin | undefined {
    return this.registry.getPlugin(id);
  }

  listPluginStates(): Array<{
    id: string;
    name: string;
    version: string;
    description: string;
    status: string;
    enabled: boolean;
    health?: IPluginHealth;
    permissions: PluginPermission[];
  }> {
    return this.registry.listPluginStates().map((state) => ({
      id: state.plugin.metadata.id,
      name: state.plugin.metadata.name,
      version: state.plugin.metadata.version,
      description: state.plugin.metadata.description,
      status: state.status,
      enabled: state.enabled,
      health: state.health,
      permissions: [...state.plugin.metadata.permissions],
    }));
  }

  enablePlugin(pluginId: string): void {
    this.registry.enablePlugin(pluginId);
  }

  disablePlugin(pluginId: string): void {
    this.registry.disablePlugin(pluginId);
  }

  async refreshPluginHealth(pluginId: string): Promise<IPluginHealth | undefined> {
    const plugin = this.registry.getPlugin(pluginId);
    if (!plugin || !plugin.healthCheck) {
      return undefined;
    }

    const health = await plugin.healthCheck();
    this.registry.setPluginHealth(pluginId, health);
    return health;
  }

  async discoverPlugins(): Promise<string[]> {
    const directories = this.loader.getPluginDirectories();
    const discoveredPlugins: string[] = [];

    for (const directory of directories) {
      try {
        const plugins = await this.loader.loadPluginsFromDirectory(directory);
        for (const plugin of plugins) {
          discoveredPlugins.push(plugin.metadata.id);
        }
      } catch (error) {
        console.warn(`Failed to discover plugins in ${directory}:`, error);
      }
    }

    return discoveredPlugins;
  }

  getPluginInfo(pluginId: string): {
    metadata: IPlugin['metadata'];
    commands: Array<{
      name: string;
      description: string;
      aliases?: string[];
      options?: unknown;
    }>;
    configSchema: unknown;
    state: ReturnType<IPluginRegistry['getPluginState']>;
  } | null {
    const plugin = this.registry.getPlugin(pluginId);
    if (!plugin) {
      return null;
    }

    const commands = this.registry.getPluginCommands(pluginId);
    const state = this.registry.getPluginState(pluginId);

    return {
      metadata: plugin.metadata,
      commands: commands.map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        aliases: cmd.aliases,
        options: cmd.options,
      })),
      configSchema: plugin.getConfigSchema ? plugin.getConfigSchema() : null,
      state,
    };
  }

  private requireContext(): IPluginContext {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }
    return this.context;
  }
}
