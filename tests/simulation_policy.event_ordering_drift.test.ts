import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy event-ordering-drift scenarios', () => {
  it('classifies event-ordering-drift scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'event ordering drift out of order event sequence gap partition reorder consumer path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('event-ordering-drift');
    expect(result.policyTags).toContain('scenario:event-ordering-drift');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('event-ordering-drift-dependency-pressure');
  });
});
