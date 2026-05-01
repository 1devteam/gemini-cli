import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy token-expiry scenarios', () => {
  it('classifies token-expiry scenario and emits token-expiry dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'token expiry expired token refresh token session renewal path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('token-expiry');
    expect(result.policyTags).toContain('scenario:token-expiry');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk token-expiry scenario with medium confidence');
    expect(result.signals).toContain('token-expiry-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Token-expiry behavior is inferred from scenario wording and dependency surface, not measured expired-token, refresh-token, or session-renewal telemetry.');
    expect(result.recommendations).toContain('Capture expired-token, refresh-token, and session-renewal dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture token-expiry baseline and refresh-token metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture token-expiry baseline and refresh-token metrics before execution.', status: 'recommended' });
  });
});
