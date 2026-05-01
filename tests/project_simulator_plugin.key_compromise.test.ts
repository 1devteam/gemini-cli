import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin key-compromise scenarios', () => {
  it('classifies key-compromise scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'key compromise compromised key credential leak key revoke path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated key compromise compromised key credential leak key revoke path',
      data: { scenario: 'key compromise compromised key credential leak key revoke path', scenarioKind: 'key-compromise', result: 'ok' },
    });
  });
});
