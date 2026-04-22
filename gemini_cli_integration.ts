import { PluginManager } from './plugin_manager.js';
import { IPluginContext, IPluginCommand } from './plugin_interface.js';
import { IPluginRegistry } from './plugin_registry.js';
import path from 'path';

/**
 * Integration layer for connecting the plugin system with Gemini CLI core
 * This module provides the bridge between the existing CLI and the new plugin system
 */

export interface IGeminiCLIIntegration {
  /** Initialize the plugin system with Gemini CLI */
  initialize(geminiCore: any, cliConfig: any): Promise<void>;
  
  /** Register plugin commands with the CLI command parser */
  registerPluginCommands(commandParser: any): Promise<void>;
  
  /** Execute a plugin command */
  executePluginCommand(commandName: string, args: any): Promise<any>;
  
  /** Get all available plugin commands */
  getAvailableCommands(): any[];
  
  /** Check if a command is a plugin command */
  isPluginCommand(commandName: string): boolean;
  
  /** Get plugin manager instance */
  getPluginManager(): PluginManager;
}

export class GeminiCLIIntegration implements IGeminiCLIIntegration {
  private pluginManager: PluginManager;
  private geminiCore: any;
  private cliConfig: any;
  private initialized: boolean = false;

  constructor() {
    // Initialize plugin manager with default plugin directories
    const pluginDirectories = this.getPluginDirectories();
    this.pluginManager = new PluginManager(pluginDirectories);
  }

  private getPluginDirectories(): string[] {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '';
    return [
      path.join(homeDir, '.gemini-cli', 'plugins'),
      path.join(process.cwd(), 'plugins'),
      path.join(process.cwd(), 'node_modules', '@gemini-cli-plugins'),
      // Add the current directory for development/testing
      process.cwd()
    ];
  }

  async initialize(geminiCore: any, cliConfig: any): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.geminiCore = geminiCore;
    this.cliConfig = cliConfig;

