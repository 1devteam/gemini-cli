import { promises as fs } from 'fs';
import path from 'path';
import { IPlugin, IPluginMetadata, PluginFactory } from './plugin_interface.js';

export interface IPluginLoader {
  /** Load plugins from a directory */
  loadPluginsFromDirectory(directory: string): Promise<IPlugin[]>;
  
  /** Load a single plugin from a file */
  loadPlugin(pluginPath: string): Promise<IPlugin>;
  
  /** Validate plugin metadata */
  validatePlugin(plugin: IPlugin): boolean;
  
  /** Get plugin directories */
  getPluginDirectories(): string[];
}

export class PluginLoader implements IPluginLoader {
  private loadedPlugins: Map<string, IPlugin> = new Map();
  private pluginDirectories: string[] = [];

  constructor(pluginDirectories?: string[]) {
    this.pluginDirectories = pluginDirectories || this.getDefaultPluginDirectories();
  }

  private getDefaultPluginDirectories(): string[] {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    return [
      path.join(homeDir, '.gemini-cli', 'plugins'),
      path.join(process.cwd(), 'plugins'),
      path.join(process.cwd(), 'node_modules', '@gemini-cli-plugins'),
    ];
  }

  getPluginDirectories(): string[] {
    return [...this.pluginDirectories];
  }

  async loadPluginsFromDirectory(directory: string): Promise<IPlugin[]> {
    const plugins: IPlugin[] = [];
    
    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pluginPath = path.join(directory, entry.name);
          try {
            const plugin = await this.loadPlugin(pluginPath);
            plugins.push(plugin);
          } catch (error) {
            console.warn(`Failed to load plugin from ${pluginPath}:`, error);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to read plugin directory ${directory}:`, error);
    }
    
    return plugins;
  }

  async loadPlugin(pluginPath: string): Promise<IPlugin> {
    // Check if it's a directory with package.json
    const packageJsonPath = path.join(pluginPath, 'package.json');
    let pluginEntryPoint: string;
    
    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      
      // Validate that this is a Gemini CLI plugin
      if (!this.isGeminiCliPlugin(packageJson)) {
        throw new Error('Not a valid Gemini CLI plugin');
      }
      
      // Determine entry point
      pluginEntryPoint = path.join(pluginPath, packageJson.main || 'index.js');
    } catch (error) {
      // If no package.json, assume it's a direct plugin file
      pluginEntryPoint = pluginPath.endsWith('.js') ? pluginPath : path.join(pluginPath, 'index.js');
    }

    // Check if entry point exists
    try {
      await fs.access(pluginEntryPoint);
    } catch (error) {
      throw new Error(`Plugin entry point not found: ${pluginEntryPoint}`);
    }

    // Load the plugin module
    const pluginModule = await import(pluginEntryPoint);
    
    // Get the plugin factory function
    const pluginFactory: PluginFactory = pluginModule.default;
    if (typeof pluginFactory !== 'function') {
      throw new Error('Plugin must export a default factory function');
    }

    // Create plugin instance
    const plugin = pluginFactory();
    
    // Validate plugin
    if (!this.validatePlugin(plugin)) {
      throw new Error('Plugin validation failed');
    }

    // Check for duplicate plugin IDs
    if (this.loadedPlugins.has(plugin.metadata.id)) {
      throw new Error(`Plugin with ID '${plugin.metadata.id}' is already loaded`);
    }

    // Store the loaded plugin
    this.loadedPlugins.set(plugin.metadata.id, plugin);
    
    return plugin;
  }

  private isGeminiCliPlugin(packageJson: any): boolean {
    return (
      packageJson.keywords?.includes('gemini-cli-plugin') ||
      packageJson.name?.startsWith('@gemini-cli-plugins/') ||
      packageJson.geminiCliPlugin === true
    );
  }

  validatePlugin(plugin: IPlugin): boolean {
    // Validate metadata
    if (!plugin.metadata) {
      console.error('Plugin missing metadata');
      return false;
    }

    const required = ['id', 'name', 'version', 'description', 'author'];
    for (const field of required) {
      if (!plugin.metadata[field as keyof IPluginMetadata]) {
        console.error(`Plugin missing required metadata field: ${field}`);
        return false;
      }
    }

    // Validate methods
    if (typeof plugin.initialize !== 'function') {
      console.error('Plugin missing initialize method');
      return false;
    }

    if (typeof plugin.getCommands !== 'function') {
      console.error('Plugin missing getCommands method');
      return false;
    }

    // Validate commands
    try {
      const commands = plugin.getCommands();
      if (!Array.isArray(commands)) {
        console.error('Plugin getCommands must return an array');
        return false;
      }

      for (const command of commands) {
        if (!command.name || !command.description || typeof command.handler !== 'function') {
          console.error('Invalid command definition in plugin');
          return false;
        }
      }
    } catch (error) {
      console.error('Error validating plugin commands:', error);
      return false;
    }

    return true;
  }

  async loadAllPlugins(): Promise<IPlugin[]> {
    const allPlugins: IPlugin[] = [];
    
    for (const directory of this.pluginDirectories) {
      try {
        const plugins = await this.loadPluginsFromDirectory(directory);
        allPlugins.push(...plugins);
      } catch (error) {
        console.warn(`Failed to load plugins from ${directory}:`, error);
      }
    }
    
    return allPlugins;
  }

  getLoadedPlugins(): IPlugin[] {
    return Array.from(this.loadedPlugins.values());
  }

  getPlugin(id: string): IPlugin | undefined {
    return this.loadedPlugins.get(id);
  }

  async unloadPlugin(id: string): Promise<boolean> {
    const plugin = this.loadedPlugins.get(id);
    if (!plugin) {
      return false;
    }

    try {
      if (plugin.cleanup) {
        await plugin.cleanup();
      }
      this.loadedPlugins.delete(id);
      return true;
    } catch (error) {
      console.error(`Error unloading plugin ${id}:`, error);
      return false;
    }
  }
}

