import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy canary scenarios', () => {
  it('classifies canary scenario and emits canary dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'canary release progressive rollout traffic slice path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('canary');
    expect(result.policyTags).toContain('scenario:canary');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk canary scenario with medium confidence');
    expect(result.signals).toContain('canary-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Canary behavior is inferred from scenario wording and dependency surface, not measured progressive rollout or traffic-slice telemetry.');
    expect(result.recommendations).toContain('Capture canary health and traffic-slice dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture canary baseline and progressive rollout metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture canary baseline and progressive rollout metrics before execution.',
      status: 'recommended',
    });
  });
});
