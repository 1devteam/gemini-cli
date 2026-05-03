import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy path-traversal scenarios', () => {
  it('classifies path-traversal scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'path traversal dot dot slash directory escape arbitrary file read file path bypass',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('path-traversal');
    expect(result.policyTags).toContain('scenario:path-traversal');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('path-traversal-dependency-pressure');
  });
});
