import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy log-secret-exposure scenarios', () => {
  it('classifies log-secret-exposure scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'log secret exposure api key in logs credential dump token logged path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('log-secret-exposure');
    expect(result.policyTags).toContain('scenario:log-secret-exposure');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('log-secret-exposure-dependency-pressure');
  });
});
