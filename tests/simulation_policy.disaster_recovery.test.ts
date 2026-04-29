import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy disaster-recovery scenarios', () => {
  it('classifies disaster-recovery scenario and emits disaster-recovery dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'disaster recovery failover restore backup recovery path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('disaster-recovery');
    expect(result.policyTags).toContain('scenario:disaster-recovery');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk disaster-recovery scenario with medium confidence');
    expect(result.signals).toContain('disaster-recovery-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Disaster-recovery behavior is inferred from scenario wording and dependency surface, not measured failover, restore, or backup telemetry.');
    expect(result.recommendations).toContain('Capture failover, restore, and backup dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture disaster-recovery baseline and recovery objective metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture disaster-recovery baseline and recovery objective metrics before execution.',
      status: 'recommended',
    });
  });
});
