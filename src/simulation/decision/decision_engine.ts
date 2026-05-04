import type {
  SimulationDecision,
  SimulationRiskLevel,
  SimulationReviewPriority,
  SimulationScenarioKind,
  SimulationConfidence,
} from '../../../simulation_policy.js';

function decide(riskLevel: SimulationRiskLevel): SimulationDecision {
  if (riskLevel === 'high') return 'block-until-reviewed';
  if (riskLevel === 'medium') return 'proceed-with-caution';
  return 'proceed';
}

function buildDecisionSummary(
  decision: SimulationDecision,
  riskLevel: SimulationRiskLevel,
  scenarioKind: SimulationScenarioKind,
  confidence: SimulationConfidence,
): string {
  return `${decision}: ${riskLevel} risk ${scenarioKind} scenario with ${confidence} confidence`;
}

function buildDecisionRationale(riskLevel: SimulationRiskLevel): string {
  if (riskLevel === 'high') return 'Multiple policy risk signals require review before execution.';
  if (riskLevel === 'medium') return 'One policy risk signal was detected.';
  return 'No policy risk signals were detected.';
}

function assignReviewPriority(riskLevel: SimulationRiskLevel): SimulationReviewPriority {
  if (riskLevel === 'high') return 'immediate';
  if (riskLevel === 'medium') return 'normal';
  return 'none';
}

export {
  decide,
  buildDecisionSummary,
  buildDecisionRationale,
  assignReviewPriority,
};
