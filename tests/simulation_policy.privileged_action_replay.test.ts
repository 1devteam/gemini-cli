import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy privileged-action-replay scenarios', () => {
  it('classifies privileged-action-replay scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'privileged action replay repeated admin action nonce missing replayed privileged request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('privileged-action-replay');
    expect(result.policyTags).toContain('scenario:privileged-action-replay');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('privileged-action-replay-dependency-pressure');
  });
});
