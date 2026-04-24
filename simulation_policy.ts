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
}

export function evaluateSimulationPolicy(input: SimulationPolicyInput): SimulationPolicyResult {
  const signals: string[] = [];
  const scenario = input.scenario.toLowerCase();

  if (input.cpuCount < 2) signals.push('low-cpu');
  if (input.memoryMB < 4096) signals.push('low-memory');
  if (scenario.includes('load') && input.memoryMB < 8192) signals.push('load-memory-pressure');
  if (input.dependencyCount > 100) signals.push('high-dependency-surface');

  return {
    riskLevel: signals.length >= 2 ? 'high' : signals.length === 1 ? 'medium' : 'low',
    signals,
  };
}
