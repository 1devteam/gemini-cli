import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy admin-route-exposure scenarios', () => {
  it('classifies admin-route-exposure scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'admin route exposure exposed admin endpoint missing admin guard privileged route public path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('admin-route-exposure');
    expect(result.policyTags).toContain('scenario:admin-route-exposure');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('admin-route-exposure-dependency-pressure');
  });
});
