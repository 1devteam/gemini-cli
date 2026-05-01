import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy admission-control scenarios', () => {
  it('classifies admission-control scenario and emits admission-control dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'admission control kubernetes admission webhook policy enforcement deny request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('admission-control');
    expect(result.policyTags).toContain('scenario:admission-control');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('admission-control-dependency-pressure');
  });
});
