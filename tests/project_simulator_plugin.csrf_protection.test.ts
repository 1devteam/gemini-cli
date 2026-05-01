import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin csrf-protection scenarios', () => {
  it('classifies csrf-protection scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'csrf protection cross site request forgery csrf token same site cookie path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated csrf protection cross site request forgery csrf token same site cookie path',
      data: { scenario: 'csrf protection cross site request forgery csrf token same site cookie path', scenarioKind: 'csrf-protection', result: 'ok' },
    });
  });
});
