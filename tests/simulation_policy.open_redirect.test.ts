import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy open-redirect scenarios', () => {
  it('classifies open-redirect scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'open redirect unvalidated redirect url external redirect phishing redirect parameter path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('open-redirect');
    expect(result.policyTags).toContain('scenario:open-redirect');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('open-redirect-dependency-pressure');
  });
});
