import { describe, expect, it } from 'vitest';
import { evaluateSimulationPolicy } from '../simulation_policy.js';

describe('Simulation policy bot-scraping scenarios', () => {
  it('classifies bot-scraping scenario and emits dependency pressure signal', () => {
    const result = evaluateSimulationPolicy({
      scenario: 'bot scraping automated scraper headless browser content harvesting crawl abuse path',
      cpuCount: 8,
      memoryMB: 16000,
      dependencyCount: 60,
    });

    expect(result.scenarioKind).toBe('bot-scraping');
    expect(result.policyTags).toContain('scenario:bot-scraping');
    expect(result.riskLevel).toBe('medium');
    expect(result.signals).toContain('bot-scraping-dependency-pressure');
  });
});
