import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy data-consistency scenarios', () => {
  it('classifies data-consistency scenario and emits data-consistency dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'data consistency eventual consistency replication lag read repair path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('data-consistency');
    expect(result.policyTags).toContain('scenario:data-consistency');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk data-consistency scenario with medium confidence');
    expect(result.signals).toContain('data-consistency-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Data-consistency behavior is inferred from scenario wording and dependency surface, not measured replication lag, read repair, or consistency telemetry.');
    expect(result.recommendations).toContain('Capture replication lag, read repair, and consistency dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture data-consistency baseline and replication consistency metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture data-consistency baseline and replication consistency metrics before execution.',
      status: 'recommended',
    });
  });
});
