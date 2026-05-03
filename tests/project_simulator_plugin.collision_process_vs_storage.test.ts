import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: process-injection vs storage', () => {
  it('keeps process-injection classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'process injection ptrace attach dll injection remote thread memory write path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('process-injection');
  });

  it('keeps generic storage classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'storage object store write path persistence layer' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('storage');
  });
});
