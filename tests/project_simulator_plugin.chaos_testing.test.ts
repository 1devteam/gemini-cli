import { describe, expect, it } from 'vitest';
import { ProjectSimulatorPlugin } from '../project_simulator_plugin.js';

describe('ProjectSimulatorPlugin chaos-testing scenarios', () => {
  it('classifies chaos-testing scenario through simulator output', async () => {
    const simulate = new ProjectSimulatorPlugin();

    const result = await simulate.handler(
      { scenario: 'chaos testing fault injection failure injection blast radius path' },
      { cpuCount: 8, memoryMB: 16000, dependencyCount: 60 }
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated chaos testing fault injection failure injection blast radius path',
      data: {
        result: 'ok',
        scenario: 'chaos testing fault injection failure injection blast radius path',
        scenarioKind: 'chaos-testing',
      },
    });

    expect((result.data as any).policyTags).toContain('scenario:chaos-testing');
    expect((result.data as any).riskTrace.scenarioKind).toBe('chaos-testing');
  });
});
