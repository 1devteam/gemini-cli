import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy stale-read scenarios', () => {
  it('classifies stale-read scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'stale read replica lag outdated read read after write inconsistency cache stale path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('stale-read');
    expect(result.policyTags).toContain('scenario:stale-read');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('stale-read-dependency-pressure');
  });
});
