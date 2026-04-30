import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy dependency-upgrade scenarios', () => {
  it('classifies dependency-upgrade scenario and emits dependency-upgrade dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'dependency upgrade package bump version compatibility path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('dependency-upgrade');
    expect(result.policyTags).toContain('scenario:dependency-upgrade');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk dependency-upgrade scenario with medium confidence');
    expect(result.signals).toContain('dependency-upgrade-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Dependency-upgrade behavior is inferred from scenario wording and dependency surface, not measured package-bump or version-compatibility telemetry.');
    expect(result.recommendations).toContain('Capture package-bump, version-compatibility, and dependency upgrade metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture dependency-upgrade baseline and version-compatibility metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture dependency-upgrade baseline and version-compatibility metrics before execution.', status: 'recommended' });
  });
});
