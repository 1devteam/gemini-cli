import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: service-mesh-policy vs admission-control', () => {
  it('keeps service-mesh-policy classified before admission policy wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'service mesh policy sidecar authorization mesh traffic policy admission path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('service-mesh-policy');
  });

  it('keeps admission-control classified for admission controller wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'admission control validating webhook admission controller deny pod policy path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('admission-control');
  });
});
