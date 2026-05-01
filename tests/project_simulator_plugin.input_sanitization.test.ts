import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin input-sanitization scenarios', () => {
  it('classifies input-sanitization scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'input sanitization user input escaping validation injection prevention path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated input sanitization user input escaping validation injection prevention path',
      data: { scenario: 'input sanitization user input escaping validation injection prevention path', scenarioKind: 'input-sanitization', result: 'ok' },
    });
  });
});
