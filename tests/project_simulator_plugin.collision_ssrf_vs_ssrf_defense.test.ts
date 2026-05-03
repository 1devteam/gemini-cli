import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: ssrf vs ssrf-defense', () => {
  it('keeps direct ssrf classified separately through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'ssrf server side request forgery internal metadata request cloud metadata endpoint path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('ssrf');
  });

  it('keeps explicit ssrf-defense classified separately through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'ssrf defense metadata block egress allowlist url fetch guard path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('ssrf-defense');
  });
});
