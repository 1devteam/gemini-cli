import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin poison-pill scenarios', () => {
  it('classifies poison-pill scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'poison pill malformed message bad payload quarantine path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated poison pill malformed message bad payload quarantine path',
      data: {
        scenario: 'poison pill malformed message bad payload quarantine path',
        scenarioKind: 'poison-pill',
        result: 'ok',
      },
    });
  });
});
