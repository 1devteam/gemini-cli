import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy privilege-escalation scenarios', () => {
  it('classifies privilege-escalation scenario and emits privilege-escalation dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'privilege escalation escalated privilege root capability setuid path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('privilege-escalation');
    expect(result.policyTags).toContain('scenario:privilege-escalation');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('privilege-escalation-dependency-pressure');
  });
});
