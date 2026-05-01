import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy supply-chain scenarios', () => {
  it('classifies supply-chain scenario and emits supply-chain dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'supply chain build provenance package integrity dependency trust path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('supply-chain');
    expect(result.policyTags).toContain('scenario:supply-chain');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk supply-chain scenario with medium confidence');
    expect(result.signals).toContain('supply-chain-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Supply-chain behavior is inferred from scenario wording and dependency surface, not measured build-provenance, package-integrity, or dependency-trust telemetry.');
    expect(result.recommendations).toContain('Capture build-provenance, package-integrity, and dependency-trust metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture supply-chain baseline and package-integrity metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture supply-chain baseline and package-integrity metrics before execution.', status: 'recommended' });
  });
});
