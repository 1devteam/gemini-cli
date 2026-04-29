import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy feature-flag scenarios', () => {
  it('classifies feature-flag scenario and emits feature-flag dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'feature flag rollout toggle experiment path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('feature-flag');
    expect(result.policyTags).toContain('scenario:feature-flag');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk feature-flag scenario with medium confidence');
    expect(result.signals).toContain('feature-flag-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Feature-flag behavior is inferred from scenario wording and dependency surface, not measured rollout, toggle, or experiment telemetry.');
    expect(result.recommendations).toContain('Capture flag rollout and toggle dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture feature-flag baseline and rollout safety metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture feature-flag baseline and rollout safety metrics before execution.',
      status: 'recommended',
    });
  });
});
