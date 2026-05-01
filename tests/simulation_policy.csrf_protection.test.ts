import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy csrf-protection scenarios', () => {
  it('classifies csrf-protection scenario and emits csrf-protection dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'csrf protection cross site request forgery csrf token same site cookie path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('csrf-protection');
    expect(result.policyTags).toContain('scenario:csrf-protection');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk csrf-protection scenario with medium confidence');
    expect(result.signals).toContain('csrf-protection-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('CSRF-protection behavior is inferred from scenario wording and dependency surface, not measured CSRF-token or same-site-cookie telemetry.');
    expect(result.recommendations).toContain('Capture CSRF-token, same-site-cookie, and request-forgery dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture csrf-protection baseline and CSRF-token metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture csrf-protection baseline and CSRF-token metrics before execution.', status: 'recommended' });
  });
});
