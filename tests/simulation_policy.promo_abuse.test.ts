import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy promo-abuse scenarios', () => {
  it('classifies promo-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'promo abuse coupon stacking referral abuse discount exploit free trial farming path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('promo-abuse');
    expect(result.policyTags).toContain('scenario:promo-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('promo-abuse-dependency-pressure');
  });
});
