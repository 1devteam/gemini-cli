import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy outbox scenarios', () => {
  it('classifies outbox scenario and emits outbox dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'outbox transactional outbox event relay message dispatch path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('outbox');
    expect(result.policyTags).toContain('scenario:outbox');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk outbox scenario with medium confidence');
    expect(result.signals).toContain('outbox-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Outbox behavior is inferred from scenario wording and dependency surface, not measured transactional outbox or event relay telemetry.');
    expect(result.recommendations).toContain('Capture transactional outbox, event relay, and message dispatch dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture outbox baseline and event relay metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture outbox baseline and event relay metrics before execution.',
      status: 'recommended',
    });
  });
});
