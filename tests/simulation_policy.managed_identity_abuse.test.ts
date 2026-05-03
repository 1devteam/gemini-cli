import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy managed-identity-abuse scenarios', () => {
  it('classifies managed-identity-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'managed identity abuse instance identity token metadata credential role assumption path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('managed-identity-abuse');
    expect(result.policyTags).toContain('scenario:managed-identity-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('managed-identity-abuse-dependency-pressure');
  });
});
