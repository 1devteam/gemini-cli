import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy unsafe-auto-approval scenarios', () => {
  it('classifies unsafe-auto-approval scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'unsafe auto approval automatic approval skipped human review autonomous approval dangerous action path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('unsafe-auto-approval');
    expect(result.policyTags).toContain('scenario:unsafe-auto-approval');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('unsafe-auto-approval-dependency-pressure');
  });
});
