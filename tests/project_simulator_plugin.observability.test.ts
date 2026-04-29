import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin observability scenarios', () => {
  it('classifies observability scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'observability logging metrics and tracing path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated observability logging metrics and tracing path',
      data: {
        scenario: 'observability logging metrics and tracing path',
        scenarioKind: 'observability',
        result: 'ok',
      },
    });
  });
});
