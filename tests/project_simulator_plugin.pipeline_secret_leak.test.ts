import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin pipeline-secret-leak scenarios', () => {
  it('classifies pipeline-secret-leak scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'pipeline secret leak ci secret exposed masked variable printed build log path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('pipeline-secret-leak');
  });
});
