import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy tls-downgrade scenarios', () => {
  it('classifies tls-downgrade scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'tls downgrade weak cipher protocol fallback old tls version negotiation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('tls-downgrade');
    expect(result.policyTags).toContain('scenario:tls-downgrade');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('tls-downgrade-dependency-pressure');
  });
});
