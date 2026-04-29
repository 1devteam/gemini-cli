import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy deployment scenarios', () => {
  it('classifies deployment scenario and emits deployment dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'deployment release and deploy pipeline path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('deployment');
    expect(result.policyTags).toContain('scenario:deployment');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk deployment scenario with medium confidence');
    expect(result.signals).toContain('deployment-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Deployment behavior is inferred from scenario wording and dependency surface, not measured rollout or release telemetry.');
    expect(result.recommendations).toContain('Capture rollout health and release dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture deployment baseline and rollout health metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture deployment baseline and rollout health metrics before execution.',
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
