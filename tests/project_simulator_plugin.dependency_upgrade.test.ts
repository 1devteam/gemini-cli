import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin dependency-upgrade scenarios', () => {
  it('classifies dependency-upgrade scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'dependency upgrade package bump version compatibility path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated dependency upgrade package bump version compatibility path',
      data: { scenario: 'dependency upgrade package bump version compatibility path', scenarioKind: 'dependency-upgrade', result: 'ok' },
    });
  });
});
