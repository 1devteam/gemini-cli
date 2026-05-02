import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy service-mesh-policy scenarios', () => {
  it('classifies service-mesh-policy scenario', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'service mesh policy sidecar mTLS traffic policy enforcement path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('service-mesh-policy');
    expect(result.policyTags).toContain('scenario:service-mesh-policy');
    expect(result.signals).toContain('service-mesh-policy-dependency-pressure');
  });
});
