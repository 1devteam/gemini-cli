import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy secret-rotation scenarios', () => {
  it('classifies secret-rotation scenario and emits secret-rotation dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'secret rotation credential rollover key rotation token refresh path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('secret-rotation');
    expect(result.policyTags).toContain('scenario:secret-rotation');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk secret-rotation scenario with medium confidence');
    expect(result.signals).toContain('secret-rotation-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Secret-rotation behavior is inferred from scenario wording and dependency surface, not measured credential-rollover, key-rotation, or token-refresh telemetry.');
    expect(result.recommendations).toContain('Capture credential-rollover, key-rotation, and token-refresh dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture secret-rotation baseline and credential-rollover metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture secret-rotation baseline and credential-rollover metrics before execution.', status: 'recommended' });
  });
});
