import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy traffic-replay scenarios', () => {
  it('classifies traffic-replay scenario and emits traffic-replay dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'traffic replay captured traffic replay session replay production request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('traffic-replay');
    expect(result.policyTags).toContain('scenario:traffic-replay');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk traffic-replay scenario with medium confidence');
    expect(result.signals).toContain('traffic-replay-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Traffic-replay behavior is inferred from scenario wording and dependency surface, not measured captured-traffic, session-replay, or production-request telemetry.');
    expect(result.recommendations).toContain('Capture captured-traffic, session-replay, and production-request dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture traffic-replay baseline and captured-traffic metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture traffic-replay baseline and captured-traffic metrics before execution.', status: 'recommended' });
  });
});
