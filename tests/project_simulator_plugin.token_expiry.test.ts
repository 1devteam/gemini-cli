import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin token-expiry scenarios', () => {
  it('classifies token-expiry scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'token expiry expired token refresh token session renewal path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated token expiry expired token refresh token session renewal path',
      data: { scenario: 'token expiry expired token refresh token session renewal path', scenarioKind: 'token-expiry', result: 'ok' },
    });
  });
});
