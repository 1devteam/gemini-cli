import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin chaos-testing scenarios', () => {
  it('classifies chaos-testing scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'chaos testing fault injection failure injection blast radius path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated chaos testing fault injection failure injection blast radius path',
      data: {
        scenario: 'chaos testing fault injection failure injection blast radius path',
        scenarioKind: 'chaos-testing',
        result: 'ok',
      },
    });
  });
});
