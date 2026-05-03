import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: ssrf vs ssrf-defense', () => {
  it('keeps direct ssrf classified separately from ssrf-defense', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'ssrf server side request forgery internal metadata request cloud metadata endpoint path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('ssrf');
  });

  it('keeps explicit ssrf-defense classified separately from direct ssrf', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'ssrf defense metadata block egress allowlist url fetch guard path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('ssrf-defense');
  });
});
