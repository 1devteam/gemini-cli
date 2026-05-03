import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy security-group-exposure scenarios', () => {
  it('classifies security-group-exposure scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'security group exposure open ingress 0.0.0.0 public port firewall rule exposure path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('security-group-exposure');
    expect(result.policyTags).toContain('scenario:security-group-exposure');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('security-group-exposure-dependency-pressure');
  });
});
