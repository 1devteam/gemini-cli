import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy api-gateway-security scenarios', () => {
  it('classifies api-gateway-security scenario', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'api gateway security auth layer request validation rate control path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('api-gateway-security');
    expect(result.policyTags).toContain('scenario:api-gateway-security');
    expect(result.signals).toContain('api-gateway-security-dependency-pressure');
  });
});
