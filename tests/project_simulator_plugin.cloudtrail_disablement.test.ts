import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin cloudtrail-disablement scenarios', () => {
  it('classifies cloudtrail-disablement scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'cloudtrail disablement audit trail disabled logging stopped control plane visibility lost path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('cloudtrail-disablement');
  });
});
