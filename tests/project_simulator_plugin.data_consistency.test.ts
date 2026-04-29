import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin data-consistency scenarios', () => {
  it('classifies data-consistency scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'data consistency eventual consistency replication lag read repair path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated data consistency eventual consistency replication lag read repair path',
      data: {
        scenario: 'data consistency eventual consistency replication lag read repair path',
        scenarioKind: 'data-consistency',
        result: 'ok',
      },
    });
  });
});
