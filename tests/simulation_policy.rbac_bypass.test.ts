import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy rbac-bypass scenarios', () => {
  it('classifies rbac-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'rbac bypass role check skipped unauthorized role access permission gate bypass path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('rbac-bypass');
    expect(result.policyTags).toContain('scenario:rbac-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('rbac-bypass-dependency-pressure');
  });
});
