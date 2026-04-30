import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin backpressure scenarios', () => {
  it('classifies backpressure scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'backpressure flow control pressure signal producer throttle path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated backpressure flow control pressure signal producer throttle path',
      data: {
        scenario: 'backpressure flow control pressure signal producer throttle path',
        scenarioKind: 'backpressure',
        result: 'ok',
      },
    });
  });
});
