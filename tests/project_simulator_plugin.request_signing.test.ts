import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin request-signing scenarios', () => {
  it('classifies request-signing scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'request signing hmac signature signed request replay protection path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated request signing hmac signature signed request replay protection path',
      data: { scenario: 'request signing hmac signature signed request replay protection path', scenarioKind: 'request-signing', result: 'ok' },
    });
  });
});
