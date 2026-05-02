import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy cdn-cache-poisoning scenarios', () => {
  it('classifies cdn-cache-poisoning scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cdn cache poisoning cache key confusion poisoned edge response header variation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cdn-cache-poisoning');
    expect(result.policyTags).toContain('scenario:cdn-cache-poisoning');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('cdn-cache-poisoning-dependency-pressure');
  });
});
