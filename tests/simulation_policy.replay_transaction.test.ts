import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy replay-transaction scenarios', () => {
  it('classifies replay-transaction scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'replay transaction duplicate request nonce reuse idempotency failure repeated transaction path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('replay-transaction');
    expect(result.policyTags).toContain('scenario:replay-transaction');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('replay-transaction-dependency-pressure');
  });
});
