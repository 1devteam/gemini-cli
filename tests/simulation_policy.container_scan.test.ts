import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy container-scan scenarios', () => {
  it('classifies container-scan scenario and emits container-scan dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'container scan image vulnerability layer scan registry assessment path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('container-scan');
    expect(result.policyTags).toContain('scenario:container-scan');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk container-scan scenario with medium confidence');
    expect(result.signals).toContain('container-scan-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Container-scan behavior is inferred from scenario wording and dependency surface, not measured image-vulnerability, layer-scan, or registry-assessment telemetry.');
    expect(result.recommendations).toContain('Capture image-vulnerability, layer-scan, and registry-assessment dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture container-scan baseline and layer-scan metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture container-scan baseline and layer-scan metrics before execution.', status: 'recommended' });
  });
});
