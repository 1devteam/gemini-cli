import { describe, expect, it } from 'vitest';
import { PluginLoader } from '../plugin_loader.js';

describe('PluginLoader behavior', () => {
  it('returns empty array when directories do not exist', async () => {
    const loader = new PluginLoader([
      '/nonexistent/dir-one',
      '/nonexistent/dir-two'
    ]);

    const plugins = await loader.loadAllPlugins();

    expect(Array.isArray(plugins)).toBe(true);
    expect(plugins.length).toBe(0);
  });

  it('does not crash on invalid plugin paths', async () => {
    const loader = new PluginLoader(['/definitely/not/a/plugin']);

    const plugins = await loader.loadAllPlugins();

    expect(Array.isArray(plugins)).toBe(true);
  });
});
