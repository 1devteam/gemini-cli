import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy cors-policy scenarios', () => {
  it('classifies cors-policy scenario and emits cors-policy dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'cors policy cross origin allowed origin preflight request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('cors-policy');
    expect(result.policyTags).toContain('scenario:cors-policy');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk cors-policy scenario with medium confidence');
    expect(result.signals).toContain('cors-policy-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('CORS-policy behavior is inferred from scenario wording and dependency surface, not measured cross-origin, allowed-origin, or preflight-request telemetry.');
    expect(result.recommendations).toContain('Capture cross-origin, allowed-origin, and preflight-request dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture cors-policy baseline and preflight-request metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture cors-policy baseline and preflight-request metrics before execution.', status: 'recommended' });
  });
});
