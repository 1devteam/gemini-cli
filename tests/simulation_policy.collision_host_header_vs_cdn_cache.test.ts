import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: host-header-injection vs cdn-cache-poisoning', () => {
  it('keeps host-header-injection classified before cache poisoning wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'host header injection poisoned host header password reset url cache poisoning path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('host-header-injection');
  });

  it('keeps cdn-cache-poisoning classified for edge cache wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cdn cache poisoning cache key confusion poisoned edge response header variation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cdn-cache-poisoning');
  });
});
