import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy audit-log scenarios', () => {
  it('classifies audit-log scenario and emits audit-log dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'audit log immutable audit trail compliance event history path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('audit-log');
    expect(result.policyTags).toContain('scenario:audit-log');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk audit-log scenario with medium confidence');
    expect(result.signals).toContain('audit-log-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Audit-log behavior is inferred from scenario wording and dependency surface, not measured immutable-audit-trail or compliance-event telemetry.');
    expect(result.recommendations).toContain('Capture immutable-audit-trail, compliance-event, and event-history dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture audit-log baseline and compliance-event metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture audit-log baseline and compliance-event metrics before execution.', status: 'recommended' });
  });
});
