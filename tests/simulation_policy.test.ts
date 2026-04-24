import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy', () => {
  it('returns low risk for strong environment', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'basic',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 10,
    });

    expect(result.riskLevel).toBe('low');
    expect(result.signals.length).toBe(0);
  });

  it('detects high risk under constraints', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'load-test',
      cpuCount: 1,
      memoryMB: 2048,
      dependencyCount: 200,
    });

    expect(result.riskLevel).toBe('high');
    expect(result.signals.length).toBeGreaterThanOrEqual(2);
  });
});
