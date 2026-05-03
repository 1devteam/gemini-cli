import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy host-header-injection scenarios', () => {
  it('classifies host-header-injection scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'host header injection poisoned host header password reset url cache poisoning path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('host-header-injection');
    expect(result.policyTags).toContain('scenario:host-header-injection');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('host-header-injection-dependency-pressure');
  });
});
