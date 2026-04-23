# Testing Strategy

## Purpose

This document defines the testing strategy for the Power Build system inside `gemini-cli`.

It exists to prevent the project from drifting into shallow confidence, demo-grade behavior, or feature accumulation without proof.

The system being built here is not a simple CLI utility. It is intended to become a spec-aware engineering platform that can:

- turn prompts into structured engineering specifications
- model a repository as a system
- analyze dependencies and environment fit
- simulate runtime and failure scenarios
- detect false confidence zones
- propose or apply repairs
- validate whether the system improved

Because of that, the testing strategy must prove more than syntax or command execution. It must prove truth-bearing behavior.

---

# 1. Testing philosophy

## 1.1 Test truth, not appearance
The primary goal of the test suite is to verify that the system is:

- coherent
- bounded
- deterministic where expected
- honest about uncertainty
- safe in mutation behavior
- resistant to regression

The test suite must not confuse any of the following with real confidence:

- a command returning output
- a report looking polished
- a simulation sounding plausible
- a patch applying cleanly
- a file structure existing

## 1.2 Testing must follow the architecture
The test strategy mirrors the system architecture.

If the system contains these engines:
- plugin runtime
- prompt/spec engine
- project model engine
- dependency engine
- environment/hardware probe
- simulation engine
- repair planner
- validation engine
- reporting layer

then each of these must have a matching test layer.

## 1.3 No test theater
The following are forbidden as substitutes for real testing:

- tests that only assert a non-empty string was returned
- tests that only prove a command did not crash
- tests that snapshot fabricated simulation output without validating its basis
- tests that exercise only happy paths in mutation logic
- coverage inflation through low-value wrapper tests

## 1.4 Determinism policy
Where the system is designed to be deterministic, tests must assert deterministic behavior.

If a subsystem uses estimation or inference, tests must assert that:
- estimation is labeled as estimation
- uncertainty is surfaced
- unverifiable claims are not presented as facts

---

# 2. Testing goals

## 2.1 Core goals
The test suite must prove that the system can:

1. Accept and normalize a prompt
2. Generate a structured spec
3. Build a coherent project model
4. Analyze dependencies accurately enough to surface real gaps
5. Evaluate environment and hardware fit honestly
6. Simulate likely runtime and failure paths without inventing facts
7. Detect false confidence zones
8. Produce repair plans that map to actual findings
9. Revalidate after mutation or proposed change
10. Preserve plugin runtime integrity and safety boundaries

## 2.2 Secondary goals
The test suite should also support:

- refactor safety
- subsystem replacement safety
- faster diagnosis of failures
- evidence-backed releases
- confidence scoring that is tied to real proof

---

# 3. Coverage model

## 3.1 Coverage targets
Target coverage is based on system importance, not equal treatment for every file.

Required targets:

- **100% invariant coverage**
- **90%+ plugin runtime coverage**
- **85%+ core domain coverage**
- **80%+ simulation / dependency / environment coverage**
- **smoke coverage for CLI and reporting surfaces**

## 3.2 Meaning of the targets

### 100% invariant coverage
Every critical invariant must have explicit tests.

### 90%+ plugin runtime coverage
The plugin runtime is foundational. It must be exhaustively trusted.

### 85%+ core domain coverage
Core engines like spec generation, project modeling, and repair planning should be heavily covered.

### 80%+ simulation / dependency / environment coverage
These are high-risk areas with heuristic and inference-heavy behavior. They need strong but targeted coverage.

### Smoke coverage for CLI and reporting
CLI and reporting layers need enough coverage to prove they wire correctly, but they do not deserve the same weight as truth engines.

---

# 4. Test taxonomy

The project must use five primary test classes:

1. unit tests
2. invariant tests
3. integration tests
4. regression tests
5. performance tests

Optional future additions:
- mutation testing
- property-based testing
- compatibility matrix testing

---

# 5. Unit tests

