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
  | 'observability'
  | 'deployment'
  | 'rollback'
  | 'migration'
  | 'multi-tenant'
  | 'scheduler'
  | 'webhook'
  | 'api-contract'
  | 'feature-flag'
  | 'canary'
  | 'blue-green'
  | 'shadow-traffic'
  | 'chaos-testing'
  | 'disaster-recovery'
  | 'data-consistency'
  | 'idempotency'
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
  if (normalized.includes('observability') || normalized.includes('logging') || normalized.includes('metrics') || normalized.includes('tracing')) return 'observability';
  if (normalized.includes('rollback') || normalized.includes('roll back') || normalized.includes('revert')) return 'rollback';
  if (normalized.includes('migration') || normalized.includes('migrate') || normalized.includes('schema change')) return 'migration';
  if (normalized.includes('multi-tenant') || normalized.includes('multitenant') || normalized.includes('tenant isolation') || normalized.includes('tenant')) return 'multi-tenant';
  if (normalized.includes('scheduler') || normalized.includes('schedule') || normalized.includes('cron') || normalized.includes('job')) return 'scheduler';
  if (normalized.includes('webhook') || normalized.includes('callback') || normalized.includes('event delivery') || normalized.includes('endpoint')) return 'webhook';
  if (normalized.includes('api-contract') || normalized.includes('api contract') || normalized.includes('openapi') || normalized.includes('schema compatibility')) return 'api-contract';
  if (normalized.includes('feature-flag') || normalized.includes('feature flag') || normalized.includes('toggle') || normalized.includes('experiment')) return 'feature-flag';
  if (normalized.includes('canary') || normalized.includes('progressive rollout') || normalized.includes('traffic slice')) return 'canary';
  if (normalized.includes('blue-green') || normalized.includes('blue green') || normalized.includes('blue environment') || normalized.includes('green environment')) return 'blue-green';
  if (normalized.includes('shadow-traffic') || normalized.includes('shadow traffic') || normalized.includes('traffic mirror') || normalized.includes('mirrored traffic')) return 'shadow-traffic';
  if (normalized.includes('chaos testing') || normalized.includes('chaos-testing') || normalized.includes('fault injection') || normalized.includes('failure injection')) return 'chaos-testing';
  if (normalized.includes('disaster recovery') || normalized.includes('disaster-recovery') || normalized.includes('failover') || normalized.includes('backup recovery')) return 'disaster-recovery';
  if (normalized.includes('data consistency') || normalized.includes('data-consistency') || normalized.includes('eventual consistency') || normalized.includes('replication lag') || normalized.includes('read repair')) return 'data-consistency';
  if (normalized.includes('idempotency') || normalized.includes('idempotent') || normalized.includes('duplicate replay') || normalized.includes('duplicate request') || normalized.includes('dedupe')) return 'idempotency';
  if (normalized.includes('deployment') || normalized.includes('deploy') || normalized.includes('release')) return 'deployment';
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

    if (signals.includes('observability-dependency-pressure')) {
      nextActions.push('Capture observability baseline and telemetry coverage metrics before execution.');
    }

    if (signals.includes('deployment-dependency-pressure')) {
      nextActions.push('Capture deployment baseline and rollout health metrics before execution.');
    }

    if (signals.includes('rollback-dependency-pressure')) {
      nextActions.push('Capture rollback baseline and recovery health metrics before execution.');
    }

    if (signals.includes('migration-dependency-pressure')) {
      nextActions.push('Capture migration baseline and data integrity metrics before execution.');
    }

    if (signals.includes('multi-tenant-dependency-pressure')) {
      nextActions.push('Capture multi-tenant baseline and tenant isolation metrics before execution.');
    }

    if (signals.includes('scheduler-dependency-pressure')) {
      nextActions.push('Capture scheduler baseline and job timing metrics before execution.');
    }

    if (signals.includes('webhook-dependency-pressure')) {
      nextActions.push('Capture webhook baseline and delivery reliability metrics before execution.');
    }

    if (signals.includes('api-contract-dependency-pressure')) {
      nextActions.push('Capture api-contract baseline and compatibility metrics before execution.');
    }

    if (signals.includes('feature-flag-dependency-pressure')) {
      nextActions.push('Capture feature-flag baseline and rollout safety metrics before execution.');
    }

    if (signals.includes('canary-dependency-pressure')) {
      nextActions.push('Capture canary baseline and progressive rollout metrics before execution.');
    }

    if (signals.includes('blue-green-dependency-pressure')) {
      nextActions.push('Capture blue-green baseline and cutover health metrics before execution.');
    }

    if (signals.includes('shadow-traffic-dependency-pressure')) {
      nextActions.push('Capture shadow-traffic baseline and mirrored request metrics before execution.');
    }

    if (signals.includes('chaos-testing-dependency-pressure')) {
      nextActions.push('Capture chaos-testing baseline and fault injection blast-radius metrics before execution.');
    }

    if (signals.includes('disaster-recovery-dependency-pressure')) {
      nextActions.push('Capture disaster-recovery baseline and recovery objective metrics before execution.');
    }

    if (signals.includes('data-consistency-dependency-pressure')) {
      nextActions.push('Capture data-consistency baseline and replication consistency metrics before execution.');
    }

    if (signals.includes('idempotency-dependency-pressure')) {
      nextActions.push('Capture idempotency baseline and duplicate request metrics before execution.');
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

  if (scenarioKind === 'observability') {
    addAssumption(
      assumptions,
      'Observability behavior is inferred from scenario wording and dependency surface, not measured log, metric, or trace telemetry.',
    );
  }

  if (scenarioKind === 'observability' && input.dependencyCount > 50) {
    signals.push('observability-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture logging, metrics, and tracing coverage before runtime simulation.');
  }

  if (scenarioKind === 'deployment') {
    addAssumption(
      assumptions,
      'Deployment behavior is inferred from scenario wording and dependency surface, not measured rollout or release telemetry.',
    );
  }

  if (scenarioKind === 'deployment' && input.dependencyCount > 50) {
    signals.push('deployment-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture rollout health and release dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'rollback') {
    addAssumption(
      assumptions,
      'Rollback behavior is inferred from scenario wording and dependency surface, not measured revert or recovery telemetry.',
    );
  }

  if (scenarioKind === 'rollback' && input.dependencyCount > 50) {
    signals.push('rollback-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture rollback readiness and recovery dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'migration') {
    addAssumption(
      assumptions,
      'Migration behavior is inferred from scenario wording and dependency surface, not measured data movement or schema telemetry.',
    );
  }

  if (scenarioKind === 'migration' && input.dependencyCount > 50) {
    signals.push('migration-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture migration readiness and schema dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'multi-tenant') {
    addAssumption(
      assumptions,
      'Multi-tenant behavior is inferred from scenario wording and dependency surface, not measured tenant isolation or noisy-neighbor telemetry.',
    );
  }

  if (scenarioKind === 'multi-tenant' && input.dependencyCount > 50) {
    signals.push('multi-tenant-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture tenant isolation and shared-resource dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'scheduler') {
    addAssumption(
      assumptions,
      'Scheduler behavior is inferred from scenario wording and dependency surface, not measured job timing or dispatch telemetry.',
    );
  }

  if (scenarioKind === 'scheduler' && input.dependencyCount > 50) {
    signals.push('scheduler-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture job dispatch and schedule drift dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'webhook') {
    addAssumption(
      assumptions,
      'Webhook behavior is inferred from scenario wording and dependency surface, not measured callback delivery or endpoint telemetry.',
    );
  }

  if (scenarioKind === 'webhook' && input.dependencyCount > 50) {
    signals.push('webhook-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture callback delivery and endpoint dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'api-contract') {
    addAssumption(
      assumptions,
      'API contract behavior is inferred from scenario wording and dependency surface, not measured schema compatibility or consumer telemetry.',
    );
  }

  if (scenarioKind === 'api-contract' && input.dependencyCount > 50) {
    signals.push('api-contract-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture contract compatibility and schema dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'feature-flag') {
    addAssumption(
      assumptions,
      'Feature-flag behavior is inferred from scenario wording and dependency surface, not measured rollout, toggle, or experiment telemetry.',
    );
  }

  if (scenarioKind === 'feature-flag' && input.dependencyCount > 50) {
    signals.push('feature-flag-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture flag rollout and toggle dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'canary') {
    addAssumption(
      assumptions,
      'Canary behavior is inferred from scenario wording and dependency surface, not measured progressive rollout or traffic-slice telemetry.',
    );
  }

  if (scenarioKind === 'canary' && input.dependencyCount > 50) {
    signals.push('canary-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture canary health and traffic-slice dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'blue-green') {
    addAssumption(
      assumptions,
      'Blue-green behavior is inferred from scenario wording and dependency surface, not measured environment cutover or traffic-switch telemetry.',
    );
  }

  if (scenarioKind === 'blue-green' && input.dependencyCount > 50) {
    signals.push('blue-green-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture blue-green cutover and environment dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'shadow-traffic') {
    addAssumption(
      assumptions,
      'Shadow-traffic behavior is inferred from scenario wording and dependency surface, not measured mirrored request or production-traffic replay telemetry.',
    );
  }

  if (scenarioKind === 'shadow-traffic' && input.dependencyCount > 50) {
    signals.push('shadow-traffic-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture mirrored request and traffic replay dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'chaos-testing') {
    addAssumption(
      assumptions,
      'Chaos-testing behavior is inferred from scenario wording and dependency surface, not measured fault injection or blast-radius telemetry.',
    );
  }

  if (scenarioKind === 'chaos-testing' && input.dependencyCount > 50) {
    signals.push('chaos-testing-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture fault injection and blast-radius dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'disaster-recovery') {
    addAssumption(
      assumptions,
      'Disaster-recovery behavior is inferred from scenario wording and dependency surface, not measured failover, restore, or backup telemetry.',
    );
  }

  if (scenarioKind === 'disaster-recovery' && input.dependencyCount > 50) {
    signals.push('disaster-recovery-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture failover, restore, and backup dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'data-consistency') {
    addAssumption(
      assumptions,
      'Data-consistency behavior is inferred from scenario wording and dependency surface, not measured replication lag, read repair, or consistency telemetry.',
    );
  }

  if (scenarioKind === 'data-consistency' && input.dependencyCount > 50) {
    signals.push('data-consistency-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture replication lag, read repair, and consistency dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'idempotency') {
    addAssumption(
      assumptions,
      'Idempotency behavior is inferred from scenario wording and dependency surface, not measured duplicate request or replay telemetry.',
    );
  }

  if (scenarioKind === 'idempotency' && input.dependencyCount > 50) {
    signals.push('idempotency-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture duplicate request, replay, and dedupe dependency metrics before runtime simulation.');
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
