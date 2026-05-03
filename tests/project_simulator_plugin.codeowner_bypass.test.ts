import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin codeowner-bypass scenarios', () => {
  it('classifies codeowner-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'codeowner bypass missing owner review code owners ignored protected path change' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('codeowner-bypass');
  });
});
