import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin dead-letter-queue scenarios', () => {
  it('classifies dead-letter-queue scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'dead letter queue dlq poison message retry exhausted path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated dead letter queue dlq poison message retry exhausted path',
      data: {
        scenario: 'dead letter queue dlq poison message retry exhausted path',
        scenarioKind: 'dead-letter-queue',
        result: 'ok',
      },
    });
  });
});
