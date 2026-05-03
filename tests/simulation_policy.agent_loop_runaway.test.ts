import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy agent-loop-runaway scenarios', () => {
  it('classifies agent-loop-runaway scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'agent loop runaway infinite agent loop recursive planning repeated self call automation runaway path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('agent-loop-runaway');
    expect(result.policyTags).toContain('scenario:agent-loop-runaway');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('agent-loop-runaway-dependency-pressure');
  });
});
