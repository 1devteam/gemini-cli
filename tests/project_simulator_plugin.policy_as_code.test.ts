import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin policy-as-code scenarios', () => {
  it('classifies policy-as-code scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'policy as code opa rule evaluation policy bundle guardrail path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated policy as code opa rule evaluation policy bundle guardrail path',
      data: { scenario: 'policy as code opa rule evaluation policy bundle guardrail path', scenarioKind: 'policy-as-code', result: 'ok' },
    });
  });
});
