import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy ssrf-defense scenarios', () => {
  it('classifies ssrf-defense scenario and emits ssrf-defense dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'ssrf defense server side request forgery metadata block egress allowlist path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('ssrf-defense');
    expect(result.policyTags).toContain('scenario:ssrf-defense');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk ssrf-defense scenario with medium confidence');
    expect(result.signals).toContain('ssrf-defense-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('SSRF-defense behavior is inferred from scenario wording and dependency surface, not measured metadata-block, egress-allowlist, or server-side-request-forgery telemetry.');
    expect(result.recommendations).toContain('Capture metadata-block, egress-allowlist, and server-side-request-forgery dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture ssrf-defense baseline and egress-allowlist metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture ssrf-defense baseline and egress-allowlist metrics before execution.', status: 'recommended' });
  });
});
