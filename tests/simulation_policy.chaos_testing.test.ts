import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy chaos-testing scenarios', () => {
  it('classifies chaos-testing scenario and emits chaos-testing dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'chaos testing fault injection failure injection blast radius path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('chaos-testing');
    expect(result.policyTags).toContain('scenario:chaos-testing');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk chaos-testing scenario with medium confidence');
    expect(result.signals).toContain('chaos-testing-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Chaos-testing behavior is inferred from scenario wording and dependency surface, not measured fault injection or blast-radius telemetry.');
    expect(result.recommendations).toContain('Capture fault injection and blast-radius dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture chaos-testing baseline and fault injection blast-radius metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture chaos-testing baseline and fault injection blast-radius metrics before execution.',
      status: 'recommended',
    });
  });
});
