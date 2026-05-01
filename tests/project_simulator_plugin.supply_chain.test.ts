import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin supply-chain scenarios', () => {
  it('classifies supply-chain scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'supply chain build provenance package integrity dependency trust path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated supply chain build provenance package integrity dependency trust path',
      data: { scenario: 'supply chain build provenance package integrity dependency trust path', scenarioKind: 'supply-chain', result: 'ok' },
    });
  });
});
