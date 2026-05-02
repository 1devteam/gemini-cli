import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy cross-account-access scenarios', () => {
  it('classifies cross-account-access scenario', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cross account access external account role trust boundary assume role path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cross-account-access');
    expect(result.policyTags).toContain('scenario:cross-account-access');
    expect(result.signals).toContain('cross-account-access-dependency-pressure');
  });
});
