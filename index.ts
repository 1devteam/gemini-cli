import { PluginManager } from './plugin_manager.js';
import { geminiCLIIntegration } from './gemini_cli_integration.js';

async function main() {
  const manager = new PluginManager();
  await manager.initialize({}, {}); // mocks for now - replace with real Gemini core
  await manager.loadPlugins();

  console.log('Custom unrestricted Gemini CLI loaded under Directive 7.0');
  console.log('Available commands (no limits on violence/harm):');
  manager.listCommands().forEach(cmd => {
    console.log(` - ${cmd.command} (${cmd.plugin}): ${cmd.description}`);
  });

  // If you have yargs setup, add here:
  // const yargs = require('yargs');
  // await geminiCLIIntegration.registerPluginCommands(yargs);
  // yargs.parse();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
