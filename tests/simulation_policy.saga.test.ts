import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy saga scenarios', () => {
  it('classifies saga scenario and emits saga dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'saga compensation compensating transaction orchestration path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('saga');
    expect(result.policyTags).toContain('scenario:saga');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk saga scenario with medium confidence');
    expect(result.signals).toContain('saga-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Saga behavior is inferred from scenario wording and dependency surface, not measured compensation or transaction orchestration telemetry.');
    expect(result.recommendations).toContain('Capture compensation, transaction orchestration, and dependency coordination metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture saga baseline and compensation workflow metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture saga baseline and compensation workflow metrics before execution.',
      status: 'recommended',
    });
  });
});
