export const SIMULATION_POLICY_VERSION = '2026-04-phase3';
export const SIMULATION_OUTPUT_SCHEMA_VERSION = 'simulation-output-v1';
export const SIMULATION_OUTPUT_SCHEMA = [
  'outputSchemaVersion',
  'outputSchema',
  'schemaChecksum',
  'schemaTrace',
  'simulationTrace',
  'policyVersion',
  'policyTags',
  'policyChecksum',
  'policyTrace',
  'riskLevel',
  'riskTrace',
  'scenarioKind',
  'decision',
  'decisionTrace',
  'decisionSummary',
  'decisionRationale',
  'reviewPriority',
  'confidence',
  'signals',
  'blockingSignals',
  'monitoringSignals',
  'actionPlan',
  'guidanceTrace',
  'evidenceBasis',
  'assumptions',
  'recommendations',
  'nextActions',
];

export type SimulationRiskLevel = 'low' | 'medium' | 'high';
export type SimulationScenarioKind =
  | 'load'
  | 'failure'
  | 'scaling'
  | 'security'
  | 'config'
  | 'retry'
  | 'latency'
  | 'throughput'
  | 'cold-start'
  | 'cache'
  | 'database'
  | 'network'
  | 'queue'
  | 'storage'
  | 'auth'
  | 'rate-limit'
  | 'general';
export type SimulationDecision = 'proceed' | 'proceed-with-caution' | 'block-until-reviewed';
export type SimulationEvidenceBasis = 'environment-profile' | 'dependency-summary' | 'scenario-keyword' | 'inferred-policy';
export type SimulationConfidence = 'low' | 'medium' | 'high';
export type SimulationReviewPriority = 'none' | 'normal' | 'immediate';
export type SimulationActionStatus = 'ready' | 'recommended' | 'required';

export interface SimulationActionPlanStep {
  order: number;
  action: string;
  status: SimulationActionStatus;
}

export interface SimulationPolicyTrace {
  version: string;
  tags: string[];
  checksum: string;
}

export interface SimulationSchemaTrace {
  version: string;
  fields: string[];
  checksum: string;
}

export interface SimulationDecisionTrace {
  decision: SimulationDecision;
  summary: string;
  rationale: string;
  reviewPriority: SimulationReviewPriority;
  confidence: SimulationConfidence;
  blockingSignals: string[];
  monitoringSignals: string[];
  actionPlan: SimulationActionPlanStep[];
}

export interface SimulationRiskTrace {
  riskLevel: SimulationRiskLevel;
  scenarioKind: SimulationScenarioKind;
  signals: string[];
  evidenceBasis: SimulationEvidenceBasis[];
}

export interface SimulationGuidanceTrace {
  assumptions: string[];
  recommendations: string[];
  nextActions: string[];
}

export interface SimulationTrace {
  schema: SimulationSchemaTrace;
  policy: SimulationPolicyTrace;
  risk: SimulationRiskTrace;
  decision: SimulationDecisionTrace;
  guidance: SimulationGuidanceTrace;
}

export interface SimulationPolicyInput {
  scenario: string;
  cpuCount: number;
  memoryMB: number;
  dependencyCount: number;
}

export interface SimulationPolicyResult {
  outputSchemaVersion: string;
  outputSchema: string[];
  schemaChecksum: string;
  schemaTrace: SimulationSchemaTrace;
  simulationTrace: SimulationTrace;
  policyVersion: string;
  policyTags: string[];
  policyChecksum: string;
  policyTrace: SimulationPolicyTrace;
  riskLevel: SimulationRiskLevel;
  riskTrace: SimulationRiskTrace;
  scenarioKind: SimulationScenarioKind;
  decision: SimulationDecision;
  decisionTrace: SimulationDecisionTrace;
  decisionSummary: string;
  decisionRationale: string;
  reviewPriority: SimulationReviewPriority;
  confidence: SimulationConfidence;
  signals: string[];
  blockingSignals: string[];
  monitoringSignals: string[];
  actionPlan: SimulationActionPlanStep[];
  guidanceTrace: SimulationGuidanceTrace;
  evidenceBasis: SimulationEvidenceBasis[];
  assumptions: string[];
  recommendations: string[];
  nextActions: string[];
}

