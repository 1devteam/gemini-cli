import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin public-bucket-policy scenarios', () => {
  it('classifies public-bucket-policy scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'public bucket policy object storage public read bucket acl wildcard principal exposure path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('public-bucket-policy');
  });
});
