import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin artifact-integrity scenarios', () => {
  it('classifies artifact-integrity scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'artifact integrity checksum verification signed artifact provenance path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated artifact integrity checksum verification signed artifact provenance path',
      data: { scenario: 'artifact integrity checksum verification signed artifact provenance path', scenarioKind: 'artifact-integrity', result: 'ok' },
    });
  });
});
