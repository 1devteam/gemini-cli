import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dns-misconfiguration scenarios', () => {
  it('classifies dns-misconfiguration scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dns misconfiguration stale record wrong cname zone drift resolver path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dns-misconfiguration');
    expect(result.policyTags).toContain('scenario:dns-misconfiguration');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('dns-misconfiguration-dependency-pressure');
  });
});
