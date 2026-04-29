import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = {
  cwd: process.cwd(),
  fs: {
    exists: async () => false,
    readFile: async () => '{}',
  },
} as never;

describe('ProjectSimulatorPlugin idempotency scenarios', () => {
  it('classifies idempotency scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((command) => command.name === 'simulate-scenario');

    if (!simulate) {
      throw new Error('simulate-scenario command not found');
    }

    const result = await simulate.handler(
      { scenario: 'idempotency idempotent request duplicate replay dedupe path' },
      simulatorContext
    );

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated idempotency idempotent request duplicate replay dedupe path',
      data: {
        scenario: 'idempotency idempotent request duplicate replay dedupe path',
        scenarioKind: 'idempotency',
        result: 'ok',
      },
    });
  });
});
