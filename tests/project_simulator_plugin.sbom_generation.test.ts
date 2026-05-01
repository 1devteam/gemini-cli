import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin sbom-generation scenarios', () => {
  it('classifies sbom-generation scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'sbom generation software bill materials component inventory package manifest path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated sbom generation software bill materials component inventory package manifest path',
      data: { scenario: 'sbom generation software bill materials component inventory package manifest path', scenarioKind: 'sbom-generation', result: 'ok' },
    });
  });
});
