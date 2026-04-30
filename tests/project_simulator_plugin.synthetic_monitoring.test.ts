import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin synthetic-monitoring scenarios', () => {
  it('classifies synthetic-monitoring scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'synthetic monitoring synthetic check probe canary monitor path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated synthetic monitoring synthetic check probe canary monitor path',
      data: { scenario: 'synthetic monitoring synthetic check probe canary monitor path', scenarioKind: 'synthetic-monitoring', result: 'ok' },
    });
  });
});
