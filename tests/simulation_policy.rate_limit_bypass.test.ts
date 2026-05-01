import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy rate-limit-bypass scenarios', () => {
  it('classifies rate-limit-bypass scenario and emits rate-limit-bypass dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'rate limit bypass quota bypass throttle evasion limit abuse path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('rate-limit-bypass');
    expect(result.policyTags).toContain('scenario:rate-limit-bypass');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk rate-limit-bypass scenario with medium confidence');
    expect(result.signals).toContain('rate-limit-bypass-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Rate-limit-bypass behavior is inferred from scenario wording and dependency surface, not measured quota-bypass, throttle-evasion, or limit-abuse telemetry.');
    expect(result.recommendations).toContain('Capture quota-bypass, throttle-evasion, and limit-abuse dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture rate-limit-bypass baseline and throttle-evasion metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture rate-limit-bypass baseline and throttle-evasion metrics before execution.', status: 'recommended' });
  });
});
