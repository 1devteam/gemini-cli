import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy scope-escalation scenarios', () => {
  it('classifies scope-escalation scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'scope escalation oauth scope expansion privilege scope widened unauthorized scope grant path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('scope-escalation');
    expect(result.policyTags).toContain('scenario:scope-escalation');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('scope-escalation-dependency-pressure');
  });
});
