import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy regional-failover scenarios', () => {
  it('classifies regional-failover scenario and emits regional-failover dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'regional failover cross region traffic shift secondary region path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('regional-failover');
    expect(result.policyTags).toContain('scenario:regional-failover');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk regional-failover scenario with medium confidence');
    expect(result.signals).toContain('regional-failover-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Regional-failover behavior is inferred from scenario wording and dependency surface, not measured cross-region traffic-shift or secondary-region telemetry.');
    expect(result.recommendations).toContain('Capture cross-region traffic-shift, secondary-region, and failover dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture regional-failover baseline and cross-region traffic-shift metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture regional-failover baseline and cross-region traffic-shift metrics before execution.', status: 'recommended' });
  });
});
