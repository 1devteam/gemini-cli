import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin traffic-replay scenarios', () => {
  it('classifies traffic-replay scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'traffic replay captured traffic replay session replay production request path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated traffic replay captured traffic replay session replay production request path',
      data: { scenario: 'traffic replay captured traffic replay session replay production request path', scenarioKind: 'traffic-replay', result: 'ok' },
    });
  });
});
