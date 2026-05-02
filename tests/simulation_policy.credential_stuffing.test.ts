import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy credential-stuffing scenarios', () => {
  it('classifies credential-stuffing scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'credential stuffing reused password login spray breached credential automated login path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('credential-stuffing');
    expect(result.policyTags).toContain('scenario:credential-stuffing');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('credential-stuffing-dependency-pressure');
  });
});
