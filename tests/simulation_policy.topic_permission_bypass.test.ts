import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy topic-permission-bypass scenarios', () => {
  it('classifies topic-permission-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'topic permission bypass unauthorized publish topic acl skipped broker permission path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('topic-permission-bypass');
    expect(result.policyTags).toContain('scenario:topic-permission-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('topic-permission-bypass-dependency-pressure');
  });
});