## 5.1 Purpose
Unit tests validate isolated logic with minimal dependencies.

## 5.2 Subsystems that require unit tests

### Plugin runtime
- plugin metadata validation
- lifecycle state transitions
- duplicate registration prevention
- command namespace resolution
- enable/disable behavior
- health state aggregation

### Prompt/spec engine
- prompt normalization
- ambiguity extraction
- requirement extraction
- acceptance criteria generation
- risk register construction

### Project model engine
- file graph construction
- import graph construction
- entrypoint detection
- contract extraction
- unresolved reference detection

### Dependency engine
- dependency parsing
- lockfile analysis
- undeclared dependency detection
- compatibility evaluation

### Environment/hardware engine
- environment profile normalization
- tooling detection abstraction
- hardware fit rules
- OS/runtime compatibility checks

### Simulation engine
- scenario construction
- constraint application
- failure predicate logic
- false confidence detection
- finding generation

### Repair planner
- finding prioritization
- affected-file mapping
- repair grouping
- rollback metadata creation

### Validation engine
- result aggregation
- gate status normalization
- confidence score adjustments
- regression classification

## 5.3 Unit test rules
- do not reach the real network
- filesystem access must be fixture-based or mocked cleanly
- randomness is disallowed unless explicitly seeded and tested
- assertions must verify semantics, not only shape

---

# 6. Invariant tests

## 6.1 Purpose
Invariant tests protect the non-negotiable truths of the system.

These are the highest-priority tests.

## 6.2 Required invariants

### Plugin runtime invariants
- plugin IDs are unique
- command names are unique or explicitly namespaced
- invalid plugin metadata is rejected
- load/unload/reload transitions preserve valid state
- a failed plugin does not corrupt the runtime
- disabled plugins do not execute commands

### Prompt/spec invariants
- the system must not silently invent required constraints without marking them as assumptions
- ambiguity must be surfaced when it affects architecture or execution correctness
- acceptance criteria must map back to actual requirements

### Project modeling invariants
- unresolved imports must not be reported as resolved
- missing entrypoints must not be silently accepted as complete
- orphaned or disconnected critical files must be surfaced

### Dependency invariants
- undeclared used dependencies must be surfaced
- lockfile contradictions must not be ignored
- incompatible runtime requirements must not be labeled safe

### Simulation invariants
- simulated results must distinguish verified vs inferred information
- false confidence zones must be surfaced when triggered
- deterministic inputs must yield deterministic findings
- estimated results must be labeled as estimated

### Repair invariants
- repair plans must reference actual findings
- high-risk destructive actions must require explicit approval pathways
- rollback strategy must exist for non-trivial mutations

### Validation invariants
- confidence must not increase without evidence
- regressions must not be folded into success summaries
- failed gates must be represented explicitly

## 6.3 Coverage requirement
All invariants above must be directly tested. This is the meaning of **100% invariant coverage**.

---

# 7. Integration tests

## 7.1 Purpose
Integration tests prove that subsystems work together coherently.

## 7.2 Critical integration flows

### Prompt to spec flow
Test that:
- prompt intake
- normalization
- spec generation
- ambiguity reporting

work as a coherent chain.

### Spec to scaffold flow
Test that:
- spec structure
- file planning
- scaffold planning
- write orchestration

stay aligned to the same system description.

### Project model to simulation flow
Test that:
- project graph
- dependency analysis
- environment profile
- scenario simulation
- findings generation

all operate over the same modeled truth.

### Findings to repair plan flow
Test that:
- findings become repair candidates
- affected files map correctly
- grouped changes remain coherent
- rollback data exists

### Repair to validation flow
Test that:
- a proposed or applied change triggers validation
- validation results update confidence correctly
- regressions are surfaced clearly

### Plugin runtime integration
Test that:
- multiple plugins can load together
- one broken plugin does not collapse the runtime
- command routing resolves correctly
- capability and permission exposure stays coherent

