import { describe, expect, it } from 'vitest';
import { PluginRegistry } from './plugin_registry.js';
import {
  IPlugin,
  IPluginContext,
  IPluginHealth,
  IPluginResult,
  PluginPermission,
} from './plugin_interface.js';

function createContext(): IPluginContext {
  return {
    cwd: process.cwd(),
    config: {},
    permissions: [],
    gemini: {
      generateText: async () => 'ok',
      generateCode: async () => 'ok',
      chat: async () => 'ok',
    },
    fs: {
      readFile: async () => '',
      writeFile: async () => {},
      exists: async () => true,
      mkdir: async () => {},
      readdir: async () => [],
      stat: async () => ({}),
    },
    logger: {
      info: () => {},
      warn: () => {},
      error: () => {},
      debug: () => {},
    },
    project: {
      root: process.cwd(),
      type: 'node',
      git: {
        branch: 'main',
        remote: 'origin',
        lastCommit: 'abc123',
      },
    },
  };
}

function createPlugin(overrides?: {
  id?: string;
  commandName?: string;
  aliases?: string[];
  enabledByDefault?: boolean;
  permissions?: PluginPermission[];
  cleanup?: () => Promise<void>;
  healthCheck?: () => Promise<IPluginHealth>;
}): IPlugin {
  const id = overrides?.id ?? 'plugin-a';
  const commandName = overrides?.commandName ?? `${id}:run`;

  return {
    metadata: {
      id,
      name: `${id} name`,
      version: '1.0.0',
      description: `${id} description`,
      author: 'test',
      minCliVersion: '0.1.0',
      category: 'utility',
      capabilities: ['commands'],
      permissions: overrides?.permissions ?? [],
      enabledByDefault: overrides?.enabledByDefault ?? true,
    },
    async initialize(): Promise<void> {
      return;
    },
    getCommands() {
      return [
        {
          name: commandName,
          description: `command for ${id}`,
          aliases: overrides?.aliases,
          handler: async (): Promise<IPluginResult> => ({
            success: true,
            message: `${id} executed`,
          }),
        },
      ];
    },
    cleanup: overrides?.cleanup,
    healthCheck: overrides?.healthCheck,
  };
}

describe('PluginRegistry invariants', () => {
  it('registers plugin state and protects duplicate plugin ids', async () => {
    const registry = new PluginRegistry();
    const plugin = createPlugin({ id: 'dup-plugin' });

    await registry.registerPlugin(plugin, 'loaded');

    const state = registry.getPluginState('dup-plugin');
    expect(state).toBeDefined();
    expect(state?.status).toBe('loaded');
    expect(state?.enabled).toBe(true);

    await expect(registry.registerPlugin(createPlugin({ id: 'dup-plugin' }))).rejects.toThrow(
      "Plugin 'dup-plugin' is already registered",
    );
  });

  it('rejects duplicate command names across plugins', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(
      createPlugin({ id: 'plugin-a', commandName: 'shared:command' }),
      'loaded',
    );

    await expect(
      registry.registerPlugin(createPlugin({ id: 'plugin-b', commandName: 'shared:command' }), 'loaded'),
    ).rejects.toThrow("Command 'shared:command' conflicts with existing command from plugin 'plugin-a'");
  });

  it('rejects duplicate aliases across plugins', async () => {
    const registry = new PluginRegistry();

    await registry.registerPlugin(
      createPlugin({ id: 'plugin-a', commandName: 'plugin-a:run', aliases: ['shared-alias'] }),
      'loaded',
    );

    await expect(
      registry.registerPlugin(
        createPlugin({ id: 'plugin-b', commandName: 'plugin-b:run', aliases: ['shared-alias'] }),
        'loaded',
      ),
    ).rejects.toThrow("Command 'shared-alias' conflicts with existing command from plugin 'plugin-a'");
  });

  it('blocks command execution when plugin is not active', async () => {
    const registry = new PluginRegistry();
    const context = createContext();

    await registry.registerPlugin(createPlugin({ id: 'inactive-plugin' }), 'loaded');

    await expect(
      registry.executeCommand('inactive-plugin:run', {}, context),
    ).rejects.toThrow("Plugin 'inactive-plugin' is not active");
  });

  it('allows command execution only when plugin is active and enabled', async () => {
    const registry = new PluginRegistry();
    const context = createContext();

    await registry.registerPlugin(createPlugin({ id: 'active-plugin' }), 'initialized');
    registry.enablePlugin('active-plugin');
    registry.updatePluginStatus('active-plugin', 'active');

    const result = await registry.executeCommand('active-plugin:run', {}, context);
    expect(result).toEqual({ success: true, message: 'active-plugin executed' });
  });

  it('disables plugin execution after disablePlugin is called', async () => {
    const registry = new PluginRegistry();
    const context = createContext();

    await registry.registerPlugin(createPlugin({ id: 'toggle-plugin' }), 'initialized');
    registry.enablePlugin('toggle-plugin');
    registry.updatePluginStatus('toggle-plugin', 'active');

    await registry.executeCommand('toggle-plugin:run', {}, context);

    registry.disablePlugin('toggle-plugin');

    await expect(
      registry.executeCommand('toggle-plugin:run', {}, context),
    ).rejects.toThrow("Plugin 'toggle-plugin' is not active");
  });

  it('tracks health and failure metadata on plugin state', async () => {
    const registry = new PluginRegistry();
    await registry.registerPlugin(createPlugin({ id: 'health-plugin' }), 'initialized');

    registry.setPluginHealth('health-plugin', {
      status: 'healthy',
      message: 'ready',
      details: { checks: 2 },
    });
    registry.updatePluginStatus('health-plugin', 'failed', 'boom');

    const state = registry.getPluginState('health-plugin');
    expect(state?.health).toEqual({
      status: 'healthy',
      message: 'ready',
      details: { checks: 2 },
    });
    expect(state?.status).toBe('failed');
    expect(state?.lastError).toBe('boom');
  });

  it('calls cleanup and transitions to unloaded on unregister', async () => {
    const registry = new PluginRegistry();
    let cleaned = false;

    await registry.registerPlugin(
      createPlugin({
        id: 'cleanup-plugin',
        cleanup: async () => {
          cleaned = true;
        },
      }),
      'active',
    );

    await registry.unregisterPlugin('cleanup-plugin');

    expect(cleaned).toBe(true);
    const state = registry.getPluginState('cleanup-plugin');
    expect(state?.status).toBe('unloaded');
    expect(state?.enabled).toBe(false);
    expect(registry.getPlugin('cleanup-plugin')).toBeUndefined();
    expect(registry.hasCommand('cleanup-plugin:run')).toBe(false);
  });

  it('lists unique commands without duplicating alias-backed command entries', async () => {
    const registry = new PluginRegistry();
    await registry.registerPlugin(
      createPlugin({ id: 'alias-plugin', aliases: ['alias-one', 'alias-two'] }),
      'active',
    );

    const commands = registry.listCommands();
    expect(commands).toHaveLength(1);
    expect(commands[0]).toMatchObject({
      command: 'alias-plugin:run',
      plugin: 'alias-plugin name',
      description: 'command for alias-plugin',
    });
  });
});
