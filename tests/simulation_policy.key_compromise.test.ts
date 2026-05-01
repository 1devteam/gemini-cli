import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy key-compromise scenarios', () => {
  it('classifies key-compromise scenario and emits key-compromise dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'key compromise compromised key credential leak key revoke path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('key-compromise');
    expect(result.policyTags).toContain('scenario:key-compromise');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk key-compromise scenario with medium confidence');
    expect(result.signals).toContain('key-compromise-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Key-compromise behavior is inferred from scenario wording and dependency surface, not measured compromised-key, credential-leak, or key-revoke telemetry.');
    expect(result.recommendations).toContain('Capture compromised-key, credential-leak, and key-revoke dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture key-compromise baseline and key-revoke metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture key-compromise baseline and key-revoke metrics before execution.', status: 'recommended' });
  });
});
