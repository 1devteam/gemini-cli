import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin saga scenarios', () => {
  it('classifies saga scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'saga compensation compensating transaction orchestration path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated saga compensation compensating transaction orchestration path',
      data: {
        scenario: 'saga compensation compensating transaction orchestration path',
        scenarioKind: 'saga',
        result: 'ok',
      },
    });
  });
});
