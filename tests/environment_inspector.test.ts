import { describe, expect, it } from 'vitest';
import { inspectEnvironment, classifyMemory } from '../environment_inspector.js';

describe('Environment inspector', () => {
  it('returns environment summary', () => {
    const env = inspectEnvironment();

    expect(env).toHaveProperty('platform');
    expect(env).toHaveProperty('arch');
    expect(env).toHaveProperty('cpuCount');
    expect(env).toHaveProperty('memoryMB');
    expect(env).toHaveProperty('nodeVersion');

    expect(typeof env.cpuCount).toBe('number');
    expect(env.cpuCount).toBeGreaterThan(0);
  });

  it('classifies memory tiers correctly', () => {
    expect(classifyMemory(1024)).toBe('low');
    expect(classifyMemory(8000)).toBe('standard');
    expect(classifyMemory(32000)).toBe('high');
  });
});
