import { IPlugin, IPluginCommand, IPluginContext } from './plugin_interface.js';

export interface IPluginRegistry {
  /** Register a plugin */
  registerPlugin(plugin: IPlugin): Promise<void>;
  
  /** Unregister a plugin */
  unregisterPlugin(pluginId: string): Promise<void>;
  
  /** Get all registered plugins */
  getPlugins(): IPlugin[];
  
  /** Get a specific plugin by ID */
  getPlugin(id: string): IPlugin | undefined;
  
  /** Get all available commands */
  getCommands(): Map<string, IPluginCommand>;
  
  /** Get command by name */
  getCommand(name: string): IPluginCommand | undefined;
  
  /** Execute a command */
  executeCommand(commandName: string, args: any, context: IPluginContext): Promise<any>;
  
  /** Check if a command exists */
  hasCommand(name: string): boolean;
  
  /** Get all commands for a specific plugin */
  getPluginCommands(pluginId: string): IPluginCommand[];

  /** List all available commands */
  listCommands(): { command: string; plugin: string; description: string }[];
}

export class PluginRegistry implements IPluginRegistry {
  private plugins: Map<string, IPlugin> = new Map();
  private commands: Map<string, IPluginCommand> = new Map();
  private commandToPlugin: Map<string, string> = new Map();

  async registerPlugin(plugin: IPlugin): Promise<void> {
    const pluginId = plugin.metadata.id;
    
    // Check if plugin is already registered
    if (this.plugins.has(pluginId)) {
      throw new Error(`Plugin '${pluginId}' is already registered`);
    }

    // Initialize the plugin
    // Note: We'll need to pass a proper context here
    // For now, we'll skip initialization and handle it in the main CLI
    
    // Register the plugin
    this.plugins.set(pluginId, plugin);
    
    // Register plugin commands
    const commands = plugin.getCommands();
    for (const command of commands) {
      await this.registerCommand(command, pluginId);
    }
    
    console.log(`Plugin '${plugin.metadata.name}' (${pluginId}) registered successfully`);
  }

  private async registerCommand(command: IPluginCommand, pluginId: string): Promise<void> {
    const commandName = command.name;
    
    // Check for command name conflicts
    if (this.commands.has(commandName)) {
      const existingPluginId = this.commandToPlugin.get(commandName);
      throw new Error(
        `Command '${commandName}' conflicts with existing command from plugin '${existingPluginId}'`
      );
    }

    // Check aliases for conflicts
    if (command.aliases) {
      for (const alias of command.aliases) {
        if (this.commands.has(alias)) {
          const existingPluginId = this.commandToPlugin.get(alias);
          throw new Error(
            `Command alias '${alias}' conflicts with existing command from plugin '${existingPluginId}'`
          );
        }
      }
    }

    // Register the command
    this.commands.set(commandName, command);
    this.commandToPlugin.set(commandName, pluginId);

    // Register aliases
    if (command.aliases) {
      for (const alias of command.aliases) {
        this.commands.set(alias, command);
        this.commandToPlugin.set(alias, pluginId);
      }
    }
  }

  async unregisterPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin '${pluginId}' is not registered`);
    }

    // Unregister all commands from this plugin
    const commandsToRemove: string[] = [];
    for (const [commandName, commandPluginId] of this.commandToPlugin.entries()) {
      if (commandPluginId === pluginId) {
        commandsToRemove.push(commandName);
      }
    }

    for (const commandName of commandsToRemove) {
      this.commands.delete(commandName);
      this.commandToPlugin.delete(commandName);
    }

    // Cleanup plugin if it has a cleanup method
    if (plugin.cleanup) {
      await plugin.cleanup();
    }

    // Remove plugin
    this.plugins.delete(pluginId);
    
    console.log(`Plugin '${plugin.metadata.name}' (${pluginId}) unregistered successfully`);
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

  async executeCommand(commandName: string, args: any, context: IPluginContext): Promise<any> {
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

    try {
      console.log(`Executing command '${commandName}' from plugin '${plugin.metadata.name}'`);
      const result = await command.handler(args, context);
      return result;
    } catch (error) {
      console.error(`Error executing command '${commandName}':`, error);
      throw error;
    }
  }

  // Utility methods
  getPluginCommands(pluginId: string): IPluginCommand[] {
    const commands: IPluginCommand[] = [];
    for (const [commandName, command] of this.commands.entries()) {
      if (this.commandToPlugin.get(commandName) === pluginId) {
        // Avoid duplicates (aliases point to same command object)
        if (!commands.includes(command)) {
          commands.push(command);
        }
      }
    }
    return commands;
  }

  getCommandsByPlugin(): Map<string, IPluginCommand[]> {
    const result = new Map<string, IPluginCommand[]>();
    for (const plugin of this.plugins.values()) {
      result.set(plugin.metadata.id, this.getPluginCommands(plugin.metadata.id));
    }
    return result;
  }

  listCommands(): { command: string; plugin: string; description: string }[] {
    const result: { command: string; plugin: string; description: string }[] = [];
    const processedCommands = new Set<IPluginCommand>();

    for (const [commandName, command] of this.commands.entries()) {
      if (!processedCommands.has(command)) {
        const pluginId = this.commandToPlugin.get(commandName);
        const plugin = this.plugins.get(pluginId!);
        
        result.push({
          command: command.name,
          plugin: plugin?.metadata.name || pluginId || 'Unknown',
          description: command.description
        });
        
        processedCommands.add(command);
      }
    }

    return result.sort((a, b) => a.command.localeCompare(b.command));
  }
}

