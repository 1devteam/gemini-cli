import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin serverless-permission-sprawl scenarios', () => {
  it('classifies serverless-permission-sprawl scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'serverless permission sprawl lambda role wildcard function policy overbroad invoke access path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('serverless-permission-sprawl');
  });
});
