import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy sandbox-escape scenarios', () => {
  it('classifies sandbox-escape scenario and emits sandbox-escape dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'sandbox escape container breakout namespace escape isolation bypass path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('sandbox-escape');
    expect(result.policyTags).toContain('scenario:sandbox-escape');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('sandbox-escape-dependency-pressure');
  });
});
