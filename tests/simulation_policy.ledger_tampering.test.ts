import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy ledger-tampering scenarios', () => {
  it('classifies ledger-tampering scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'ledger tampering audit ledger mutation balance history altered transaction log rewrite path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('ledger-tampering');
    expect(result.policyTags).toContain('scenario:ledger-tampering');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('ledger-tampering-dependency-pressure');
  });
});
