import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy xss-defense scenarios', () => {
  it('classifies xss-defense scenario and emits xss-defense dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'xss defense cross site scripting output encoding content security policy path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('xss-defense');
    expect(result.policyTags).toContain('scenario:xss-defense');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk xss-defense scenario with medium confidence');
    expect(result.signals).toContain('xss-defense-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('XSS-defense behavior is inferred from scenario wording and dependency surface, not measured output-encoding or content-security-policy telemetry.');
    expect(result.recommendations).toContain('Capture output-encoding, content-security-policy, and cross-site-scripting dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture xss-defense baseline and output-encoding metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture xss-defense baseline and output-encoding metrics before execution.', status: 'recommended' });
  });
});
