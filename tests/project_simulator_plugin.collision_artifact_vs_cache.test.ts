import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: artifact-poisoning vs cache', () => {
  it('keeps artifact-poisoning classified before generic cache wording through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'artifact poisoning poisoned artifact cache contamination build artifact tamper path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('artifact-poisoning');
  });

  it('keeps generic cache classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'cache cache hit cache miss cache invalidation path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('cache');
  });
});
