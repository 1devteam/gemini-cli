import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy backpressure scenarios', () => {
  it('classifies backpressure scenario and emits backpressure dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'backpressure flow control pressure signal producer throttle path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('backpressure');
    expect(result.policyTags).toContain('scenario:backpressure');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk backpressure scenario with medium confidence');
    expect(result.signals).toContain('backpressure-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Backpressure behavior is inferred from scenario wording and dependency surface, not measured flow-control, pressure-signal, or producer-throttle telemetry.');
    expect(result.recommendations).toContain('Capture flow-control, pressure-signal, and producer-throttle dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture backpressure baseline and flow-control metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture backpressure baseline and flow-control metrics before execution.',
      status: 'recommended',
    });
  });
});
