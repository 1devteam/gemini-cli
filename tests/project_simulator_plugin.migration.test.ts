import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin migration scenarios', () => {
  it('classifies migration scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'migration migrate and schema change path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated migration migrate and schema change path',
      data: {
        scenario: 'migration migrate and schema change path',
        scenarioKind: 'migration',
        result: 'ok',
      },
    });
  });
});
