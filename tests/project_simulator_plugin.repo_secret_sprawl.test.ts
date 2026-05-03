import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin repo-secret-sprawl scenarios', () => {
  it('classifies repo-secret-sprawl scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'repo secret sprawl committed secret private key checked in credential spread path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('repo-secret-sprawl');
  });
});
