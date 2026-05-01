import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy permission-boundary scenarios', () => {
  it('classifies permission-boundary scenario and emits permission-boundary dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'permission boundary least privilege scoped permission access boundary path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('permission-boundary');
    expect(result.policyTags).toContain('scenario:permission-boundary');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk permission-boundary scenario with medium confidence');
    expect(result.signals).toContain('permission-boundary-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Permission-boundary behavior is inferred from scenario wording and dependency surface, not measured least-privilege, scoped-permission, or access-boundary telemetry.');
    expect(result.recommendations).toContain('Capture least-privilege, scoped-permission, and access-boundary dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture permission-boundary baseline and scoped-permission metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture permission-boundary baseline and scoped-permission metrics before execution.', status: 'recommended' });
  });
});
