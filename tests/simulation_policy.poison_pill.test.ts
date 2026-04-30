import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy poison-pill scenarios', () => {
  it('classifies poison-pill scenario and emits poison-pill dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'poison pill malformed message bad payload quarantine path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('poison-pill');
    expect(result.policyTags).toContain('scenario:poison-pill');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk poison-pill scenario with medium confidence');
    expect(result.signals).toContain('poison-pill-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Poison-pill behavior is inferred from scenario wording and dependency surface, not measured malformed-message, bad-payload, or quarantine telemetry.');
    expect(result.recommendations).toContain('Capture malformed-message, bad-payload, and quarantine dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture poison-pill baseline and quarantine metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture poison-pill baseline and quarantine metrics before execution.',
      status: 'recommended',
    });
  });
});
