import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin privileged-action-replay scenarios', () => {
  it('classifies privileged-action-replay scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'privileged action replay repeated admin action nonce missing replayed privileged request path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('privileged-action-replay');
  });
});
