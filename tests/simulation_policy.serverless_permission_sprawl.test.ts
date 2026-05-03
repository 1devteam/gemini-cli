import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy serverless-permission-sprawl scenarios', () => {
  it('classifies serverless-permission-sprawl scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'serverless permission sprawl lambda role wildcard function policy overbroad invoke access path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('serverless-permission-sprawl');
    expect(result.policyTags).toContain('scenario:serverless-permission-sprawl');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('serverless-permission-sprawl-dependency-pressure');
  });
});
