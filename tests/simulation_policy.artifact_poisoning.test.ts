import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy artifact-poisoning scenarios', () => {
  it('classifies artifact-poisoning scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'artifact poisoning malicious build artifact tampered package poisoned cache release asset path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('artifact-poisoning');
    expect(result.policyTags).toContain('scenario:artifact-poisoning');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('artifact-poisoning-dependency-pressure');
  });
});
