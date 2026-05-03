import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy ssrf scenarios', () => {
  it('classifies ssrf scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'ssrf server side request forgery internal metadata request cloud metadata endpoint path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('ssrf');
    expect(result.policyTags).toContain('scenario:ssrf');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('ssrf-dependency-pressure');
  });
});
