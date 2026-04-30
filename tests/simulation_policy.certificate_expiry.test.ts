import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy certificate-expiry scenarios', () => {
  it('classifies certificate-expiry scenario and emits certificate-expiry dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'certificate expiry tls certificate renewal cert rotation path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('certificate-expiry');
    expect(result.policyTags).toContain('scenario:certificate-expiry');
    expect(result.riskLevel).toBe('medium');
    expect(result.decision).toBe('proceed-with-caution');
    expect(result.decisionSummary).toBe('proceed-with-caution: medium risk certificate-expiry scenario with medium confidence');
    expect(result.signals).toContain('certificate-expiry-dependency-pressure');
    expect(result.monitoringSignals).toEqual(result.signals);
    expect(result.blockingSignals).toEqual([]);
    expect(result.evidenceBasis).toContain('scenario-keyword');
    expect(result.evidenceBasis).toContain('dependency-summary');
    expect(result.assumptions).toContain('Certificate-expiry behavior is inferred from scenario wording and dependency surface, not measured TLS certificate renewal or cert-rotation telemetry.');
    expect(result.recommendations).toContain('Capture TLS certificate renewal, cert-rotation, and expiry dependency metrics before runtime simulation.');
    expect(result.nextActions).toContain('Capture certificate-expiry baseline and TLS renewal metrics before execution.');
    expect(result.actionPlan).toContainEqual({ order: 3, action: 'Capture certificate-expiry baseline and TLS renewal metrics before execution.', status: 'recommended' });
  });
});
