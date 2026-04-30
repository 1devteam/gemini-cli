import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin maintenance-window scenarios', () => {
  it('classifies maintenance-window scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'maintenance window planned downtime service drain upgrade path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated maintenance window planned downtime service drain upgrade path',
      data: {
        scenario: 'maintenance window planned downtime service drain upgrade path',
        scenarioKind: 'maintenance-window',
        result: 'ok',
      },
    });
  });
});