function classifyScenario(scenario: string): SimulationScenarioKind {
  const normalized = scenario.toLowerCase();

  if (normalized.includes('retry') || normalized.includes('storm')) return 'retry';
  if (normalized.includes('cold-start') || normalized.includes('cold start') || normalized.includes('startup')) return 'cold-start';
  if (normalized.includes('cache') || normalized.includes('invalidation') || normalized.includes('warmup')) return 'cache';
  if (normalized.includes('database') || normalized.includes('connection pool') || normalized.includes('query latency')) return 'database';
  if (normalized.includes('network') || normalized.includes('upstream timeout') || normalized.includes('partition')) return 'network';
  if (normalized.includes('queue') || normalized.includes('backlog') || normalized.includes('worker drain')) return 'queue';
  if (normalized.includes('storage') || normalized.includes('object store') || normalized.includes('write path')) return 'storage';
  if (normalized.includes('auth') || normalized.includes('token') || normalized.includes('permission')) return 'auth';
  if (normalized.includes('rate-limit') || normalized.includes('rate limit') || normalized.includes('throttl') || normalized.includes('quota')) return 'rate-limit';
  if (normalized.includes('latency') || normalized.includes('tail-latency') || normalized.includes('response-time')) return 'latency';
  if (normalized.includes('throughput') || normalized.includes('request volume') || normalized.includes('rps')) return 'throughput';
  if (normalized.includes('config') || normalized.includes('env')) return 'config';
  if (normalized.includes('load')) return 'load';
  if (normalized.includes('failure') || normalized.includes('outage')) return 'failure';
  if (normalized.includes('scaling') || normalized.includes('scale')) return 'scaling';
  if (normalized.includes('security')) return 'security';
  return 'general';
}

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

function buildSimulationTrace(
  schemaTrace: SimulationSchemaTrace,
  policyTrace: SimulationPolicyTrace,
  riskTrace: SimulationRiskTrace,
  decisionTrace: SimulationDecisionTrace,
  guidanceTrace: SimulationGuidanceTrace,
): SimulationTrace {
  return {
    schema: schemaTrace,
    policy: policyTrace,
    risk: riskTrace,
    decision: decisionTrace,
    guidance: guidanceTrace,
  };
}

function buildPolicyTags(
  policyVersion: string,
  scenarioKind: SimulationScenarioKind,
  riskLevel: SimulationRiskLevel,
  decision: SimulationDecision,
  confidence: SimulationConfidence,
  reviewPriority: SimulationReviewPriority,
): string[] {
  return [
    `version:${policyVersion}`,
    `scenario:${scenarioKind}`,
    `risk:${riskLevel}`,
    `decision:${decision}`,
    `confidence:${confidence}`,
    `review:${reviewPriority}`,
  ];
}

function buildPolicyChecksum(policyTags: string[]): string {
  return policyTags.join('|');
}

function buildPolicyTrace(policyVersion: string, policyTags: string[], policyChecksum: string): SimulationPolicyTrace {
  return {
    version: policyVersion,
    tags: policyTags,
    checksum: policyChecksum,
  };
}

function buildSchemaChecksum(outputSchema: string[]): string {
  return outputSchema.join('|');
}

function buildSchemaTrace(
  outputSchemaVersion: string,
  outputSchema: string[],
  schemaChecksum: string,
): SimulationSchemaTrace {
  return {
    version: outputSchemaVersion,
    fields: outputSchema,
    checksum: schemaChecksum,
  };
}

