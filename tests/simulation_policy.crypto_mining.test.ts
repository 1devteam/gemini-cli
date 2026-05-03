import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy crypto-mining scenarios', () => {
  it('classifies crypto-mining scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'crypto mining unauthorized miner cpu abuse wallet pool hash workload path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('crypto-mining');
    expect(result.policyTags).toContain('scenario:crypto-mining');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('crypto-mining-dependency-pressure');
  });
});
