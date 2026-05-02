import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin mfa-bypass scenarios', () => {
  it('classifies mfa-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'mfa bypass push fatigue one time code interception second factor downgrade path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('mfa-bypass');
  });
});
