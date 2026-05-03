import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy object-ownership-bypass scenarios', () => {
  it('classifies object-ownership-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'object ownership bypass owner check missing resource owner mismatch object access path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('object-ownership-bypass');
    expect(result.policyTags).toContain('scenario:object-ownership-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('object-ownership-bypass-dependency-pressure');
  });
});
