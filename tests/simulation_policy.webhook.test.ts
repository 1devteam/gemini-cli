import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy webhook scenarios', () => {
  it('classifies webhook scenario and emits webhook dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'webhook callback event delivery endpoint path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('webhook');
    expect(result.policyTags).toContain('scenario:webhook');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk webhook scenario with medium confidence');
    expect(result.signals).toContain('webhook-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Webhook behavior is inferred from scenario wording and dependency surface, not measured callback delivery or endpoint telemetry.');
    expect(result.recommendations).toContain('Capture callback delivery and endpoint dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture webhook baseline and delivery reliability metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture webhook baseline and delivery reliability metrics before execution.',
      status: 'recommended',
    });
  });
});
