import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin health-check scenarios', () => {
  it('classifies health-check scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'health check readiness probe liveness probe synthetic check path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated health check readiness probe liveness probe synthetic check path',
      data: { scenario: 'health check readiness probe liveness probe synthetic check path', scenarioKind: 'health-check', result: 'ok' },
    });
  });
});
