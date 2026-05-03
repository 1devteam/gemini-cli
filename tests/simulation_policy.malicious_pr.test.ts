import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy malicious-pr scenarios', () => {
  it('classifies malicious-pr scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'malicious pr hostile contribution hidden payload dependency change review evasion path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('malicious-pr');
    expect(result.policyTags).toContain('scenario:malicious-pr');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('malicious-pr-dependency-pressure');
  });
});
