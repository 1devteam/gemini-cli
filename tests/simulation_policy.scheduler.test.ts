import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy scheduler scenarios', () => {
  it('classifies scheduler scenario and emits scheduler dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'scheduler schedule cron and job dispatch path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('scheduler');
    expect(result.policyTags).toContain('scenario:scheduler');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk scheduler scenario with medium confidence');
    expect(result.signals).toContain('scheduler-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Scheduler behavior is inferred from scenario wording and dependency surface, not measured job timing or dispatch telemetry.');
    expect(result.recommendations).toContain('Capture job dispatch and schedule drift dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture scheduler baseline and job timing metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture scheduler baseline and job timing metrics before execution.',
      status: 'recommended',
    });
  });
});
