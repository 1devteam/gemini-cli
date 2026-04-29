import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin feature-flag scenarios', () => {
  it('classifies feature-flag scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'feature flag rollout toggle experiment path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated feature flag rollout toggle experiment path',
      data: {
        scenario: 'feature flag rollout toggle experiment path',
        scenarioKind: 'feature-flag',
        result: 'ok',
      },
    });
  });
});
