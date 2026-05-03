import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy runner-compromise scenarios', () => {
  it('classifies runner-compromise scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'runner compromise self hosted runner escape build agent takeover workspace persistence path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('runner-compromise');
    expect(result.policyTags).toContain('scenario:runner-compromise');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('runner-compromise-dependency-pressure');
  });
});
