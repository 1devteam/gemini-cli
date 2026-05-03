import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy idor scenarios', () => {
  it('classifies idor scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'idor insecure direct object reference object id manipulation unauthorized record access path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('idor');
    expect(result.policyTags).toContain('scenario:idor');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('idor-dependency-pressure');
  });
});
