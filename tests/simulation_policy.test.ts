import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy', () => {
  it('returns low risk for strong environment', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'basic',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 10,
    });

    expect(result.riskLevel).toBe('low');
    expect(result.scenarioKind).toBe('general');
    expect(result.decision).toBe('proceed');
    expect(result.signals.length).toBe(0);
    expect(result.recommendations).toContain('No immediate constraint recommendations detected.');
    expect(result.nextActions).toEqual(['Proceed with baseline simulation run.']);
  });

  it('detects high risk under constraints', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'load-test',
      cpuCount: 1,
      memoryMB: 2048,
      dependencyCount: 200,
    });

    expect(result.riskLevel).toBe('high');
    expect(result.scenarioKind).toBe('load');
    expect(result.decision).toBe('block-until-reviewed');
    expect(result.signals.length).toBeGreaterThanOrEqual(2);
    expect(result.recommendations.length).toBeGreaterThanOrEqual(2);
    expect(result.nextActions).toContain('Review blocking signals before execution.');
  });

  it('adds dependency surface recommendation', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'basic',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 101,
    });

    expect(result.decision).toBe('proceed-with-caution');
    expect(result.signals).toContain('high-dependency-surface');
    expect(result.recommendations).toContain('Review dependency surface before scaling or deployment simulations.');
    expect(result.nextActions).toContain('Proceed with monitoring enabled.');
  });

  it('classifies scaling scenario and emits cpu pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'scaling-test',
      cpuCount: 2,
      memoryMB: 16000,
      dependencyCount: 10,
    });

    expect(result.scenarioKind).toBe('scaling');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.signals).toContain('scaling-cpu-pressure');
  });

  it('classifies security scenario and emits dependency review signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'security-test',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 1,
    });

    expect(result.scenarioKind).toBe('security');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.signals).toContain('security-dependency-review');
  });

  it('keeps composed simulation trace synchronized with trace fields', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'load-test',
      cpuCount: 1,
      memoryMB: 2048,
      dependencyCount: 200,
    });

    expect(result.simulationTrace.schema).toEqual(result.schemaTrace);
    expect(result.simulationTrace.policy).toEqual(result.policyTrace);
    expect(result.simulationTrace.risk).toEqual(result.riskTrace);
    expect(result.simulationTrace.decision).toEqual(result.decisionTrace);
    expect(result.simulationTrace.guidance).toEqual(result.guidanceTrace);
  });

  it('keeps top-level output fields synchronized with detailed traces', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'security-test',
      cpuCount: 2,
      memoryMB: 2048,
      dependencyCount: 200,
    });

    expect(result.schemaTrace.version).toBe(result.outputSchemaVersion);
    expect(result.schemaTrace.fields).toEqual(result.outputSchema);
    expect(result.schemaTrace.checksum).toBe(result.schemaChecksum);

    expect(result.policyTrace.version).toBe(result.policyVersion);
    expect(result.policyTrace.tags).toEqual(result.policyTags);
    expect(result.policyTrace.checksum).toBe(result.policyChecksum);

    expect(result.riskTrace.riskLevel).toBe(result.riskLevel);
    expect(result.riskTrace.scenarioKind).toBe(result.scenarioKind);
    expect(result.riskTrace.signals).toEqual(result.signals);
    expect(result.riskTrace.evidenceBasis).toEqual(result.evidenceBasis);

    expect(result.decisionTrace.decision).toBe(result.decision);
    expect(result.decisionTrace.summary).toBe(result.decisionSummary);
    expect(result.decisionTrace.rationale).toBe(result.decisionRationale);
    expect(result.decisionTrace.reviewPriority).toBe(result.reviewPriority);
    expect(result.decisionTrace.confidence).toBe(result.confidence);
    expect(result.decisionTrace.blockingSignals).toEqual(result.blockingSignals);
    expect(result.decisionTrace.monitoringSignals).toEqual(result.monitoringSignals);
    expect(result.decisionTrace.actionPlan).toEqual(result.actionPlan);

    expect(result.guidanceTrace.assumptions).toEqual(result.assumptions);
    expect(result.guidanceTrace.recommendations).toEqual(result.recommendations);
    expect(result.guidanceTrace.nextActions).toEqual(result.nextActions);
  });
});
