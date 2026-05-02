import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy analytics-tracking-abuse scenarios', () => {
  it('classifies analytics-tracking-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'analytics tracking abuse consent bypass excessive tracking user fingerprint third party pixel path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('analytics-tracking-abuse');
    expect(result.policyTags).toContain('scenario:analytics-tracking-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('analytics-tracking-abuse-dependency-pressure');
  });
});
