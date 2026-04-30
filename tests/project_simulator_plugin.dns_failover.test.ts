import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin dns-failover scenarios', () => {
  it('classifies dns-failover scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'dns failover dns record switch ttl propagation resolver path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated dns failover dns record switch ttl propagation resolver path',
      data: { scenario: 'dns failover dns record switch ttl propagation resolver path', scenarioKind: 'dns-failover', result: 'ok' },
    });
  });
});
