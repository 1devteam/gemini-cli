import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy typosquatting-package scenarios', () => {
  it('classifies typosquatting-package scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'typosquatting package misspelled dependency lookalike package malicious registry name path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('typosquatting-package');
    expect(result.policyTags).toContain('scenario:typosquatting-package');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('typosquatting-package-dependency-pressure');
  });
});
