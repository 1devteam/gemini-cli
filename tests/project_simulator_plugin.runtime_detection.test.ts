import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin runtime-detection scenarios', () => {
  it('classifies runtime-detection scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'runtime detection anomaly detection behavior monitoring intrusion detection path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated runtime detection anomaly detection behavior monitoring intrusion detection path',
      data: { scenario: 'runtime detection anomaly detection behavior monitoring intrusion detection path', scenarioKind: 'runtime-detection', result: 'ok' },
    });
  });
});
