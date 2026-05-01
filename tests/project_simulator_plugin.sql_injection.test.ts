import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin sql-injection scenarios', () => {
  it('classifies sql-injection scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'sql injection parameterized query prepared statement injection prevention path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated sql injection parameterized query prepared statement injection prevention path',
      data: { scenario: 'sql injection parameterized query prepared statement injection prevention path', scenarioKind: 'sql-injection', result: 'ok' },
    });
  });
});
