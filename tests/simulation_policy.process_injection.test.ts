import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy process-injection scenarios', () => {
  it('classifies process-injection scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'process injection ptrace attach dll injection remote thread memory write path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('process-injection');
    expect(result.policyTags).toContain('scenario:process-injection');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('process-injection-dependency-pressure');
  });
});
