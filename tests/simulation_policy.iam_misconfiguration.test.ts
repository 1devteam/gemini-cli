import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy iam-misconfiguration scenarios', () => {
  it('classifies iam-misconfiguration scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'iam misconfiguration overly permissive role wildcard policy access grant path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('iam-misconfiguration');
    expect(result.policyTags).toContain('scenario:iam-misconfiguration');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('iam-misconfiguration-dependency-pressure');
  });
});
