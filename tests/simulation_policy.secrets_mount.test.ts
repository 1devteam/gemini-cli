import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy secrets-mount scenarios', () => {
  it('classifies secrets-mount scenario and emits secrets-mount dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'secrets mount secret volume projected secret file permission path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('secrets-mount');
    expect(result.policyTags).toContain('scenario:secrets-mount');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('secrets-mount-dependency-pressure');
  });
});
