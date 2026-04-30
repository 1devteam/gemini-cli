import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy schema-validation scenarios', () => {
  it('classifies schema-validation scenario and emits schema-validation dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'schema validation json schema payload validation contract validation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('schema-validation');
    expect(result.policyTags).toContain('scenario:schema-validation');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk schema-validation scenario with medium confidence');
    expect(result.signals).toContain('schema-validation-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Schema-validation behavior is inferred from scenario wording and dependency surface, not measured JSON-schema, payload-validation, or contract-validation telemetry.');
    expect(result.recommendations).toContain('Capture JSON-schema, payload-validation, and contract-validation dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture schema-validation baseline and payload-validation metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture schema-validation baseline and payload-validation metrics before execution.', status: 'recommended' });
  });
});
