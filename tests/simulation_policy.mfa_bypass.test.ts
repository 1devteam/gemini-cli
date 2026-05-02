import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy mfa-bypass scenarios', () => {
  it('classifies mfa-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'mfa bypass push fatigue one time code interception second factor downgrade path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('mfa-bypass');
    expect(result.policyTags).toContain('scenario:mfa-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('mfa-bypass-dependency-pressure');
  });
});
