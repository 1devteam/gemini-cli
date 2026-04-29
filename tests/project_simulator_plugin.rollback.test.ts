import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin rollback scenarios', () => {
  it('classifies rollback scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'rollback roll back and revert release path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated rollback roll back and revert release path',
      data: {
        scenario: 'rollback roll back and revert release path',
        scenarioKind: 'rollback',
        result: 'ok',
      },
    });
  });
});
