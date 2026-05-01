import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy policy-as-code scenarios', () => {
  it('classifies policy-as-code scenario and emits policy-as-code dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'policy as code opa rule evaluation policy bundle guardrail path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('policy-as-code');
    expect(result.policyTags).toContain('scenario:policy-as-code');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('policy-as-code-dependency-pressure');
  });
});
