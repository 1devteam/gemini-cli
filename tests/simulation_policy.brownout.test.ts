import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy brownout scenarios', () => {
  it('classifies brownout scenario and emits brownout dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'brownout graceful degradation feature shedding reduced capability path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('brownout');
    expect(result.policyTags).toContain('scenario:brownout');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk brownout scenario with medium confidence');
    expect(result.signals).toContain('brownout-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Brownout behavior is inferred from scenario wording and dependency surface, not measured graceful-degradation, feature-shedding, or reduced-capability telemetry.');
    expect(result.recommendations).toContain('Capture graceful-degradation, feature-shedding, and reduced-capability dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture brownout baseline and graceful-degradation metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture brownout baseline and graceful-degradation metrics before execution.',
      status: 'recommended',
    });
  });
});
