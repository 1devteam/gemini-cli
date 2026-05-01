import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin cors-policy scenarios', () => {
  it('classifies cors-policy scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'cors policy cross origin allowed origin preflight request path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated cors policy cross origin allowed origin preflight request path',
      data: { scenario: 'cors policy cross origin allowed origin preflight request path', scenarioKind: 'cors-policy', result: 'ok' },
    });
  });
});
