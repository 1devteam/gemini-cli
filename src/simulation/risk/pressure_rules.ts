import type {
  SimulationEvidenceBasis,
  SimulationPolicyInput,
} from '../../../simulation_policy.js';

interface SimulationPressureContext {
  input: SimulationPolicyInput;
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
  signals: string[],
  evidenceBasis: SimulationEvidenceBasis[],
  recommendations: string[],
  addEvidence: (evidenceBasis: SimulationEvidenceBasis[], evidence: SimulationEvidenceBasis) => void,
): void {
  applyPressureRules(
    environmentPressureRules,
    { input },
    signals,
    evidenceBasis,
    recommendations,
    addEvidence,
  );
}

export {
  applyEnvironmentPressureRules,
};
