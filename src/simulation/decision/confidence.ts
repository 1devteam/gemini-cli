import type {
  SimulationEvidenceBasis,
  SimulationConfidence,
  SimulationDecision,
  SimulationActionStatus,
  SimulationActionPlanStep,
  SimulationDecisionTrace,
  SimulationRiskLevel,
  SimulationScenarioKind,
  SimulationRiskTrace,
  SimulationGuidanceTrace,
  SimulationReviewPriority,
} from '../../../simulation_policy.js';

function scoreConfidence(evidenceBasis: SimulationEvidenceBasis[], signals: string[]): SimulationConfidence {
  const concreteEvidenceCount = evidenceBasis.filter((evidence) => evidence !== 'inferred-policy').length;

  if (concreteEvidenceCount >= 3) return 'high';
  if (concreteEvidenceCount >= 2 || signals.includes('high-dependency-surface')) return 'medium';
  return 'low';
}

function selectBlockingSignals(decision: SimulationDecision, signals: string[]): string[] {
  if (decision !== 'block-until-reviewed') return [];
  return [...signals];
}

function selectMonitoringSignals(decision: SimulationDecision, signals: string[]): string[] {
  if (decision !== 'proceed-with-caution') return [];
  return [...signals];
}

function actionStatusForDecision(decision: SimulationDecision): SimulationActionStatus {
  if (decision === 'block-until-reviewed') return 'required';
  if (decision === 'proceed-with-caution') return 'recommended';
  return 'ready';
}

function buildActionPlan(decision: SimulationDecision, nextActions: string[]): SimulationActionPlanStep[] {
  const status = actionStatusForDecision(decision);
  return nextActions.map((action, index) => ({ order: index + 1, action, status }));
}

export {
  scoreConfidence,
  selectBlockingSignals,
  selectMonitoringSignals,
  actionStatusForDecision,
  buildActionPlan,
};
