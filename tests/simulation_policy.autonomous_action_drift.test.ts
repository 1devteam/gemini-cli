import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy autonomous-action-drift scenarios', () => {
  it('classifies autonomous-action-drift scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'autonomous action drift agent action deviates from plan unsupervised execution goal drift path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('autonomous-action-drift');
    expect(result.policyTags).toContain('scenario:autonomous-action-drift');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('autonomous-action-drift-dependency-pressure');
  });
});
