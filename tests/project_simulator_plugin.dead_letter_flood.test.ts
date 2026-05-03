import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin dead-letter-flood scenarios', () => {
  it('classifies dead-letter-flood scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'dead letter flood dlq flood failed event surge poison backlog dead letter queue pressure path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('dead-letter-flood');
  });
});
