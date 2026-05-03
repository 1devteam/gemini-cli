import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy lost-update scenarios', () => {
  it('classifies lost-update scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'lost update overwrite concurrent write stale version missing compare and swap path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('lost-update');
    expect(result.policyTags).toContain('scenario:lost-update');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('lost-update-dependency-pressure');
  });
});
