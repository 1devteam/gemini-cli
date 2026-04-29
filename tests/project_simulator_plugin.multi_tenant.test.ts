import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin multi-tenant scenarios', () => {
  it('classifies multi-tenant scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'multi-tenant tenant isolation and shared resource path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated multi-tenant tenant isolation and shared resource path',
      data: {
        scenario: 'multi-tenant tenant isolation and shared resource path',
        scenarioKind: 'multi-tenant',
        result: 'ok',
      },
    });
  });
});
