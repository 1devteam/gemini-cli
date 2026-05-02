import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy jwt-claim-tampering scenarios', () => {
  it('classifies jwt-claim-tampering scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'jwt claim tampering unsigned token altered audience modified issuer privilege claim path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('jwt-claim-tampering');
    expect(result.policyTags).toContain('scenario:jwt-claim-tampering');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('jwt-claim-tampering-dependency-pressure');
  });
});
