import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin webhook-signature-bypass scenarios', () => {
  it('classifies webhook-signature-bypass scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'webhook signature bypass missing hmac verification replayed webhook unsigned payload path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('webhook-signature-bypass');
  });
});
