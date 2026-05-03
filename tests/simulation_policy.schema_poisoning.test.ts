import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy schema-poisoning scenarios', () => {
  it('classifies schema-poisoning scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'schema poisoning malicious schema evolution incompatible event schema registry pollution path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('schema-poisoning');
    expect(result.policyTags).toContain('scenario:schema-poisoning');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('schema-poisoning-dependency-pressure');
  });
});
