import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin ssrf-defense scenarios', () => {
  it('classifies ssrf-defense scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'ssrf defense server side request forgery metadata block egress allowlist path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated ssrf defense server side request forgery metadata block egress allowlist path',
      data: { scenario: 'ssrf defense server side request forgery metadata block egress allowlist path', scenarioKind: 'ssrf-defense', result: 'ok' },
    });
  });
});
