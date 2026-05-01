import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy session-revocation scenarios', () => {
  it('classifies session-revocation scenario and emits session-revocation dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'session revocation revoked session logout token invalidation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('session-revocation');
    expect(result.policyTags).toContain('scenario:session-revocation');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk session-revocation scenario with medium confidence');
    expect(result.signals).toContain('session-revocation-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Session-revocation behavior is inferred from scenario wording and dependency surface, not measured revoked-session, logout, or token-invalidation telemetry.');
    expect(result.recommendations).toContain('Capture revoked-session, logout, and token-invalidation dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture session-revocation baseline and token-invalidation metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture session-revocation baseline and token-invalidation metrics before execution.', status: 'recommended' });
  });
});
