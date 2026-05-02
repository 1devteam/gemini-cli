import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy webhook-signature-bypass scenarios', () => {
  it('classifies webhook-signature-bypass scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'webhook signature bypass missing hmac verification replayed webhook unsigned payload path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('webhook-signature-bypass');
    expect(result.policyTags).toContain('scenario:webhook-signature-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('webhook-signature-bypass-dependency-pressure');
  });
});
