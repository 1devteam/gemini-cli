import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy registry-token-leak scenarios', () => {
  it('classifies registry-token-leak scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'registry token leak npm token exposed publish credential package registry access path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('registry-token-leak');
    expect(result.policyTags).toContain('scenario:registry-token-leak');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('registry-token-leak-dependency-pressure');
  });
});
