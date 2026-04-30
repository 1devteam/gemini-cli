import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin secret-rotation scenarios', () => {
  it('classifies secret-rotation scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'secret rotation credential rollover key rotation token refresh path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated secret rotation credential rollover key rotation token refresh path',
      data: { scenario: 'secret rotation credential rollover key rotation token refresh path', scenarioKind: 'secret-rotation', result: 'ok' },
    });
  });
});
