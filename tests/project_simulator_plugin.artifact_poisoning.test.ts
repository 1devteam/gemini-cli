import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin artifact-poisoning scenarios', () => {
  it('classifies artifact-poisoning scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'artifact poisoning malicious build artifact tampered package poisoned cache release asset path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('artifact-poisoning');
  });
});
