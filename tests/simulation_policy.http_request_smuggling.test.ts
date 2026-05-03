import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy http-request-smuggling scenarios', () => {
  it('classifies http-request-smuggling scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'http request smuggling content length transfer encoding desync proxy parser ambiguity path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('http-request-smuggling');
    expect(result.policyTags).toContain('scenario:http-request-smuggling');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('http-request-smuggling-dependency-pressure');
  });
});
