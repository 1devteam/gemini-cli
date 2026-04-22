import { IPlugin, IPluginContext } from './plugin_interface.js';
import { PluginLoader, IPluginLoader } from './plugin_loader.js';
import { PluginRegistry, IPluginRegistry } from './plugin_registry.js';
import { PluginContext, GeminiAPI, PluginLogger, ProjectContextBuilder } from './plugin_context.js';

export interface IPluginManager {
  /** Initialize the plugin manager */
  initialize(geminiCore: any, config: any): Promise<void>;
  
  /** Load all plugins */
  loadPlugins(): Promise<void>;
  
  /** Load a specific plugin */
  loadPlugin(pluginPath: string): Promise<void>;
  
  /** Unload a plugin */
  unloadPlugin(pluginId: string): Promise<void>;
  
  /** Get the plugin registry */
  getRegistry(): IPluginRegistry;
  
  /** Get the plugin loader */
  getLoader(): IPluginLoader;
  
  /** Execute a plugin command */
  executeCommand(commandName: string, args: any): Promise<any>;
  
  /** List all available commands */
  listCommands(): { command: string; plugin: string; description: string }[];
  
  /** Get plugin context */
  getContext(): IPluginContext;
}

export class PluginManager implements IPluginManager {
  private loader: IPluginLoader;
  private registry: IPluginRegistry;
  private context: IPluginContext | null = null;
  private geminiCore: any;
  private config: any;

  constructor(pluginDirectories?: string[]) {
    this.loader = new PluginLoader(pluginDirectories);
    this.registry = new PluginRegistry();
  }

  async initialize(geminiCore: any, config: any): Promise<void> {
    this.geminiCore = geminiCore;
    this.config = config;

    // Create the plugin context
    const geminiAPI = new GeminiAPI(geminiCore);
    const logger = new PluginLogger('plugin-manager');
    const cwd = process.cwd();
    
    // Build project context if we're in a project directory
    const projectContext = await ProjectContextBuilder.buildProjectContext(cwd);

    this.context = new PluginContext(
      geminiAPI,
      logger,
      cwd,
      config,
      projectContext
    );

    logger.info('Plugin manager initialized');
  }

  async loadPlugins(): Promise<void> {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }

    try {
      const plugins = await this.loader.loadAllPlugins();
      
      for (const plugin of plugins) {
        await this.registerPlugin(plugin);
      }

      this.context.logger.info(`Loaded ${plugins.length} plugins`);
    } catch (error) {
      this.context.logger.error('Failed to load plugins:', error);
      throw error;
    }
  }

  async loadPlugin(pluginPath: string): Promise<void> {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }

    try {
      const plugin = await this.loader.loadPlugin(pluginPath);
      await this.registerPlugin(plugin);
      
      this.context.logger.info(`Loaded plugin: ${plugin.metadata.name}`);
    } catch (error) {
      this.context.logger.error(`Failed to load plugin from ${pluginPath}:`, error);
      throw error;
    }
  }

  private async registerPlugin(plugin: IPlugin): Promise<void> {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }

    // Create a plugin-specific context
    const pluginLogger = new PluginLogger(plugin.metadata.id);
    const pluginContext = new PluginContext(
      this.context.gemini,
      pluginLogger,
      this.context.cwd,
      this.context.config,
      this.context.project
    );

    // Initialize the plugin
    await plugin.initialize(pluginContext);

    // Register with the registry
    await this.registry.registerPlugin(plugin);
  }

  async unloadPlugin(pluginId: string): Promise<void> {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }

    try {
      await this.registry.unregisterPlugin(pluginId);
      this.context.logger.info(`Unloaded plugin: ${pluginId}`);
    } catch (error) {
      this.context.logger.error(`Failed to unload plugin ${pluginId}:`, error);
      throw error;
    }
  }

  getRegistry(): IPluginRegistry {
    return this.registry;
  }

  getLoader(): IPluginLoader {
    return this.loader;
  }

  async executeCommand(commandName: string, args: any): Promise<any> {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }

    return await this.registry.executeCommand(commandName, args, this.context);
  }

  listCommands(): { command: string; plugin: string; description: string }[] {
    return this.registry.listCommands();
  }

  getContext(): IPluginContext {
    if (!this.context) {
      throw new Error('Plugin manager not initialized');
    }
    return this.context;
  }

  // Utility methods
  getPlugins(): IPlugin[] {
    return this.registry.getPlugins();
  }

  getPlugin(id: string): IPlugin | undefined {
    return this.registry.getPlugin(id);
  }

  hasCommand(name: string): boolean {
    return this.registry.hasCommand(name);
  }

  getCommand(name: string) {
    return this.registry.getCommand(name);
  }

  // Plugin discovery and management
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

  async reloadPlugin(pluginId: string): Promise<void> {
    const plugin = this.registry.getPlugin(pluginId);
    if (!plugin) {
      throw new Error(`Plugin '${pluginId}' not found`);
    }

    // Unload the plugin
    await this.unloadPlugin(pluginId);

    // Find and reload the plugin
    // This is a simplified approach - in practice, we'd need to track plugin paths
    await this.loadPlugins();
  }

  getPluginInfo(pluginId: string): any {
    const plugin = this.registry.getPlugin(pluginId);
    if (!plugin) {
      return null;
    }

    const commands = this.registry.getPluginCommands(pluginId);
    
    return {
      metadata: plugin.metadata,
      commands: commands.map(cmd => ({
        name: cmd.name,
        description: cmd.description,
        aliases: cmd.aliases,
        options: cmd.options
      })),
      configSchema: plugin.getConfigSchema ? plugin.getConfigSchema() : null
    };
  }
}

