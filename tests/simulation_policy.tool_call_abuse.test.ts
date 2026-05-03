import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy tool-call-abuse scenarios', () => {
  it('classifies tool-call-abuse scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'tool call abuse unauthorized tool invocation excessive tool call unsafe function execution path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('tool-call-abuse');
    expect(result.policyTags).toContain('scenario:tool-call-abuse');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('tool-call-abuse-dependency-pressure');
  });
});
