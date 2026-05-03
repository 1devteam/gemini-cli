import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy kms-key-misuse scenarios', () => {
  it('classifies kms-key-misuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'kms key misuse decrypt permission abuse key policy wildcard encryption key exposure path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('kms-key-misuse');
    expect(result.policyTags).toContain('scenario:kms-key-misuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('kms-key-misuse-dependency-pressure');
  });
});
