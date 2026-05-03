import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy shell-command-injection scenarios', () => {
  it('classifies shell-command-injection scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'shell command injection unsanitized exec user command subprocess spawn argument escape path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('shell-command-injection');
    expect(result.policyTags).toContain('scenario:shell-command-injection');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('shell-command-injection-dependency-pressure');
  });
});
