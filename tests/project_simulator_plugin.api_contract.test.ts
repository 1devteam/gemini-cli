import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin api-contract scenarios', () => {
  it('classifies api-contract scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'api contract openapi schema compatibility path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated api contract openapi schema compatibility path',
      data: {
        scenario: 'api contract openapi schema compatibility path',
        scenarioKind: 'api-contract',
        result: 'ok',
      },
    });
  });
});
