import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy payment-fraud scenarios', () => {
  it('classifies payment-fraud scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'payment fraud stolen card chargeback abuse card testing transaction fraud path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('payment-fraud');
    expect(result.policyTags).toContain('scenario:payment-fraud');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('payment-fraud-dependency-pressure');
  });
});
