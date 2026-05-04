import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { evaluateSimulationPolicy } from '../simulation_policy';

function readSimulationPolicySource(): string {
  return readFileSync(new URL('../simulation_policy.ts', import.meta.url), 'utf8');
}

function extractFunctionBody(source: string, functionName: string): string {
  const start = source.indexOf(`function ${functionName}`);
  if (start === -1) {
    throw new Error(`function ${functionName} not found`);
  }

  const braceStart = source.indexOf('{', start);
  if (braceStart === -1) {
    throw new Error(`function ${functionName} opening brace not found`);
  }

  let depth = 0;
  for (let index = braceStart; index < source.length; index += 1) {
    const char = source[index];

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return source.slice(braceStart + 1, index);
      }
    }
  }

  throw new Error(`function ${functionName} closing brace not found`);
}

describe('Simulation policy classifier registry guard', () => {
  it('does not contain duplicate scenario classifier registry kinds', () => {
    const source = readSimulationPolicySource();
    const registryStart = source.indexOf('const scenarioClassifierRules: ScenarioClassifierRule[] = [');
    const registryEnd = source.indexOf('];\n\nfunction matchScenarioClassifierRule', registryStart);

    expect(registryStart).toBeGreaterThanOrEqual(0);
    expect(registryEnd).toBeGreaterThan(registryStart);

    const registryBody = source.slice(registryStart, registryEnd);
    const kinds = [...registryBody.matchAll(/kind: '([^']+)'/g)].map((match) => match[1]);
    const duplicates = kinds.filter((kind, index) => kinds.indexOf(kind) !== index);

    expect(duplicates).toEqual([]);
  });

  it('keeps classifyScenario registry-driven with only the general fallback return', () => {
    const source = readSimulationPolicySource();
    const classifyScenarioBody = extractFunctionBody(source, 'classifyScenario');
    const returns = [...classifyScenarioBody.matchAll(/return '([^']+)';/g)].map((match) => match[1]);

    expect(returns).toEqual(['general']);
    expect(classifyScenarioBody).toContain('const registryMatch = matchScenarioClassifierRule(normalized);');
    expect(classifyScenarioBody).toContain('if (registryMatch) return registryMatch;');
  });

  it.each([
    ['ssrf internal metadata request cloud metadata endpoint path', 'ssrf'],
    ['ssrf defense metadata block egress allowlist path', 'ssrf-defense'],
    ['dead letter queue dlq poison message retry exhausted path', 'dead-letter-queue'],
    ['backpressure flow control pressure signal producer throttle path', 'backpressure'],
    ['refresh token reuse stolen refresh token token replay rotation failure path', 'refresh-token-reuse'],
    ['token expiry expired token path', 'token-expiry'],
    ['synthetic monitoring canary monitor path', 'synthetic-monitoring'],
    ['health check readiness probe liveness probe path', 'health-check'],
    ['canary analysis progressive rollout small percentage traffic path', 'canary'],
  ])('keeps collision-sensitive scenario %s classified as %s', (scenario, expectedKind) => {
    const result = evaluateSimulationPolicy({
      scenario,
      dependencyCount: 100,
      hasLockfile: true,
      hasTests: true,
      hasCi: true,
      requiresNetwork: false,
    });

    expect(result.scenarioKind).toBe(expectedKind);
    expect(result.policyTags).toContain(`scenario:${expectedKind}`);
  });
});
