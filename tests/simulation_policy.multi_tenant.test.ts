import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy multi-tenant scenarios', () => {
  it('classifies multi-tenant scenario and emits multi-tenant dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'multi-tenant tenant isolation and shared resource path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('multi-tenant');
    expect(result.policyTags).toContain('scenario:multi-tenant');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk multi-tenant scenario with medium confidence');
    expect(result.signals).toContain('multi-tenant-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Multi-tenant behavior is inferred from scenario wording and dependency surface, not measured tenant isolation or noisy-neighbor telemetry.');
    expect(result.recommendations).toContain('Capture tenant isolation and shared-resource dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture multi-tenant baseline and tenant isolation metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture multi-tenant baseline and tenant isolation metrics before execution.',
      status: 'recommended',
    });
  });
});
