import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy network-policy scenarios', () => {
  it('classifies network-policy scenario and emits network-policy dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'network policy namespace isolation ingress egress deny traffic path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('network-policy');
    expect(result.policyTags).toContain('scenario:network-policy');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('network-policy-dependency-pressure');
  });
});
