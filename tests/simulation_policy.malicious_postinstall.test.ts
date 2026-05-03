import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy malicious-postinstall scenarios', () => {
  it('classifies malicious-postinstall scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'malicious postinstall install script package lifecycle hook credential exfiltration path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('malicious-postinstall');
    expect(result.policyTags).toContain('scenario:malicious-postinstall');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('malicious-postinstall-dependency-pressure');
  });
});
