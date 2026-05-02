import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin analytics-tracking-abuse scenarios', () => {
  it('classifies analytics-tracking-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'analytics tracking abuse consent bypass excessive tracking user fingerprint third party pixel path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('analytics-tracking-abuse');
  });
});
