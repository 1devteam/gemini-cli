import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy control-plane-throttling scenarios', () => {
  it('classifies control-plane-throttling scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'control plane throttling api control plane throttle management api saturation request limit path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('control-plane-throttling');
    expect(result.policyTags).toContain('scenario:control-plane-throttling');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('control-plane-throttling-dependency-pressure');
  });
});
