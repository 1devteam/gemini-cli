import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy runtime-detection scenarios', () => {
  it('classifies runtime-detection scenario and emits runtime-detection dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'runtime detection anomaly detection behavior monitoring intrusion detection path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('runtime-detection');
    expect(result.policyTags).toContain('scenario:runtime-detection');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk runtime-detection scenario with medium confidence');
    expect(result.signals).toContain('runtime-detection-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Runtime-detection behavior is inferred from scenario wording and dependency surface, not measured anomaly-detection, behavior-monitoring, or intrusion-detection telemetry.');
    expect(result.recommendations).toContain('Capture anomaly-detection, behavior-monitoring, and intrusion-detection dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture runtime-detection baseline and anomaly-detection metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture runtime-detection baseline and anomaly-detection metrics before execution.', status: 'recommended' });
  });
});
