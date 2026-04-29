import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin blue-green scenarios', () => {
  it('classifies blue-green scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'blue-green blue environment green environment cutover path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated blue-green blue environment green environment cutover path',
      data: {
        scenario: 'blue-green blue environment green environment cutover path',
        scenarioKind: 'blue-green',
        result: 'ok',
      },
    });
  });
});
