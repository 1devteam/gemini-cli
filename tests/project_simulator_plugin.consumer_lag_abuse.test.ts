import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin consumer-lag-abuse scenarios', () => {
  it('classifies consumer-lag-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'consumer lag abuse stalled consumer offset lag backlog growth slow subscriber path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('consumer-lag-abuse');
  });
});
