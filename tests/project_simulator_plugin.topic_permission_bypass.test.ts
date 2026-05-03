import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin topic-permission-bypass scenarios', () => {
  it('classifies topic-permission-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'topic permission bypass unauthorized publish topic acl skipped broker permission path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('topic-permission-bypass');
  });
});
