import { describe, expect, it } from 'vitest';
import { PluginManager } from '../plugin_manager.js';

describe('Plugin system integration', () => {
  it('loads safely when no plugin directories exist', async () => {
    const manager = new PluginManager();

    await manager.initialize({}, {});
    await manager.loadPlugins();

    expect(manager.getPlugins()).toEqual([]);
    expect(manager.listCommands()).toEqual([]);
  });
});
