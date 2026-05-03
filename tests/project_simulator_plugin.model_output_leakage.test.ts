import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin model-output-leakage scenarios', () => {
  it('classifies model-output-leakage scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'model output leakage sensitive output disclosure hidden context leak private training data path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('model-output-leakage');
  });
});
