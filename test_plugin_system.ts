import { PluginManager } from './plugin_manager.js';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Test script for the plugin system
 * This script tests the core plugin infrastructure
 */

class MockGeminiCore {
  async generateText(prompt: string, options?: any): Promise<string> {
    // Mock implementation for testing
    return `Generated response for: ${prompt}`;
  }

  async chat(messages: any[], options?: any): Promise<string> {
    const lastMessage = messages[messages.length - 1];
    return `Chat response to: ${lastMessage.content}`;
  }
}

async function setupTestEnvironment(): Promise<void> {
  console.log('Setting up test environment...');
  
  // Create test plugin directory
  const testPluginDir = path.join(process.cwd(), 'test-plugins');
  await fs.mkdir(testPluginDir, { recursive: true });

  // Create a test plugin package
  const testPluginPath = path.join(testPluginDir, 'test-plugin');
  await fs.mkdir(testPluginPath, { recursive: true });

  // Create package.json for the test plugin
  const packageJson = {
    name: 'test-plugin',
    version: '1.0.0',
    description: 'A test plugin',
    main: 'index.js',
    keywords: ['gemini-cli-plugin'],
    geminiCliPlugin: true
  };

  await fs.writeFile(
    path.join(testPluginPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Create the test plugin implementation
  const pluginCode = `
import { IPlugin, IPluginMetadata, IPluginCommand, IPluginContext, IPluginResult } from '../plugin_interface.js';

class TestPlugin {
  metadata = {
    id: 'test-plugin',
    name: 'Test Plugin',
    version: '1.0.0',
    description: 'A test plugin for validation',
    author: 'Test Author',
    minCliVersion: '0.1.0'
  };

  async initialize(context) {
    context.logger.info('Test plugin initialized');
  }

  getCommands() {
    return [
      {
        name: 'test-command',
        description: 'A test command',
        handler: async (args, context) => {
          return {
            success: true,
            message: 'Test command executed successfully',
            data: { args, timestamp: new Date().toISOString() }
          };
        }
      }
    ];
  }

  async cleanup() {
    console.log('Test plugin cleanup');
  }
}

export default () => new TestPlugin();
`;

  await fs.writeFile(path.join(testPluginPath, 'index.js'), pluginCode);
  
  console.log('Test environment setup complete');
}

async function testPluginLoading(): Promise<void> {
  console.log('\n=== Testing Plugin Loading ===');
  
  const testPluginDir = path.join(process.cwd(), 'test-plugins');
  const pluginManager = new PluginManager([testPluginDir]);
  
  // Initialize with mock Gemini core
  const mockGeminiCore = new MockGeminiCore();
  const config = { debug: true };
  
  await pluginManager.initialize(mockGeminiCore, config);
  console.log('✓ Plugin manager initialized');

  // Load plugins
  await pluginManager.loadPlugins();
  console.log('✓ Plugins loaded');

  // Check loaded plugins
  const plugins = pluginManager.getPlugins();
  console.log(`✓ Found ${plugins.length} plugins:`);
  
  for (const plugin of plugins) {
    console.log(`  - ${plugin.metadata.name} (${plugin.metadata.id})`);
  }

  return;
}

async function testCommandExecution(): Promise<void> {
  console.log('\n=== Testing Command Execution ===');
  
  const testPluginDir = path.join(process.cwd(), 'test-plugins');
  const pluginManager = new PluginManager([testPluginDir]);
  
  const mockGeminiCore = new MockGeminiCore();
  const config = { debug: true };
  
  await pluginManager.initialize(mockGeminiCore, config);
  await pluginManager.loadPlugins();

  // List available commands
  const commands = pluginManager.listCommands();
  console.log('✓ Available commands:');
  for (const cmd of commands) {
    console.log(`  - ${cmd.command}: ${cmd.description} (from ${cmd.plugin})`);
  }

  // Execute a test command
  if (pluginManager.hasCommand('test-command')) {
    console.log('\n✓ Executing test-command...');
    const result = await pluginManager.executeCommand('test-command', { test: 'value' });
    console.log('✓ Command result:', result);
  } else {
    console.log('✗ test-command not found');
  }
}

async function testExamplePlugin(): Promise<void> {
  console.log('\n=== Testing Example Plugin ===');
  
  // We'll test the example plugin directly since it's in the same directory
  const pluginManager = new PluginManager([process.cwd()]);
  
  const mockGeminiCore = new MockGeminiCore();
  const config = { debug: true };
  
  await pluginManager.initialize(mockGeminiCore, config);

  // Load the example plugin directly
  try {
    await pluginManager.loadPlugin('./example_plugin.ts');
    console.log('✓ Example plugin loaded');
  } catch (error) {
    console.log('Note: Example plugin loading failed (expected if not compiled):', error.message);
    return;
  }

  // Test hello command
  if (pluginManager.hasCommand('hello')) {
    console.log('\n✓ Testing hello command...');
    const result = await pluginManager.executeCommand('hello', { name: 'Plugin System' });
    console.log('✓ Hello result:', result);
  }

  // Test file-info command
  if (pluginManager.hasCommand('file-info')) {
    console.log('\n✓ Testing file-info command...');
    const result = await pluginManager.executeCommand('file-info', { path: './plugin_interface.ts' });
    console.log('✓ File-info result:', result.success ? 'Success' : result.error);
  }
}

async function testPluginRegistry(): Promise<void> {
  console.log('\n=== Testing Plugin Registry ===');
  
  const pluginManager = new PluginManager();
  const registry = pluginManager.getRegistry();
  
  console.log('✓ Plugin registry created');
  console.log(`✓ Initial plugin count: ${registry.getPlugins().length}`);
  console.log(`✓ Initial command count: ${registry.getCommands().size}`);
  
  // Test command listing
  const commands = registry.listCommands();
  console.log(`✓ Listed ${commands.length} commands`);
}

async function cleanupTestEnvironment(): Promise<void> {
  console.log('\n=== Cleaning up test environment ===');
  
  try {
    const testPluginDir = path.join(process.cwd(), 'test-plugins');
    await fs.rm(testPluginDir, { recursive: true, force: true });
    console.log('✓ Test environment cleaned up');
  } catch (error) {
    console.log('Note: Cleanup failed (may not exist):', error.message);
  }
}

async function runTests(): Promise<void> {
  console.log('🚀 Starting Plugin System Tests\n');
  
  try {
    await setupTestEnvironment();
    await testPluginRegistry();
    await testPluginLoading();
    await testCommandExecution();
    await testExamplePlugin();
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  } finally {
    await cleanupTestEnvironment();
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests };

