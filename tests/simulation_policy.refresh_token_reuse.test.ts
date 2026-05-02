import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy refresh-token-reuse scenarios', () => {
  it('classifies refresh-token-reuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'refresh token reuse stolen refresh token replay rotation failure session renewal path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('refresh-token-reuse');
    expect(result.policyTags).toContain('scenario:refresh-token-reuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('refresh-token-reuse-dependency-pressure');
  });
});
