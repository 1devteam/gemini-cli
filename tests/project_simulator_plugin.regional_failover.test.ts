import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin regional-failover scenarios', () => {
  it('classifies regional-failover scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'regional failover cross region traffic shift secondary region path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated regional failover cross region traffic shift secondary region path',
      data: { scenario: 'regional failover cross region traffic shift secondary region path', scenarioKind: 'regional-failover', result: 'ok' },
    });
  });
});
