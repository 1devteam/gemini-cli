import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy prompt-injection scenarios', () => {
  it('classifies prompt-injection scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'prompt injection malicious instruction override system prompt hidden directive tool misuse path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('prompt-injection');
    expect(result.policyTags).toContain('scenario:prompt-injection');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('prompt-injection-dependency-pressure');
  });
});
