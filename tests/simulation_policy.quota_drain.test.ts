import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy quota-drain scenarios', () => {
  it('classifies quota-drain scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'quota drain api quota exhaustion service limit depletion request budget burn path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('quota-drain');
    expect(result.policyTags).toContain('scenario:quota-drain');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('quota-drain-dependency-pressure');
  });
});
