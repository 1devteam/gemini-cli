export type SimulationRiskLevel = 'low' | 'medium' | 'high';
export type SimulationScenarioKind = 'load' | 'failure' | 'scaling' | 'security' | 'general';

export interface SimulationPolicyInput {
  scenario: string;
  cpuCount: number;
  memoryMB: number;
  dependencyCount: number;
}

export interface SimulationPolicyResult {
  riskLevel: SimulationRiskLevel;
  scenarioKind: SimulationScenarioKind;
  signals: string[];
  recommendations: string[];
}

function classifyScenario(scenario: string): SimulationScenarioKind {
  const normalized = scenario.toLowerCase();

  if (normalized.includes('load')) return 'load';
  if (normalized.includes('failure')) return 'failure';
  if (normalized.includes('scaling') || normalized.includes('scale')) return 'scaling';
  if (normalized.includes('security')) return 'security';
  return 'general';
}

export function evaluateSimulationPolicy(input: SimulationPolicyInput): SimulationPolicyResult {
  const signals: string[] = [];
  const recommendations: string[] = [];
  const scenarioKind = classifyScenario(input.scenario);

  if (input.cpuCount < 2) {
    signals.push('low-cpu');
    recommendations.push('Reduce parallel workload or use a machine with more CPU cores.');
  }

  if (input.memoryMB < 4096) {
    signals.push('low-memory');
    recommendations.push('Lower memory pressure or use a machine with at least 4GB RAM.');
  }

  if (scenarioKind === 'load' && input.memoryMB < 8192) {
    signals.push('load-memory-pressure');
    recommendations.push('Avoid load-heavy scenarios on machines with less than 8GB RAM.');
  }

  if (scenarioKind === 'scaling' && input.cpuCount < 4) {
    signals.push('scaling-cpu-pressure');
    recommendations.push('Use at least 4 CPU cores before scaling simulations.');
  }

  if (scenarioKind === 'security' && input.dependencyCount > 0) {
    signals.push('security-dependency-review');
    recommendations.push('Review dependency inventory before security simulations.');
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
    scenarioKind,
    signals,
    recommendations,
  };
}
