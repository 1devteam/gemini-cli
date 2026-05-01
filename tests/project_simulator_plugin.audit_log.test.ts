import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin audit-log scenarios', () => {
  it('classifies audit-log scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'audit log immutable audit trail compliance event history path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated audit log immutable audit trail compliance event history path',
      data: { scenario: 'audit log immutable audit trail compliance event history path', scenarioKind: 'audit-log', result: 'ok' },
    });
  });
});
