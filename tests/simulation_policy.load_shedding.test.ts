import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy load-shedding scenarios', () => {
  it('classifies load-shedding scenario and emits load-shedding dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'load shedding reject excess traffic overload protection admission control path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('load-shedding');
    expect(result.policyTags).toContain('scenario:load-shedding');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk load-shedding scenario with medium confidence');
    expect(result.signals).toContain('load-shedding-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Load-shedding behavior is inferred from scenario wording and dependency surface, not measured excess-traffic rejection, overload-protection, or admission-control telemetry.');
    expect(result.recommendations).toContain('Capture excess-traffic rejection, overload-protection, and admission-control dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture load-shedding baseline and admission-control metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture load-shedding baseline and admission-control metrics before execution.', status: 'recommended' });
  });
});
