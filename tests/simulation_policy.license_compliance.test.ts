import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy license-compliance scenarios', () => {
  it('classifies license-compliance scenario and emits license-compliance dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'license compliance license audit prohibited license attribution policy path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('license-compliance');
    expect(result.policyTags).toContain('scenario:license-compliance');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk license-compliance scenario with medium confidence');
    expect(result.signals).toContain('license-compliance-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('License-compliance behavior is inferred from scenario wording and dependency surface, not measured license-audit, prohibited-license, or attribution-policy telemetry.');
    expect(result.recommendations).toContain('Capture license-audit, prohibited-license, and attribution-policy dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture license-compliance baseline and license-audit metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture license-compliance baseline and license-audit metrics before execution.', status: 'recommended' });
  });
});
