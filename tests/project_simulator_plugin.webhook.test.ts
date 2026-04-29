import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin webhook scenarios', () => {
  it('classifies webhook scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'webhook callback event delivery endpoint path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated webhook callback event delivery endpoint path',
      data: {
        scenario: 'webhook callback event delivery endpoint path',
        scenarioKind: 'webhook',
        result: 'ok',
      },
    });
  });
});
