import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy message-replay scenarios', () => {
  it('classifies message-replay scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'message replay duplicate message replayed event old offset redelivered payload path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('message-replay');
    expect(result.policyTags).toContain('scenario:message-replay');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('message-replay-dependency-pressure');
  });
});
