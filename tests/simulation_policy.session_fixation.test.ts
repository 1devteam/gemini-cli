import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy session-fixation scenarios', () => {
  it('classifies session-fixation scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'session fixation preset session id cookie reuse login binding path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('session-fixation');
    expect(result.policyTags).toContain('scenario:session-fixation');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('session-fixation-dependency-pressure');
  });
});
