import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin resource-exhaustion scenarios', () => {
  it('classifies resource-exhaustion scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'resource exhaustion memory burn cpu saturation disk fill runaway workload path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('resource-exhaustion');
  });
});
