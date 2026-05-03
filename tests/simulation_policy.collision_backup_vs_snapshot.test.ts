import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: backup-exposure vs snapshot-sharing-abuse', () => {
  it('keeps public snapshot backup wording classified as backup-exposure', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'backup exposure public snapshot unsecured backup open archive restore leak path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('backup-exposure');
  });

  it('keeps explicit snapshot sharing classified as snapshot-sharing-abuse', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'snapshot sharing abuse shared volume image cross account snapshot leak path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('snapshot-sharing-abuse');
  });
});
