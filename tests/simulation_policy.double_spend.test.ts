import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy double-spend scenarios', () => {
  it('classifies double-spend scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'double spend duplicate debit repeated payment balance reuse transaction replay path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('double-spend');
    expect(result.policyTags).toContain('scenario:double-spend');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('double-spend-dependency-pressure');
  });
});
