import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy runtime-detection scenarios', () => {
  it('classifies runtime-detection scenario and emits runtime-detection dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'runtime detection anomaly detection behavior monitoring intrusion detection path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('runtime-detection');
    expect(result.policyTags).toContain('scenario:runtime-detection');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('runtime-detection-dependency-pressure');
  });
});
