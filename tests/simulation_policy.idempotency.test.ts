import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy idempotency scenarios', () => {
  it('classifies idempotency scenario and emits idempotency dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'idempotency idempotent request duplicate replay dedupe path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('idempotency');
    expect(result.policyTags).toContain('scenario:idempotency');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk idempotency scenario with medium confidence');
    expect(result.signals).toContain('idempotency-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Idempotency behavior is inferred from scenario wording and dependency surface, not measured duplicate request or replay telemetry.');
    expect(result.recommendations).toContain('Capture duplicate request, replay, and dedupe dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture idempotency baseline and duplicate request metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture idempotency baseline and duplicate request metrics before execution.',
      status: 'recommended',
    });
  });
});
