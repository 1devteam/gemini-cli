import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy event-duplication scenarios', () => {
  it('classifies event-duplication scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'event duplication duplicate event repeated emit producer retry duplicate delivery path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('event-duplication');
    expect(result.policyTags).toContain('scenario:event-duplication');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('event-duplication-dependency-pressure');
  });
});
