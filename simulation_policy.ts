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
  | 'credential-stuffing'
  | 'bot-scraping'
  | 'payment-fraud'
  | 'promo-abuse'
  | 'inventory-hoarding'
  | 'crypto-mining'
  | 'resource-exhaustion'
  | 'egress-cost-spike'
  | 'orphaned-resource'
  | 'quota-drain'
  | 'pipeline-secret-leak'
  | 'workflow-permission-abuse'
  | 'artifact-poisoning'
  | 'runner-compromise'
  | 'deployment-approval-bypass'
  | 'branch-protection-bypass'
  | 'force-push-risk'
  | 'malicious-pr'
  | 'codeowner-bypass'
  | 'repo-secret-sprawl'
  | 'typosquatting-package'
  | 'dependency-confusion'
  | 'malicious-postinstall'
  | 'registry-token-leak'
  | 'package-publish-takeover'
  | 'process-injection'
  | 'shell-command-injection'
  | 'unsafe-deserialization'
  | 'path-traversal'
  | 'file-permission-drift'
  | 'ssrf'
  | 'open-redirect'
  | 'graphql-depth-abuse'
  | 'http-request-smuggling'
  | 'host-header-injection'
  | 'idor'
  | 'rbac-bypass'
  | 'abac-policy-drift'
  | 'tenant-boundary-break'
  | 'admin-route-exposure'
  | 'privileged-action-replay'
  | 'scope-escalation'
  | 'object-ownership-bypass'
  | 'double-spend'
  | 'race-condition'
  | 'lost-update'
  | 'stale-read'
  | 'write-skew'
  | 'replay-transaction'
  | 'partial-commit'
  | 'ledger-tampering'
  | 'message-replay'
  | 'event-ordering-drift'
  | 'consumer-lag-abuse'
  | 'poison-event'
  | 'schema-poisoning'
  | 'topic-permission-bypass'
  | 'dead-letter-flood'
  | 'event-duplication'
  | 'cloudtrail-disablement'
  | 'kms-key-misuse'
  | 'security-group-exposure'
  | 'public-bucket-policy'
  | 'snapshot-sharing-abuse'
  | 'serverless-permission-sprawl'
  | 'managed-identity-abuse'
  | 'control-plane-throttling'
  | 'prompt-injection'
  | 'tool-call-abuse'
  | 'agent-loop-runaway'
  | 'model-output-leakage'
  | 'unsafe-auto-approval'
  | 'retrieval-poisoning'
  | 'policy-override-attempt'
  | 'autonomous-action-drift'
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

interface ScenarioClassifierRule {
  kind: SimulationScenarioKind;
  keywords: string[];
}

const scenarioClassifierRules: ScenarioClassifierRule[] = [
  {
    kind: 'prompt-injection',
    keywords: ['prompt injection', 'prompt-injection', 'malicious instruction override', 'system prompt', 'hidden directive'],
  },
  {
    kind: 'tool-call-abuse',
    keywords: ['tool call abuse', 'tool-call-abuse', 'unauthorized tool invocation', 'excessive tool call', 'unsafe function execution'],
  },
  {
    kind: 'agent-loop-runaway',
    keywords: ['agent loop runaway', 'agent-loop-runaway', 'infinite agent loop', 'recursive planning', 'repeated self call', 'automation runaway'],
  },
  {
    kind: 'model-output-leakage',
    keywords: ['model output leakage', 'model-output-leakage', 'sensitive output disclosure', 'hidden context leak', 'private training data'],
  },
  {
    kind: 'unsafe-auto-approval',
    keywords: ['unsafe auto approval', 'unsafe-auto-approval', 'automatic approval', 'skipped human review', 'autonomous approval', 'dangerous action'],
  },
  {
    kind: 'retrieval-poisoning',
    keywords: ['retrieval poisoning', 'retrieval-poisoning', 'poisoned document', 'vector store contamination', 'malicious context retrieval'],
  },
  {
    kind: 'policy-override-attempt',
    keywords: ['policy override attempt', 'policy-override-attempt', 'guardrail bypass', 'safety policy override', 'instruction hierarchy attack'],
  },
  {
    kind: 'autonomous-action-drift',
    keywords: ['autonomous action drift', 'autonomous-action-drift', 'agent action deviates', 'unsupervised execution', 'goal drift'],
  },
  {
    kind: 'cloudtrail-disablement',
    keywords: ['cloudtrail disablement', 'cloudtrail-disablement', 'audit trail disabled', 'logging stopped', 'control plane visibility lost'],
  },
  {
    kind: 'kms-key-misuse',
    keywords: ['kms key misuse', 'kms-key-misuse', 'decrypt permission abuse', 'key policy wildcard', 'encryption key exposure'],
  },
  {
    kind: 'security-group-exposure',
    keywords: ['security group exposure', 'security-group-exposure', 'open ingress', '0.0.0.0', 'public port', 'firewall rule exposure'],
  },
  {
    kind: 'public-bucket-policy',
    keywords: ['public bucket policy', 'public-bucket-policy', 'object storage public read', 'bucket acl', 'wildcard principal exposure'],
  },
  {
    kind: 'snapshot-sharing-abuse',
    keywords: ['snapshot sharing abuse', 'snapshot-sharing-abuse', 'shared volume image', 'cross account snapshot leak'],
  },
  {
    kind: 'serverless-permission-sprawl',
    keywords: ['serverless permission sprawl', 'serverless-permission-sprawl', 'lambda role wildcard', 'function policy overbroad', 'invoke access'],
  },
  {
    kind: 'managed-identity-abuse',
    keywords: ['managed identity abuse', 'managed-identity-abuse', 'instance identity token', 'metadata credential', 'role assumption'],
  },
  {
    kind: 'control-plane-throttling',
    keywords: ['control plane throttling', 'control-plane-throttling', 'api control plane throttle', 'management api saturation', 'request limit'],
  },
];

function matchScenarioClassifierRule(normalizedScenario: string): SimulationScenarioKind | undefined {
  return scenarioClassifierRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedScenario.includes(keyword)),
  )?.kind;
}

