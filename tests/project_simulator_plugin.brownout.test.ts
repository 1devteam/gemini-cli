import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin brownout scenarios', () => {
  it('classifies brownout scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'brownout graceful degradation feature shedding reduced capability path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated brownout graceful degradation feature shedding reduced capability path',
      data: {
        scenario: 'brownout graceful degradation feature shedding reduced capability path',
        scenarioKind: 'brownout',
        result: 'ok',
      },
    });
  });
});
