import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy admission-control scenarios', () => {
  it('classifies admission-control scenario and emits admission-control dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'admission control kubernetes admission webhook policy enforcement deny request path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('admission-control');
    expect(result.policyTags).toContain('scenario:admission-control');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk admission-control scenario with medium confidence');
    expect(result.signals).toContain('admission-control-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Admission-control behavior is inferred from scenario wording and dependency surface, not measured admission-webhook, policy-enforcement, or deny-request telemetry.');
    expect(result.recommendations).toContain('Capture admission-webhook, policy-enforcement, and deny-request dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture admission-control baseline and policy-enforcement metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture admission-control baseline and policy-enforcement metrics before execution.', status: 'recommended' });
  });
});
