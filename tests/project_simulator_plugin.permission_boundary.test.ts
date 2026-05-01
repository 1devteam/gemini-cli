import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin permission-boundary scenarios', () => {
  it('classifies permission-boundary scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'permission boundary least privilege scoped permission access boundary path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated permission boundary least privilege scoped permission access boundary path',
      data: { scenario: 'permission boundary least privilege scoped permission access boundary path', scenarioKind: 'permission-boundary', result: 'ok' },
    });
  });
});
