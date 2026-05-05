import type {
  SimulationDecision,
  SimulationDecisionTrace,
  SimulationReviewPriority,
  SimulationConfidence,
  SimulationActionPlanStep,
  SimulationRiskLevel,
  SimulationScenarioKind,
  SimulationEvidenceBasis,
  SimulationRiskTrace,
  SimulationGuidanceTrace,
} from '../../../simulation_policy.js';

function buildDecisionTrace(
  decision: SimulationDecision,
  decisionSummary: string,
  decisionRationale: string,
  reviewPriority: SimulationReviewPriority,
  confidence: SimulationConfidence,
  blockingSignals: string[],
  monitoringSignals: string[],
  actionPlan: SimulationActionPlanStep[],
): SimulationDecisionTrace {
  return {
    decision,
    summary: decisionSummary,
    rationale: decisionRationale,
    reviewPriority,
    confidence,
    blockingSignals,
    monitoringSignals,
    actionPlan,
  };
}

function buildRiskTrace(
  riskLevel: SimulationRiskLevel,
  scenarioKind: SimulationScenarioKind,
  signals: string[],
  evidenceBasis: SimulationEvidenceBasis[],
): SimulationRiskTrace {
  return {
    riskLevel,
    scenarioKind,
    signals,
    evidenceBasis,
  };
}

function buildGuidanceTrace(
  assumptions: string[],
  recommendations: string[],
  nextActions: string[],
): SimulationGuidanceTrace {
  return {
    assumptions,
    recommendations,
    nextActions,
  };
}
export {
  buildDecisionTrace,
  buildRiskTrace,
  buildGuidanceTrace,
};
