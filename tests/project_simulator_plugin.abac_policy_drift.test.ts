import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin abac-policy-drift scenarios', () => {
  it('classifies abac-policy-drift scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'abac policy drift attribute based access stale attribute mismatched condition policy drift path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('abac-policy-drift');
  });
});
