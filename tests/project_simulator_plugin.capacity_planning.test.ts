import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin capacity-planning scenarios', () => {
  it('classifies capacity-planning scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'capacity planning forecast demand headroom utilization path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated capacity planning forecast demand headroom utilization path',
      data: { scenario: 'capacity planning forecast demand headroom utilization path', scenarioKind: 'capacity-planning', result: 'ok' },
    });
  });
});