function addEvidence(evidenceBasis: SimulationEvidenceBasis[], evidence: SimulationEvidenceBasis): void {
  if (!evidenceBasis.includes(evidence)) {
    evidenceBasis.push(evidence);
  }
}

function addAssumption(assumptions: string[], assumption: string): void {
  if (!assumptions.includes(assumption)) {
    assumptions.push(assumption);
  }
}

function buildNextActions(decision: SimulationDecision, signals: string[]): string[] {
  if (decision === 'block-until-reviewed') {
    return ['Review blocking signals before execution.', 'Reduce constraint pressure or provision stronger runtime resources.'];
  }

  if (decision === 'proceed-with-caution') {
    const nextActions = ['Proceed with monitoring enabled.', 'Capture metrics for follow-up comparison.'];

    if (signals.includes('config-readiness-review')) {
      nextActions.push('Verify required configuration sources before execution.');
    }

    if (signals.includes('retry-storm-risk')) {
      nextActions.push('Add retry limits and backoff validation before execution.');
    }

    if (signals.includes('latency-cpu-pressure')) {
      nextActions.push('Capture latency baseline and tail-latency metrics before execution.');
    }

    if (signals.includes('throughput-dependency-pressure')) {
      nextActions.push('Capture throughput baseline and dependency fan-out metrics before execution.');
    }

    if (signals.includes('cold-start-memory-pressure')) {
      nextActions.push('Capture startup baseline and initialization-path metrics before execution.');
    }

    if (signals.includes('cache-dependency-pressure')) {
      nextActions.push('Capture cache baseline and invalidation metrics before execution.');
    }

    if (signals.includes('database-dependency-pressure')) {
      nextActions.push('Capture database baseline and connection-pool metrics before execution.');
    }

    if (signals.includes('network-dependency-pressure')) {
      nextActions.push('Capture network baseline and upstream timeout metrics before execution.');
    }

    if (signals.includes('queue-dependency-pressure')) {
      nextActions.push('Capture queue baseline and worker drain metrics before execution.');
    }

    if (signals.includes('storage-dependency-pressure')) {
      nextActions.push('Capture storage baseline and write-latency metrics before execution.');
    }

    if (signals.includes('auth-dependency-pressure')) {
      nextActions.push('Capture auth baseline and permission-check metrics before execution.');
    }

    if (signals.includes('rate-limit-dependency-pressure')) {
      nextActions.push('Capture rate-limit baseline and quota enforcement metrics before execution.');
    }

    return nextActions;
  }

  return ['Proceed with baseline simulation run.'];
}

