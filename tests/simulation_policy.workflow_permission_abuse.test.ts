import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy workflow-permission-abuse scenarios', () => {
  it('classifies workflow-permission-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'workflow permission abuse overbroad github token write permission privileged workflow path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('workflow-permission-abuse');
    expect(result.policyTags).toContain('scenario:workflow-permission-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('workflow-permission-abuse-dependency-pressure');
  });
});
