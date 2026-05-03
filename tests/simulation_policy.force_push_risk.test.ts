import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy force-push-risk scenarios', () => {
  it('classifies force-push-risk scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'force push risk rewritten history non fast forward branch overwrite commit loss path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('force-push-risk');
    expect(result.policyTags).toContain('scenario:force-push-risk');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('force-push-risk-dependency-pressure');
  });
});
