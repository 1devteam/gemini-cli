import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy account-enumeration scenarios', () => {
  it('classifies account-enumeration scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'account enumeration username probing login error oracle email discovery path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('account-enumeration');
    expect(result.policyTags).toContain('scenario:account-enumeration');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('account-enumeration-dependency-pressure');
  });
});
