import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy deployment-approval-bypass scenarios', () => {
  it('classifies deployment-approval-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'deployment approval bypass skipped reviewer environment protection override manual gate path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('deployment-approval-bypass');
    expect(result.policyTags).toContain('scenario:deployment-approval-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('deployment-approval-bypass-dependency-pressure');
  });
});
