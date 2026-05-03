import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy branch-protection-bypass scenarios', () => {
  it('classifies branch-protection-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'branch protection bypass required review skipped protected branch direct merge path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('branch-protection-bypass');
    expect(result.policyTags).toContain('scenario:branch-protection-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('branch-protection-bypass-dependency-pressure');
  });
});
