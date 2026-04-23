import { describe, expect, it } from 'vitest';
import { PluginManager } from '../plugin_manager.js';

describe('PluginManager lifecycle', () => {
  it('throws before initialization when context is requested', () => {
    const manager = new PluginManager();

    expect(() => manager.getContext()).toThrow('Plugin manager not initialized');
  });

  it('initializes and exposes context', async () => {
    const manager = new PluginManager();

    await manager.initialize({}, {});

    expect(manager.getContext()).toBeDefined();
  });

  it('reports missing commands as false', async () => {
    const manager = new PluginManager();

    await manager.initialize({}, {});

    expect(manager.hasCommand('missing-command')).toBe(false);
  });
});
