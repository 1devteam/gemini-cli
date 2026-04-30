import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dns-failover scenarios', () => {
  it('classifies dns-failover scenario and emits dns-failover dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dns failover dns record switch ttl propagation resolver path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dns-failover');
    expect(result.policyTags).toContain('scenario:dns-failover');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk dns-failover scenario with medium confidence');
    expect(result.signals).toContain('dns-failover-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('DNS-failover behavior is inferred from scenario wording and dependency surface, not measured DNS-record switch, TTL propagation, or resolver telemetry.');
    expect(result.recommendations).toContain('Capture DNS-record switch, TTL propagation, and resolver dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture dns-failover baseline and TTL propagation metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture dns-failover baseline and TTL propagation metrics before execution.', status: 'recommended' });
  });
});
