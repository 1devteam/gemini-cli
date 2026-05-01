import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin session-revocation scenarios', () => {
  it('classifies session-revocation scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'session revocation revoked session logout token invalidation path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated session revocation revoked session logout token invalidation path',
      data: { scenario: 'session revocation revoked session logout token invalidation path', scenarioKind: 'session-revocation', result: 'ok' },
    });
  });
});
