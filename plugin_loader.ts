import { promises as fs } from 'fs';
import path from 'path';
import {
  IPlugin,
  IPluginMetadata,
  PluginFactory,
  PluginLifecycleStatus,
} from './plugin_interface.js';

export interface IPluginLoaderState {
  plugin: IPlugin;
  path: string;
  status: PluginLifecycleStatus;
  lastError?: string;
}

export interface IPluginLoader {
  loadPluginsFromDirectory(directory: string): Promise<IPlugin[]>;
  loadPlugin(pluginPath: string): Promise<IPlugin>;
  validatePlugin(plugin: IPlugin): boolean;
  getPluginDirectories(): string[];
  getLoadedPlugins(): IPlugin[];
  getPlugin(id: string): IPlugin | undefined;
  getPluginPath(id: string): string | undefined;
  getPluginState(id: string): IPluginLoaderState | undefined;
  loadAllPlugins(): Promise<IPlugin[]>;
  unloadPlugin(id: string): Promise<boolean>;
}

export class PluginLoader implements IPluginLoader {
  private loadedPlugins: Map<string, IPlugin> = new Map();
  private loadedPluginPaths: Map<string, string> = new Map();
  private pluginStates: Map<string, IPluginLoaderState> = new Map();
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

  getLoadedPlugins(): IPlugin[] {
    return Array.from(this.loadedPlugins.values());
  }

  getPlugin(id: string): IPlugin | undefined {
    return this.loadedPlugins.get(id);
  }

  getPluginPath(id: string): string | undefined {
    return this.loadedPluginPaths.get(id);
  }

  getPluginState(id: string): IPluginLoaderState | undefined {
    return this.pluginStates.get(id);
  }

  async loadPluginsFromDirectory(directory: string): Promise<IPlugin[]> {
    const plugins: IPlugin[] = [];

    try {
      const entries = await fs.readdir(directory, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) {
          continue;
        }

        const pluginPath = path.join(directory, entry.name);
        try {
          const plugin = await this.loadPlugin(pluginPath);
          plugins.push(plugin);
        } catch (error) {
          console.warn(`Failed to load plugin from ${pluginPath}:`, error);
        }
      }
    } catch (error) {
      console.warn(`Failed to read plugin directory ${directory}:`, error);
    }

    return plugins;
  }

  async loadPlugin(pluginPath: string): Promise<IPlugin> {
    const resolvedPluginPath = path.resolve(pluginPath);
    let pluginEntryPoint: string;

    try {
      pluginEntryPoint = await this.resolvePluginEntryPoint(resolvedPluginPath);
    } catch (error) {
      throw new Error(`Unable to resolve plugin entry point for '${resolvedPluginPath}': ${String(error)}`);
    }

    const pluginModule = await import(pluginEntryPoint);
    const pluginFactory: PluginFactory = pluginModule.default;
    if (typeof pluginFactory !== 'function') {
      throw new Error('Plugin must export a default factory function');
    }

    const plugin = pluginFactory();
    const pluginId = plugin.metadata?.id;

    if (!pluginId) {
      throw new Error('Plugin metadata.id is required');
    }

    this.pluginStates.set(pluginId, {
      plugin,
      path: resolvedPluginPath,
      status: 'loaded',
    });

    if (!this.validatePlugin(plugin)) {
      this.pluginStates.set(pluginId, {
        plugin,
        path: resolvedPluginPath,
        status: 'failed',
        lastError: 'Plugin validation failed',
      });
      throw new Error('Plugin validation failed');
    }

    if (this.loadedPlugins.has(pluginId)) {
      this.pluginStates.set(pluginId, {
        plugin,
        path: resolvedPluginPath,
        status: 'failed',
        lastError: `Plugin with ID '${pluginId}' is already loaded`,
      });
      throw new Error(`Plugin with ID '${pluginId}' is already loaded`);
    }

    this.loadedPlugins.set(pluginId, plugin);
    this.loadedPluginPaths.set(pluginId, resolvedPluginPath);
    this.pluginStates.set(pluginId, {
      plugin,
      path: resolvedPluginPath,
      status: 'validated',
    });

    return plugin;
  }

  private async resolvePluginEntryPoint(pluginPath: string): Promise<string> {
    const packageJsonPath = path.join(pluginPath, 'package.json');

    try {
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
      if (!this.isGeminiCliPlugin(packageJson)) {
        throw new Error('Not a valid Gemini CLI plugin');
      }
      const entryPoint = path.join(pluginPath, packageJson.main || 'index.js');
      await fs.access(entryPoint);
      return entryPoint;
    } catch {
      const entryPoint = pluginPath.endsWith('.js') ? pluginPath : path.join(pluginPath, 'index.js');
      await fs.access(entryPoint);
      return entryPoint;
    }
  }

  private isGeminiCliPlugin(packageJson: Record<string, unknown>): boolean {
    const keywords = Array.isArray(packageJson.keywords) ? packageJson.keywords : [];
    return (
      keywords.includes('gemini-cli-plugin') ||
      (typeof packageJson.name === 'string' && packageJson.name.startsWith('@gemini-cli-plugins/')) ||
      packageJson.geminiCliPlugin === true
    );
  }

  validatePlugin(plugin: IPlugin): boolean {
    if (!plugin.metadata) {
      console.error('Plugin missing metadata');
      return false;
    }

    const required: (keyof IPluginMetadata)[] = [
      'id',
      'name',
      'version',
      'description',
      'author',
      'minCliVersion',
      'category',
      'capabilities',
      'permissions',
    ];

    for (const field of required) {
      if (plugin.metadata[field] === undefined || plugin.metadata[field] === null) {
        console.error(`Plugin missing required metadata field: ${field}`);
        return false;
      }
    }

    if (!Array.isArray(plugin.metadata.capabilities) || plugin.metadata.capabilities.length === 0) {
      console.error('Plugin must declare at least one capability');
      return false;
    }

    if (!Array.isArray(plugin.metadata.permissions)) {
      console.error('Plugin permissions must be an array');
      return false;
    }

    if (typeof plugin.initialize !== 'function') {
      console.error('Plugin missing initialize method');
      return false;
    }

    if (typeof plugin.getCommands !== 'function') {
      console.error('Plugin missing getCommands method');
      return false;
    }

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
      this.loadedPluginPaths.delete(id);

      const state = this.pluginStates.get(id);
      if (state) {
        this.pluginStates.set(id, {
          ...state,
          status: 'unloaded',
        });
      }

      return true;
    } catch (error) {
      const state = this.pluginStates.get(id);
      if (state) {
        this.pluginStates.set(id, {
          ...state,
          status: 'failed',
          lastError: String(error),
        });
      }
      console.error(`Error unloading plugin ${id}:`, error);
      return false;
    }
  }
}
