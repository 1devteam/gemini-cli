import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin promo-abuse scenarios', () => {
  it('classifies promo-abuse scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'promo abuse coupon stacking referral abuse discount exploit free trial farming path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('promo-abuse');
  });
});
