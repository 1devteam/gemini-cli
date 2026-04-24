import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin contract', () => {
  it('exposes analyze and simulate commands', () => {
    const plugin = createProjectSimulatorPlugin();
    const commandNames = plugin.getCommands().map((command) => command.name);

    expect(commandNames).toContain('analyze-project');
    expect(commandNames).toContain('simulate-scenario');
  });

  it('returns deterministic simulation result shape', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({ scenario: 'load-test' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated load-test',
      data: {
        scenario: 'load-test',
        scenarioKind: 'load',
        result: 'ok',
      },
    });
    expect(typeof (result.data as { timestamp: unknown }).timestamp).toBe('string');
    expect(['low', 'medium', 'high']).toContain((result.data as { riskLevel: string }).riskLevel);
    expect(['proceed', 'proceed-with-caution', 'block-until-reviewed']).toContain((result.data as { decision: string }).decision);
    expect(Array.isArray((result.data as { signals: unknown[] }).signals)).toBe(true);
    expect(Array.isArray((result.data as { recommendations: unknown[] }).recommendations)).toBe(true);
  });

  it('defaults missing scenario to default', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler({}, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated default',
      data: {
        scenario: 'default',
        scenarioKind: 'general',
        decision: 'proceed',
        result: 'ok',
      },
    });
    expect(['low', 'medium', 'high']).toContain((result.data as { riskLevel: string }).riskLevel);
    expect(Array.isArray((result.data as { signals: unknown[] }).signals)).toBe(true);
    expect(Array.isArray((result.data as { recommendations: unknown[] }).recommendations)).toBe(true);
  });
});
