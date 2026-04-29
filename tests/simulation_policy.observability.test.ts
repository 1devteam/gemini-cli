import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy observability scenarios', () => {
  it('classifies observability scenario and emits observability dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'observability logging metrics and tracing path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('observability');
    expect(result.policyTags).toContain('scenario:observability');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk observability scenario with medium confidence');
    expect(result.signals).toContain('observability-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Observability behavior is inferred from scenario wording and dependency surface, not measured log, metric, or trace telemetry.');
    expect(result.recommendations).toContain('Capture logging, metrics, and tracing coverage before runtime simulation.');
    expect(result.nextActions).toContain('Capture observability baseline and telemetry coverage metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture observability baseline and telemetry coverage metrics before execution.',
      status: 'recommended',
    });
    expect(result.riskTrace).toEqual({
      riskLevel: result.riskLevel,
      scenarioKind: result.scenarioKind,
      signals: result.signals,
      evidenceBasis: result.evidenceBasis,
    });
    expect(result.guidanceTrace).toEqual({
      assumptions: result.assumptions,
      recommendations: result.recommendations,
      nextActions: result.nextActions,
    });
  });
});
