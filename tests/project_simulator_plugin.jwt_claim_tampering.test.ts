import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin jwt-claim-tampering scenarios', () => {
  it('classifies jwt-claim-tampering scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'jwt claim tampering unsigned token altered audience modified issuer privilege claim path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('jwt-claim-tampering');
  });
});