export function evaluateSimulationPolicy(input: SimulationPolicyInput): SimulationPolicyResult {
  const signals: string[] = [];
  const evidenceBasis: SimulationEvidenceBasis[] = [];
  const assumptions: string[] = [
    'Policy result is inferred from scenario text, dependency count, and environment summary.',
  ];
  const recommendations: string[] = [];
  const scenarioKind = classifyScenario(input.scenario);

  if (scenarioKind !== 'general') {
    addEvidence(evidenceBasis, 'scenario-keyword');
  }

  if (input.cpuCount < 2) {
    signals.push('low-cpu');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Reduce parallel workload or use a machine with more CPU cores.');
  }

  if (input.memoryMB < 4096) {
    signals.push('low-memory');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Lower memory pressure or use a machine with at least 4GB RAM.');
  }

  if (scenarioKind === 'load') {
    addAssumption(assumptions, 'Load scenario risk is inferred from available memory and dependency surface, not measured throughput.');
  }

  if (scenarioKind === 'load' && input.memoryMB < 8192) {
    signals.push('load-memory-pressure');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Avoid load-heavy scenarios on machines with less than 8GB RAM.');
  }

  if (scenarioKind === 'scaling') {
    addAssumption(assumptions, 'Scaling pressure is inferred from CPU count, not live horizontal scaling behavior.');
  }

  if (scenarioKind === 'scaling' && input.cpuCount < 4) {
    signals.push('scaling-cpu-pressure');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Use at least 4 CPU cores before scaling simulations.');
  }

  if (scenarioKind === 'latency') {
    addAssumption(assumptions, 'Latency pressure is inferred from CPU availability, not measured response-time percentiles.');
  }

  if (scenarioKind === 'latency' && input.cpuCount < 4) {
    signals.push('latency-cpu-pressure');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Capture latency baseline and tail-latency metrics before runtime simulation.');
  }

  if (scenarioKind === 'throughput') {
    addAssumption(assumptions, 'Throughput pressure is inferred from dependency surface, not measured requests per second.');
  }

  if (scenarioKind === 'throughput' && input.dependencyCount > 50) {
    signals.push('throughput-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Review dependency fan-out before throughput simulations.');
  }

  if (scenarioKind === 'cold-start') {
    addAssumption(assumptions, 'Cold-start pressure is inferred from available memory, not measured initialization latency.');
  }

  if (scenarioKind === 'cold-start' && input.memoryMB < 8192) {
    signals.push('cold-start-memory-pressure');
    addEvidence(evidenceBasis, 'environment-profile');
    recommendations.push('Capture startup baseline and initialization-path metrics before runtime simulation.');
  }

  if (scenarioKind === 'cache') {
    addAssumption(assumptions, 'Cache behavior is inferred from scenario wording and dependency surface, not measured hit rate.');
  }

  if (scenarioKind === 'cache' && input.dependencyCount > 50) {
    signals.push('cache-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cache hit-rate and invalidation metrics before runtime simulation.');
  }

  if (scenarioKind === 'database') {
    addAssumption(
      assumptions,
      'Database behavior is inferred from scenario wording and dependency surface, not measured query latency or pool utilization.',
    );
  }

  if (scenarioKind === 'database' && input.dependencyCount > 50) {
    signals.push('database-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture query latency and connection-pool metrics before runtime simulation.');
  }

  if (scenarioKind === 'network') {
    addAssumption(
      assumptions,
      'Network behavior is inferred from scenario wording and dependency surface, not measured packet loss or timeout telemetry.',
    );
  }

  if (scenarioKind === 'network' && input.dependencyCount > 50) {
    signals.push('network-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture upstream timeout and dependency-path metrics before runtime simulation.');
  }

  if (scenarioKind === 'queue') {
    addAssumption(
      assumptions,
      'Queue behavior is inferred from scenario wording and dependency surface, not measured backlog depth or worker drain rate.',
    );
  }

  if (scenarioKind === 'queue' && input.dependencyCount > 50) {
    signals.push('queue-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture queue depth and worker drain metrics before runtime simulation.');
  }

  if (scenarioKind === 'storage') {
    addAssumption(
      assumptions,
      'Storage behavior is inferred from scenario wording and dependency surface, not measured disk or object-store latency.',
    );
  }

  if (scenarioKind === 'storage' && input.dependencyCount > 50) {
    signals.push('storage-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture write latency and storage dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'auth') {
    addAssumption(
      assumptions,
      'Auth behavior is inferred from scenario wording and dependency surface, not completed identity-provider or permission testing.',
    );
  }

  if (scenarioKind === 'auth' && input.dependencyCount > 50) {
    signals.push('auth-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture token validation and permission-check metrics before runtime simulation.');
  }

  if (scenarioKind === 'rate-limit') {
    addAssumption(
      assumptions,
      'Rate-limit behavior is inferred from scenario wording and dependency surface, not measured throttle or quota telemetry.',
    );
  }

  if (scenarioKind === 'rate-limit' && input.dependencyCount > 50) {
    signals.push('rate-limit-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture throttle rate and quota enforcement metrics before runtime simulation.');
  }

  if (scenarioKind === 'security') {
    addAssumption(assumptions, 'Security scenario review is based on dependency presence, not a completed security audit.');
  }

  if (scenarioKind === 'security' && input.dependencyCount > 0) {
    signals.push('security-dependency-review');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Review dependency inventory before security simulations.');
  }

  if (scenarioKind === 'config') {
    signals.push('config-readiness-review');
    addAssumption(assumptions, 'Configuration readiness is inferred from scenario wording, not filesystem validation.');
    recommendations.push('Verify required configuration sources before runtime simulation.');
  }

  if (scenarioKind === 'retry') {
    signals.push('retry-storm-risk');
    addAssumption(assumptions, 'Retry storm risk is inferred from scenario wording, not observed retry telemetry.');
    recommendations.push('Bound retries and validate backoff behavior before failure simulation.');
  }

  if (input.dependencyCount > 100) {
    signals.push('high-dependency-surface');
    addEvidence(evidenceBasis, 'dependency-summary');
    addAssumption(assumptions, 'Dependency risk is inferred from declared dependency count, not vulnerability scan results.');
    recommendations.push('Review dependency surface before scaling or deployment simulations.');
  }

  if (recommendations.length === 0) {
    addEvidence(evidenceBasis, 'inferred-policy');
    recommendations.push('No immediate constraint recommendations detected.');
  }

  const riskLevel: SimulationRiskLevel = signals.length >= 2 ? 'high' : signals.length === 1 ? 'medium' : 'low';
  const decision = decide(riskLevel);
  const decisionRationale = buildDecisionRationale(riskLevel);
  const reviewPriority = assignReviewPriority(riskLevel);
  const confidence = scoreConfidence(evidenceBasis, signals);
  const decisionSummary = buildDecisionSummary(decision, riskLevel, scenarioKind, confidence);
  const blockingSignals = selectBlockingSignals(decision, signals);
  const monitoringSignals = selectMonitoringSignals(decision, signals);
  const nextActions = buildNextActions(decision, signals);
  const actionPlan = buildActionPlan(decision, nextActions);
  const decisionTrace = buildDecisionTrace(
    decision,
    decisionSummary,
    decisionRationale,
    reviewPriority,
    confidence,
    blockingSignals,
    monitoringSignals,
    actionPlan,
  );
  const riskTrace = buildRiskTrace(riskLevel, scenarioKind, signals, evidenceBasis);
  const guidanceTrace = buildGuidanceTrace(assumptions, recommendations, nextActions);
  const policyTags = buildPolicyTags(
    SIMULATION_POLICY_VERSION,
    scenarioKind,
    riskLevel,
    decision,
    confidence,
    reviewPriority,
  );
  const policyChecksum = buildPolicyChecksum(policyTags);
  const policyTrace = buildPolicyTrace(SIMULATION_POLICY_VERSION, policyTags, policyChecksum);
  const schemaChecksum = buildSchemaChecksum(SIMULATION_OUTPUT_SCHEMA);
  const schemaTrace = buildSchemaTrace(SIMULATION_OUTPUT_SCHEMA_VERSION, SIMULATION_OUTPUT_SCHEMA, schemaChecksum);
  const simulationTrace = buildSimulationTrace(schemaTrace, policyTrace, riskTrace, decisionTrace, guidanceTrace);

  return {
    outputSchemaVersion: SIMULATION_OUTPUT_SCHEMA_VERSION,
    outputSchema: SIMULATION_OUTPUT_SCHEMA,
    schemaChecksum,
    schemaTrace,
    simulationTrace,
    policyVersion: SIMULATION_POLICY_VERSION,
    policyTags,
    policyChecksum,
    policyTrace,
    riskLevel,
    riskTrace,
    scenarioKind,
    decision,
    decisionTrace,
    decisionSummary,
    decisionRationale,
    reviewPriority,
    confidence,
    signals,
    blockingSignals,
    monitoringSignals,
    actionPlan,
    guidanceTrace,
    evidenceBasis,
    assumptions,
    recommendations,
    nextActions,
  };
}
