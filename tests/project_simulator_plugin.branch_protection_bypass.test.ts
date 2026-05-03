import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin branch-protection-bypass scenarios', () => {
  it('classifies branch-protection-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'branch protection bypass required review skipped protected branch direct merge path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('branch-protection-bypass');
  });
});
