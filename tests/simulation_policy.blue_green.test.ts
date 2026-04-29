import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy blue-green scenarios', () => {
  it('classifies blue-green scenario and emits blue-green dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'blue-green blue environment green environment cutover path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('blue-green');
    expect(result.policyTags).toContain('scenario:blue-green');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk blue-green scenario with medium confidence');
    expect(result.signals).toContain('blue-green-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Blue-green behavior is inferred from scenario wording and dependency surface, not measured environment cutover or traffic-switch telemetry.');
    expect(result.recommendations).toContain('Capture blue-green cutover and environment dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture blue-green baseline and cutover health metrics before execution.');
    expect(result.actionPlan).toContainEqual({
      order: 3,
      action: 'Capture blue-green baseline and cutover health metrics before execution.',
      status: 'recommended',
    });
  });
});
