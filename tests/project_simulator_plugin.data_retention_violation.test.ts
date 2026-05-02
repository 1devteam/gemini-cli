import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin data-retention-violation scenarios', () => {
  it('classifies data-retention-violation scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'data retention violation expired records deletion failure retention policy breach archive overrun path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('data-retention-violation');
  });
});
