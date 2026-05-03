import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: backup-exposure vs snapshot-sharing-abuse', () => {
  it('keeps backup-exposure classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'backup exposure public snapshot unsecured backup open archive restore leak path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('backup-exposure');
  });

  it('keeps snapshot-sharing-abuse classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'snapshot sharing abuse shared volume image cross account snapshot leak path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('snapshot-sharing-abuse');
  });
});
