import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy pipeline-secret-leak scenarios', () => {
  it('classifies pipeline-secret-leak scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'pipeline secret leak ci secret exposed masked variable printed build log path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('pipeline-secret-leak');
    expect(result.policyTags).toContain('scenario:pipeline-secret-leak');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('pipeline-secret-leak-dependency-pressure');
  });
});
