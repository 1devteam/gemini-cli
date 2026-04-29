import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy migration scenarios', () => {
  it('classifies migration scenario and emits migration dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'migration migrate and schema change path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('migration');
    expect(result.policyTags).toContain('scenario:migration');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk migration scenario with medium confidence');
    expect(result.signals).toContain('migration-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Migration behavior is inferred from scenario wording and dependency surface, not measured data movement or schema telemetry.');
    expect(result.recommendations).toContain('Capture migration readiness and schema dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture migration baseline and data integrity metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture migration baseline and data integrity metrics before execution.',
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
