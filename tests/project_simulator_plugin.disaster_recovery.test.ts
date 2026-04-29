import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin disaster-recovery scenarios', () => {
  it('classifies disaster-recovery scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'disaster recovery failover restore backup recovery path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated disaster recovery failover restore backup recovery path',
      data: {
        scenario: 'disaster recovery failover restore backup recovery path',
        scenarioKind: 'disaster-recovery',
        result: 'ok',
      },
    });
  });
});
