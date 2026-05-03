import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin agent-loop-runaway scenarios', () => {
  it('classifies agent-loop-runaway scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'agent loop runaway infinite agent loop recursive planning repeated self call automation runaway path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('agent-loop-runaway');
  });
});