## 7.3 Integration test requirements
- prefer fixture repositories over heavy mocking
- validate both success and failure paths
- validate data handoff correctness between subsystems

---

# 8. Regression tests

## 8.1 Purpose
Regression tests ensure previously fixed failures do not silently return.

## 8.2 Required regression categories

### Dependency regressions
- missing package detection
- lockfile mismatch detection
- runtime incompatibility detection

### Prompt/spec regressions
- ambiguous prompt handling
- missing acceptance criteria generation
- spec drift from normalized intent

### Simulation regressions
- false confidence detector misses
- fabricated certainty in scenario reports
- unstable output for same inputs

### Repair regressions
- patch plans detached from findings
- unsafe grouping of unrelated file mutations
- rollback metadata missing after non-trivial change

### Validation regressions
- failed checks incorrectly aggregated as pass
- confidence inflation after failed gates
- regressions omitted from summaries

## 8.3 Rule for adding regression tests
Every meaningful bug fix should add at least one regression test unless the bug is already fully captured by an existing invariant test.

---

# 9. Performance tests

## 9.1 Purpose
Performance tests ensure the system remains usable as the repo grows.

## 9.2 Initial performance targets
The platform should measure at minimum:
- project model build time
- dependency analysis time
- simulation execution time for small/medium fixture repos
- validation orchestration overhead

## 9.3 Performance assertions
Performance tests do not need hyper-precise universal timing guarantees, but they must detect obvious regressions such as:
- accidental quadratic graph walks
- repeated full parses without caching
- unnecessary repeated dependency scans
- scenario execution explosions

---

# 10. Fixture strategy

## 10.1 Purpose
Fixture repositories are essential because this system reasons about software systems, not only isolated functions.

## 10.2 Required fixture classes

### Minimal healthy repo
A small clean TypeScript plugin-based repo with correct config and coherent structure.

### Missing dependency repo
A repo where code imports packages not declared in dependency manifests.

### Broken entrypoint repo
A repo with missing startup path or invalid entry configuration.

### False confidence repo
A repo that looks complete superficially but is missing real runtime coherence.

Examples:
- config file exists but is not referenced
- routes exist but not mounted
- command declared but not wired
- interface file exists but implementation incomplete

### Hardware mismatch repo
A repo whose declared workload or toolchain assumptions exceed target machine capability.

### Degraded environment repo
A repo requiring tools or runtimes absent from the environment profile.

### Repairable broken repo
A repo with clear structural issues that can be turned into a realistic repair plan and revalidated.

## 10.3 Fixture requirements
Fixtures must be:
- small enough for fast tests
- rich enough to expose system weaknesses
- version-controlled
- human-readable
- intentionally crafted for specific failure classes

---

# 11. Simulation-specific testing rules

## 11.1 No theatrical testing
Simulation tests must not only snapshot prose output. They must assert:
- what evidence was used
- what assumptions were recorded
- what was classified as verified vs inferred
- why a finding was emitted

## 11.2 Determinism requirement
For the same input project model, dependency model, and environment model:
- findings must be stable
- false confidence results must be stable
- confidence labeling must be stable

## 11.3 Scenario coverage
At minimum the simulation engine must be tested for:
- startup scenario
- missing config scenario
- missing dependency scenario
- degraded environment scenario
- false confidence scenario
- load or scale stress heuristic scenario

---

# 12. Repair testing rules

## 12.1 Required assertions
Repair planning tests must prove:
- findings are mapped to real target files
- related fixes are grouped coherently
- unrelated fixes are not merged carelessly
- rollback metadata exists
- destructive actions are classified as high risk

## 12.2 Dry-run testing
Any repair application path must be testable in dry-run mode first.

## 12.3 Safety assertions
Tests must ensure:
- no silent wide-scope write occurs
- risky mutation is surfaced as risky
- validation plan is attached to the repair plan

---

# 13. Validation testing rules

