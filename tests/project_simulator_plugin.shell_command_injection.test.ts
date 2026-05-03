import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin shell-command-injection scenarios', () => {
  it('classifies shell-command-injection scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'shell command injection unsanitized exec user command subprocess spawn argument escape path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('shell-command-injection');
  });
});
