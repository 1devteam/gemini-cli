import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy resource-exhaustion scenarios', () => {
  it('classifies resource-exhaustion scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'resource exhaustion memory burn cpu saturation disk fill runaway workload path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('resource-exhaustion');
    expect(result.policyTags).toContain('scenario:resource-exhaustion');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('resource-exhaustion-dependency-pressure');
  });
});
