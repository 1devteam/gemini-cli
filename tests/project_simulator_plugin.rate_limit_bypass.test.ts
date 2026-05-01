import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin rate-limit-bypass scenarios', () => {
  it('classifies rate-limit-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'rate limit bypass quota bypass throttle evasion limit abuse path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated rate limit bypass quota bypass throttle evasion limit abuse path',
      data: { scenario: 'rate limit bypass quota bypass throttle evasion limit abuse path', scenarioKind: 'rate-limit-bypass', result: 'ok' },
    });
  });
});
