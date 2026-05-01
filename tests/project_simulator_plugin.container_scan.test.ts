import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin container-scan scenarios', () => {
  it('classifies container-scan scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'container scan image vulnerability layer scan registry assessment path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated container scan image vulnerability layer scan registry assessment path',
      data: { scenario: 'container scan image vulnerability layer scan registry assessment path', scenarioKind: 'container-scan', result: 'ok' },
    });
  });
});
