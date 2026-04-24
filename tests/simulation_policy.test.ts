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
    expect(result.recommendations).toContain('No immediate constraint recommendations detected.');
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
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
  });

  it('adds dependency surface recommendation', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'basic',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 101,
    });

    expect(result.signals).toContain('high-dependency-surface');
    expect(result.recommendations).toContain('Review dependency surface before scaling or deployment simulations.');
  });
});
