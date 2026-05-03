import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin collision hardening: service-mesh-policy vs admission-control', () => {
  it('keeps service-mesh-policy classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'service mesh policy sidecar authorization mesh traffic policy admission path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('service-mesh-policy');
  });

  it('keeps admission-control classified through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'admission control validating webhook admission controller deny pod policy path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('admission-control');
  });
});
