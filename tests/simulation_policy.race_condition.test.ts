import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy race-condition scenarios', () => {
  it('classifies race-condition scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'race condition concurrent update timing window check then act shared state conflict path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('race-condition');
    expect(result.policyTags).toContain('scenario:race-condition');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('race-condition-dependency-pressure');
  });
});
