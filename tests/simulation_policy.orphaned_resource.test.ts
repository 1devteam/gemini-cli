import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy orphaned-resource scenarios', () => {
  it('classifies orphaned-resource scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'orphaned resource unattached volume idle load balancer stale instance leaked allocation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('orphaned-resource');
    expect(result.policyTags).toContain('scenario:orphaned-resource');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('orphaned-resource-dependency-pressure');
  });
});
