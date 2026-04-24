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
    expect(result.scenarioKind).toBe('general');
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
    expect(result.scenarioKind).toBe('load');
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

  it('classifies scaling scenario and emits cpu pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'scaling-test',
      cpuCount: 2,
      memoryMB: 16000,
      dependencyCount: 10,
    });

    expect(result.scenarioKind).toBe('scaling');
    expect(result.signals).toContain('scaling-cpu-pressure');
  });

  it('classifies security scenario and emits dependency review signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'security-test',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 1,
    });

    expect(result.scenarioKind).toBe('security');
    expect(result.signals).toContain('security-dependency-review');
  });
});
