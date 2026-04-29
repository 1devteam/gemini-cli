import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy api-contract scenarios', () => {
  it('classifies api-contract scenario and emits api-contract dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'api contract openapi schema compatibility path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('api-contract');
    expect(result.policyTags).toContain('scenario:api-contract');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk api-contract scenario with medium confidence');
    expect(result.signals).toContain('api-contract-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('API contract behavior is inferred from scenario wording and dependency surface, not measured schema compatibility or consumer telemetry.');
    expect(result.recommendations).toContain('Capture contract compatibility and schema dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture api-contract baseline and compatibility metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture api-contract baseline and compatibility metrics before execution.',
      status: 'recommended',
    });
  });
});
