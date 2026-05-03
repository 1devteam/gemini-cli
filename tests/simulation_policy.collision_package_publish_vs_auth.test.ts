import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy collision hardening: package-publish-takeover vs auth', () => {
  it('keeps package-publish-takeover classified before generic auth/account takeover wording', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'package publish takeover maintainer account takeover unauthorized release compromised package owner path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('package-publish-takeover');
  });

  it('keeps generic auth classified as auth', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'auth token permission login authentication path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('auth');
  });
});
