import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin tool-call-abuse scenarios', () => {
  it('classifies tool-call-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'tool call abuse unauthorized tool invocation excessive tool call unsafe function execution path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('tool-call-abuse');
  });
});
