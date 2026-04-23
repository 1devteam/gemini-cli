import {
  IPlugin,
  IPluginCommand,
  IPluginContext,
  IPluginHealth,
  PluginLifecycleStatus,
} from './plugin_interface.js';

export interface IRegisteredPluginState {
  plugin: IPlugin;
  status: PluginLifecycleStatus;
  enabled: boolean;
  commandNames: string[];
  health?: IPluginHealth;
  lastError?: string;
}

export interface IPluginRegistry {
  registerPlugin(plugin: IPlugin, status?: PluginLifecycleStatus): Promise<void>;
  unregisterPlugin(pluginId: string): Promise<void>;
  getPlugins(): IPlugin[];
  getPlugin(id: string): IPlugin | undefined;
  getCommands(): Map<string, IPluginCommand>;
  getCommand(name: string): IPluginCommand | undefined;
  executeCommand(
    commandName: string,
    args: Record<string, unknown>,
    context: IPluginContext,
  ): Promise<unknown>;
  hasCommand(name: string): boolean;
  getPluginCommands(pluginId: string): IPluginCommand[];
  listCommands(): { command: string; plugin: string; description: string }[];
  getPluginState(pluginId: string): IRegisteredPluginState | undefined;
  listPluginStates(): IRegisteredPluginState[];
  updatePluginStatus(pluginId: string, status: PluginLifecycleStatus, lastError?: string): void;
  setPluginHealth(pluginId: string, health: IPluginHealth): void;
  enablePlugin(pluginId: string): void;
  disablePlugin(pluginId: string): void;
}

export class PluginRegistry implements IPluginRegistry {
  private plugins: Map<string, IPlugin> = new Map();
  private commands: Map<string, IPluginCommand> = new Map();
  private commandToPlugin: Map<string, string> = new Map();
  private pluginStates: Map<string, IRegisteredPluginState> = new Map();

  async registerPlugin(plugin: IPlugin, status: PluginLifecycleStatus = 'initialized'): Promise<void> {
    const pluginId = plugin.metadata.id;

    if (this.plugins.has(pluginId)) {
      throw new Error(`Plugin '${pluginId}' is already registered`);
    }

    const commands = plugin.getCommands();
    const registeredNames: string[] = [];

    try {
      for (const command of commands) {
        const names = await this.registerCommand(command, pluginId);
        registeredNames.push(...names);
      }
    } catch (error) {
      for (const name of registeredNames) {
        this.commands.delete(name);
        this.commandToPlugin.delete(name);
      }
      throw error;
    }

    this.plugins.set(pluginId, plugin);
    this.pluginStates.set(pluginId, {
      plugin,
      status,
      enabled: plugin.metadata.enabledByDefault ?? true,
      commandNames: registeredNames,
    });
  }

  private async registerCommand(command: IPluginCommand, pluginId: string): Promise<string[]> {
    const commandName = command.name;
    const names = [commandName, ...(command.aliases ?? [])];

    for (const name of names) {
      if (this.commands.has(name)) {
        const existingPluginId = this.commandToPlugin.get(name);
        throw new Error(
          `Command '${name}' conflicts with existing command from plugin '${existingPluginId}'`,
        );
      }
    }

    this.commands.set(commandName, command);
    this.commandToPlugin.set(commandName, pluginId);

    if (command.aliases) {
      for (const alias of command.aliases) {
        this.commands.set(alias, command);
        this.commandToPlugin.set(alias, pluginId);
      }
    }

    return names;
  }

