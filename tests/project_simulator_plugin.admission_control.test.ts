import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin admission-control scenarios', () => {
  it('classifies admission-control scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'admission control kubernetes admission webhook policy enforcement deny request path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated admission control kubernetes admission webhook policy enforcement deny request path',
      data: { scenario: 'admission control kubernetes admission webhook policy enforcement deny request path', scenarioKind: 'admission-control', result: 'ok' },
    });
  });
});
