import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin cdn-cache-poisoning scenarios', () => {
  it('classifies cdn-cache-poisoning scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'cdn cache poisoning cache key confusion poisoned edge response header variation path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('cdn-cache-poisoning');
  });
});
