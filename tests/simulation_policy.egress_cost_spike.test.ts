import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy egress-cost-spike scenarios', () => {
  it('classifies egress-cost-spike scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'egress cost spike outbound bandwidth data transfer surge cross region traffic path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('egress-cost-spike');
    expect(result.policyTags).toContain('scenario:egress-cost-spike');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('egress-cost-spike-dependency-pressure');
  });
});
