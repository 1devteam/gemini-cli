import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy circuit-breaker scenarios', () => {
  it('classifies circuit-breaker scenario and emits circuit-breaker dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'circuit breaker open circuit half open trip threshold path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('circuit-breaker');
    expect(result.policyTags).toContain('scenario:circuit-breaker');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk circuit-breaker scenario with medium confidence');
    expect(result.signals).toContain('circuit-breaker-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Circuit-breaker behavior is inferred from scenario wording and dependency surface, not measured open-circuit, half-open, or trip-threshold telemetry.');
    expect(result.recommendations).toContain('Capture open-circuit, half-open, and trip-threshold dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture circuit-breaker baseline and trip-threshold metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture circuit-breaker baseline and trip-threshold metrics before execution.',
      status: 'recommended',
    });
  });
});
