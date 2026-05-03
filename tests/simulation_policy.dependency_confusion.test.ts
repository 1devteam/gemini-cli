import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dependency-confusion scenarios', () => {
  it('classifies dependency-confusion scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dependency confusion private package shadowed by public registry namespace collision path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dependency-confusion');
    expect(result.policyTags).toContain('scenario:dependency-confusion');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('dependency-confusion-dependency-pressure');
  });
});
