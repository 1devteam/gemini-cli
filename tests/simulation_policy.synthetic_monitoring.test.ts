import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy synthetic-monitoring scenarios', () => {
  it('classifies synthetic-monitoring scenario and emits synthetic-monitoring dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'synthetic monitoring synthetic check probe canary monitor path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('synthetic-monitoring');
    expect(result.policyTags).toContain('scenario:synthetic-monitoring');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk synthetic-monitoring scenario with medium confidence');
    expect(result.signals).toContain('synthetic-monitoring-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Synthetic-monitoring behavior is inferred from scenario wording and dependency surface, not measured synthetic-check, probe, or canary-monitor telemetry.');
    expect(result.recommendations).toContain('Capture synthetic-check, probe, and canary-monitor dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture synthetic-monitoring baseline and probe metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture synthetic-monitoring baseline and probe metrics before execution.', status: 'recommended' });
  });
});
