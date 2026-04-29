import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy rollback scenarios', () => {
  it('classifies rollback scenario and emits rollback dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'rollback roll back and revert release path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('rollback');
    expect(result.policyTags).toContain('scenario:rollback');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk rollback scenario with medium confidence');
    expect(result.signals).toContain('rollback-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Rollback behavior is inferred from scenario wording and dependency surface, not measured revert or recovery telemetry.');
    expect(result.recommendations).toContain('Capture rollback readiness and recovery dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture rollback baseline and recovery health metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture rollback baseline and recovery health metrics before execution.',
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
