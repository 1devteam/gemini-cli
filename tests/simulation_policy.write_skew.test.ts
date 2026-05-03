import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy write-skew scenarios', () => {
  it('classifies write-skew scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'write skew snapshot isolation invariant violation concurrent transaction constraint bypass path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('write-skew');
    expect(result.policyTags).toContain('scenario:write-skew');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('write-skew-dependency-pressure');
  });
});
