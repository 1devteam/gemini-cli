import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin event-ordering-drift scenarios', () => {
  it('classifies event-ordering-drift scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'event ordering drift out of order event sequence gap partition reorder consumer path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('event-ordering-drift');
  });
});
