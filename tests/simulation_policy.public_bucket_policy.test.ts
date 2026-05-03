import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy public-bucket-policy scenarios', () => {
  it('classifies public-bucket-policy scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'public bucket policy object storage public read bucket acl wildcard principal exposure path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('public-bucket-policy');
    expect(result.policyTags).toContain('scenario:public-bucket-policy');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('public-bucket-policy-dependency-pressure');
  });
});
