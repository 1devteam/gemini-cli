import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin canary scenarios', () => {
  it('classifies canary scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'canary release progressive rollout traffic slice path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated canary release progressive rollout traffic slice path',
      data: {
        scenario: 'canary release progressive rollout traffic slice path',
        scenarioKind: 'canary',
        result: 'ok',
      },
    });
  });
});
