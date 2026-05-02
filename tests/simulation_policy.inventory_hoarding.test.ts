import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy inventory-hoarding scenarios', () => {
  it('classifies inventory-hoarding scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'inventory hoarding cart stuffing stock reservation abuse checkout bot scarcity path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('inventory-hoarding');
    expect(result.policyTags).toContain('scenario:inventory-hoarding');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('inventory-hoarding-dependency-pressure');
  });
});
