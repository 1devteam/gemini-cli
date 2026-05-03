import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy graphql-depth-abuse scenarios', () => {
  it('classifies graphql-depth-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'graphql depth abuse nested query recursion expensive resolver query complexity path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('graphql-depth-abuse');
    expect(result.policyTags).toContain('scenario:graphql-depth-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('graphql-depth-abuse-dependency-pressure');
  });
});
