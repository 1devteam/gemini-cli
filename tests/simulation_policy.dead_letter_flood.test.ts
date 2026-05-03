import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dead-letter-flood scenarios', () => {
  it('classifies dead-letter-flood scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dead letter flood dlq flood failed event surge poison backlog dead letter queue pressure path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dead-letter-flood');
    expect(result.policyTags).toContain('scenario:dead-letter-flood');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('dead-letter-flood-dependency-pressure');
  });
});
