import type {
  SimulationEvidenceBasis,
  SimulationPolicyInput,
} from '../../../simulation_policy.js';

interface SimulationPressureContext {
  input: SimulationPolicyInput;
  scenarioKind: string;
}

interface SimulationPressureRule {
  id: string;
  when: (context: SimulationPressureContext) => boolean;
  signal: string;
  evidence: SimulationEvidenceBasis;
  recommendation: string;
}

const environmentPressureRules: SimulationPressureRule[] = [
  {
    id: 'load-memory-pressure',
    when: ({ input, scenarioKind }) => scenarioKind === 'load' && input.memoryMB < 8192,
    signal: 'load-memory-pressure',
    evidence: 'environment-profile',
    recommendation: 'Increase memory headroom for load conditions.',
  },
  {
    id: 'scaling-cpu-pressure',
    when: ({ input, scenarioKind }) => scenarioKind === 'scaling' && input.cpuCount < 4,
    signal: 'scaling-cpu-pressure',
    evidence: 'environment-profile',
    recommendation: 'Ensure sufficient CPU for scaling scenarios.',
  },
  {
    id: 'latency-cpu-pressure',
    when: ({ input, scenarioKind }) => scenarioKind === 'latency' && input.cpuCount < 4,
    signal: 'latency-cpu-pressure',
    evidence: 'environment-profile',
    recommendation: 'Validate latency under CPU-constrained conditions.',
  },
  {
    id: 'cold-start-memory-pressure',
    when: ({ input, scenarioKind }) => scenarioKind === 'cold-start' && input.memoryMB < 8192,
    signal: 'cold-start-memory-pressure',
    evidence: 'environment-profile',
    recommendation: 'Ensure memory availability during cold starts.',
  },

  {
    id: 'low-cpu',
    when: ({ input }) => input.cpuCount < 2,
    signal: 'low-cpu',
    evidence: 'environment-profile',
    recommendation: 'Reduce parallel workload or use a machine with more CPU cores.',
  },
  {
    id: 'low-memory',
    when: ({ input }) => input.memoryMB < 4096,
    signal: 'low-memory',
    evidence: 'environment-profile',
    recommendation: 'Lower memory pressure or use a machine with at least 4GB RAM.',
  },
];

function applyPressureRules(
  rules: SimulationPressureRule[],
  context: SimulationPressureContext,
  signals: string[],
  evidenceBasis: SimulationEvidenceBasis[],
  recommendations: string[],
  addEvidence: (evidenceBasis: SimulationEvidenceBasis[], evidence: SimulationEvidenceBasis) => void,
): void {
  for (const rule of rules) {
    if (!rule.when(context)) continue;

    signals.push(rule.signal);
    addEvidence(evidenceBasis, rule.evidence);
    recommendations.push(rule.recommendation);
  }
}

function applyEnvironmentPressureRules(
  input: SimulationPolicyInput,
  scenarioKind: string,
  signals: string[],
  evidenceBasis: SimulationEvidenceBasis[],
  recommendations: string[],
  addEvidence: (evidenceBasis: SimulationEvidenceBasis[], evidence: SimulationEvidenceBasis) => void,
): void {
  applyPressureRules(
    environmentPressureRules,
    { input, scenarioKind },
    signals,
    evidenceBasis,
    recommendations,
    addEvidence,
  );
}

export {
  applyEnvironmentPressureRules,
};
