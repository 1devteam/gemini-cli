import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const simulatorContext = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin certificate-expiry scenarios', () => {
  it('classifies certificate-expiry scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');
    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler({ scenario: 'certificate expiry tls certificate renewal cert rotation path' }, simulatorContext);

    expect(result).toMatchObject({
      success: true,
      message: 'Simulated certificate expiry tls certificate renewal cert rotation path',
      data: { scenario: 'certificate expiry tls certificate renewal cert rotation path', scenarioKind: 'certificate-expiry', result: 'ok' },
    });
  });
});
