import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy policy-as-code scenarios', () => {
  it('classifies policy-as-code scenario and emits policy-as-code dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'policy as code opa rule evaluation policy bundle guardrail path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('policy-as-code');
    expect(result.policyTags).toContain('scenario:policy-as-code');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk policy-as-code scenario with medium confidence');
    expect(result.signals).toContain('policy-as-code-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Policy-as-code behavior is inferred from scenario wording and dependency surface, not measured OPA rule-evaluation, policy-bundle, or guardrail telemetry.');
    expect(result.recommendations).toContain('Capture OPA rule-evaluation, policy-bundle, and guardrail dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture policy-as-code baseline and rule-evaluation metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture policy-as-code baseline and rule-evaluation metrics before execution.', status: 'recommended' });
  });
});
