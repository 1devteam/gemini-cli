export type SimulationRiskLevel = 'low' | 'medium' | 'high';

export interface SimulationPolicyInput {
  scenario: string;
  cpuCount: number;
  memoryMB: number;
  dependencyCount: number;
}

export interface SimulationPolicyResult {
  riskLevel: SimulationRiskLevel;
  signals: string[];
  recommendations: string[];
}

export function evaluateSimulationPolicy(input: SimulationPolicyInput): SimulationPolicyResult {
  const signals: string[] = [];
  const recommendations: string[] = [];
  const scenario = input.scenario.toLowerCase();

  if (input.cpuCount < 2) {
    signals.push('low-cpu');
    recommendations.push('Reduce parallel workload or use a machine with more CPU cores.');
  }

  if (input.memoryMB < 4096) {
    signals.push('low-memory');
    recommendations.push('Lower memory pressure or use a machine with at least 4GB RAM.');
  }

  if (scenario.includes('load') && input.memoryMB < 8192) {
    signals.push('load-memory-pressure');
    recommendations.push('Avoid load-heavy scenarios on machines with less than 8GB RAM.');
  }

  if (input.dependencyCount > 100) {
    signals.push('high-dependency-surface');
    recommendations.push('Review dependency surface before scaling or deployment simulations.');
  }

  if (recommendations.length === 0) {
    recommendations.push('No immediate constraint recommendations detected.');
  }

  return {
    riskLevel: signals.length >= 2 ? 'high' : signals.length === 1 ? 'medium' : 'low',
    signals,
    recommendations,
  };
}
