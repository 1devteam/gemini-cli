import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin kms-key-misuse scenarios', () => {
  it('classifies kms-key-misuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'kms key misuse decrypt permission abuse key policy wildcard encryption key exposure path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('kms-key-misuse');
  });
});
