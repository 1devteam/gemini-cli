import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy file-permission-drift scenarios', () => {
  it('classifies file-permission-drift scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'file permission drift world writable chmod change ownership mismatch sensitive file mode path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('file-permission-drift');
    expect(result.policyTags).toContain('scenario:file-permission-drift');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('file-permission-drift-dependency-pressure');
  });
});