    try {
      // Initialize plugin manager
      await this.pluginManager.initialize(geminiCore, cliConfig);
      
      // Load all available plugins
      await this.pluginManager.loadPlugins();
      
      this.initialized = true;
      
      const plugins = this.pluginManager.getPlugins();
      const commands = this.pluginManager.listCommands();
      
      console.log(`Plugin system initialized: ${plugins.length} plugins, ${commands.length} commands`);
    } catch (error: unknown) {
      console.warn('Plugin system initialization failed:', (error as Error).message);
      // Don't throw error to prevent CLI from failing if plugins can't load
    }
  }

  async registerPluginCommands(commandParser: any): Promise<void> {
    if (!this.initialized) {
      throw new Error('Plugin system not initialized');
    }

    const commands = this.pluginManager.listCommands();
    
    for (const cmd of commands) {
      try {
        // Register command with the CLI's command parser
        // This would depend on the specific command parser used by Gemini CLI
        this.registerSingleCommand(commandParser, cmd);
      } catch (error: unknown) {
        console.warn(`Failed to register plugin command '${cmd.command}':`, (error as Error).message);
      }
    }
  }

  private registerSingleCommand(commandParser: any, cmd: any): void {
    // This is a placeholder implementation
    // In a real integration, this would register with yargs or whatever CLI parser is used
    
    if (commandParser && typeof commandParser.command === 'function') {
      commandParser.command(
        cmd.command,
        cmd.description,
        (yargs: any) => {
          // Add command options based on plugin command definition
          const pluginCommand = this.pluginManager.getRegistry().getCommand(cmd.command);
          if (pluginCommand && pluginCommand.options) {
            for (const option of pluginCommand.options) {
              yargs.option(option.name, {
                describe: option.description,
                type: option.type,
                default: option.default,
                required: option.required
              });
            }
          }
          return yargs;
        },
        async (argv: any) => {
          // Execute plugin command
          return await this.executePluginCommand(cmd.command, argv);
        }
      );
    }
  }

  async executePluginCommand(commandName: string, args: any): Promise<any> {
    if (!this.initialized) {
      throw new Error('Plugin system not initialized');
    }

    try {
      const result = await this.pluginManager.executeCommand(commandName, args);
      
      // Handle result display based on CLI conventions
      this.displayCommandResult(result, commandName);
      
      return result;
    } catch (error: unknown) {
      console.error(`Plugin command '${commandName}' failed:`, (error as Error).message);
      throw error;
    }
  }

  private displayCommandResult(result: any, commandName: string): void {
    if (!result) {
      return;
    }

    if (result.success) {
      console.log(`✓ ${result.message || `Command '${commandName}' completed successfully`}`);
      
      if (result.files && result.files.length > 0) {
        console.log(`Files created/modified:`);
        for (const file of result.files) {
          console.log(`  - ${file}`);
        }
      }
      
      if (result.data && this.cliConfig.verbose) {
        console.log('Result data:', JSON.stringify(result.data, null, 2));
      }
    } else {
      console.error(`✗ ${result.error || `Command '${commandName}' failed`}`);
    }
  }

  getAvailableCommands(): any[] {
    if (!this.initialized) {
      return [];
    }
    
    return this.pluginManager.listCommands();
  }

  isPluginCommand(commandName: string): boolean {
    if (!this.initialized) {
      return false;
    }
    
    return this.pluginManager.hasCommand(commandName);
  }

  getPluginManager(): PluginManager {
    return this.pluginManager;
  }

  // Additional utility methods for CLI integration
  
  async reloadPlugins(): Promise<void> {
    if (!this.initialized) {
      throw new Error('Plugin system not initialized');
    }
    
    // Reload all plugins
    await this.pluginManager.loadPlugins();
    console.log('Plugins reloaded successfully');
  }

  async installPlugin(pluginPath: string): Promise<void> {
    if (!this.initialized) {
      throw new Error('Plugin system not initialized');
    }
    
    try {
      await this.pluginManager.loadPlugin(pluginPath);
      console.log(`Plugin installed successfully: ${pluginPath}`);
    } catch (error: unknown) {
      console.error(`Failed to install plugin: ${(error as Error).message}`);
      throw error;
    }
  }

  async uninstallPlugin(pluginId: string): Promise<void> {
    if (!this.initialized) {
      throw new Error('Plugin system not initialized');
    }
    
    try {
      await this.pluginManager.unloadPlugin(pluginId);
      console.log(`Plugin uninstalled successfully: ${pluginId}`);
    } catch (error: unknown) {
      console.error(`Failed to uninstall plugin: ${(error as Error).message}`);
      throw error;
    }
  }

  listPlugins(): void {
    if (!this.initialized) {
      console.log('Plugin system not initialized');
      return;
    }
    
    const plugins = this.pluginManager.getPlugins();
    
    if (plugins.length === 0) {
      console.log('No plugins installed');
      return;
    }
    
    console.log('Installed plugins:');
    for (const plugin of plugins) {
      console.log(`  - ${plugin.metadata.name} (${plugin.metadata.id}) v${plugin.metadata.version}`);
      console.log(`    ${plugin.metadata.description}`);
      
      const commands = (this.pluginManager.getRegistry() as IPluginRegistry).getPluginCommands(plugin.metadata.id);
      if (commands.length > 0) {
        console.log(`    Commands: ${commands.map((c: IPluginCommand) => c.name).join(', ')}`);
      }
      console.log();
    }
  }

  getPluginInfo(pluginId: string): any {
    if (!this.initialized) {
      return null;
    }
    
    return this.pluginManager.getPluginInfo(pluginId);
  }

  // Help system integration
  generatePluginHelp(): string {
    if (!this.initialized) {
      return 'Plugin system not available';
    }
    
    const commands = this.pluginManager.listCommands();
    
    if (commands.length === 0) {
      return 'No plugin commands available';
    }
    
    let help = 'Available Plugin Commands:\n\n';
    
    const groupedCommands = this.groupCommandsByPlugin(commands);
    
    for (const [pluginName, pluginCommands] of Object.entries(groupedCommands)) {
      help += `${pluginName}:\n`;
      for (const cmd of pluginCommands as any[]) {
        help += `  ${cmd.command.padEnd(20)} ${cmd.description}\n`;
      }
      help += '\n';
    }
    
    return help;
  }

  private groupCommandsByPlugin(commands: any[]): { [key: string]: any[] } {
    const grouped: { [key: string]: any[] } = {};
    
    for (const cmd of commands) {
      if (!grouped[cmd.plugin]) {
        grouped[cmd.plugin] = [];
      }
      grouped[cmd.plugin].push(cmd);
    }
    
    return grouped;
  }

  // Configuration management
  async updatePluginConfig(pluginId: string, config: any): Promise<void> {
    const plugin = this.pluginManager.getPlugin(pluginId);
    if (!plugin) {
      throw new Error(`Plugin not found: ${pluginId}`);
    }
    
    if (plugin.validateConfig && !plugin.validateConfig(config)) {
      throw new Error(`Invalid configuration for plugin: ${pluginId}`);
    }
    
    // In a real implementation, this would save the config to a file
    console.log(`Configuration updated for plugin: ${pluginId}`);
  }

  // Development and debugging utilities
  async enableDebugMode(): Promise<void> {
    if (this.cliConfig) {
      this.cliConfig.debug = true;
      console.log('Plugin debug mode enabled');
    }
  }

  async disableDebugMode(): Promise<void> {
    if (this.cliConfig) {
      this.cliConfig.debug = false;
      console.log('Plugin debug mode disabled');
    }
  }

  getSystemInfo(): any {
    return {
      initialized: this.initialized,
      pluginCount: this.pluginManager.getPlugins().length,
      commandCount: this.pluginManager.listCommands().length,
      pluginDirectories: this.getPluginDirectories(),
      nodeVersion: process.version,
      platform: process.platform
    };
  }
}

// Export a singleton instance for easy use
export const geminiCLIIntegration = new GeminiCLIIntegration();

// Example usage function for documentation
export async function integrateWithGeminiCLI(geminiCore: any, cliConfig: any, commandParser: any): Promise<void> {
  // Initialize the plugin system
  await geminiCLIIntegration.initialize(geminiCore, cliConfig);
  
  // Register plugin commands with the CLI
  await geminiCLIIntegration.registerPluginCommands(commandParser);
  
  // Add plugin management commands to the CLI
  if (commandParser && typeof commandParser.command === 'function') {
    commandParser
      .command('plugins', 'Manage plugins', (yargs: any) => {
        return yargs
          .command('list', 'List installed plugins', {}, () => {
            geminiCLIIntegration.listPlugins();
          })
          .command('install <path>', 'Install a plugin', {}, async (argv: any) => {
            await geminiCLIIntegration.installPlugin(argv.path);
          })
          .command('uninstall <id>', 'Uninstall a plugin', {}, async (argv: any) => {
            await geminiCLIIntegration.uninstallPlugin(argv.id);
          })
          .command('reload', 'Reload all plugins', {}, async () => {
            await geminiCLIIntegration.reloadPlugins();
          })
          .command('info <id>', 'Get plugin information', {}, (argv: any) => {
            const info = geminiCLIIntegration.getPluginInfo(argv.id);
            console.log(JSON.stringify(info, null, 2));
          });
      });
  }
  
  console.log('Gemini CLI plugin integration completed');
}

