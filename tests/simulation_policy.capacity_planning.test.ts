import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy capacity-planning scenarios', () => {
  it('classifies capacity-planning scenario and emits capacity-planning dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'capacity planning forecast demand headroom utilization path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('capacity-planning');
    expect(result.policyTags).toContain('scenario:capacity-planning');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk capacity-planning scenario with medium confidence');
    expect(result.signals).toContain('capacity-planning-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Capacity-planning behavior is inferred from scenario wording and dependency surface, not measured demand-forecast, headroom, or utilization telemetry.');
    expect(result.recommendations).toContain('Capture demand-forecast, headroom, and utilization dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture capacity-planning baseline and demand-forecast metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture capacity-planning baseline and demand-forecast metrics before execution.', status: 'recommended' });
  });
});
