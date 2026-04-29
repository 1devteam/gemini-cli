import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin deployment scenarios', () => {
  it('classifies deployment scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'deployment release and deploy pipeline path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated deployment release and deploy pipeline path',
      data: {
        scenario: 'deployment release and deploy pipeline path',
        scenarioKind: 'deployment',
        result: 'ok',
      },
    });
  });
});
