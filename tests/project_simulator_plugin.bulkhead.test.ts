import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin bulkhead scenarios', () => {
  it('classifies bulkhead scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'bulkhead isolation pool partition resource isolation path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated bulkhead isolation pool partition resource isolation path',
      data: {
        scenario: 'bulkhead isolation pool partition resource isolation path',
        scenarioKind: 'bulkhead',
        result: 'ok',
      },
    });
  });
});
