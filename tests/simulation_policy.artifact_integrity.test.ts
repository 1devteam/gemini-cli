import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy artifact-integrity scenarios', () => {
  it('classifies artifact-integrity scenario and emits artifact-integrity dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'artifact integrity checksum verification signed artifact provenance path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('artifact-integrity');
    expect(result.policyTags).toContain('scenario:artifact-integrity');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk artifact-integrity scenario with medium confidence');
    expect(result.signals).toContain('artifact-integrity-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Artifact-integrity behavior is inferred from scenario wording and dependency surface, not measured checksum-verification, signed-artifact, or provenance telemetry.');
    expect(result.recommendations).toContain('Capture checksum-verification, signed-artifact, and provenance dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture artifact-integrity baseline and provenance metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture artifact-integrity baseline and provenance metrics before execution.', status: 'recommended' });
  });
});
