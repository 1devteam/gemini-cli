import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: regional-failover vs egress-cost-spike', () => {
  it('keeps regional-failover classified before cross-region egress wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'regional failover cross region traffic shift secondary region path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('regional-failover');
  });

  it('keeps egress-cost-spike classified for cost-specific egress wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'egress cost spike cross region transfer unexpected bandwidth bill shock path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('egress-cost-spike');
  });
});
