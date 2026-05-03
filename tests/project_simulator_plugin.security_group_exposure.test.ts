import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin security-group-exposure scenarios', () => {
  it('classifies security-group-exposure scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'security group exposure open ingress 0.0.0.0 public port firewall rule exposure path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('security-group-exposure');
  });
});
