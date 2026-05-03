import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy consumer-lag-abuse scenarios', () => {
  it('classifies consumer-lag-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'consumer lag abuse stalled consumer offset lag backlog growth slow subscriber path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('consumer-lag-abuse');
    expect(result.policyTags).toContain('scenario:consumer-lag-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('consumer-lag-abuse-dependency-pressure');
  });
});
