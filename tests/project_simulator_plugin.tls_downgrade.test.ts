import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin tls-downgrade scenarios', () => {
  it('classifies tls-downgrade scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'tls downgrade weak cipher protocol fallback old tls version negotiation path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('tls-downgrade');
  });
});