## 13.1 Gate aggregation
Validation tests must assert that the final result reflects the true state of:
- lint
- typecheck
- tests
- invariants
- simulation revalidation

## 13.2 Confidence scoring
Confidence must be tied to evidence, not aesthetics.

Tests must ensure:
- confidence rises only when gates support it
- failed gates reduce or block confidence
- uncertain findings are not scored as verified success

## 13.3 Regression surfacing
A validation summary must not hide regressions. Tests must assert explicit regression inclusion.

---

# 14. Reporting tests

## 14.1 Reports must contain mandatory sections
Relevant reports should include:
- summary
- verified facts
- inferred facts
- assumptions
- missing data
- findings
- false confidence zones
- recommended next actions

## 14.2 Reporting tests must assert meaning
Do not only test that headings exist. Also test that:
- findings included in the report match engine output
- assumptions are not dropped
- false confidence zones appear when triggered

---

# 15. Test directory structure

Recommended structure:

```text
tests/
  unit/
    plugin-runtime/
    prompt/
    project-model/
    dependency/
    environment/
    simulation/
    repair/
    validation/
    reporting/
  integration/
    prompt-to-spec/
    spec-to-scaffold/
    model-to-simulation/
    repair-to-validation/
    plugin-runtime/
  regression/
    dependency/
    simulation/
    repair/
    validation/
  fixtures/
    healthy-minimal/
    missing-dependency/
    broken-entrypoint/
    false-confidence/
    hardware-mismatch/
    degraded-environment/
    repairable-broken/
```

---

# 16. Test execution layers

## 16.1 Local developer workflow
At minimum, local validation should support:
- targeted unit tests
- full unit suite
- integration suite
- regression suite
- full validation run

## 16.2 CI workflow
CI should eventually enforce:
- lint
- typecheck
- unit tests
- integration tests
- invariant tests
- regression suite
- coverage thresholds

## 16.3 Release workflow
Before release or major merge, the system should run:
- full validation
- fixture repo integration suite
- targeted performance checks
- reporting checks

---

# 17. Mutation testing and deeper quality gates

## 17.1 Mutation testing
Mutation testing should be added when the core engines stabilize, especially for:
- plugin runtime
- dependency analysis
- false confidence detection
- repair prioritization
- validation scoring

## 17.2 Why mutation testing matters here
This platform will generate and judge engineering work. That means shallow assertions are especially dangerous. Mutation testing helps prove the suite can actually catch logical corruption.

---

# 18. Failure triage rules

When a test fails, triage should classify the failure as one of:

- invariant failure
- architecture drift
- dependency modeling failure
- environment/hardware modeling failure
- simulation honesty failure
- repair safety failure
- validation reporting failure
- fixture drift
- simple implementation bug

This classification helps preserve signal during growth.

---

# 19. Definition of testing success

The testing strategy is succeeding when the suite can reliably detect:

- architectural contradiction
- plugin runtime corruption
- missing dependencies
- invalid environment assumptions
- false confidence in reports
- unsafe repair planning
- invalid validation conclusions
- regressions in deterministic behavior

The testing strategy is failing when the suite mostly proves that commands run and files exist, but cannot catch misleading logic.

---

# 20. Immediate implementation order for tests

The testing work should begin in this order:

1. invariant tests for plugin runtime
2. unit tests for prompt/spec normalization
3. unit tests for dependency and environment modeling
4. deterministic simulation tests
5. false confidence detector tests
6. repair planning tests
7. validation aggregation tests
8. integration flows using fixtures
9. regression suite expansion
10. performance and mutation testing

This order matches system risk.

---

# 21. Final statement

This test strategy exists to ensure that Power Build becomes a trustworthy engineering platform rather than a convincing but shallow prototype.

The suite must prove not just that the system can produce output, but that it can produce output that is structurally grounded, operationally believable, explicitly bounded, and honest about uncertainty.
