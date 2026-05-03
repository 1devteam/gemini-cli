import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: package-publish-takeover vs auth', () => {
  it('keeps package-publish-takeover classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'package publish takeover maintainer account takeover unauthorized release compromised package owner path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('package-publish-takeover');
  });

  it('keeps generic auth classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'auth token permission login authentication path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('auth');
  });
});
