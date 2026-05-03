import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy cloudtrail-disablement scenarios', () => {
  it('classifies cloudtrail-disablement scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cloudtrail disablement audit trail disabled logging stopped control plane visibility lost path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cloudtrail-disablement');
    expect(result.policyTags).toContain('scenario:cloudtrail-disablement');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('cloudtrail-disablement-dependency-pressure');
  });
});
