import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy retrieval-poisoning scenarios', () => {
  it('classifies retrieval-poisoning scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'retrieval poisoning poisoned document vector store contamination malicious context retrieval path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('retrieval-poisoning');
    expect(result.policyTags).toContain('scenario:retrieval-poisoning');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('retrieval-poisoning-dependency-pressure');
  });
});
