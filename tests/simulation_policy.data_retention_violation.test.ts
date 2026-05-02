import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy data-retention-violation scenarios', () => {
  it('classifies data-retention-violation scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'data retention violation expired records deletion failure retention policy breach archive overrun path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('data-retention-violation');
    expect(result.policyTags).toContain('scenario:data-retention-violation');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('data-retention-violation-dependency-pressure');
  });
});
