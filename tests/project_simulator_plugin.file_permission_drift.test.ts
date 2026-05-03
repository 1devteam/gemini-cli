import { describe, expect, it } from 'vitest';
import createProjectSimulatorPlugin from '../project_simulator_plugin.js';

const ctx = { cwd: process.cwd(), fs: { exists: async () => false, readFile: async () => '{}' } } as never;

describe('ProjectSimulatorPlugin file-permission-drift scenarios', () => {
  it('classifies file-permission-drift scenario through simulator output', async () => {
    const plugin = createProjectSimulatorPlugin();
    const simulate = plugin.getCommands().find((c) => c.name === 'simulate-scenario');

    if (!simulate) throw new Error('simulate-scenario command not found');

    const result = await simulate.handler(
      { scenario: 'file permission drift world writable chmod change ownership mismatch sensitive file mode path' },
      ctx,
    );

    expect(result.data.scenarioKind).toBe('file-permission-drift');
  });
});
