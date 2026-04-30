import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy health-check scenarios', () => {
  it('classifies health-check scenario and emits health-check dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'health check readiness probe liveness probe synthetic check path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('health-check');
    expect(result.policyTags).toContain('scenario:health-check');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk health-check scenario with medium confidence');
    expect(result.signals).toContain('health-check-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Health-check behavior is inferred from scenario wording and dependency surface, not measured readiness-probe, liveness-probe, or synthetic-check telemetry.');
    expect(result.recommendations).toContain('Capture readiness-probe, liveness-probe, and synthetic-check dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture health-check baseline and probe metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture health-check baseline and probe metrics before execution.', status: 'recommended' });
  });
});
