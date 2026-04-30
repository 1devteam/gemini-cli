import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin config-drift scenarios', () => {
  it('classifies config-drift scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'config drift configuration mismatch desired state drift detection path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated config drift configuration mismatch desired state drift detection path',
      data: { scenario: 'config drift configuration mismatch desired state drift detection path', scenarioKind: 'config-drift', result: 'ok' },
    });
  });
});