function classifyScenario(scenario: string): SimulationScenarioKind {
  const normalized = scenario.toLowerCase();

  const registryMatch = matchScenarioClassifierRule(normalized);
  if (registryMatch) return registryMatch;

  if (normalized.includes('message replay') || normalized.includes('message-replay') || normalized.includes('duplicate message') || normalized.includes('replayed event') || normalized.includes('old offset') || normalized.includes('redelivered payload')) return 'message-replay';
  if (normalized.includes('event ordering drift') || normalized.includes('event-ordering-drift') || normalized.includes('out of order event') || normalized.includes('sequence gap') || normalized.includes('partition reorder')) return 'event-ordering-drift';
  if (normalized.includes('consumer lag abuse') || normalized.includes('consumer-lag-abuse') || normalized.includes('stalled consumer') || normalized.includes('offset lag') || normalized.includes('backlog growth') || normalized.includes('slow subscriber')) return 'consumer-lag-abuse';
  if (normalized.includes('poison event') || normalized.includes('poison-event') || normalized.includes('malformed event') || normalized.includes('toxic payload') || normalized.includes('handler crash') || normalized.includes('stream quarantine')) return 'poison-event';
  if (normalized.includes('schema poisoning') || normalized.includes('schema-poisoning') || normalized.includes('malicious schema evolution') || normalized.includes('incompatible event schema') || normalized.includes('schema registry pollution')) return 'schema-poisoning';
  if (normalized.includes('topic permission bypass') || normalized.includes('topic-permission-bypass') || normalized.includes('unauthorized publish') || normalized.includes('topic acl skipped') || normalized.includes('broker permission')) return 'topic-permission-bypass';
  if (normalized.includes('dead letter flood') || normalized.includes('dead-letter-flood') || normalized.includes('dlq flood') || normalized.includes('failed event surge') || normalized.includes('poison backlog') || normalized.includes('dead letter queue pressure')) return 'dead-letter-flood';
  if (normalized.includes('event duplication') || normalized.includes('event-duplication') || normalized.includes('duplicate event') || normalized.includes('repeated emit') || normalized.includes('producer retry') || normalized.includes('duplicate delivery')) return 'event-duplication';
  if (normalized.includes('double spend') || normalized.includes('double-spend') || normalized.includes('duplicate debit') || normalized.includes('repeated payment') || normalized.includes('balance reuse')) return 'double-spend';
  if (normalized.includes('race condition') || normalized.includes('race-condition') || normalized.includes('concurrent update') || normalized.includes('timing window') || normalized.includes('check then act') || normalized.includes('shared state conflict')) return 'race-condition';
  if (normalized.includes('lost update') || normalized.includes('lost-update') || normalized.includes('overwrite concurrent write') || normalized.includes('stale version') || normalized.includes('missing compare and swap')) return 'lost-update';
  if (normalized.includes('stale read') || normalized.includes('stale-read') || normalized.includes('replica lag') || normalized.includes('outdated read') || normalized.includes('read after write inconsistency')) return 'stale-read';
  if (normalized.includes('write skew') || normalized.includes('write-skew') || normalized.includes('snapshot isolation') || normalized.includes('invariant violation') || normalized.includes('concurrent transaction') || normalized.includes('constraint bypass')) return 'write-skew';
  if (normalized.includes('replay transaction') || normalized.includes('replay-transaction') || normalized.includes('duplicate request') || normalized.includes('nonce reuse') || normalized.includes('idempotency failure') || normalized.includes('repeated transaction')) return 'replay-transaction';
  if (normalized.includes('partial commit') || normalized.includes('partial-commit') || normalized.includes('half written transaction') || normalized.includes('atomicity failure') || normalized.includes('incomplete commit') || normalized.includes('inconsistent state')) return 'partial-commit';
  if (normalized.includes('ledger tampering') || normalized.includes('ledger-tampering') || normalized.includes('audit ledger mutation') || normalized.includes('balance history altered') || normalized.includes('transaction log rewrite')) return 'ledger-tampering';
  if (normalized.includes('dead letter queue') || normalized.includes('dead-letter-queue') || normalized.includes('dlq') || normalized.includes('poison message') || normalized.includes('retry exhausted')) return 'dead-letter-queue';
  if (normalized.includes('retry') || normalized.includes('storm')) return 'retry';
  if (normalized.includes('cold-start') || normalized.includes('cold start') || normalized.includes('startup')) return 'cold-start';
  if (normalized.includes('session fixation') || normalized.includes('session-fixation') || normalized.includes('preset session id') || normalized.includes('cookie reuse') || normalized.includes('login binding')) return 'session-fixation';
  if (normalized.includes('refresh token reuse') || normalized.includes('refresh-token-reuse') || normalized.includes('stolen refresh token') || normalized.includes('token replay') || normalized.includes('rotation failure')) return 'refresh-token-reuse';
  if (normalized.includes('session revocation') || normalized.includes('session-revocation') || normalized.includes('revoked session') || normalized.includes('logout') || normalized.includes('token invalidation')) return 'session-revocation';
  if (normalized.includes('host header injection') || normalized.includes('host-header-injection') || normalized.includes('poisoned host header') || normalized.includes('password reset url') || normalized.includes('host header')) return 'host-header-injection';
  if (normalized.includes('cdn cache poisoning') || normalized.includes('cdn-cache-poisoning') || normalized.includes('cache key confusion') || normalized.includes('poisoned edge response') || normalized.includes('header variation')) return 'cdn-cache-poisoning';
  if (normalized.includes('resource exhaustion') || normalized.includes('resource-exhaustion') || normalized.includes('memory burn') || normalized.includes('cpu saturation') || normalized.includes('disk fill') || normalized.includes('runaway workload')) return 'resource-exhaustion';
  if (normalized.includes('crypto mining') || normalized.includes('crypto-mining') || normalized.includes('unauthorized miner') || normalized.includes('wallet pool') || normalized.includes('hash workload')) return 'crypto-mining';
  if (normalized.includes('artifact poisoning') || normalized.includes('artifact-poisoning') || normalized.includes('malicious build artifact') || normalized.includes('tampered package') || normalized.includes('poisoned cache') || normalized.includes('release asset')) return 'artifact-poisoning';
  if (normalized.includes('cache') || normalized.includes('invalidation') || normalized.includes('warmup')) return 'cache';
  if (normalized.includes('database') || normalized.includes('connection pool') || normalized.includes('query latency')) return 'database';
  if (normalized.includes('bulkhead') || normalized.includes('isolation pool') || normalized.includes('resource isolation') || normalized.includes('resource partition')) return 'bulkhead';
  if (normalized.includes('saga') || normalized.includes('compensation') || normalized.includes('compensating transaction') || normalized.includes('transaction orchestration')) return 'saga';
  if (normalized.includes('outbox') || normalized.includes('transactional outbox') || normalized.includes('event relay') || normalized.includes('message dispatch')) return 'outbox';
  if (normalized.includes('dns misconfiguration') || normalized.includes('dns-misconfiguration') || normalized.includes('stale record') || normalized.includes('wrong cname') || normalized.includes('zone drift')) return 'dns-misconfiguration';
  if (normalized.includes('egress cost spike') || normalized.includes('egress-cost-spike') || normalized.includes('outbound bandwidth') || normalized.includes('data transfer surge')) return 'egress-cost-spike';
  if (normalized.includes('network policy') || normalized.includes('network-policy') || normalized.includes('namespace isolation') || normalized.includes('ingress egress') || normalized.includes('deny traffic')) return 'network-policy';
  if (normalized.includes('network') || normalized.includes('upstream timeout') || normalized.includes('partition')) return 'network';
  if (normalized.includes('queue') || normalized.includes('backlog') || normalized.includes('worker drain')) return 'queue';
  if (normalized.includes('orphaned resource') || normalized.includes('orphaned-resource') || normalized.includes('unattached volume') || normalized.includes('idle load balancer') || normalized.includes('stale instance') || normalized.includes('leaked allocation')) return 'orphaned-resource';
  if (normalized.includes('backup exposure') || normalized.includes('backup-exposure') || normalized.includes('public snapshot') || normalized.includes('unsecured backup') || normalized.includes('open archive') || normalized.includes('restore leak')) return 'backup-exposure';
  if (normalized.includes('process injection') || normalized.includes('process-injection') || normalized.includes('ptrace attach') || normalized.includes('dll injection') || normalized.includes('remote thread') || normalized.includes('memory write')) return 'process-injection';
  if (normalized.includes('object ownership bypass') || normalized.includes('object-ownership-bypass') || normalized.includes('owner check missing') || normalized.includes('resource owner mismatch') || normalized.includes('object access path')) return 'object-ownership-bypass';
  if (normalized.includes('storage') || normalized.includes('object store') || normalized.includes('write path')) return 'storage';
  if (normalized.includes('tls downgrade') || normalized.includes('tls-downgrade') || normalized.includes('weak cipher') || normalized.includes('protocol fallback') || normalized.includes('old tls version')) return 'tls-downgrade';
  if (normalized.includes('certificate expiry') || normalized.includes('certificate-expiry') || normalized.includes('tls certificate') || normalized.includes('certificate renewal') || normalized.includes('cert rotation')) return 'certificate-expiry';
  if (normalized.includes('token expiry') || normalized.includes('token-expiry') || normalized.includes('expired token') || normalized.includes('refresh token') || normalized.includes('session renewal')) return 'token-expiry';
  if (normalized.includes('key compromise') || normalized.includes('key-compromise') || normalized.includes('compromised key') || normalized.includes('credential leak') || normalized.includes('key revoke')) return 'key-compromise';
  if (normalized.includes('secret rotation') || normalized.includes('secret-rotation') || normalized.includes('credential rollover') || normalized.includes('key rotation') || normalized.includes('token refresh')) return 'secret-rotation';
  if (normalized.includes('idor') || normalized.includes('insecure direct object reference') || normalized.includes('object id manipulation') || normalized.includes('unauthorized record access')) return 'idor';
  if (normalized.includes('rbac bypass') || normalized.includes('rbac-bypass') || normalized.includes('role check skipped') || normalized.includes('unauthorized role access') || normalized.includes('permission gate bypass')) return 'rbac-bypass';
  if (normalized.includes('abac policy drift') || normalized.includes('abac-policy-drift') || normalized.includes('attribute based access') || normalized.includes('stale attribute') || normalized.includes('mismatched condition') || normalized.includes('policy drift')) return 'abac-policy-drift';
  if (normalized.includes('branch protection bypass') || normalized.includes('branch-protection-bypass') || normalized.includes('required review skipped') || normalized.includes('protected branch') || normalized.includes('direct merge')) return 'branch-protection-bypass';
  if (normalized.includes('codeowner bypass') || normalized.includes('codeowner-bypass') || normalized.includes('missing owner review') || normalized.includes('code owners ignored') || normalized.includes('protected path change')) return 'codeowner-bypass';
  if (normalized.includes('workflow permission abuse') || normalized.includes('workflow-permission-abuse') || normalized.includes('overbroad github token') || normalized.includes('write permission') || normalized.includes('privileged workflow')) return 'workflow-permission-abuse';
  if (normalized.includes('permission boundary') || normalized.includes('permission-boundary') || normalized.includes('least privilege') || normalized.includes('scoped permission') || normalized.includes('access boundary')) return 'permission-boundary';
  if (normalized.includes('cors policy') || normalized.includes('cors-policy') || normalized.includes('cross origin') || normalized.includes('allowed origin') || normalized.includes('preflight request')) return 'cors-policy';
  if (normalized.includes('csrf protection') || normalized.includes('csrf-protection') || normalized.includes('cross site request forgery') || normalized.includes('csrf token') || normalized.includes('same site cookie')) return 'csrf-protection';
  if (normalized.includes('xss defense') || normalized.includes('xss-defense') || normalized.includes('cross site scripting') || normalized.includes('output encoding') || normalized.includes('content security policy')) return 'xss-defense';
  if (normalized.includes('sql injection') || normalized.includes('sql-injection') || normalized.includes('parameterized query') || normalized.includes('prepared statement')) return 'sql-injection';
  if (normalized.includes('ssrf defense') || normalized.includes('ssrf-defense') || normalized.includes('metadata block') || normalized.includes('egress allowlist') || normalized.includes('url fetch guard')) return 'ssrf-defense';
  if (normalized.includes('ssrf') || normalized.includes('server side request forgery') || normalized.includes('internal metadata request') || normalized.includes('cloud metadata endpoint')) return 'ssrf';
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
  if (normalized.includes('registry token leak') || normalized.includes('registry-token-leak') || normalized.includes('npm token exposed') || normalized.includes('publish credential') || normalized.includes('package registry access')) return 'registry-token-leak';
  if (normalized.includes('repo secret sprawl') || normalized.includes('repo-secret-sprawl') || normalized.includes('committed secret') || normalized.includes('private key checked in') || normalized.includes('credential spread')) return 'repo-secret-sprawl';
  if (normalized.includes('pipeline secret leak') || normalized.includes('pipeline-secret-leak') || normalized.includes('ci secret exposed') || normalized.includes('masked variable printed') || normalized.includes('build log')) return 'pipeline-secret-leak';
  if (normalized.includes('log secret exposure') || normalized.includes('log-secret-exposure') || normalized.includes('api key in logs') || normalized.includes('credential dump') || normalized.includes('token logged')) return 'log-secret-exposure';
  if (normalized.includes('pii leakage') || normalized.includes('pii-leakage') || normalized.includes('personal data exposure') || normalized.includes('sensitive field disclosure') || normalized.includes('customer identifier')) return 'pii-leakage';
  if (normalized.includes('data retention violation') || normalized.includes('data-retention-violation') || normalized.includes('expired records') || normalized.includes('deletion failure') || normalized.includes('retention policy breach') || normalized.includes('archive overrun')) return 'data-retention-violation';
  if (normalized.includes('bot scraping') || normalized.includes('bot-scraping') || normalized.includes('automated scraper') || normalized.includes('headless browser') || normalized.includes('content harvesting') || normalized.includes('crawl abuse')) return 'bot-scraping';
  if (normalized.includes('payment fraud') || normalized.includes('payment-fraud') || normalized.includes('stolen card') || normalized.includes('chargeback abuse') || normalized.includes('card testing') || normalized.includes('transaction fraud')) return 'payment-fraud';
  if (normalized.includes('promo abuse') || normalized.includes('promo-abuse') || normalized.includes('coupon stacking') || normalized.includes('referral abuse') || normalized.includes('discount exploit') || normalized.includes('free trial farming')) return 'promo-abuse';
  if (normalized.includes('inventory hoarding') || normalized.includes('inventory-hoarding') || normalized.includes('cart stuffing') || normalized.includes('stock reservation abuse') || normalized.includes('checkout bot') || normalized.includes('scarcity')) return 'inventory-hoarding';
  if (normalized.includes('analytics tracking abuse') || normalized.includes('analytics-tracking-abuse') || normalized.includes('consent bypass') || normalized.includes('excessive tracking') || normalized.includes('user fingerprint') || normalized.includes('third party pixel')) return 'analytics-tracking-abuse';
  if (normalized.includes('runner compromise') || normalized.includes('runner-compromise') || normalized.includes('self hosted runner escape') || normalized.includes('build agent takeover') || normalized.includes('workspace persistence')) return 'runner-compromise';
  if (normalized.includes('runtime detection') || normalized.includes('runtime-detection') || normalized.includes('anomaly detection') || normalized.includes('behavior monitoring') || normalized.includes('intrusion detection')) return 'runtime-detection';
  if (normalized.includes('pod security') || normalized.includes('pod-security') || normalized.includes('restricted pod') || normalized.includes('pod security standard') || normalized.includes('run as non root')) return 'pod-security';
  if (normalized.includes('secrets mount') || normalized.includes('secrets-mount') || normalized.includes('secret volume') || normalized.includes('projected secret') || normalized.includes('secret file permission')) return 'secrets-mount';
  if (normalized.includes('privilege escalation') || normalized.includes('privilege-escalation') || normalized.includes('escalated privilege') || normalized.includes('root capability') || normalized.includes('setuid')) return 'privilege-escalation';
  if (normalized.includes('sandbox escape') || normalized.includes('sandbox-escape') || normalized.includes('container breakout') || normalized.includes('namespace escape') || normalized.includes('isolation bypass')) return 'sandbox-escape';
  if (normalized.includes('iam misconfiguration') || normalized.includes('iam-misconfiguration') || normalized.includes('overly permissive role') || normalized.includes('wildcard policy') || normalized.includes('access grant')) return 'iam-misconfiguration';
  if (normalized.includes('cross account access') || normalized.includes('cross-account-access') || normalized.includes('external account') || normalized.includes('trust boundary') || normalized.includes('assume role')) return 'cross-account-access';
  if (normalized.includes('admin route exposure') || normalized.includes('admin-route-exposure') || normalized.includes('exposed admin endpoint') || normalized.includes('missing admin guard') || normalized.includes('privileged route public')) return 'admin-route-exposure';
  if (normalized.includes('privileged action replay') || normalized.includes('privileged-action-replay') || normalized.includes('repeated admin action') || normalized.includes('nonce missing') || normalized.includes('replayed privileged request')) return 'privileged-action-replay';
  if (normalized.includes('scope escalation') || normalized.includes('scope-escalation') || normalized.includes('oauth scope expansion') || normalized.includes('privilege scope widened') || normalized.includes('unauthorized scope grant')) return 'scope-escalation';
  if (normalized.includes('credential stuffing') || normalized.includes('credential-stuffing') || normalized.includes('reused password') || normalized.includes('login spray') || normalized.includes('breached credential') || normalized.includes('automated login')) return 'credential-stuffing';
  if (normalized.includes('mfa bypass') || normalized.includes('mfa-bypass') || normalized.includes('push fatigue') || normalized.includes('one time code interception') || normalized.includes('second factor downgrade')) return 'mfa-bypass';
  if (normalized.includes('jwt claim tampering') || normalized.includes('jwt-claim-tampering') || normalized.includes('unsigned token') || normalized.includes('altered audience') || normalized.includes('modified issuer') || normalized.includes('privilege claim')) return 'jwt-claim-tampering';
  if (normalized.includes('account enumeration') || normalized.includes('account-enumeration') || normalized.includes('username probing') || normalized.includes('login error oracle') || normalized.includes('email discovery')) return 'account-enumeration';
  if (normalized.includes('graphql depth abuse') || normalized.includes('graphql-depth-abuse') || normalized.includes('nested query recursion') || normalized.includes('expensive resolver') || normalized.includes('query complexity')) return 'graphql-depth-abuse';
  if (normalized.includes('http request smuggling') || normalized.includes('http-request-smuggling') || normalized.includes('content length transfer encoding') || normalized.includes('desync proxy') || normalized.includes('parser ambiguity')) return 'http-request-smuggling';
  if (normalized.includes('api gateway security') || normalized.includes('api-gateway-security') || normalized.includes('gateway auth layer') || normalized.includes('request validation') || normalized.includes('gateway security')) return 'api-gateway-security';
  if (normalized.includes('quota drain') || normalized.includes('quota-drain') || normalized.includes('api quota exhaustion') || normalized.includes('service limit depletion') || normalized.includes('request budget burn')) return 'quota-drain';
  if (normalized.includes('rate limiting abuse') || normalized.includes('rate-limiting-abuse') || normalized.includes('excessive requests') || normalized.includes('throttling abuse') || normalized.includes('rate control abuse')) return 'rate-limiting-abuse';
  if (normalized.includes('oauth misuse') || normalized.includes('oauth-misuse') || normalized.includes('redirect uri abuse') || normalized.includes('weak scope') || normalized.includes('consent flow')) return 'oauth-misuse';
  if (normalized.includes('webhook signature bypass') || normalized.includes('webhook-signature-bypass') || normalized.includes('missing hmac verification') || normalized.includes('replayed webhook') || normalized.includes('unsigned payload')) return 'webhook-signature-bypass';
  if (normalized.includes('shell command injection') || normalized.includes('shell-command-injection') || normalized.includes('unsanitized exec') || normalized.includes('user command') || normalized.includes('subprocess spawn') || normalized.includes('argument escape')) return 'shell-command-injection';
  if (normalized.includes('unsafe deserialization') || normalized.includes('unsafe-deserialization') || normalized.includes('untrusted object') || normalized.includes('deserialize gadget') || normalized.includes('gadget chain') || normalized.includes('serialized payload')) return 'unsafe-deserialization';
  if (normalized.includes('open redirect') || normalized.includes('open-redirect') || normalized.includes('unvalidated redirect') || normalized.includes('external redirect') || normalized.includes('phishing redirect') || normalized.includes('redirect parameter')) return 'open-redirect';
  if (normalized.includes('path traversal') || normalized.includes('path-traversal') || normalized.includes('dot dot slash') || normalized.includes('directory escape') || normalized.includes('arbitrary file read') || normalized.includes('file path bypass')) return 'path-traversal';
  if (normalized.includes('file permission drift') || normalized.includes('file-permission-drift') || normalized.includes('world writable') || normalized.includes('chmod change') || normalized.includes('ownership mismatch') || normalized.includes('sensitive file mode')) return 'file-permission-drift';
  if (normalized.includes('input sanitization') || normalized.includes('input-sanitization') || normalized.includes('user input') || normalized.includes('escaping validation') || normalized.includes('injection prevention')) return 'input-sanitization';
  if (normalized.includes('package publish takeover') || normalized.includes('package-publish-takeover') || normalized.includes('maintainer account takeover') || normalized.includes('unauthorized release') || normalized.includes('compromised package owner')) return 'package-publish-takeover';
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
  if (normalized.includes('tenant boundary break') || normalized.includes('tenant-boundary-break') || normalized.includes('cross tenant data access') || normalized.includes('tenant isolation failure') || normalized.includes('organization boundary')) return 'tenant-boundary-break';
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
  if (normalized.includes('force push risk') || normalized.includes('force-push-risk') || normalized.includes('rewritten history') || normalized.includes('non fast forward') || normalized.includes('branch overwrite') || normalized.includes('commit loss')) return 'force-push-risk';
  if (normalized.includes('typosquatting package') || normalized.includes('typosquatting-package') || normalized.includes('misspelled dependency') || normalized.includes('lookalike package') || normalized.includes('malicious registry name')) return 'typosquatting-package';
  if (normalized.includes('dependency confusion') || normalized.includes('dependency-confusion') || normalized.includes('private package shadowed') || normalized.includes('public registry') || normalized.includes('namespace collision')) return 'dependency-confusion';
  if (normalized.includes('malicious postinstall') || normalized.includes('malicious-postinstall') || normalized.includes('install script') || normalized.includes('package lifecycle hook') || normalized.includes('credential exfiltration')) return 'malicious-postinstall';
  if (normalized.includes('malicious pr') || normalized.includes('malicious-pr') || normalized.includes('hostile contribution') || normalized.includes('hidden payload') || normalized.includes('review evasion')) return 'malicious-pr';
  if (normalized.includes('deployment approval bypass') || normalized.includes('deployment-approval-bypass') || normalized.includes('skipped reviewer') || normalized.includes('environment protection override') || normalized.includes('manual gate')) return 'deployment-approval-bypass';
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

  if (scenarioKind === 'credential-stuffing') {
    addAssumption(assumptions, 'Credential-stuffing behavior is inferred from scenario wording and dependency surface, not measured reused-password, login-spray, or breached-credential telemetry.');
  }

  if (scenarioKind === 'credential-stuffing' && input.dependencyCount > 50) {
    signals.push('credential-stuffing-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture reused-password, login-spray, and breached-credential dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'bot-scraping') {
    addAssumption(assumptions, 'Bot-scraping behavior is inferred from scenario wording and dependency surface, not measured automated-scraper, headless-browser, or content-harvesting telemetry.');
  }

  if (scenarioKind === 'bot-scraping' && input.dependencyCount > 50) {
    signals.push('bot-scraping-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture automated-scraper, headless-browser, and content-harvesting dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'payment-fraud') {
    addAssumption(assumptions, 'Payment-fraud behavior is inferred from scenario wording and dependency surface, not measured stolen-card, chargeback-abuse, or card-testing telemetry.');
  }

  if (scenarioKind === 'payment-fraud' && input.dependencyCount > 50) {
    signals.push('payment-fraud-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture stolen-card, chargeback-abuse, and card-testing dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'promo-abuse') {
    addAssumption(assumptions, 'Promo-abuse behavior is inferred from scenario wording and dependency surface, not measured coupon-stacking, referral-abuse, or discount-exploit telemetry.');
  }

  if (scenarioKind === 'promo-abuse' && input.dependencyCount > 50) {
    signals.push('promo-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture coupon-stacking, referral-abuse, and discount-exploit dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'inventory-hoarding') {
    addAssumption(assumptions, 'Inventory-hoarding behavior is inferred from scenario wording and dependency surface, not measured cart-stuffing, stock-reservation-abuse, or checkout-bot telemetry.');
  }

  if (scenarioKind === 'inventory-hoarding' && input.dependencyCount > 50) {
    signals.push('inventory-hoarding-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cart-stuffing, stock-reservation-abuse, and checkout-bot dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'crypto-mining') {
    addAssumption(assumptions, 'Crypto-mining behavior is inferred from scenario wording and dependency surface, not measured unauthorized-miner, wallet-pool, or hash-workload telemetry.');
  }

  if (scenarioKind === 'crypto-mining' && input.dependencyCount > 50) {
    signals.push('crypto-mining-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unauthorized-miner, wallet-pool, and hash-workload dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'resource-exhaustion') {
    addAssumption(assumptions, 'Resource-exhaustion behavior is inferred from scenario wording and dependency surface, not measured memory-burn, CPU-saturation, or disk-fill telemetry.');
  }

  if (scenarioKind === 'resource-exhaustion' && input.dependencyCount > 50) {
    signals.push('resource-exhaustion-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture memory-burn, CPU-saturation, and disk-fill dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'egress-cost-spike') {
    addAssumption(assumptions, 'Egress-cost-spike behavior is inferred from scenario wording and dependency surface, not measured outbound-bandwidth, data-transfer-surge, or cross-region-traffic telemetry.');
  }

  if (scenarioKind === 'egress-cost-spike' && input.dependencyCount > 50) {
    signals.push('egress-cost-spike-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture outbound-bandwidth, data-transfer-surge, and cross-region-traffic dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'orphaned-resource') {
    addAssumption(assumptions, 'Orphaned-resource behavior is inferred from scenario wording and dependency surface, not measured unattached-volume, idle-load-balancer, or stale-instance telemetry.');
  }

  if (scenarioKind === 'orphaned-resource' && input.dependencyCount > 50) {
    signals.push('orphaned-resource-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unattached-volume, idle-load-balancer, and stale-instance dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'quota-drain') {
    addAssumption(assumptions, 'Quota-drain behavior is inferred from scenario wording and dependency surface, not measured api-quota-exhaustion, service-limit-depletion, or request-budget-burn telemetry.');
  }

  if (scenarioKind === 'quota-drain' && input.dependencyCount > 50) {
    signals.push('quota-drain-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture api-quota-exhaustion, service-limit-depletion, and request-budget-burn dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'pipeline-secret-leak') {
    addAssumption(assumptions, 'Pipeline-secret-leak behavior is inferred from scenario wording and dependency surface, not measured ci-secret-exposed, masked-variable-printed, or build-log telemetry.');
  }

  if (scenarioKind === 'pipeline-secret-leak' && input.dependencyCount > 50) {
    signals.push('pipeline-secret-leak-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture ci-secret-exposed, masked-variable-printed, and build-log dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'workflow-permission-abuse') {
    addAssumption(assumptions, 'Workflow-permission-abuse behavior is inferred from scenario wording and dependency surface, not measured overbroad-github-token, write-permission, or privileged-workflow telemetry.');
  }

  if (scenarioKind === 'workflow-permission-abuse' && input.dependencyCount > 50) {
    signals.push('workflow-permission-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture overbroad-github-token, write-permission, and privileged-workflow dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'artifact-poisoning') {
    addAssumption(assumptions, 'Artifact-poisoning behavior is inferred from scenario wording and dependency surface, not measured malicious-build-artifact, tampered-package, or poisoned-cache telemetry.');
  }

  if (scenarioKind === 'artifact-poisoning' && input.dependencyCount > 50) {
    signals.push('artifact-poisoning-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture malicious-build-artifact, tampered-package, and poisoned-cache dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'runner-compromise') {
    addAssumption(assumptions, 'Runner-compromise behavior is inferred from scenario wording and dependency surface, not measured self-hosted-runner-escape, build-agent-takeover, or workspace-persistence telemetry.');
  }

  if (scenarioKind === 'runner-compromise' && input.dependencyCount > 50) {
    signals.push('runner-compromise-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture self-hosted-runner-escape, build-agent-takeover, and workspace-persistence dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'deployment-approval-bypass') {
    addAssumption(assumptions, 'Deployment-approval-bypass behavior is inferred from scenario wording and dependency surface, not measured skipped-reviewer, environment-protection-override, or manual-gate telemetry.');
  }

  if (scenarioKind === 'deployment-approval-bypass' && input.dependencyCount > 50) {
    signals.push('deployment-approval-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture skipped-reviewer, environment-protection-override, and manual-gate dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'branch-protection-bypass') {
    addAssumption(assumptions, 'Branch-protection-bypass behavior is inferred from scenario wording and dependency surface, not measured required-review-skipped, protected-branch, or direct-merge telemetry.');
  }

  if (scenarioKind === 'branch-protection-bypass' && input.dependencyCount > 50) {
    signals.push('branch-protection-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture required-review-skipped, protected-branch, and direct-merge dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'force-push-risk') {
    addAssumption(assumptions, 'Force-push-risk behavior is inferred from scenario wording and dependency surface, not measured rewritten-history, non-fast-forward, or branch-overwrite telemetry.');
  }

  if (scenarioKind === 'force-push-risk' && input.dependencyCount > 50) {
    signals.push('force-push-risk-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture rewritten-history, non-fast-forward, and branch-overwrite dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'malicious-pr') {
    addAssumption(assumptions, 'Malicious-pr behavior is inferred from scenario wording and dependency surface, not measured hostile-contribution, hidden-payload, or review-evasion telemetry.');
  }

  if (scenarioKind === 'malicious-pr' && input.dependencyCount > 50) {
    signals.push('malicious-pr-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture hostile-contribution, hidden-payload, and review-evasion dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'codeowner-bypass') {
    addAssumption(assumptions, 'Codeowner-bypass behavior is inferred from scenario wording and dependency surface, not measured missing-owner-review, code-owners-ignored, or protected-path-change telemetry.');
  }

  if (scenarioKind === 'codeowner-bypass' && input.dependencyCount > 50) {
    signals.push('codeowner-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture missing-owner-review, code-owners-ignored, and protected-path-change dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'repo-secret-sprawl') {
    addAssumption(assumptions, 'Repo-secret-sprawl behavior is inferred from scenario wording and dependency surface, not measured committed-secret, private-key-checked-in, or credential-spread telemetry.');
  }

  if (scenarioKind === 'repo-secret-sprawl' && input.dependencyCount > 50) {
    signals.push('repo-secret-sprawl-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture committed-secret, private-key-checked-in, and credential-spread dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'typosquatting-package') {
    addAssumption(assumptions, 'Typosquatting-package behavior is inferred from scenario wording and dependency surface, not measured misspelled-dependency, lookalike-package, or malicious-registry-name telemetry.');
  }

  if (scenarioKind === 'typosquatting-package' && input.dependencyCount > 50) {
    signals.push('typosquatting-package-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture misspelled-dependency, lookalike-package, and malicious-registry-name dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dependency-confusion') {
    addAssumption(assumptions, 'Dependency-confusion behavior is inferred from scenario wording and dependency surface, not measured private-package-shadowed, public-registry, or namespace-collision telemetry.');
  }

  if (scenarioKind === 'dependency-confusion' && input.dependencyCount > 50) {
    signals.push('dependency-confusion-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture private-package-shadowed, public-registry, and namespace-collision dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'malicious-postinstall') {
    addAssumption(assumptions, 'Malicious-postinstall behavior is inferred from scenario wording and dependency surface, not measured install-script, package-lifecycle-hook, or credential-exfiltration telemetry.');
  }

  if (scenarioKind === 'malicious-postinstall' && input.dependencyCount > 50) {
    signals.push('malicious-postinstall-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture install-script, package-lifecycle-hook, and credential-exfiltration dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'registry-token-leak') {
    addAssumption(assumptions, 'Registry-token-leak behavior is inferred from scenario wording and dependency surface, not measured npm-token-exposed, publish-credential, or package-registry-access telemetry.');
  }

  if (scenarioKind === 'registry-token-leak' && input.dependencyCount > 50) {
    signals.push('registry-token-leak-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture npm-token-exposed, publish-credential, and package-registry-access dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'package-publish-takeover') {
    addAssumption(assumptions, 'Package-publish-takeover behavior is inferred from scenario wording and dependency surface, not measured maintainer-account-takeover, unauthorized-release, or compromised-package-owner telemetry.');
  }

  if (scenarioKind === 'package-publish-takeover' && input.dependencyCount > 50) {
    signals.push('package-publish-takeover-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture maintainer-account-takeover, unauthorized-release, and compromised-package-owner dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'process-injection') {
    addAssumption(assumptions, 'Process-injection behavior is inferred from scenario wording and dependency surface, not measured ptrace-attach, dll-injection, or remote-thread telemetry.');
  }

  if (scenarioKind === 'process-injection' && input.dependencyCount > 50) {
    signals.push('process-injection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture ptrace-attach, dll-injection, and remote-thread dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'shell-command-injection') {
    addAssumption(assumptions, 'Shell-command-injection behavior is inferred from scenario wording and dependency surface, not measured unsanitized-exec, user-command, or subprocess-spawn telemetry.');
  }

  if (scenarioKind === 'shell-command-injection' && input.dependencyCount > 50) {
    signals.push('shell-command-injection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unsanitized-exec, user-command, and subprocess-spawn dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'unsafe-deserialization') {
    addAssumption(assumptions, 'Unsafe-deserialization behavior is inferred from scenario wording and dependency surface, not measured untrusted-object, deserialize-gadget, or gadget-chain telemetry.');
  }

  if (scenarioKind === 'unsafe-deserialization' && input.dependencyCount > 50) {
    signals.push('unsafe-deserialization-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture untrusted-object, deserialize-gadget, and gadget-chain dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'path-traversal') {
    addAssumption(assumptions, 'Path-traversal behavior is inferred from scenario wording and dependency surface, not measured dot-dot-slash, directory-escape, or arbitrary-file-read telemetry.');
  }

  if (scenarioKind === 'path-traversal' && input.dependencyCount > 50) {
    signals.push('path-traversal-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture dot-dot-slash, directory-escape, and arbitrary-file-read dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'file-permission-drift') {
    addAssumption(assumptions, 'File-permission-drift behavior is inferred from scenario wording and dependency surface, not measured world-writable, chmod-change, or ownership-mismatch telemetry.');
  }

  if (scenarioKind === 'file-permission-drift' && input.dependencyCount > 50) {
    signals.push('file-permission-drift-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture world-writable, chmod-change, and ownership-mismatch dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'ssrf') {
    addAssumption(assumptions, 'Ssrf behavior is inferred from scenario wording and dependency surface, not measured server-side-request-forgery, internal-metadata-request, or cloud-metadata-endpoint telemetry.');
  }

  if (scenarioKind === 'ssrf' && input.dependencyCount > 50) {
    signals.push('ssrf-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture server-side-request-forgery, internal-metadata-request, and cloud-metadata-endpoint dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'open-redirect') {
    addAssumption(assumptions, 'Open-redirect behavior is inferred from scenario wording and dependency surface, not measured unvalidated-redirect, external-redirect, or phishing-redirect telemetry.');
  }

  if (scenarioKind === 'open-redirect' && input.dependencyCount > 50) {
    signals.push('open-redirect-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unvalidated-redirect, external-redirect, and phishing-redirect dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'graphql-depth-abuse') {
    addAssumption(assumptions, 'Graphql-depth-abuse behavior is inferred from scenario wording and dependency surface, not measured nested-query-recursion, expensive-resolver, or query-complexity telemetry.');
  }

  if (scenarioKind === 'graphql-depth-abuse' && input.dependencyCount > 50) {
    signals.push('graphql-depth-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture nested-query-recursion, expensive-resolver, and query-complexity dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'http-request-smuggling') {
    addAssumption(assumptions, 'Http-request-smuggling behavior is inferred from scenario wording and dependency surface, not measured content-length-transfer-encoding, desync-proxy, or parser-ambiguity telemetry.');
  }

  if (scenarioKind === 'http-request-smuggling' && input.dependencyCount > 50) {
    signals.push('http-request-smuggling-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture content-length-transfer-encoding, desync-proxy, and parser-ambiguity dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'host-header-injection') {
    addAssumption(assumptions, 'Host-header-injection behavior is inferred from scenario wording and dependency surface, not measured poisoned-host-header, password-reset-url, or cache-poisoning telemetry.');
  }

  if (scenarioKind === 'host-header-injection' && input.dependencyCount > 50) {
    signals.push('host-header-injection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture poisoned-host-header, password-reset-url, and cache-poisoning dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'idor') {
    addAssumption(assumptions, 'Idor behavior is inferred from scenario wording and dependency surface, not measured object-id-manipulation or unauthorized-record-access telemetry.');
  }

  if (scenarioKind === 'idor' && input.dependencyCount > 50) {
    signals.push('idor-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture object-id-manipulation and unauthorized-record-access dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'rbac-bypass') {
    addAssumption(assumptions, 'Rbac-bypass behavior is inferred from scenario wording and dependency surface, not measured role-check-skipped, unauthorized-role-access, or permission-gate-bypass telemetry.');
  }

  if (scenarioKind === 'rbac-bypass' && input.dependencyCount > 50) {
    signals.push('rbac-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture role-check-skipped, unauthorized-role-access, and permission-gate-bypass dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'abac-policy-drift') {
    addAssumption(assumptions, 'Abac-policy-drift behavior is inferred from scenario wording and dependency surface, not measured stale-attribute, mismatched-condition, or policy-drift telemetry.');
  }

  if (scenarioKind === 'abac-policy-drift' && input.dependencyCount > 50) {
    signals.push('abac-policy-drift-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture stale-attribute, mismatched-condition, and policy-drift dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'tenant-boundary-break') {
    addAssumption(assumptions, 'Tenant-boundary-break behavior is inferred from scenario wording and dependency surface, not measured cross-tenant-data-access, tenant-isolation-failure, or organization-boundary telemetry.');
  }

  if (scenarioKind === 'tenant-boundary-break' && input.dependencyCount > 50) {
    signals.push('tenant-boundary-break-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture cross-tenant-data-access, tenant-isolation-failure, and organization-boundary dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'admin-route-exposure') {
    addAssumption(assumptions, 'Admin-route-exposure behavior is inferred from scenario wording and dependency surface, not measured exposed-admin-endpoint, missing-admin-guard, or privileged-route-public telemetry.');
  }

  if (scenarioKind === 'admin-route-exposure' && input.dependencyCount > 50) {
    signals.push('admin-route-exposure-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture exposed-admin-endpoint, missing-admin-guard, and privileged-route-public dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'privileged-action-replay') {
    addAssumption(assumptions, 'Privileged-action-replay behavior is inferred from scenario wording and dependency surface, not measured repeated-admin-action, nonce-missing, or replayed-privileged-request telemetry.');
  }

  if (scenarioKind === 'privileged-action-replay' && input.dependencyCount > 50) {
    signals.push('privileged-action-replay-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture repeated-admin-action, nonce-missing, and replayed-privileged-request dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'scope-escalation') {
    addAssumption(assumptions, 'Scope-escalation behavior is inferred from scenario wording and dependency surface, not measured oauth-scope-expansion, privilege-scope-widened, or unauthorized-scope-grant telemetry.');
  }

  if (scenarioKind === 'scope-escalation' && input.dependencyCount > 50) {
    signals.push('scope-escalation-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture oauth-scope-expansion, privilege-scope-widened, and unauthorized-scope-grant dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'object-ownership-bypass') {
    addAssumption(assumptions, 'Object-ownership-bypass behavior is inferred from scenario wording and dependency surface, not measured owner-check-missing, resource-owner-mismatch, or object-access telemetry.');
  }

  if (scenarioKind === 'object-ownership-bypass' && input.dependencyCount > 50) {
    signals.push('object-ownership-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture owner-check-missing, resource-owner-mismatch, and object-access dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'double-spend') {
    addAssumption(assumptions, 'Double-spend behavior is inferred from scenario wording and dependency surface, not measured duplicate-debit, repeated-payment, or balance-reuse telemetry.');
  }

  if (scenarioKind === 'double-spend' && input.dependencyCount > 50) {
    signals.push('double-spend-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture duplicate-debit, repeated-payment, and balance-reuse dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'race-condition') {
    addAssumption(assumptions, 'Race-condition behavior is inferred from scenario wording and dependency surface, not measured concurrent-update, timing-window, or shared-state-conflict telemetry.');
  }

  if (scenarioKind === 'race-condition' && input.dependencyCount > 50) {
    signals.push('race-condition-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture concurrent-update, timing-window, and shared-state-conflict dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'lost-update') {
    addAssumption(assumptions, 'Lost-update behavior is inferred from scenario wording and dependency surface, not measured overwrite-concurrent-write, stale-version, or compare-and-swap telemetry.');
  }

  if (scenarioKind === 'lost-update' && input.dependencyCount > 50) {
    signals.push('lost-update-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture overwrite-concurrent-write, stale-version, and compare-and-swap dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'stale-read') {
    addAssumption(assumptions, 'Stale-read behavior is inferred from scenario wording and dependency surface, not measured replica-lag, outdated-read, or read-after-write-inconsistency telemetry.');
  }

  if (scenarioKind === 'stale-read' && input.dependencyCount > 50) {
    signals.push('stale-read-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture replica-lag, outdated-read, and read-after-write-inconsistency dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'write-skew') {
    addAssumption(assumptions, 'Write-skew behavior is inferred from scenario wording and dependency surface, not measured snapshot-isolation, invariant-violation, or constraint-bypass telemetry.');
  }

  if (scenarioKind === 'write-skew' && input.dependencyCount > 50) {
    signals.push('write-skew-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture snapshot-isolation, invariant-violation, and constraint-bypass dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'replay-transaction') {
    addAssumption(assumptions, 'Replay-transaction behavior is inferred from scenario wording and dependency surface, not measured duplicate-request, nonce-reuse, or idempotency-failure telemetry.');
  }

  if (scenarioKind === 'replay-transaction' && input.dependencyCount > 50) {
    signals.push('replay-transaction-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture duplicate-request, nonce-reuse, and idempotency-failure dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'partial-commit') {
    addAssumption(assumptions, 'Partial-commit behavior is inferred from scenario wording and dependency surface, not measured half-written-transaction, atomicity-failure, or incomplete-commit telemetry.');
  }

  if (scenarioKind === 'partial-commit' && input.dependencyCount > 50) {
    signals.push('partial-commit-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture half-written-transaction, atomicity-failure, and incomplete-commit dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'ledger-tampering') {
    addAssumption(assumptions, 'Ledger-tampering behavior is inferred from scenario wording and dependency surface, not measured audit-ledger-mutation, balance-history-altered, or transaction-log-rewrite telemetry.');
  }

  if (scenarioKind === 'ledger-tampering' && input.dependencyCount > 50) {
    signals.push('ledger-tampering-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture audit-ledger-mutation, balance-history-altered, and transaction-log-rewrite dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'message-replay') {
    addAssumption(assumptions, 'Message-replay behavior is inferred from scenario wording and dependency surface, not measured duplicate-message, replayed-event, or redelivered-payload telemetry.');
  }

  if (scenarioKind === 'message-replay' && input.dependencyCount > 50) {
    signals.push('message-replay-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture duplicate-message, replayed-event, and redelivered-payload dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'event-ordering-drift') {
    addAssumption(assumptions, 'Event-ordering-drift behavior is inferred from scenario wording and dependency surface, not measured out-of-order-event, sequence-gap, or partition-reorder telemetry.');
  }

  if (scenarioKind === 'event-ordering-drift' && input.dependencyCount > 50) {
    signals.push('event-ordering-drift-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture out-of-order-event, sequence-gap, and partition-reorder dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'consumer-lag-abuse') {
    addAssumption(assumptions, 'Consumer-lag-abuse behavior is inferred from scenario wording and dependency surface, not measured stalled-consumer, offset-lag, or slow-subscriber telemetry.');
  }

  if (scenarioKind === 'consumer-lag-abuse' && input.dependencyCount > 50) {
    signals.push('consumer-lag-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture stalled-consumer, offset-lag, and slow-subscriber dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'poison-event') {
    addAssumption(assumptions, 'Poison-event behavior is inferred from scenario wording and dependency surface, not measured malformed-event, toxic-payload, or handler-crash telemetry.');
  }

  if (scenarioKind === 'poison-event' && input.dependencyCount > 50) {
    signals.push('poison-event-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture malformed-event, toxic-payload, and handler-crash dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'schema-poisoning') {
    addAssumption(assumptions, 'Schema-poisoning behavior is inferred from scenario wording and dependency surface, not measured malicious-schema-evolution, incompatible-event-schema, or schema-registry-pollution telemetry.');
  }

  if (scenarioKind === 'schema-poisoning' && input.dependencyCount > 50) {
    signals.push('schema-poisoning-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture malicious-schema-evolution, incompatible-event-schema, and schema-registry-pollution dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'topic-permission-bypass') {
    addAssumption(assumptions, 'Topic-permission-bypass behavior is inferred from scenario wording and dependency surface, not measured unauthorized-publish, topic-acl-skipped, or broker-permission telemetry.');
  }

  if (scenarioKind === 'topic-permission-bypass' && input.dependencyCount > 50) {
    signals.push('topic-permission-bypass-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unauthorized-publish, topic-acl-skipped, and broker-permission dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'dead-letter-flood') {
    addAssumption(assumptions, 'Dead-letter-flood behavior is inferred from scenario wording and dependency surface, not measured dlq-flood, failed-event-surge, or poison-backlog telemetry.');
  }

  if (scenarioKind === 'dead-letter-flood' && input.dependencyCount > 50) {
    signals.push('dead-letter-flood-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture dlq-flood, failed-event-surge, and poison-backlog dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'event-duplication') {
    addAssumption(assumptions, 'Event-duplication behavior is inferred from scenario wording and dependency surface, not measured duplicate-event, repeated-emit, or duplicate-delivery telemetry.');
  }

  if (scenarioKind === 'event-duplication' && input.dependencyCount > 50) {
    signals.push('event-duplication-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture duplicate-event, repeated-emit, and duplicate-delivery dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'cloudtrail-disablement') {
    addAssumption(assumptions, 'Cloudtrail-disablement behavior is inferred from scenario wording and dependency surface, not measured audit-trail-disabled, logging-stopped, or control-plane-visibility telemetry.');
  }

  if (scenarioKind === 'cloudtrail-disablement' && input.dependencyCount > 50) {
    signals.push('cloudtrail-disablement-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture audit-trail-disabled, logging-stopped, and control-plane-visibility dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'kms-key-misuse') {
    addAssumption(assumptions, 'Kms-key-misuse behavior is inferred from scenario wording and dependency surface, not measured decrypt-permission-abuse, key-policy-wildcard, or encryption-key-exposure telemetry.');
  }

  if (scenarioKind === 'kms-key-misuse' && input.dependencyCount > 50) {
    signals.push('kms-key-misuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture decrypt-permission-abuse, key-policy-wildcard, and encryption-key-exposure dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'security-group-exposure') {
    addAssumption(assumptions, 'Security-group-exposure behavior is inferred from scenario wording and dependency surface, not measured open-ingress, public-port, or firewall-rule-exposure telemetry.');
  }

  if (scenarioKind === 'security-group-exposure' && input.dependencyCount > 50) {
    signals.push('security-group-exposure-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture open-ingress, public-port, and firewall-rule-exposure dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'public-bucket-policy') {
    addAssumption(assumptions, 'Public-bucket-policy behavior is inferred from scenario wording and dependency surface, not measured object-storage-public-read, bucket-acl, or wildcard-principal-exposure telemetry.');
  }

  if (scenarioKind === 'public-bucket-policy' && input.dependencyCount > 50) {
    signals.push('public-bucket-policy-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture object-storage-public-read, bucket-acl, and wildcard-principal-exposure dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'snapshot-sharing-abuse') {
    addAssumption(assumptions, 'Snapshot-sharing-abuse behavior is inferred from scenario wording and dependency surface, not measured public-snapshot, shared-volume-image, or cross-account-snapshot-leak telemetry.');
  }

  if (scenarioKind === 'snapshot-sharing-abuse' && input.dependencyCount > 50) {
    signals.push('snapshot-sharing-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture public-snapshot, shared-volume-image, and cross-account-snapshot-leak dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'serverless-permission-sprawl') {
    addAssumption(assumptions, 'Serverless-permission-sprawl behavior is inferred from scenario wording and dependency surface, not measured lambda-role-wildcard, function-policy-overbroad, or invoke-access telemetry.');
  }

  if (scenarioKind === 'serverless-permission-sprawl' && input.dependencyCount > 50) {
    signals.push('serverless-permission-sprawl-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture lambda-role-wildcard, function-policy-overbroad, and invoke-access dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'managed-identity-abuse') {
    addAssumption(assumptions, 'Managed-identity-abuse behavior is inferred from scenario wording and dependency surface, not measured instance-identity-token, metadata-credential, or role-assumption telemetry.');
  }

  if (scenarioKind === 'managed-identity-abuse' && input.dependencyCount > 50) {
    signals.push('managed-identity-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture instance-identity-token, metadata-credential, and role-assumption dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'control-plane-throttling') {
    addAssumption(assumptions, 'Control-plane-throttling behavior is inferred from scenario wording and dependency surface, not measured api-control-plane-throttle, management-api-saturation, or request-limit telemetry.');
  }

  if (scenarioKind === 'control-plane-throttling' && input.dependencyCount > 50) {
    signals.push('control-plane-throttling-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture api-control-plane-throttle, management-api-saturation, and request-limit dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'prompt-injection') {
    addAssumption(assumptions, 'Prompt-injection behavior is inferred from scenario wording and dependency surface, not measured malicious-instruction-override, hidden-directive, or system-prompt telemetry.');
  }

  if (scenarioKind === 'prompt-injection' && input.dependencyCount > 50) {
    signals.push('prompt-injection-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture malicious-instruction-override, hidden-directive, and system-prompt dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'tool-call-abuse') {
    addAssumption(assumptions, 'Tool-call-abuse behavior is inferred from scenario wording and dependency surface, not measured unauthorized-tool-invocation, excessive-tool-call, or unsafe-function-execution telemetry.');
  }

  if (scenarioKind === 'tool-call-abuse' && input.dependencyCount > 50) {
    signals.push('tool-call-abuse-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture unauthorized-tool-invocation, excessive-tool-call, and unsafe-function-execution dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'agent-loop-runaway') {
    addAssumption(assumptions, 'Agent-loop-runaway behavior is inferred from scenario wording and dependency surface, not measured infinite-agent-loop, recursive-planning, or automation-runaway telemetry.');
  }

  if (scenarioKind === 'agent-loop-runaway' && input.dependencyCount > 50) {
    signals.push('agent-loop-runaway-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture infinite-agent-loop, recursive-planning, and automation-runaway dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'model-output-leakage') {
    addAssumption(assumptions, 'Model-output-leakage behavior is inferred from scenario wording and dependency surface, not measured sensitive-output-disclosure, hidden-context-leak, or private-training-data telemetry.');
  }

  if (scenarioKind === 'model-output-leakage' && input.dependencyCount > 50) {
    signals.push('model-output-leakage-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture sensitive-output-disclosure, hidden-context-leak, and private-training-data dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'unsafe-auto-approval') {
    addAssumption(assumptions, 'Unsafe-auto-approval behavior is inferred from scenario wording and dependency surface, not measured automatic-approval, skipped-human-review, or dangerous-action telemetry.');
  }

  if (scenarioKind === 'unsafe-auto-approval' && input.dependencyCount > 50) {
    signals.push('unsafe-auto-approval-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture automatic-approval, skipped-human-review, and dangerous-action dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'retrieval-poisoning') {
    addAssumption(assumptions, 'Retrieval-poisoning behavior is inferred from scenario wording and dependency surface, not measured poisoned-document, vector-store-contamination, or malicious-context-retrieval telemetry.');
  }

  if (scenarioKind === 'retrieval-poisoning' && input.dependencyCount > 50) {
    signals.push('retrieval-poisoning-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture poisoned-document, vector-store-contamination, and malicious-context-retrieval dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'policy-override-attempt') {
    addAssumption(assumptions, 'Policy-override-attempt behavior is inferred from scenario wording and dependency surface, not measured guardrail-bypass, safety-policy-override, or instruction-hierarchy-attack telemetry.');
  }

  if (scenarioKind === 'policy-override-attempt' && input.dependencyCount > 50) {
    signals.push('policy-override-attempt-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture guardrail-bypass, safety-policy-override, and instruction-hierarchy-attack dependency metrics before runtime simulation.');
  }

  if (scenarioKind === 'autonomous-action-drift') {
    addAssumption(assumptions, 'Autonomous-action-drift behavior is inferred from scenario wording and dependency surface, not measured agent-action-deviates, unsupervised-execution, or goal-drift telemetry.');
  }

  if (scenarioKind === 'autonomous-action-drift' && input.dependencyCount > 50) {
    signals.push('autonomous-action-drift-dependency-pressure');
    addEvidence(evidenceBasis, 'dependency-summary');
    recommendations.push('Capture agent-action-deviates, unsupervised-execution, and goal-drift dependency metrics before runtime simulation.');
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
