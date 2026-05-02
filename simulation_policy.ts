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
  | 'circuit-breaker'
  | 'bulkhead'
  | 'saga'
  | 'outbox'
  | 'dead-letter-queue'
  | 'poison-pill'
  | 'backpressure'
  | 'brownout'
  | 'maintenance-window'
  | 'regional-failover'
  | 'capacity-planning'
  | 'dependency-upgrade'
  | 'secret-rotation'
  | 'schema-validation'
  | 'config-drift'
  | 'certificate-expiry'
  | 'dns-failover'
  | 'health-check'
  | 'load-shedding'
  | 'traffic-replay'
  | 'synthetic-monitoring'
  | 'audit-log'
  | 'permission-boundary'
  | 'token-expiry'
  | 'session-revocation'
  | 'key-compromise'
  | 'rate-limit-bypass'
  | 'cors-policy'
  | 'input-sanitization'
  | 'csrf-protection'
  | 'xss-defense'
  | 'sql-injection'
  | 'ssrf-defense'
  | 'request-signing'
  | 'artifact-integrity'
  | 'supply-chain'
  | 'dependency-vulnerability'
  | 'license-compliance'
  | 'sbom-generation'
  | 'container-scan'
  | 'image-signing'
  | 'policy-as-code'
  | 'admission-control'
  | 'runtime-detection'
  | 'pod-security'
  | 'network-policy'
  | 'secrets-mount'
  | 'privilege-escalation'
  | 'sandbox-escape'
  | 'iam-misconfiguration'
  | 'cross-account-access'
  | 'service-mesh-policy'
  | 'api-gateway-security'
  | 'rate-limiting-abuse'
  | 'dns-misconfiguration'
  | 'cdn-cache-poisoning'
  | 'tls-downgrade'
  | 'oauth-misuse'
  | 'webhook-signature-bypass'
  | 'mfa-bypass'
  | 'session-fixation'
  | 'jwt-claim-tampering'
  | 'refresh-token-reuse'
  | 'account-enumeration'
  | 'pii-leakage'
  | 'log-secret-exposure'
  | 'data-retention-violation'
  | 'backup-exposure'
  | 'analytics-tracking-abuse'
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

  if (normalized.includes('dead letter queue') || normalized.includes('dead-letter-queue') || normalized.includes('dlq') || normalized.includes('poison message') || normalized.includes('retry exhausted')) return 'dead-letter-queue';
  if (normalized.includes('retry') || normalized.includes('storm')) return 'retry';
  if (normalized.includes('cold-start') || normalized.includes('cold start') || normalized.includes('startup')) return 'cold-start';
  if (normalized.includes('session fixation') || normalized.includes('session-fixation') || normalized.includes('preset session id') || normalized.includes('cookie reuse') || normalized.includes('login binding')) return 'session-fixation';
  if (normalized.includes('refresh token reuse') || normalized.includes('refresh-token-reuse') || normalized.includes('stolen refresh token') || normalized.includes('token replay') || normalized.includes('rotation failure')) return 'refresh-token-reuse';
  if (normalized.includes('session revocation') || normalized.includes('session-revocation') || normalized.includes('revoked session') || normalized.includes('logout') || normalized.includes('token invalidation')) return 'session-revocation';
  if (normalized.includes('cdn cache poisoning') || normalized.includes('cdn-cache-poisoning') || normalized.includes('cache key confusion') || normalized.includes('poisoned edge response') || normalized.includes('header variation')) return 'cdn-cache-poisoning';
  if (normalized.includes('cache') || normalized.includes('invalidation') || normalized.includes('warmup')) return 'cache';
  if (normalized.includes('database') || normalized.includes('connection pool') || normalized.includes('query latency')) return 'database';
  if (normalized.includes('bulkhead') || normalized.includes('isolation pool') || normalized.includes('resource isolation') || normalized.includes('resource partition')) return 'bulkhead';
  if (normalized.includes('saga') || normalized.includes('compensation') || normalized.includes('compensating transaction') || normalized.includes('transaction orchestration')) return 'saga';
  if (normalized.includes('outbox') || normalized.includes('transactional outbox') || normalized.includes('event relay') || normalized.includes('message dispatch')) return 'outbox';
  if (normalized.includes('dns misconfiguration') || normalized.includes('dns-misconfiguration') || normalized.includes('stale record') || normalized.includes('wrong cname') || normalized.includes('zone drift')) return 'dns-misconfiguration';
  if (normalized.includes('network policy') || normalized.includes('network-policy') || normalized.includes('namespace isolation') || normalized.includes('ingress egress') || normalized.includes('deny traffic')) return 'network-policy';
  if (normalized.includes('network') || normalized.includes('upstream timeout') || normalized.includes('partition')) return 'network';
  if (normalized.includes('queue') || normalized.includes('backlog') || normalized.includes('worker drain')) return 'queue';
  if (normalized.includes('backup exposure') || normalized.includes('backup-exposure') || normalized.includes('public snapshot') || normalized.includes('unsecured backup') || normalized.includes('open archive') || normalized.includes('restore leak')) return 'backup-exposure';
  if (normalized.includes('storage') || normalized.includes('object store') || normalized.includes('write path')) return 'storage';
  if (normalized.includes('tls downgrade') || normalized.includes('tls-downgrade') || normalized.includes('weak cipher') || normalized.includes('protocol fallback') || normalized.includes('old tls version')) return 'tls-downgrade';
  if (normalized.includes('certificate expiry') || normalized.includes('certificate-expiry') || normalized.includes('tls certificate') || normalized.includes('certificate renewal') || normalized.includes('cert rotation')) return 'certificate-expiry';
  if (normalized.includes('token expiry') || normalized.includes('token-expiry') || normalized.includes('expired token') || normalized.includes('refresh token') || normalized.includes('session renewal')) return 'token-expiry';
  if (normalized.includes('key compromise') || normalized.includes('key-compromise') || normalized.includes('compromised key') || normalized.includes('credential leak') || normalized.includes('key revoke')) return 'key-compromise';
  if (normalized.includes('secret rotation') || normalized.includes('secret-rotation') || normalized.includes('credential rollover') || normalized.includes('key rotation') || normalized.includes('token refresh')) return 'secret-rotation';
  if (normalized.includes('permission boundary') || normalized.includes('permission-boundary') || normalized.includes('least privilege') || normalized.includes('scoped permission') || normalized.includes('access boundary')) return 'permission-boundary';
  if (normalized.includes('cors policy') || normalized.includes('cors-policy') || normalized.includes('cross origin') || normalized.includes('allowed origin') || normalized.includes('preflight request')) return 'cors-policy';
  if (normalized.includes('csrf protection') || normalized.includes('csrf-protection') || normalized.includes('cross site request forgery') || normalized.includes('csrf token') || normalized.includes('same site cookie')) return 'csrf-protection';
  if (normalized.includes('xss defense') || normalized.includes('xss-defense') || normalized.includes('cross site scripting') || normalized.includes('output encoding') || normalized.includes('content security policy')) return 'xss-defense';
  if (normalized.includes('sql injection') || normalized.includes('sql-injection') || normalized.includes('parameterized query') || normalized.includes('prepared statement')) return 'sql-injection';
  if (normalized.includes('ssrf defense') || normalized.includes('ssrf-defense') || normalized.includes('server side request forgery') || normalized.includes('metadata block') || normalized.includes('egress allowlist')) return 'ssrf-defense';
  if (normalized.includes('request signing') || normalized.includes('request-signing') || normalized.includes('hmac signature') || normalized.includes('signed request') || normalized.includes('replay protection')) return 'request-signing';
  if (normalized.includes('supply chain') || normalized.includes('supply-chain') || normalized.includes('build provenance') || normalized.includes('package integrity') || normalized.includes('dependency trust')) return 'supply-chain';
  if (normalized.includes('artifact integrity') || normalized.includes('artifact-integrity') || normalized.includes('checksum verification') || normalized.includes('signed artifact') || normalized.includes('provenance')) return 'artifact-integrity';
  if (normalized.includes('dependency vulnerability') || normalized.includes('dependency-vulnerability') || normalized.includes('vulnerable package') || normalized.includes('cve exposure') || normalized.includes('advisory')) return 'dependency-vulnerability';
  if (normalized.includes('license compliance') || normalized.includes('license-compliance') || normalized.includes('license audit') || normalized.includes('prohibited license') || normalized.includes('attribution policy')) return 'license-compliance';
  if (normalized.includes('sbom generation') || normalized.includes('sbom-generation') || normalized.includes('software bill materials') || normalized.includes('component inventory') || normalized.includes('package manifest')) return 'sbom-generation';
  if (normalized.includes('container scan') || normalized.includes('container-scan') || normalized.includes('image vulnerability') || normalized.includes('layer scan') || normalized.includes('registry assessment')) return 'container-scan';
  if (normalized.includes('image signing') || normalized.includes('image-signing') || normalized.includes('signed image') || normalized.includes('signature verification') || normalized.includes('registry trust')) return 'image-signing';
  if (normalized.includes('policy as code') || normalized.includes('policy-as-code') || normalized.includes('opa rule evaluation') || normalized.includes('policy bundle') || normalized.includes('guardrail')) return 'policy-as-code';
  if (normalized.includes('load shedding') || normalized.includes('load-shedding') || normalized.includes('reject excess traffic') || normalized.includes('overload protection')) return 'load-shedding';
  if (normalized.includes('service mesh policy') || normalized.includes('service-mesh-policy') || normalized.includes('sidecar mtls') || normalized.includes('traffic policy') || normalized.includes('mesh enforcement')) return 'service-mesh-policy';
  if (normalized.includes('admission control') || normalized.includes('admission-control') || normalized.includes('admission webhook') || normalized.includes('policy enforcement') || normalized.includes('deny request')) return 'admission-control';
  if (normalized.includes('log secret exposure') || normalized.includes('log-secret-exposure') || normalized.includes('api key in logs') || normalized.includes('credential dump') || normalized.includes('token logged')) return 'log-secret-exposure';
  if (normalized.includes('pii leakage') || normalized.includes('pii-leakage') || normalized.includes('personal data exposure') || normalized.includes('sensitive field disclosure') || normalized.includes('customer identifier')) return 'pii-leakage';
  if (normalized.includes('data retention violation') || normalized.includes('data-retention-violation') || normalized.includes('expired records') || normalized.includes('deletion failure') || normalized.includes('retention policy breach') || normalized.includes('archive overrun')) return 'data-retention-violation';
  if (normalized.includes('analytics tracking abuse') || normalized.includes('analytics-tracking-abuse') || normalized.includes('consent bypass') || normalized.includes('excessive tracking') || normalized.includes('user fingerprint') || normalized.includes('third party pixel')) return 'analytics-tracking-abuse';
  if (normalized.includes('runtime detection') || normalized.includes('runtime-detection') || normalized.includes('anomaly detection') || normalized.includes('behavior monitoring') || normalized.includes('intrusion detection')) return 'runtime-detection';
  if (normalized.includes('pod security') || normalized.includes('pod-security') || normalized.includes('restricted pod') || normalized.includes('pod security standard') || normalized.includes('run as non root')) return 'pod-security';
  if (normalized.includes('secrets mount') || normalized.includes('secrets-mount') || normalized.includes('secret volume') || normalized.includes('projected secret') || normalized.includes('secret file permission')) return 'secrets-mount';
  if (normalized.includes('privilege escalation') || normalized.includes('privilege-escalation') || normalized.includes('escalated privilege') || normalized.includes('root capability') || normalized.includes('setuid')) return 'privilege-escalation';
  if (normalized.includes('sandbox escape') || normalized.includes('sandbox-escape') || normalized.includes('container breakout') || normalized.includes('namespace escape') || normalized.includes('isolation bypass')) return 'sandbox-escape';
  if (normalized.includes('iam misconfiguration') || normalized.includes('iam-misconfiguration') || normalized.includes('overly permissive role') || normalized.includes('wildcard policy') || normalized.includes('access grant')) return 'iam-misconfiguration';
  if (normalized.includes('cross account access') || normalized.includes('cross-account-access') || normalized.includes('external account') || normalized.includes('trust boundary') || normalized.includes('assume role')) return 'cross-account-access';
  if (normalized.includes('mfa bypass') || normalized.includes('mfa-bypass') || normalized.includes('push fatigue') || normalized.includes('one time code interception') || normalized.includes('second factor downgrade')) return 'mfa-bypass';
  if (normalized.includes('jwt claim tampering') || normalized.includes('jwt-claim-tampering') || normalized.includes('unsigned token') || normalized.includes('altered audience') || normalized.includes('modified issuer') || normalized.includes('privilege claim')) return 'jwt-claim-tampering';
  if (normalized.includes('account enumeration') || normalized.includes('account-enumeration') || normalized.includes('username probing') || normalized.includes('login error oracle') || normalized.includes('email discovery')) return 'account-enumeration';
  if (normalized.includes('api gateway security') || normalized.includes('api-gateway-security') || normalized.includes('gateway auth layer') || normalized.includes('request validation') || normalized.includes('gateway security')) return 'api-gateway-security';
  if (normalized.includes('rate limiting abuse') || normalized.includes('rate-limiting-abuse') || normalized.includes('excessive requests') || normalized.includes('throttling abuse') || normalized.includes('rate control abuse')) return 'rate-limiting-abuse';
  if (normalized.includes('oauth misuse') || normalized.includes('oauth-misuse') || normalized.includes('redirect uri abuse') || normalized.includes('weak scope') || normalized.includes('consent flow')) return 'oauth-misuse';
  if (normalized.includes('webhook signature bypass') || normalized.includes('webhook-signature-bypass') || normalized.includes('missing hmac verification') || normalized.includes('replayed webhook') || normalized.includes('unsigned payload')) return 'webhook-signature-bypass';
  if (normalized.includes('input sanitization') || normalized.includes('input-sanitization') || normalized.includes('user input') || normalized.includes('escaping validation') || normalized.includes('injection prevention')) return 'input-sanitization';
  if (normalized.includes('auth') || normalized.includes('token') || normalized.includes('permission')) return 'auth';
  if (normalized.includes('backpressure') || normalized.includes('flow control') || normalized.includes('pressure signal') || normalized.includes('producer throttle')) return 'backpressure';
  if (normalized.includes('rate limit bypass') || normalized.includes('rate-limit-bypass') || normalized.includes('quota bypass') || normalized.includes('throttle evasion') || normalized.includes('limit abuse')) return 'rate-limit-bypass';
  if (normalized.includes('brownout') || normalized.includes('graceful degradation') || normalized.includes('feature shedding') || normalized.includes('reduced capability')) return 'brownout';
  if (normalized.includes('dependency upgrade') || normalized.includes('dependency-upgrade') || normalized.includes('package bump') || normalized.includes('version compatibility')) return 'dependency-upgrade';
  if (normalized.includes('maintenance window') || normalized.includes('maintenance-window') || normalized.includes('planned downtime') || normalized.includes('service drain') || normalized.includes('upgrade')) return 'maintenance-window';
  if (normalized.includes('rate limiting abuse') || normalized.includes('rate-limiting-abuse') || normalized.includes('excessive requests') || normalized.includes('throttling abuse') || normalized.includes('rate control abuse')) return 'rate-limiting-abuse';
  if (normalized.includes('rate-limit') || normalized.includes('rate limit') || normalized.includes('throttl') || normalized.includes('quota')) return 'rate-limit';
  if (normalized.includes('synthetic monitoring') || normalized.includes('synthetic-monitoring') || normalized.includes('canary monitor')) return 'synthetic-monitoring';
  if (normalized.includes('health check') || normalized.includes('health-check') || normalized.includes('readiness probe') || normalized.includes('liveness probe') || normalized.includes('synthetic check')) return 'health-check';
  if (normalized.includes('audit log') || normalized.includes('audit-log') || normalized.includes('immutable audit trail') || normalized.includes('compliance event') || normalized.includes('event history')) return 'audit-log';
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
  if (normalized.includes('traffic replay') || normalized.includes('traffic-replay') || normalized.includes('captured traffic') || normalized.includes('session replay') || normalized.includes('production request')) return 'traffic-replay';
  if (normalized.includes('shadow-traffic') || normalized.includes('shadow traffic') || normalized.includes('traffic mirror') || normalized.includes('mirrored traffic')) return 'shadow-traffic';
  if (normalized.includes('chaos testing') || normalized.includes('chaos-testing') || normalized.includes('fault injection') || normalized.includes('failure injection')) return 'chaos-testing';
  if (normalized.includes('dns failover') || normalized.includes('dns-failover') || normalized.includes('dns record switch') || normalized.includes('ttl propagation') || normalized.includes('resolver')) return 'dns-failover';
  if (normalized.includes('regional failover') || normalized.includes('regional-failover') || normalized.includes('cross region') || normalized.includes('traffic shift') || normalized.includes('secondary region')) return 'regional-failover';
  if (normalized.includes('disaster recovery') || normalized.includes('disaster-recovery') || normalized.includes('failover') || normalized.includes('backup recovery')) return 'disaster-recovery';
  if (normalized.includes('data consistency') || normalized.includes('data-consistency') || normalized.includes('eventual consistency') || normalized.includes('replication lag') || normalized.includes('read repair')) return 'data-consistency';
  if (normalized.includes('idempotency') || normalized.includes('idempotent') || normalized.includes('duplicate replay') || normalized.includes('duplicate request') || normalized.includes('dedupe')) return 'idempotency';
  if (normalized.includes('circuit breaker') || normalized.includes('circuit-breaker') || normalized.includes('open circuit') || normalized.includes('half open') || normalized.includes('trip threshold')) return 'circuit-breaker';
  if (normalized.includes('deployment') || normalized.includes('deploy') || normalized.includes('release')) return 'deployment';
  if (normalized.includes('latency') || normalized.includes('tail-latency') || normalized.includes('response-time')) return 'latency';
  if (normalized.includes('throughput') || normalized.includes('request volume') || normalized.includes('rps')) return 'throughput';
  if (normalized.includes('config drift') || normalized.includes('config-drift') || normalized.includes('configuration mismatch') || normalized.includes('desired state') || normalized.includes('drift detection')) return 'config-drift';
  if (normalized.includes('config') || normalized.includes('env')) return 'config';
  if (normalized.includes('poison pill') || normalized.includes('poison-pill') || normalized.includes('malformed message') || normalized.includes('bad payload') || normalized.includes('quarantine')) return 'poison-pill';
  if (normalized.includes('schema validation') || normalized.includes('schema-validation') || normalized.includes('json schema') || normalized.includes('payload validation') || normalized.includes('contract validation')) return 'schema-validation';
  if (normalized.includes('capacity planning') || normalized.includes('capacity-planning') || normalized.includes('forecast demand') || normalized.includes('headroom') || normalized.includes('utilization')) return 'capacity-planning';
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

    if (signals.includes('circuit-breaker-dependency-pressure')) {
      nextActions.push('Capture circuit-breaker baseline and trip-threshold metrics before execution.');
    }

    if (signals.includes('bulkhead-dependency-pressure')) {
      nextActions.push('Capture bulkhead baseline and isolation-pool metrics before execution.');
    }

    if (signals.includes('saga-dependency-pressure')) {
      nextActions.push('Capture saga baseline and compensation workflow metrics before execution.');
    }

    if (signals.includes('outbox-dependency-pressure')) {
      nextActions.push('Capture outbox baseline and event relay metrics before execution.');
    }

    if (signals.includes('dead-letter-queue-dependency-pressure')) {
      nextActions.push('Capture dead-letter-queue baseline and poison-message metrics before execution.');
    }

    if (signals.includes('poison-pill-dependency-pressure')) {
      nextActions.push('Capture poison-pill baseline and quarantine metrics before execution.');
    }

    if (signals.includes('backpressure-dependency-pressure')) {
      nextActions.push('Capture backpressure baseline and flow-control metrics before execution.');
    }

    if (signals.includes('brownout-dependency-pressure')) {
      nextActions.push('Capture brownout baseline and graceful-degradation metrics before execution.');
    }

    if (signals.includes('maintenance-window-dependency-pressure')) {
      nextActions.push('Capture maintenance-window baseline and service-drain metrics before execution.');
    }

    if (signals.includes('regional-failover-dependency-pressure')) {
      nextActions.push('Capture regional-failover baseline and cross-region traffic-shift metrics before execution.');
    }

    if (signals.includes('capacity-planning-dependency-pressure')) {
      nextActions.push('Capture capacity-planning baseline and demand-forecast metrics before execution.');
    }

    if (signals.includes('dependency-upgrade-dependency-pressure')) {
      nextActions.push('Capture dependency-upgrade baseline and version-compatibility metrics before execution.');
    }

    if (signals.includes('secret-rotation-dependency-pressure')) {
      nextActions.push('Capture secret-rotation baseline and credential-rollover metrics before execution.');
    }

    if (signals.includes('schema-validation-dependency-pressure')) {
      nextActions.push('Capture schema-validation baseline and payload-validation metrics before execution.');
    }

    if (signals.includes('config-drift-dependency-pressure')) {
      nextActions.push('Capture config-drift baseline and drift-detection metrics before execution.');
    }

    if (signals.includes('certificate-expiry-dependency-pressure')) {
      nextActions.push('Capture certificate-expiry baseline and TLS renewal metrics before execution.');
    }

    if (signals.includes('dns-failover-dependency-pressure')) {
      nextActions.push('Capture dns-failover baseline and TTL propagation metrics before execution.');
    }

    if (signals.includes('health-check-dependency-pressure')) {
      nextActions.push('Capture health-check baseline and probe metrics before execution.');
    }

    if (signals.includes('load-shedding-dependency-pressure')) {
      nextActions.push('Capture load-shedding baseline and admission-control metrics before execution.');
    }

    if (signals.includes('traffic-replay-dependency-pressure')) {
      nextActions.push('Capture traffic-replay baseline and captured-traffic metrics before execution.');
    }

    if (signals.includes('synthetic-monitoring-dependency-pressure')) {
      nextActions.push('Capture synthetic-monitoring baseline and probe metrics before execution.');
    }

    if (signals.includes('audit-log-dependency-pressure')) {
      nextActions.push('Capture audit-log baseline and compliance-event metrics before execution.');
    }

    if (signals.includes('permission-boundary-dependency-pressure')) {
      nextActions.push('Capture permission-boundary baseline and scoped-permission metrics before execution.');
    }

    if (signals.includes('token-expiry-dependency-pressure')) {
      nextActions.push('Capture token-expiry baseline and refresh-token metrics before execution.');
    }

    if (signals.includes('session-revocation-dependency-pressure')) {
      nextActions.push('Capture session-revocation baseline and token-invalidation metrics before execution.');
    }

    if (signals.includes('key-compromise-dependency-pressure')) {
      nextActions.push('Capture key-compromise baseline and key-revoke metrics before execution.');
    }

    if (signals.includes('rate-limit-bypass-dependency-pressure')) {
      nextActions.push('Capture rate-limit-bypass baseline and throttle-evasion metrics before execution.');
    }

    if (signals.includes('cors-policy-dependency-pressure')) {
      nextActions.push('Capture cors-policy baseline and preflight-request metrics before execution.');
    }

    if (signals.includes('input-sanitization-dependency-pressure')) {
      nextActions.push('Capture input-sanitization baseline and injection-prevention metrics before execution.');
    }

    if (signals.includes('csrf-protection-dependency-pressure')) {
      nextActions.push('Capture csrf-protection baseline and CSRF-token metrics before execution.');
    }

    if (signals.includes('xss-defense-dependency-pressure')) {
      nextActions.push('Capture xss-defense baseline and output-encoding metrics before execution.');
    }

    if (signals.includes('sql-injection-dependency-pressure')) {
      nextActions.push('Capture sql-injection baseline and prepared-statement metrics before execution.');
    }

    if (signals.includes('ssrf-defense-dependency-pressure')) {
      nextActions.push('Capture ssrf-defense baseline and egress-allowlist metrics before execution.');
    }

    if (signals.includes('request-signing-dependency-pressure')) {
      nextActions.push('Capture request-signing baseline and replay-protection metrics before execution.');
    }

    if (signals.includes('artifact-integrity-dependency-pressure')) {
      nextActions.push('Capture artifact-integrity baseline and provenance metrics before execution.');
    }

    if (signals.includes('supply-chain-dependency-pressure')) {
      nextActions.push('Capture supply-chain baseline and package-integrity metrics before execution.');
    }

    if (signals.includes('dependency-vulnerability-dependency-pressure')) {
      nextActions.push('Capture dependency-vulnerability baseline and advisory metrics before execution.');
    }

    if (signals.includes('license-compliance-dependency-pressure')) {
      nextActions.push('Capture license-compliance baseline and license-audit metrics before execution.');
    }

    if (signals.includes('sbom-generation-dependency-pressure')) {
      nextActions.push('Capture sbom-generation baseline and component-inventory metrics before execution.');
    }

    if (signals.includes('container-scan-dependency-pressure')) {
      nextActions.push('Capture container-scan baseline and layer-scan metrics before execution.');
    }

    if (signals.includes('image-signing-dependency-pressure')) {
      nextActions.push('Capture image-signing baseline and signature-verification metrics before execution.');
    }

    if (signals.includes('policy-as-code-dependency-pressure')) {
      nextActions.push('Capture policy-as-code baseline and rule-evaluation metrics before execution.');
    }

    if (signals.includes('admission-control-dependency-pressure')) {
      nextActions.push('Capture admission-control baseline and policy-enforcement metrics before execution.');
    }

    if (signals.includes('runtime-detection-dependency-pressure')) {
      nextActions.push('Capture runtime-detection baseline and anomaly-detection metrics before execution.');
    }

    if (signals.includes('pod-security-dependency-pressure')) {
      nextActions.push('Capture pod-security baseline and restricted-pod metrics before execution.');
    }

    if (signals.includes('network-policy-dependency-pressure')) {
      nextActions.push('Capture network-policy baseline and namespace-isolation metrics before execution.');
    }

    if (signals.includes('secrets-mount-dependency-pressure')) {
      nextActions.push('Capture secrets-mount baseline and secret-volume metrics before execution.');
    }

    if (signals.includes('privilege-escalation-dependency-pressure')) {
      nextActions.push('Capture privilege-escalation baseline and root-capability metrics before execution.');
    }

    if (signals.includes('sandbox-escape-dependency-pressure')) {
      nextActions.push('Capture sandbox-escape baseline and container-breakout metrics before execution.');
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

  if (scenarioKind === 'circuit-breaker') {
    addAssumption(
      assumptions,
      'Circuit-breaker behavior is inferred from scenario wording and dependency surface, not measured open-circuit, half-open, or trip-threshold telemetry.',
    );
  }

  if (scenarioKind === 'circuit-breaker' && input.dependencyCount > 50) {
    signals.push('circuit-breaker-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture open-circuit, half-open, and trip-threshold dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'bulkhead') {
    addAssumption(
      assumptions,
      'Bulkhead behavior is inferred from scenario wording and dependency surface, not measured isolation-pool or resource-partition telemetry.',
    );
  }

  if (scenarioKind === 'bulkhead' && input.dependencyCount > 50) {
    signals.push('bulkhead-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture isolation-pool, resource-partition, and dependency containment metrics before runtime simulation.');
  }

  if (scenarioKind === 'saga') {
    addAssumption(
      assumptions,
      'Saga behavior is inferred from scenario wording and dependency surface, not measured compensation or transaction orchestration telemetry.',
    );
  }

  if (scenarioKind === 'saga' && input.dependencyCount > 50) {
    signals.push('saga-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture compensation, transaction orchestration, and dependency coordination metrics before runtime simulation.');
  }

  if (scenarioKind === 'outbox') {
    addAssumption(
      assumptions,
      'Outbox behavior is inferred from scenario wording and dependency surface, not measured transactional outbox or event relay telemetry.',
    );
  }

  if (scenarioKind === 'outbox' && input.dependencyCount > 50) {
    signals.push('outbox-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture transactional outbox, event relay, and message dispatch dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dead-letter-queue') {
    addAssumption(
      assumptions,
      'Dead-letter-queue behavior is inferred from scenario wording and dependency surface, not measured DLQ, poison-message, or retry-exhaustion telemetry.',
    );
  }

  if (scenarioKind === 'dead-letter-queue' && input.dependencyCount > 50) {
    signals.push('dead-letter-queue-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture DLQ, poison-message, and retry-exhaustion dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'poison-pill') {
    addAssumption(
      assumptions,
      'Poison-pill behavior is inferred from scenario wording and dependency surface, not measured malformed-message, bad-payload, or quarantine telemetry.',
    );
  }

  if (scenarioKind === 'poison-pill' && input.dependencyCount > 50) {
    signals.push('poison-pill-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture malformed-message, bad-payload, and quarantine dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'backpressure') {
    addAssumption(
      assumptions,
      'Backpressure behavior is inferred from scenario wording and dependency surface, not measured flow-control, pressure-signal, or producer-throttle telemetry.',
    );
  }

  if (scenarioKind === 'backpressure' && input.dependencyCount > 50) {
    signals.push('backpressure-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture flow-control, pressure-signal, and producer-throttle dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'brownout') {
    addAssumption(
      assumptions,
      'Brownout behavior is inferred from scenario wording and dependency surface, not measured graceful-degradation, feature-shedding, or reduced-capability telemetry.',
    );
  }

  if (scenarioKind === 'brownout' && input.dependencyCount > 50) {
    signals.push('brownout-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture graceful-degradation, feature-shedding, and reduced-capability dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'maintenance-window') {
    addAssumption(
      assumptions,
      'Maintenance-window behavior is inferred from scenario wording and dependency surface, not measured planned-downtime, service-drain, or upgrade telemetry.',
    );
  }

  if (scenarioKind === 'maintenance-window' && input.dependencyCount > 50) {
    signals.push('maintenance-window-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture planned-downtime, service-drain, and upgrade dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'regional-failover') {
    addAssumption(
      assumptions,
      'Regional-failover behavior is inferred from scenario wording and dependency surface, not measured cross-region traffic-shift or secondary-region telemetry.',
    );
  }

  if (scenarioKind === 'regional-failover' && input.dependencyCount > 50) {
    signals.push('regional-failover-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cross-region traffic-shift, secondary-region, and failover dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'capacity-planning') {
    addAssumption(
      assumptions,
      'Capacity-planning behavior is inferred from scenario wording and dependency surface, not measured demand-forecast, headroom, or utilization telemetry.',
    );
  }

  if (scenarioKind === 'capacity-planning' && input.dependencyCount > 50) {
    signals.push('capacity-planning-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture demand-forecast, headroom, and utilization dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dependency-upgrade') {
    addAssumption(
      assumptions,
      'Dependency-upgrade behavior is inferred from scenario wording and dependency surface, not measured package-bump or version-compatibility telemetry.',
    );
  }

  if (scenarioKind === 'dependency-upgrade' && input.dependencyCount > 50) {
    signals.push('dependency-upgrade-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture package-bump, version-compatibility, and dependency upgrade metrics before runtime simulation.');
  }

  if (scenarioKind === 'secret-rotation') {
    addAssumption(
      assumptions,
      'Secret-rotation behavior is inferred from scenario wording and dependency surface, not measured credential-rollover, key-rotation, or token-refresh telemetry.',
    );
  }

  if (scenarioKind === 'secret-rotation' && input.dependencyCount > 50) {
    signals.push('secret-rotation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture credential-rollover, key-rotation, and token-refresh dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'schema-validation') {
    addAssumption(
      assumptions,
      'Schema-validation behavior is inferred from scenario wording and dependency surface, not measured JSON-schema, payload-validation, or contract-validation telemetry.',
    );
  }

  if (scenarioKind === 'schema-validation' && input.dependencyCount > 50) {
    signals.push('schema-validation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture JSON-schema, payload-validation, and contract-validation dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'config-drift') {
    addAssumption(
      assumptions,
      'Config-drift behavior is inferred from scenario wording and dependency surface, not measured configuration-mismatch or desired-state drift telemetry.',
    );
  }

  if (scenarioKind === 'config-drift' && input.dependencyCount > 50) {
    signals.push('config-drift-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture configuration-mismatch, desired-state drift, and drift-detection dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'certificate-expiry') {
    addAssumption(
      assumptions,
      'Certificate-expiry behavior is inferred from scenario wording and dependency surface, not measured TLS certificate renewal or cert-rotation telemetry.',
    );
  }

  if (scenarioKind === 'certificate-expiry' && input.dependencyCount > 50) {
    signals.push('certificate-expiry-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture TLS certificate renewal, cert-rotation, and expiry dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dns-failover') {
    addAssumption(
      assumptions,
      'DNS-failover behavior is inferred from scenario wording and dependency surface, not measured DNS-record switch, TTL propagation, or resolver telemetry.',
    );
  }

  if (scenarioKind === 'dns-failover' && input.dependencyCount > 50) {
    signals.push('dns-failover-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture DNS-record switch, TTL propagation, and resolver dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'health-check') {
    addAssumption(
      assumptions,
      'Health-check behavior is inferred from scenario wording and dependency surface, not measured readiness-probe, liveness-probe, or synthetic-check telemetry.',
    );
  }

  if (scenarioKind === 'health-check' && input.dependencyCount > 50) {
    signals.push('health-check-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture readiness-probe, liveness-probe, and synthetic-check dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'load-shedding') {
    addAssumption(
      assumptions,
      'Load-shedding behavior is inferred from scenario wording and dependency surface, not measured excess-traffic rejection, overload-protection, or admission-control telemetry.',
    );
  }

  if (scenarioKind === 'load-shedding' && input.dependencyCount > 50) {
    signals.push('load-shedding-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture excess-traffic rejection, overload-protection, and admission-control dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'traffic-replay') {
    addAssumption(
      assumptions,
      'Traffic-replay behavior is inferred from scenario wording and dependency surface, not measured captured-traffic, session-replay, or production-request telemetry.',
    );
  }

  if (scenarioKind === 'traffic-replay' && input.dependencyCount > 50) {
    signals.push('traffic-replay-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture captured-traffic, session-replay, and production-request dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'synthetic-monitoring') {
    addAssumption(
      assumptions,
      'Synthetic-monitoring behavior is inferred from scenario wording and dependency surface, not measured synthetic-check, probe, or canary-monitor telemetry.',
    );
  }

  if (scenarioKind === 'synthetic-monitoring' && input.dependencyCount > 50) {
    signals.push('synthetic-monitoring-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture synthetic-check, probe, and canary-monitor dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'audit-log') {
    addAssumption(
      assumptions,
      'Audit-log behavior is inferred from scenario wording and dependency surface, not measured immutable-audit-trail or compliance-event telemetry.',
    );
  }

  if (scenarioKind === 'audit-log' && input.dependencyCount > 50) {
    signals.push('audit-log-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture immutable-audit-trail, compliance-event, and event-history dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'permission-boundary') {
    addAssumption(
      assumptions,
      'Permission-boundary behavior is inferred from scenario wording and dependency surface, not measured least-privilege, scoped-permission, or access-boundary telemetry.',
    );
  }

  if (scenarioKind === 'permission-boundary' && input.dependencyCount > 50) {
    signals.push('permission-boundary-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture least-privilege, scoped-permission, and access-boundary dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'token-expiry') {
    addAssumption(
      assumptions,
      'Token-expiry behavior is inferred from scenario wording and dependency surface, not measured expired-token, refresh-token, or session-renewal telemetry.',
    );
  }

  if (scenarioKind === 'token-expiry' && input.dependencyCount > 50) {
    signals.push('token-expiry-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture expired-token, refresh-token, and session-renewal dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'session-revocation') {
    addAssumption(assumptions, 'Session-revocation behavior is inferred from scenario wording and dependency surface, not measured revoked-session, logout, or token-invalidation telemetry.');
  }

  if (scenarioKind === 'session-revocation' && input.dependencyCount > 50) {
    signals.push('session-revocation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture revoked-session, logout, and token-invalidation dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'key-compromise') {
    addAssumption(assumptions, 'Key-compromise behavior is inferred from scenario wording and dependency surface, not measured compromised-key, credential-leak, or key-revoke telemetry.');
  }

  if (scenarioKind === 'key-compromise' && input.dependencyCount > 50) {
    signals.push('key-compromise-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture compromised-key, credential-leak, and key-revoke dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'rate-limit-bypass') {
    addAssumption(assumptions, 'Rate-limit-bypass behavior is inferred from scenario wording and dependency surface, not measured quota-bypass, throttle-evasion, or limit-abuse telemetry.');
  }

  if (scenarioKind === 'rate-limit-bypass' && input.dependencyCount > 50) {
    signals.push('rate-limit-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture quota-bypass, throttle-evasion, and limit-abuse dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'cors-policy') {
    addAssumption(assumptions, 'CORS-policy behavior is inferred from scenario wording and dependency surface, not measured cross-origin, allowed-origin, or preflight-request telemetry.');
  }

  if (scenarioKind === 'cors-policy' && input.dependencyCount > 50) {
    signals.push('cors-policy-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cross-origin, allowed-origin, and preflight-request dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'input-sanitization') {
    addAssumption(assumptions, 'Input-sanitization behavior is inferred from scenario wording and dependency surface, not measured user-input, escaping, or injection-prevention telemetry.');
  }

  if (scenarioKind === 'input-sanitization' && input.dependencyCount > 50) {
    signals.push('input-sanitization-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture user-input, escaping, validation, and injection-prevention dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'csrf-protection') {
    addAssumption(assumptions, 'CSRF-protection behavior is inferred from scenario wording and dependency surface, not measured CSRF-token or same-site-cookie telemetry.');
  }

  if (scenarioKind === 'csrf-protection' && input.dependencyCount > 50) {
    signals.push('csrf-protection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture CSRF-token, same-site-cookie, and request-forgery dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'xss-defense') {
    addAssumption(assumptions, 'XSS-defense behavior is inferred from scenario wording and dependency surface, not measured output-encoding or content-security-policy telemetry.');
  }

  if (scenarioKind === 'xss-defense' && input.dependencyCount > 50) {
    signals.push('xss-defense-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture output-encoding, content-security-policy, and cross-site-scripting dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'sql-injection') {
    addAssumption(assumptions, 'SQL-injection behavior is inferred from scenario wording and dependency surface, not measured parameterized-query or prepared-statement telemetry.');
  }

  if (scenarioKind === 'sql-injection' && input.dependencyCount > 50) {
    signals.push('sql-injection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture parameterized-query, prepared-statement, and injection-prevention dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'ssrf-defense') {
    addAssumption(assumptions, 'SSRF-defense behavior is inferred from scenario wording and dependency surface, not measured metadata-block, egress-allowlist, or server-side-request-forgery telemetry.');
  }

  if (scenarioKind === 'ssrf-defense' && input.dependencyCount > 50) {
    signals.push('ssrf-defense-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture metadata-block, egress-allowlist, and server-side-request-forgery dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'request-signing') {
    addAssumption(assumptions, 'Request-signing behavior is inferred from scenario wording and dependency surface, not measured HMAC-signature, signed-request, or replay-protection telemetry.');
  }

  if (scenarioKind === 'request-signing' && input.dependencyCount > 50) {
    signals.push('request-signing-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture HMAC-signature, signed-request, and replay-protection dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'artifact-integrity') {
    addAssumption(assumptions, 'Artifact-integrity behavior is inferred from scenario wording and dependency surface, not measured checksum-verification, signed-artifact, or provenance telemetry.');
  }

  if (scenarioKind === 'artifact-integrity' && input.dependencyCount > 50) {
    signals.push('artifact-integrity-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture checksum-verification, signed-artifact, and provenance dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'supply-chain') {
    addAssumption(assumptions, 'Supply-chain behavior is inferred from scenario wording and dependency surface, not measured build-provenance, package-integrity, or dependency-trust telemetry.');
  }

  if (scenarioKind === 'supply-chain' && input.dependencyCount > 50) {
    signals.push('supply-chain-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture build-provenance, package-integrity, and dependency-trust metrics before runtime simulation.');
  }

  if (scenarioKind === 'dependency-vulnerability') {
    addAssumption(assumptions, 'Dependency-vulnerability behavior is inferred from scenario wording and dependency surface, not measured vulnerable-package, CVE-exposure, or advisory telemetry.');
  }

  if (scenarioKind === 'dependency-vulnerability' && input.dependencyCount > 50) {
    signals.push('dependency-vulnerability-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture vulnerable-package, CVE-exposure, and advisory dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'license-compliance') {
    addAssumption(assumptions, 'License-compliance behavior is inferred from scenario wording and dependency surface, not measured license-audit, prohibited-license, or attribution-policy telemetry.');
  }

  if (scenarioKind === 'license-compliance' && input.dependencyCount > 50) {
    signals.push('license-compliance-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture license-audit, prohibited-license, and attribution-policy dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'sbom-generation') {
    addAssumption(assumptions, 'SBOM-generation behavior is inferred from scenario wording and dependency surface, not measured software-bill-of-materials, component-inventory, or package-manifest telemetry.');
  }

  if (scenarioKind === 'sbom-generation' && input.dependencyCount > 50) {
    signals.push('sbom-generation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture software-bill-of-materials, component-inventory, and package-manifest dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'container-scan') {
    addAssumption(assumptions, 'Container-scan behavior is inferred from scenario wording and dependency surface, not measured image-vulnerability, layer-scan, or registry-assessment telemetry.');
  }

  if (scenarioKind === 'container-scan' && input.dependencyCount > 50) {
    signals.push('container-scan-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture image-vulnerability, layer-scan, and registry-assessment dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'image-signing') {
    addAssumption(assumptions, 'Image-signing behavior is inferred from scenario wording and dependency surface, not measured signed-image, signature-verification, or registry-trust telemetry.');
  }

  if (scenarioKind === 'image-signing' && input.dependencyCount > 50) {
    signals.push('image-signing-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture signed-image, signature-verification, and registry-trust dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'policy-as-code') {
    addAssumption(assumptions, 'Policy-as-code behavior is inferred from scenario wording and dependency surface, not measured OPA rule-evaluation, policy-bundle, or guardrail telemetry.');
  }

  if (scenarioKind === 'policy-as-code' && input.dependencyCount > 50) {
    signals.push('policy-as-code-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture OPA rule-evaluation, policy-bundle, and guardrail dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'admission-control') {
    addAssumption(assumptions, 'Admission-control behavior is inferred from scenario wording and dependency surface, not measured admission-webhook, policy-enforcement, or deny-request telemetry.');
  }

  if (scenarioKind === 'admission-control' && input.dependencyCount > 50) {
    signals.push('admission-control-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture admission-webhook, policy-enforcement, and deny-request dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'runtime-detection') {
    addAssumption(assumptions, 'Runtime-detection behavior is inferred from scenario wording and dependency surface, not measured anomaly-detection, behavior-monitoring, or intrusion-detection telemetry.');
  }

  if (scenarioKind === 'runtime-detection' && input.dependencyCount > 50) {
    signals.push('runtime-detection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture anomaly-detection, behavior-monitoring, and intrusion-detection dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'pod-security') {
    addAssumption(assumptions, 'Pod-security behavior is inferred from scenario wording and dependency surface, not measured restricted-pod, pod-security-standard, or run-as-non-root telemetry.');
  }

  if (scenarioKind === 'pod-security' && input.dependencyCount > 50) {
    signals.push('pod-security-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture restricted-pod, pod-security-standard, and run-as-non-root dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'network-policy') {
    addAssumption(assumptions, 'Network-policy behavior is inferred from scenario wording and dependency surface, not measured namespace-isolation, ingress-egress, or deny-traffic telemetry.');
  }

  if (scenarioKind === 'network-policy' && input.dependencyCount > 50) {
    signals.push('network-policy-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture namespace-isolation, ingress-egress, and deny-traffic dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'secrets-mount') {
    addAssumption(assumptions, 'Secrets-mount behavior is inferred from scenario wording and dependency surface, not measured secret-volume, projected-secret, or secret-file-permission telemetry.');
  }

  if (scenarioKind === 'secrets-mount' && input.dependencyCount > 50) {
    signals.push('secrets-mount-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture secret-volume, projected-secret, and secret-file-permission dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'privilege-escalation') {
    addAssumption(assumptions, 'Privilege-escalation behavior is inferred from scenario wording and dependency surface, not measured escalated-privilege, root-capability, or setuid telemetry.');
  }

  if (scenarioKind === 'privilege-escalation' && input.dependencyCount > 50) {
    signals.push('privilege-escalation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture escalated-privilege, root-capability, and setuid dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'sandbox-escape') {
    addAssumption(assumptions, 'Sandbox-escape behavior is inferred from scenario wording and dependency surface, not measured container-breakout, namespace-escape, or isolation-bypass telemetry.');
  }

  if (scenarioKind === 'sandbox-escape' && input.dependencyCount > 50) {
    signals.push('sandbox-escape-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture container-breakout, namespace-escape, and isolation-bypass dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'iam-misconfiguration') {
    addAssumption(assumptions, 'Iam-misconfiguration behavior is inferred from scenario wording and dependency surface, not measured overly-permissive-role, wildcard-policy, or access-grant telemetry.');
  }

  if (scenarioKind === 'iam-misconfiguration' && input.dependencyCount > 50) {
    signals.push('iam-misconfiguration-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture overly-permissive-role, wildcard-policy, and access-grant dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'cross-account-access') {
    addAssumption(assumptions, 'Cross-account-access behavior is inferred from scenario wording and dependency surface, not measured external-account, trust-boundary, or assume-role telemetry.');
  }

  if (scenarioKind === 'cross-account-access' && input.dependencyCount > 50) {
    signals.push('cross-account-access-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture external-account, trust-boundary, and assume-role dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'service-mesh-policy') {
    addAssumption(assumptions, 'Service-mesh-policy behavior is inferred from scenario wording and dependency surface, not measured sidecar-mTLS, traffic-policy, or mesh-enforcement telemetry.');
  }

  if (scenarioKind === 'service-mesh-policy' && input.dependencyCount > 50) {
    signals.push('service-mesh-policy-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture sidecar-mTLS, traffic-policy, and mesh-enforcement dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'api-gateway-security') {
    addAssumption(assumptions, 'Api-gateway-security behavior is inferred from scenario wording and dependency surface, not measured gateway-auth-layer, request-validation, or rate-control telemetry.');
  }

  if (scenarioKind === 'api-gateway-security' && input.dependencyCount > 50) {
    signals.push('api-gateway-security-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture gateway-auth-layer, request-validation, and rate-control dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'rate-limiting-abuse') {
    addAssumption(assumptions, 'Rate-limiting-abuse behavior is inferred from scenario wording and dependency surface, not measured bypass-throttling, excessive-requests, or evasion telemetry.');
  }

  if (scenarioKind === 'rate-limiting-abuse' && input.dependencyCount > 50) {
    signals.push('rate-limiting-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture bypass-throttling, excessive-requests, and evasion dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dns-misconfiguration') {
    addAssumption(assumptions, 'Dns-misconfiguration behavior is inferred from scenario wording and dependency surface, not measured stale-record, wrong-CNAME, or zone-drift telemetry.');
  }

  if (scenarioKind === 'dns-misconfiguration' && input.dependencyCount > 50) {
    signals.push('dns-misconfiguration-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture stale-record, wrong-CNAME, and zone-drift dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'cdn-cache-poisoning') {
    addAssumption(assumptions, 'Cdn-cache-poisoning behavior is inferred from scenario wording and dependency surface, not measured cache-key-confusion, poisoned-edge-response, or header-variation telemetry.');
  }

  if (scenarioKind === 'cdn-cache-poisoning' && input.dependencyCount > 50) {
    signals.push('cdn-cache-poisoning-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cache-key-confusion, poisoned-edge-response, and header-variation dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'tls-downgrade') {
    addAssumption(assumptions, 'Tls-downgrade behavior is inferred from scenario wording and dependency surface, not measured weak-cipher, protocol-fallback, or old-TLS-version telemetry.');
  }

  if (scenarioKind === 'tls-downgrade' && input.dependencyCount > 50) {
    signals.push('tls-downgrade-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture weak-cipher, protocol-fallback, and old-TLS-version dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'oauth-misuse') {
    addAssumption(assumptions, 'Oauth-misuse behavior is inferred from scenario wording and dependency surface, not measured redirect-URI-abuse, weak-scope, or consent-flow telemetry.');
  }

  if (scenarioKind === 'oauth-misuse' && input.dependencyCount > 50) {
    signals.push('oauth-misuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture redirect-URI-abuse, weak-scope, and consent-flow dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'webhook-signature-bypass') {
    addAssumption(assumptions, 'Webhook-signature-bypass behavior is inferred from scenario wording and dependency surface, not measured missing-HMAC-verification, replayed-webhook, or unsigned-payload telemetry.');
  }

  if (scenarioKind === 'webhook-signature-bypass' && input.dependencyCount > 50) {
    signals.push('webhook-signature-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture missing-HMAC-verification, replayed-webhook, and unsigned-payload dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'mfa-bypass') {
    addAssumption(assumptions, 'Mfa-bypass behavior is inferred from scenario wording and dependency surface, not measured push-fatigue, one-time-code-interception, or second-factor-downgrade telemetry.');
  }

  if (scenarioKind === 'mfa-bypass' && input.dependencyCount > 50) {
    signals.push('mfa-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture push-fatigue, one-time-code-interception, and second-factor-downgrade dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'session-fixation') {
    addAssumption(assumptions, 'Session-fixation behavior is inferred from scenario wording and dependency surface, not measured preset-session-id, cookie-reuse, or login-binding telemetry.');
  }

  if (scenarioKind === 'session-fixation' && input.dependencyCount > 50) {
    signals.push('session-fixation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture preset-session-id, cookie-reuse, and login-binding dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'jwt-claim-tampering') {
    addAssumption(assumptions, 'Jwt-claim-tampering behavior is inferred from scenario wording and dependency surface, not measured unsigned-token, altered-audience, or modified-issuer telemetry.');
  }

  if (scenarioKind === 'jwt-claim-tampering' && input.dependencyCount > 50) {
    signals.push('jwt-claim-tampering-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unsigned-token, altered-audience, and modified-issuer dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'refresh-token-reuse') {
    addAssumption(assumptions, 'Refresh-token-reuse behavior is inferred from scenario wording and dependency surface, not measured stolen-refresh-token, token-replay, or rotation-failure telemetry.');
  }

  if (scenarioKind === 'refresh-token-reuse' && input.dependencyCount > 50) {
    signals.push('refresh-token-reuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture stolen-refresh-token, token-replay, and rotation-failure dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'account-enumeration') {
    addAssumption(assumptions, 'Account-enumeration behavior is inferred from scenario wording and dependency surface, not measured username-probing, login-error-oracle, or email-discovery telemetry.');
  }

  if (scenarioKind === 'account-enumeration' && input.dependencyCount > 50) {
    signals.push('account-enumeration-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture username-probing, login-error-oracle, and email-discovery dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'pii-leakage') {
    addAssumption(assumptions, 'Pii-leakage behavior is inferred from scenario wording and dependency surface, not measured personal-data-exposure, sensitive-field-disclosure, or customer-identifier telemetry.');
  }

  if (scenarioKind === 'pii-leakage' && input.dependencyCount > 50) {
    signals.push('pii-leakage-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture personal-data-exposure, sensitive-field-disclosure, and customer-identifier dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'log-secret-exposure') {
    addAssumption(assumptions, 'Log-secret-exposure behavior is inferred from scenario wording and dependency surface, not measured api-key-in-logs, credential-dump, or token-logged telemetry.');
  }

  if (scenarioKind === 'log-secret-exposure' && input.dependencyCount > 50) {
    signals.push('log-secret-exposure-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture api-key-in-logs, credential-dump, and token-logged dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'data-retention-violation') {
    addAssumption(assumptions, 'Data-retention-violation behavior is inferred from scenario wording and dependency surface, not measured expired-records, deletion-failure, or retention-policy-breach telemetry.');
  }

  if (scenarioKind === 'data-retention-violation' && input.dependencyCount > 50) {
    signals.push('data-retention-violation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture expired-records, deletion-failure, and retention-policy-breach dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'backup-exposure') {
    addAssumption(assumptions, 'Backup-exposure behavior is inferred from scenario wording and dependency surface, not measured public-snapshot, unsecured-backup, or open-archive telemetry.');
  }

  if (scenarioKind === 'backup-exposure' && input.dependencyCount > 50) {
    signals.push('backup-exposure-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture public-snapshot, unsecured-backup, and open-archive dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'analytics-tracking-abuse') {
    addAssumption(assumptions, 'Analytics-tracking-abuse behavior is inferred from scenario wording and dependency surface, not measured consent-bypass, excessive-tracking, or user-fingerprint telemetry.');
  }

  if (scenarioKind === 'analytics-tracking-abuse' && input.dependencyCount > 50) {
    signals.push('analytics-tracking-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture consent-bypass, excessive-tracking, and user-fingerprint dependency metrics before runtime simulation.');
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
