import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy package-publish-takeover scenarios', () => {
  it('classifies package-publish-takeover scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'package publish takeover maintainer account takeover unauthorized release compromised package owner path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('package-publish-takeover');
    expect(result.policyTags).toContain('scenario:package-publish-takeover');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('package-publish-takeover-dependency-pressure');
  });
});
