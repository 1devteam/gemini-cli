import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin scheduler scenarios', () => {
  it('classifies scheduler scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'scheduler schedule cron and job dispatch path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated scheduler schedule cron and job dispatch path',
      data: {
        scenario: 'scheduler schedule cron and job dispatch path',
        scenarioKind: 'scheduler',
        result: 'ok',
      },
    });
  });
});
