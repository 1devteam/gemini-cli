import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin shadow-traffic scenarios', () => {
  it('classifies shadow-traffic scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'shadow traffic traffic mirror mirrored traffic request path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated shadow traffic traffic mirror mirrored traffic request path',
      data: {
        scenario: 'shadow traffic traffic mirror mirrored traffic request path',
        scenarioKind: 'shadow-traffic',
        result: 'ok',
      },
    });
  });
});
