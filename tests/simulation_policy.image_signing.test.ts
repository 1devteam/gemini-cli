import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy image-signing scenarios', () => {
  it('classifies image-signing scenario and emits image-signing dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'image signing signed image signature verification registry trust path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('image-signing');
    expect(result.policyTags).toContain('scenario:image-signing');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('image-signing-dependency-pressure');
  });
});
