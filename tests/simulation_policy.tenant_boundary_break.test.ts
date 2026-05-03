import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy tenant-boundary-break scenarios', () => {
  it('classifies tenant-boundary-break scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'tenant boundary break cross tenant data access tenant isolation failure organization boundary path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('tenant-boundary-break');
    expect(result.policyTags).toContain('scenario:tenant-boundary-break');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('tenant-boundary-break-dependency-pressure');
  });
});
