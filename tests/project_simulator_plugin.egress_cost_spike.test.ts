import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin egress-cost-spike scenarios', () => {
  it('classifies egress-cost-spike scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'egress cost spike outbound bandwidth data transfer surge cross region traffic path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('egress-cost-spike');
  });
});
