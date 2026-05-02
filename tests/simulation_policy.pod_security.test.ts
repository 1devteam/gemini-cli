import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy pod-security scenarios', () => {
  it('classifies pod-security scenario and emits pod-security dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'pod security restricted pod security standard run as non root path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('pod-security');
    expect(result.policyTags).toContain('scenario:pod-security');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('pod-security-dependency-pressure');
  });
});
