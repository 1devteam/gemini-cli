import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin license-compliance scenarios', () => {
  it('classifies license-compliance scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'license compliance license audit prohibited license attribution policy path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated license compliance license audit prohibited license attribution policy path',
      data: { scenario: 'license compliance license audit prohibited license attribution policy path', scenarioKind: 'license-compliance', result: 'ok' },
    });
  });
});
