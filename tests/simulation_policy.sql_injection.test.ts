import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy sql-injection scenarios', () => {
  it('classifies sql-injection scenario and emits sql-injection dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'sql injection parameterized query prepared statement injection prevention path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('sql-injection');
    expect(result.policyTags).toContain('scenario:sql-injection');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk sql-injection scenario with medium confidence');
    expect(result.signals).toContain('sql-injection-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('SQL-injection behavior is inferred from scenario wording and dependency surface, not measured parameterized-query or prepared-statement telemetry.');
    expect(result.recommendations).toContain('Capture parameterized-query, prepared-statement, and injection-prevention dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture sql-injection baseline and prepared-statement metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture sql-injection baseline and prepared-statement metrics before execution.', status: 'recommended' });
  });
});
