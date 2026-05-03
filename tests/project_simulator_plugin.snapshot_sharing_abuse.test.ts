import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin snapshot-sharing-abuse scenarios', () => {
  it('classifies snapshot-sharing-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'snapshot sharing abuse public snapshot shared volume image cross account snapshot leak path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('snapshot-sharing-abuse');
  });
});
