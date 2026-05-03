import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy repo-secret-sprawl scenarios', () => {
  it('classifies repo-secret-sprawl scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'repo secret sprawl committed secret private key checked in credential spread path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('repo-secret-sprawl');
    expect(result.policyTags).toContain('scenario:repo-secret-sprawl');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('repo-secret-sprawl-dependency-pressure');
  });
});
