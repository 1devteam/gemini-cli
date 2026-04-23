import { describe, expect, it } from 'vitest';
import type { IPlugin, IPluginCommand, IPluginContext, IPluginMetadata } from '../plugin_interface.js';
import { PluginRegistry } from '../plugin_registry.js';

function createCommand(name: string, aliases: string[] = []): IPluginCommand {
  return {
    name,
    description: `${name} command`,
    aliases,
    handler: async () => ({ success: true }),
  };
}

function createPlugin(id: string, commands: IPluginCommand[] = []): IPlugin {
  const metadata: IPluginMetadata = {
    id,
    name: `${id} plugin`,
    version: '1.0.0',
    description: `${id} test plugin`,
    author: 'test-suite',
    minCliVersion: '0.2.0',
    category: 'utility',
    capabilities: ['commands'],
    permissions: [],
  };

  return {
    metadata,
    initialize: async () => undefined,
    getCommands: () => commands,
  };
}

const context = {} as IPluginContext;

describe('PluginRegistry invariants', () => {
  it('rejects duplicate plugin ids', async () => {
    const registry = new PluginRegistry();
    const plugin = createPlugin('duplicate');

    await registry.registerPlugin(plugin, 'active');

    await expect(registry.registerPlugin(plugin, 'active')).rejects.toThrow(
      "Plugin 'duplicate' is already registered",
    );
  });

  it('rejects command name collisions', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(createPlugin('one', [createCommand('shared')]), 'active');

    await expect(
      registry.registerPlugin(createPlugin('two', [createCommand('shared')]), 'active'),
    ).rejects.toThrow("Command 'shared' conflicts with existing command from plugin 'one'");
  });

  it('rejects alias collisions', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(createPlugin('one', [createCommand('primary', ['alias'])]), 'active');

    await expect(
      registry.registerPlugin(createPlugin('two', [createCommand('other', ['alias'])]), 'active'),
    ).rejects.toThrow("Command 'alias' conflicts with existing command from plugin 'one'");
  });

  it('executes active registered commands', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(createPlugin('runner', [createCommand('run')]), 'active');

    await expect(registry.executeCommand('run', {}, context)).resolves.toEqual({ success: true });
  });

  it('blocks execution for disabled plugins', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(createPlugin('blocked', [createCommand('blocked-run')]), 'active');
    registry.disablePlugin('blocked');

    await expect(registry.executeCommand('blocked-run', {}, context)).rejects.toThrow(
      "Plugin 'blocked' is not active",
    );
  });
});
