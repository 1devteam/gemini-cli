import { describe, expect, it } from 'vitest';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { PluginLoader } from './plugin_loader.js';
import { PluginManager } from './plugin_manager.js';

class MockGeminiCore {
  async generateText(prompt: string): Promise<string> {
    return `generated:${prompt}`;
  }

  async generateCode(prompt: string, language?: string): Promise<string> {
    return `code:${language ?? 'unknown'}:${prompt}`;
  }

  async chat(messages: Array<{ content?: string }>): Promise<string> {
    return `chat:${messages.at(-1)?.content ?? ''}`;
  }
}

async function makeTempDir(prefix: string): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), prefix));
}

async function writePlugin(baseDir: string, pluginName: string, source: string): Promise<string> {
  const pluginDir = path.join(baseDir, pluginName);
  await fs.mkdir(pluginDir, { recursive: true });
  await fs.writeFile(
    path.join(pluginDir, 'package.json'),
    JSON.stringify(
      {
        name: pluginName,
        version: '1.0.0',
        main: 'index.js',
        keywords: ['gemini-cli-plugin'],
        geminiCliPlugin: true,
      },
      null,
      2,
    ),
  );
  await fs.writeFile(path.join(pluginDir, 'index.js'), source);
  return pluginDir;
}

describe('Plugin runtime integration', () => {
  it('loads a valid plugin, activates it, and executes its command', async () => {
    const pluginRoot = await makeTempDir('gemini-cli-plugin-int-');

    try {
      await writePlugin(
        pluginRoot,
        'valid-plugin',
        `
          class ValidPlugin {
            metadata = {
              id: 'valid-plugin',
              name: 'Valid Plugin',
              version: '1.0.0',
              description: 'valid runtime plugin',
              author: 'test',
              minCliVersion: '0.1.0',
              category: 'utility',
              capabilities: ['commands'],
              permissions: ['project:read'],
              enabledByDefault: true
            };

            async initialize(context) {
              this.context = context;
            }

            getCommands() {
              return [{
                name: 'valid:run',
                description: 'run valid plugin',
                handler: async (_args, context) => ({
                  success: true,
                  message: 'ok',
                  data: { cwd: context.cwd, permissions: context.permissions }
                })
              }];
            }

            async healthCheck() {
              return { status: 'healthy', message: 'ready' };
            }
          }

          export default () => new ValidPlugin();
        `,
      );

      const manager = new PluginManager([pluginRoot]);
      await manager.initialize(new MockGeminiCore(), { debug: true });
      await manager.loadPlugins();

      const plugins = manager.getPlugins();
      expect(plugins).toHaveLength(1);
      expect(plugins[0].metadata.id).toBe('valid-plugin');

      const states = manager.listPluginStates();
      expect(states).toHaveLength(1);
      expect(states[0]).toMatchObject({
        id: 'valid-plugin',
        status: 'active',
        enabled: true,
        permissions: ['project:read'],
      });
      expect(states[0].health).toEqual({ status: 'healthy', message: 'ready' });

      const result = await manager.executeCommand('valid:run', {});
      expect(result).toEqual({
        success: true,
        message: 'ok',
        data: {
          cwd: process.cwd(),
          permissions: ['project:read'],
        },
      });
    } finally {
      await fs.rm(pluginRoot, { recursive: true, force: true });
    }
  });

  it('keeps a broken plugin from poisoning the runtime while valid peers remain available', async () => {
    const pluginRoot = await makeTempDir('gemini-cli-plugin-broken-');

    try {
      await writePlugin(
        pluginRoot,
        'good-plugin',
        `
          class GoodPlugin {
            metadata = {
              id: 'good-plugin',
              name: 'Good Plugin',
              version: '1.0.0',
              description: 'good runtime plugin',
              author: 'test',
              minCliVersion: '0.1.0',
              category: 'utility',
              capabilities: ['commands'],
              permissions: [],
              enabledByDefault: true
            };

            async initialize() {}

            getCommands() {
              return [{
                name: 'good:run',
                description: 'good run',
                handler: async () => ({ success: true, message: 'good' })
              }];
            }
          }

          export default () => new GoodPlugin();
        `,
      );

      await writePlugin(
        pluginRoot,
        'bad-plugin',
        `
          class BadPlugin {
            metadata = {
              id: 'bad-plugin',
              name: 'Bad Plugin',
              version: '1.0.0',
              description: 'bad runtime plugin',
              author: 'test',
              minCliVersion: '0.1.0',
              category: 'utility',
              capabilities: ['commands'],
              permissions: [],
              enabledByDefault: true
            };

            async initialize() {
              throw new Error('initialize failed');
            }

            getCommands() {
              return [{
                name: 'bad:run',
                description: 'bad run',
                handler: async () => ({ success: true, message: 'bad' })
              }];
            }
          }

          export default () => new BadPlugin();
        `,
      );

      const manager = new PluginManager([pluginRoot]);
      await manager.initialize(new MockGeminiCore(), {});
      await manager.loadPlugins();

      const states = manager.listPluginStates().sort((a, b) => a.id.localeCompare(b.id));
      expect(states).toHaveLength(2);
      expect(states[0]).toMatchObject({ id: 'bad-plugin', status: 'failed' });
      expect(states[1]).toMatchObject({ id: 'good-plugin', status: 'active' });

      const goodResult = await manager.executeCommand('good:run', {});
      expect(goodResult).toEqual({ success: true, message: 'good' });

      await expect(manager.executeCommand('bad:run', {})).rejects.toThrow(
        "Plugin 'bad-plugin' is not active",
      );
    } finally {
      await fs.rm(pluginRoot, { recursive: true, force: true });
    }
  });

  it('validates plugin metadata requirements through the loader', async () => {
    const pluginRoot = await makeTempDir('gemini-cli-plugin-validate-');

    try {
      const invalidDir = await writePlugin(
        pluginRoot,
        'invalid-plugin',
        `
          class InvalidPlugin {
            metadata = {
              id: 'invalid-plugin',
              name: 'Invalid Plugin',
              version: '1.0.0',
              description: 'invalid runtime plugin',
              author: 'test',
              minCliVersion: '0.1.0',
              capabilities: ['commands'],
              permissions: []
            };

            async initialize() {}
            getCommands() { return []; }
          }

          export default () => new InvalidPlugin();
        `,
      );

      const loader = new PluginLoader([pluginRoot]);
      await expect(loader.loadPlugin(invalidDir)).rejects.toThrow('Plugin validation failed');

      const state = loader.getPluginState('invalid-plugin');
      expect(state?.status).toBe('failed');
      expect(state?.lastError).toBe('Plugin validation failed');
    } finally {
      await fs.rm(pluginRoot, { recursive: true, force: true });
    }
  });

  it('unloads plugin commands and cleanup path through manager orchestration', async () => {
    const pluginRoot = await makeTempDir('gemini-cli-plugin-unload-');
    const markerPath = path.join(pluginRoot, 'cleanup.marker');

    try {
      await writePlugin(
        pluginRoot,
        'cleanup-plugin',
        `
          import { promises as fs } from 'fs';

          class CleanupPlugin {
            metadata = {
              id: 'cleanup-plugin',
              name: 'Cleanup Plugin',
              version: '1.0.0',
              description: 'cleanup runtime plugin',
              author: 'test',
              minCliVersion: '0.1.0',
              category: 'utility',
              capabilities: ['commands'],
              permissions: [],
              enabledByDefault: true
            };

            async initialize() {}

            getCommands() {
              return [{
                name: 'cleanup:run',
                description: 'cleanup run',
                handler: async () => ({ success: true, message: 'cleanup' })
              }];
            }

            async cleanup() {
              await fs.writeFile(${JSON.stringify(markerPath)}, 'cleaned', 'utf-8');
            }
          }

          export default () => new CleanupPlugin();
        `,
      );

      const manager = new PluginManager([pluginRoot]);
      await manager.initialize(new MockGeminiCore(), {});
      await manager.loadPlugins();

      expect(await manager.executeCommand('cleanup:run', {})).toEqual({
        success: true,
        message: 'cleanup',
      });

      await manager.unloadPlugin('cleanup-plugin');

      await expect(manager.executeCommand('cleanup:run', {})).rejects.toThrow(
        "Command 'cleanup:run' not found",
      );
      expect(await fs.readFile(markerPath, 'utf-8')).toBe('cleaned');
    } finally {
      await fs.rm(pluginRoot, { recursive: true, force: true });
    }
  });
});
