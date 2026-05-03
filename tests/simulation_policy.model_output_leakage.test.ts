import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy model-output-leakage scenarios', () => {
  it('classifies model-output-leakage scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'model output leakage sensitive output disclosure hidden context leak private training data path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('model-output-leakage');
    expect(result.policyTags).toContain('scenario:model-output-leakage');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('model-output-leakage-dependency-pressure');
  });
});
