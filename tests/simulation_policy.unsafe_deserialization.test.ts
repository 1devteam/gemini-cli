import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy unsafe-deserialization scenarios', () => {
  it('classifies unsafe-deserialization scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'unsafe deserialization untrusted object deserialize gadget chain serialized payload path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('unsafe-deserialization');
    expect(result.policyTags).toContain('scenario:unsafe-deserialization');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('unsafe-deserialization-dependency-pressure');
  });
});
