import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy codeowner-bypass scenarios', () => {
  it('classifies codeowner-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'codeowner bypass missing owner review code owners ignored protected path change',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('codeowner-bypass');
    expect(result.policyTags).toContain('scenario:codeowner-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('codeowner-bypass-dependency-pressure');
  });
});
