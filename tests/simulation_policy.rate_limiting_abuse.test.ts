import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy rate-limiting-abuse scenarios', () => {
  it('classifies rate-limiting-abuse scenario', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'rate limiting abuse bypass throttling excessive requests evasion path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('rate-limiting-abuse');
    expect(result.policyTags).toContain('scenario:rate-limiting-abuse');
    expect(result.signals).toContain('rate-limiting-abuse-dependency-pressure');
  });
});
