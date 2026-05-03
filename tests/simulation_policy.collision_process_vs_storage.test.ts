import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: process-injection vs storage', () => {
  it('keeps process-injection classified before generic storage write path wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'process injection ptrace attach dll injection remote thread memory write path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('process-injection');
  });

  it('keeps generic storage classified as storage', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'storage object store write path persistence layer',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('storage');
  });
});
