import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy input-sanitization scenarios', () => {
  it('classifies input-sanitization scenario and emits input-sanitization dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'input sanitization user input escaping validation injection prevention path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('input-sanitization');
    expect(result.policyTags).toContain('scenario:input-sanitization');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk input-sanitization scenario with medium confidence');
    expect(result.signals).toContain('input-sanitization-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Input-sanitization behavior is inferred from scenario wording and dependency surface, not measured user-input, escaping, or injection-prevention telemetry.');
    expect(result.recommendations).toContain('Capture user-input, escaping, validation, and injection-prevention dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture input-sanitization baseline and injection-prevention metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture input-sanitization baseline and injection-prevention metrics before execution.', status: 'recommended' });
  });
});
