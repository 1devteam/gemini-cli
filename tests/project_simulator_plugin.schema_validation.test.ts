import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin schema-validation scenarios', () => {
  it('classifies schema-validation scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'schema validation json schema payload validation contract validation path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated schema validation json schema payload validation contract validation path',
      data: { scenario: 'schema validation json schema payload validation contract validation path', scenarioKind: 'schema-validation', result: 'ok' },
    });
  });
});
