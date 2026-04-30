import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin circuit-breaker scenarios', () => {
  it('classifies circuit-breaker scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'circuit breaker open circuit half open trip threshold path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated circuit breaker open circuit half open trip threshold path',
      data: {
        scenario: 'circuit breaker open circuit half open trip threshold path',
        scenarioKind: 'circuit-breaker',
        result: 'ok',
      },
    });
  });
});
