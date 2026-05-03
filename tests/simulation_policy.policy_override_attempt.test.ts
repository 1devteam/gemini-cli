import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy policy-override-attempt scenarios', () => {
  it('classifies policy-override-attempt scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'policy override attempt guardrail bypass safety policy override instruction hierarchy attack path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('policy-override-attempt');
    expect(result.policyTags).toContain('scenario:policy-override-attempt');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('policy-override-attempt-dependency-pressure');
  });
});
