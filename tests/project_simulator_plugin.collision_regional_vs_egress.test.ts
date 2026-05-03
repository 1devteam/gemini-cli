import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: regional-failover vs egress-cost-spike', () => {
  it('keeps regional-failover classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'regional failover cross region traffic shift secondary region path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('regional-failover');
  });

  it('keeps egress-cost-spike classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'egress cost spike cross region transfer unexpected bandwidth bill shock path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('egress-cost-spike');
  });
});
