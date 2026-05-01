import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy request-signing scenarios', () => {
  it('classifies request-signing scenario and emits request-signing dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'request signing hmac signature signed request replay protection path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('request-signing');
    expect(result.policyTags).toContain('scenario:request-signing');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk request-signing scenario with medium confidence');
    expect(result.signals).toContain('request-signing-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Request-signing behavior is inferred from scenario wording and dependency surface, not measured HMAC-signature, signed-request, or replay-protection telemetry.');
    expect(result.recommendations).toContain('Capture HMAC-signature, signed-request, and replay-protection dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture request-signing baseline and replay-protection metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture request-signing baseline and replay-protection metrics before execution.', status: 'recommended' });
  });
});
