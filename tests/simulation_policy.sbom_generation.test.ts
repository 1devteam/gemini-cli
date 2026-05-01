import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy sbom-generation scenarios', () => {
  it('classifies sbom-generation scenario and emits sbom-generation dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'sbom generation software bill materials component inventory package manifest path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('sbom-generation');
    expect(result.policyTags).toContain('scenario:sbom-generation');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk sbom-generation scenario with medium confidence');
    expect(result.signals).toContain('sbom-generation-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('SBOM-generation behavior is inferred from scenario wording and dependency surface, not measured software-bill-of-materials, component-inventory, or package-manifest telemetry.');
    expect(result.recommendations).toContain('Capture software-bill-of-materials, component-inventory, and package-manifest dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture sbom-generation baseline and component-inventory metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture sbom-generation baseline and component-inventory metrics before execution.', status: 'recommended' });
  });
});
