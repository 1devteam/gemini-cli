import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy image-signing scenarios', () => {
  it('classifies image-signing scenario and emits image-signing dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'image signing signed image signature verification registry trust path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('image-signing');
    expect(result.policyTags).toContain('scenario:image-signing');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk image-signing scenario with medium confidence');
    expect(result.signals).toContain('image-signing-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Image-signing behavior is inferred from scenario wording and dependency surface, not measured signed-image, signature-verification, or registry-trust telemetry.');
    expect(result.recommendations).toContain('Capture signed-image, signature-verification, and registry-trust dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture image-signing baseline and signature-verification metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture image-signing baseline and signature-verification metrics before execution.', status: 'recommended' });
  });
});
