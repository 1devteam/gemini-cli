import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dead-letter-queue scenarios', () => {
  it('classifies dead-letter-queue scenario and emits dead-letter-queue dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dead letter queue dlq poison message retry exhausted path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dead-letter-queue');
    expect(result.policyTags).toContain('scenario:dead-letter-queue');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk dead-letter-queue scenario with medium confidence');
    expect(result.signals).toContain('dead-letter-queue-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Dead-letter-queue behavior is inferred from scenario wording and dependency surface, not measured DLQ, poison-message, or retry-exhaustion telemetry.');
    expect(result.recommendations).toContain('Capture DLQ, poison-message, and retry-exhaustion dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture dead-letter-queue baseline and poison-message metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture dead-letter-queue baseline and poison-message metrics before execution.',
      status: 'recommended',
    });
  });
});
