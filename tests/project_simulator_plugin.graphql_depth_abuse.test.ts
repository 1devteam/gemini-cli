import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin graphql-depth-abuse scenarios', () => {
  it('classifies graphql-depth-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'graphql depth abuse nested query recursion expensive resolver query complexity path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('graphql-depth-abuse');
  });
});
