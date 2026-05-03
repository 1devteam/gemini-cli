import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: artifact-poisoning vs cache', () => {
  it('keeps artifact-poisoning classified before generic cache wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'artifact poisoning poisoned artifact cache contamination build artifact tamper path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('artifact-poisoning');
  });

  it('keeps generic cache classified as cache', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cache cache hit cache miss cache invalidation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cache');
  });
});
