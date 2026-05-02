import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy oauth-misuse scenarios', () => {
  it('classifies oauth-misuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'oauth misuse redirect uri abuse weak scope consent flow token exchange path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('oauth-misuse');
    expect(result.policyTags).toContain('scenario:oauth-misuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('oauth-misuse-dependency-pressure');
  });
});
