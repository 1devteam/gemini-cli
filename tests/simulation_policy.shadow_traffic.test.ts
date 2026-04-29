import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy shadow-traffic scenarios', () => {
  it('classifies shadow-traffic scenario and emits shadow-traffic dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'shadow traffic traffic mirror mirrored traffic request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('shadow-traffic');
    expect(result.policyTags).toContain('scenario:shadow-traffic');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk shadow-traffic scenario with medium confidence');
    expect(result.signals).toContain('shadow-traffic-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Shadow-traffic behavior is inferred from scenario wording and dependency surface, not measured mirrored request or production-traffic replay telemetry.');
    expect(result.recommendations).toContain('Capture mirrored request and traffic replay dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture shadow-traffic baseline and mirrored request metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture shadow-traffic baseline and mirrored request metrics before execution.',
      status: 'recommended',
    });
  });
});
