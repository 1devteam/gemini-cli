import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy backup-exposure scenarios', () => {
  it('classifies backup-exposure scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'backup exposure public snapshot unsecured backup dump open archive restore leak path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('backup-exposure');
    expect(result.policyTags).toContain('scenario:backup-exposure');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('backup-exposure-dependency-pressure');
  });
});
