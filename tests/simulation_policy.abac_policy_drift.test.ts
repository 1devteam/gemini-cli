import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy abac-policy-drift scenarios', () => {
  it('classifies abac-policy-drift scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'abac policy drift attribute based access stale attribute mismatched condition policy drift path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('abac-policy-drift');
    expect(result.policyTags).toContain('scenario:abac-policy-drift');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('abac-policy-drift-dependency-pressure');
  });
});
