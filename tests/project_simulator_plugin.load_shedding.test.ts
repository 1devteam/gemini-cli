import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin load-shedding scenarios', () => {
  it('classifies load-shedding scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'load shedding reject excess traffic overload protection admission control path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated load shedding reject excess traffic overload protection admission control path',
      data: { scenario: 'load shedding reject excess traffic overload protection admission control path', scenarioKind: 'load-shedding', result: 'ok' },
    });
  });
});
