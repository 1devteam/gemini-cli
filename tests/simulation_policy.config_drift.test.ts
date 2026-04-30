import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy config-drift scenarios', () => {
  it('classifies config-drift scenario and emits config-drift dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'config drift configuration mismatch desired state drift detection path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('config-drift');
    expect(result.policyTags).toContain('scenario:config-drift');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk config-drift scenario with medium confidence');
    expect(result.signals).toContain('config-drift-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Config-drift behavior is inferred from scenario wording and dependency surface, not measured configuration-mismatch or desired-state drift telemetry.');
    expect(result.recommendations).toContain('Capture configuration-mismatch, desired-state drift, and drift-detection dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture config-drift baseline and drift-detection metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture config-drift baseline and drift-detection metrics before execution.', status: 'recommended' });
  });
});
