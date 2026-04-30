import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy maintenance-window scenarios', () => {
  it('classifies maintenance-window scenario and emits maintenance-window dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'maintenance window planned downtime service drain upgrade path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('maintenance-window');
    expect(result.policyTags).toContain('scenario:maintenance-window');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk maintenance-window scenario with medium confidence');
    expect(result.signals).toContain('maintenance-window-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Maintenance-window behavior is inferred from scenario wording and dependency surface, not measured planned-downtime, service-drain, or upgrade telemetry.');
    expect(result.recommendations).toContain('Capture planned-downtime, service-drain, and upgrade dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture maintenance-window baseline and service-drain metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture maintenance-window baseline and service-drain metrics before execution.',
      status: 'recommended',
    });
  });
});
