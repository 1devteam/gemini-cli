import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy snapshot-sharing-abuse scenarios', () => {
  it('classifies snapshot-sharing-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'snapshot sharing abuse public snapshot shared volume image cross account snapshot leak path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('snapshot-sharing-abuse');
    expect(result.policyTags).toContain('scenario:snapshot-sharing-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('snapshot-sharing-abuse-dependency-pressure');
  });
});
