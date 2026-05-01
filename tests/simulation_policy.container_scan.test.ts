import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy container-scan scenarios', () => {
  it('classifies container-scan scenario and emits container-scan dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'container scan image vulnerability layer scan registry assessment path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('container-scan');
    expect(result.policyTags).toContain('scenario:container-scan');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('container-scan-dependency-pressure');
  });
});
