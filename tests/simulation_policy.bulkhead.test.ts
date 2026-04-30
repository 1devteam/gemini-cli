import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy bulkhead scenarios', () => {
  it('classifies bulkhead scenario and emits bulkhead dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'bulkhead isolation pool partition resource isolation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('bulkhead');
    expect(result.policyTags).toContain('scenario:bulkhead');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk bulkhead scenario with medium confidence');
    expect(result.signals).toContain('bulkhead-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Bulkhead behavior is inferred from scenario wording and dependency surface, not measured isolation-pool or resource-partition telemetry.');
    expect(result.recommendations).toContain('Capture isolation-pool, resource-partition, and dependency containment metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture bulkhead baseline and isolation-pool metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture bulkhead baseline and isolation-pool metrics before execution.',
      status: 'recommended',
    });
  });
});