  async unregisterPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin '${pluginId}' is not registered`);
    }

    const state = this.pluginStates.get(pluginId);
    const commandNames = state?.commandNames ?? [];

    for (const commandName of commandNames) {
      this.commands.delete(commandName);
      this.commandToPlugin.delete(commandName);
    }

    if (plugin.cleanup) {
      await plugin.cleanup();
    }

    this.plugins.delete(pluginId);
    this.pluginStates.set(pluginId, {
      plugin,
      status: 'unloaded',
      enabled: false,
      commandNames: [],
      health: state?.health,
      lastError: state?.lastError,
    });
  }

  getPlugins(): IPlugin[] {
    return Array.from(this.plugins.values());
  }

  getPlugin(id: string): IPlugin | undefined {
    return this.plugins.get(id);
  }

  getCommands(): Map<string, IPluginCommand> {
    return new Map(this.commands);
  }

  getCommand(name: string): IPluginCommand | undefined {
    return this.commands.get(name);
  }

  hasCommand(name: string): boolean {
    return this.commands.has(name);
  }

  async executeCommand(
    commandName: string,
    args: Record<string, unknown>,
    context: IPluginContext,
  ): Promise<unknown> {
    const command = this.commands.get(commandName);
    if (!command) {
      throw new Error(`Command '${commandName}' not found`);
    }

    const pluginId = this.commandToPlugin.get(commandName);
    if (!pluginId) {
      throw new Error(`No plugin found for command '${commandName}'`);
    }

    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin '${pluginId}' not found`);
    }

    const state = this.pluginStates.get(pluginId);
    if (!state) {
      throw new Error(`Plugin state for '${pluginId}' not found`);
    }

    if (!state.enabled || state.status !== 'active') {
      throw new Error(`Plugin '${pluginId}' is not active`);
    }

    return await command.handler(args, context);
  }

  getPluginCommands(pluginId: string): IPluginCommand[] {
    const commands: IPluginCommand[] = [];
    for (const [commandName, command] of this.commands.entries()) {
      if (this.commandToPlugin.get(commandName) === pluginId) {
        if (!commands.includes(command)) {
          commands.push(command);
        }
      }
    }
    return commands;
  }

  listCommands(): { command: string; plugin: string; description: string }[] {
    const result: { command: string; plugin: string; description: string }[] = [];
    const processedCommands = new Set<IPluginCommand>();

    for (const [commandName, command] of this.commands.entries()) {
      if (!processedCommands.has(command)) {
        const pluginId = this.commandToPlugin.get(commandName);
        const plugin = pluginId ? this.plugins.get(pluginId) : undefined;
        result.push({
          command: command.name,
          plugin: plugin?.metadata.name || pluginId || 'Unknown',
          description: command.description,
        });
        processedCommands.add(command);
      }
    }

    return result.sort((a, b) => a.command.localeCompare(b.command));
  }

  getPluginState(pluginId: string): IRegisteredPluginState | undefined {
    return this.pluginStates.get(pluginId);
  }

  listPluginStates(): IRegisteredPluginState[] {
    return Array.from(this.pluginStates.values());
  }

  updatePluginStatus(pluginId: string, status: PluginLifecycleStatus, lastError?: string): void {
    const state = this.pluginStates.get(pluginId);
    if (!state) {
      throw new Error(`Plugin state for '${pluginId}' not found`);
    }

    state.status = status;
    state.lastError = lastError;
    this.pluginStates.set(pluginId, state);
  }

  setPluginHealth(pluginId: string, health: IPluginHealth): void {
    const state = this.pluginStates.get(pluginId);
    if (!state) {
      throw new Error(`Plugin state for '${pluginId}' not found`);
    }

    state.health = health;
    this.pluginStates.set(pluginId, state);
  }

  enablePlugin(pluginId: string): void {
    const state = this.pluginStates.get(pluginId);
    if (!state) {
      throw new Error(`Plugin state for '${pluginId}' not found`);
    }

    state.enabled = true;
    if (state.status === 'disabled') {
      state.status = 'active';
    }
    this.pluginStates.set(pluginId, state);
  }

  disablePlugin(pluginId: string): void {
    const state = this.pluginStates.get(pluginId);
    if (!state) {
      throw new Error(`Plugin state for '${pluginId}' not found`);
    }

    state.enabled = false;
    state.status = 'disabled';
    this.pluginStates.set(pluginId, state);
  }
}
