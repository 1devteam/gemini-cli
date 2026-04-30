import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin outbox scenarios', () => {
  it('classifies outbox scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'outbox transactional outbox event relay message dispatch path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated outbox transactional outbox event relay message dispatch path',
      data: {
        scenario: 'outbox transactional outbox event relay message dispatch path',
        scenarioKind: 'outbox',
        result: 'ok',
      },
    });
  });
});
