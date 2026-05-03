import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy poison-event scenarios', () => {
  it('classifies poison-event scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'poison event malformed event toxic payload handler crash stream quarantine path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('poison-event');
    expect(result.policyTags).toContain('scenario:poison-event');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('poison-event-dependency-pressure');
  });
});
