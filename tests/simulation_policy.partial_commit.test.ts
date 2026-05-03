import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy partial-commit scenarios', () => {
  it('classifies partial-commit scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'partial commit half written transaction atomicity failure incomplete commit inconsistent state path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('partial-commit');
    expect(result.policyTags).toContain('scenario:partial-commit');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('partial-commit-dependency-pressure');
  });
});
