import type {
  SimulationScenarioKind,
} from '../../../simulation_policy.js';

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

export {
  buildNextActions,
};
