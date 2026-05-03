import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin object-ownership-bypass scenarios', () => {
  it('classifies object-ownership-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'object ownership bypass owner check missing resource owner mismatch object access path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('object-ownership-bypass');
  });
});
