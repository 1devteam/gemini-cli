import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy pii-leakage scenarios', () => {
  it('classifies pii-leakage scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'pii leakage personal data exposure sensitive field disclosure customer identifier path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('pii-leakage');
    expect(result.policyTags).toContain('scenario:pii-leakage');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('pii-leakage-dependency-pressure');
  });
});
