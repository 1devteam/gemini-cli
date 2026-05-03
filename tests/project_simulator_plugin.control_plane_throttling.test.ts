import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin control-plane-throttling scenarios', () => {
  it('classifies control-plane-throttling scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'control plane throttling api control plane throttle management api saturation request limit path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('control-plane-throttling');
  });
});
