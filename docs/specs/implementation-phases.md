# Implementation Phases

## Purpose

This document converts the Power Build system specification into a directly executable implementation sequence for the current `gemini-cli` repository.

It is intentionally written against the repo as it exists now, not against an imaginary clean-room rebuild. The goal is to evolve the current codebase without architectural drift, false starts, or shallow rewrites.

---

# 1. Current Repository Baseline

## 1.1 Confirmed current characteristics

The current repository already demonstrates a viable base in these areas:

- plugin interface concept
- plugin context concept
- registry / loader / manager split
- CLI integration beginnings
- example plugin proof
- simulator-oriented plugin surface
- early integration and system tests

## 1.2 Current weaknesses

The current build is not yet a trustworthy engineering platform because it still has these major weaknesses:

- flat-file architecture
- shallow dependency modeling
- weak or absent hardware awareness
- simulated behavior that can overstate reality
- early project metadata and framing drift
- loose separation between prototype logic and future platform logic
- tests that prove control flow more than truth

## 1.3 Rewrite strategy

This project should **not** be thrown away and restarted blindly.

The correct path is:

- preserve the architectural spine
- replace false or weak layers
- move core logic into a real subsystem layout
- harden around deterministic analysis, simulation, repair, and validation

---

# 2. Execution Rules

These rules govern every phase.

## 2.1 Preserve truth anchors
Every implementation step must stay aligned to:

- prompt intent
- system spec
- project model
- findings
- repair plan
- validation result

## 2.2 No fake completion
No feature may be marked complete if it:

- returns fabricated metrics
- hides missing assumptions
- emits placeholder structure as if production-ready
- compiles but lacks operational truth

## 2.3 No flat growth
New core logic should not continue to accumulate at repo root.

## 2.4 Determinism first
When a result is estimated or inferred, it must be labeled explicitly.

## 2.5 Test critical truth, not only execution
A command running is not enough. Tests must prove the system is correct, bounded, and non-deceptive.

---

# 3. Target Repository Shape

The long-term repository should move toward this structure:

```text
gemini-cli/
  package.json
  tsconfig.json
  README.md
  docs/
    specs/
    architecture/
    operations/
    security/
    testing/
  src/
    index.ts
    core/
    plugin-runtime/
    prompt/
    project-model/
    dependency/
    environment/
    scaffold/
    simulation/
    repair/
    validation/
    reporting/
    cli/
    plugins/
      builtins/
  tests/
    unit/
    integration/
    regression/
    fixtures/
```

This structure is a target, not a single-step requirement. The phases below describe how to reach it without breaking the repo recklessly.

---

# 4. Phase 0 — Reclaim Coherence

## Objective
Normalize the repository’s identity, direction, and structure before adding more complexity.

## Required work

### 4.0.1 Repository framing
- align package metadata with actual project mission
- remove any unserious, unsafe, or misleading project framing
- ensure README reflects current truth and target direction

### 4.0.2 Documentation anchors
Create or maintain:
- `README.md`
- `docs/specs/system-spec.md`
- `docs/specs/implementation-phases.md`
- later: `docs/testing/testing-strategy.md`

### 4.0.3 Build layout alignment
- define `src/` as the real source home
- stop treating the root as the long-term source layout
- align build scripts and TypeScript config to the target structure

### 4.0.4 Naming normalization
Standardize subsystem names so the repo consistently uses:
- spec
- project model
- dependency
- environment
- simulation
- repair
- validation

## Acceptance criteria
- README aligns with system spec
- system spec exists in repo
- implementation phases exist in repo
- package metadata reflects actual mission
- source layout direction is explicit

## Exit condition
The repo can clearly answer: “What is this project, and what is it trying to become?”

---

# 5. Phase 1 — Harden the Plugin Runtime

## Objective
Turn the current plugin prototype into a reliable runtime foundation.

## Why this phase comes first
The plugin runtime is already one of the repo’s strongest existing ideas. It should become the stable foundation that later engines plug into.

## Subsystems to implement or harden

### 5.1.1 Plugin contract
Move toward a formal contract that requires:
- `id`
- `name`
- `version`
- `description`
- `category`
- `capabilities`
- `permissions`
- `commands`
- `healthCheck()`
- `cleanup()`

### 5.1.2 Plugin lifecycle
Support states:
- discovered
- validated
- loaded
- initialized
- active
- disabled
- failed
- unloaded

### 5.1.3 Registry hardening
The registry must:
- prevent duplicate plugin IDs
- prevent duplicate command names unless explicitly namespaced
- track plugin state
- expose plugin health summaries

### 5.1.4 Loader hardening
The loader must:
- validate plugin metadata
- reject invalid plugins safely
- isolate load failures
- continue loading valid plugins after one failure

### 5.1.5 Manager orchestration
The manager must support:
- load all
- load one
- unload one
- reload one
- enable/disable one
- list health and state

### 5.1.6 Permission model
Introduce bounded plugin permissions such as:
- read project files
- write project files
- run shell commands
- inspect environment
- emit findings

## Tests required

### Invariant tests
- duplicate plugin ID rejection
- duplicate command rejection
- invalid metadata rejection
- lifecycle state transitions
- unload and reload correctness

### Integration tests
- runtime loads builtins successfully
- runtime survives one broken plugin
- permissions are exposed consistently to plugins

## Acceptance criteria
- plugin runtime is deterministic
- bad plugins fail safely
- reload/unload is test-covered
- state transitions are explicit

## Exit condition
The plugin runtime can serve as the foundation for spec, simulation, and validation subsystems.

---

# 6. Phase 2 — Build the Prompt and Spec Engine

## Objective
Convert user prompts into explicit, structured engineering specifications.

## Required capabilities

### 6.2.1 Prompt intake
The system must accept a raw prompt and extract:
- project type
- language and framework
- major requirements
- constraints
- ambiguities
- assumptions

### 6.2.2 Intent normalization
Normalize vague requests into a consistent internal model without inventing unjustified requirements.

### 6.2.3 Spec generation
Generate an engineering spec containing:
- summary
- functional requirements
- non-functional requirements
- architecture outline
- component list
- file plan
- validation criteria
- risk register
- acceptance criteria

### 6.2.4 Ambiguity reporting
The engine must surface missing constraints and unresolved questions rather than silently assume them away.

## Output artifacts
- internal spec object
- Markdown spec output
- machine-readable spec output
- ambiguity report

## Tests required
- prompt normalization tests
- ambiguity extraction tests
- spec field completeness tests
- regression tests against known prompt fixtures

## Acceptance criteria
- same prompt produces stable structured output
- assumptions are explicit
- ambiguity is reported, not hidden
- spec output is testable and diffable

## Exit condition
The repo can truthfully claim it supports prompt-to-spec generation.

---

# 7. Phase 3 — Build the Project Modeling Engine

## Objective
Model a repository as a system rather than a loose set of files.

## Required capabilities

### 7.3.1 File graph
Map:
- source files
- config files
- test files
- entry points
- generated outputs where relevant

### 7.3.2 Module and import graph
Track:
- internal imports
- external imports
- unresolved imports
- circular references where present

### 7.3.3 Contract map
Identify:
- plugin contracts
- command contracts
- public interfaces
- configuration surfaces

### 7.3.4 Runtime map
Build a model of:
- startup path
- command execution path
- plugin loading path
- dependency touchpoints

## Tests required
- fixture-based graph tests
- unresolved import detection tests
- entrypoint identification tests
- contract mapping tests

## Acceptance criteria
- project model can explain the repo structure coherently
- imports and entry points are discoverable
- unresolved or weak boundaries become findings

## Exit condition
The repo can now be reasoned about as a system.

---

# 8. Phase 4 — Build Dependency and Environment Intelligence

## Objective
Make the system dependency-aware and hardware-aware.

## Why this matters
A build is not believable if it ignores:
- missing packages
- version conflicts
- unsupported runtime versions
- unavailable tooling
- insufficient hardware

## Required dependency capabilities
- parse `package.json`
- inspect lockfiles
- identify undeclared dependencies
- identify unused declarations where practical
- detect version conflicts and compatibility concerns
- classify critical dependencies

## Required environment capabilities
- detect OS/platform
- detect CPU count
- detect RAM and disk availability
- detect Node and package manager availability
- detect Git and Docker availability where relevant
- detect Python availability where cross-language workflows exist

## Required outputs
- dependency report
- environment profile
- hardware fit report
- installability and compatibility findings

## Tests required
- dependency parser tests
- lockfile analyzer tests
- environment probe abstraction tests
- fixture tests for broken dependency scenarios

## Acceptance criteria
- repo can answer whether the current environment can support the target work
- missing dependencies are surfaced as findings
- hardware/toolchain mismatches are surfaced as findings

## Exit condition
The system stops pretending all builds can run everywhere.

---

# 9. Phase 5 — Build the Deterministic Simulation Engine

## Objective
Replace theatrical simulation with bounded, evidence-based simulation.

## Hard rule
No fabricated runtime facts.
If something is estimated, it must be labeled as estimated.

## Required simulation layers

### 9.5.1 Structural simulation
Check:
- missing entry points
- broken imports
- incomplete file plans
- inconsistent contracts

### 9.5.2 Dependency simulation
Check:
- missing packages
- unavailable services
- downgraded or incompatible dependency cases

### 9.5.3 Environment and hardware simulation
Check:
- insufficient RAM
- insufficient disk
- runtime/toolchain mismatch
- local vs target environment mismatch

### 9.5.4 Runtime scenario simulation
Support scenarios like:
- startup
- degraded dependency availability
- missing config
- high load
- retry/failure cascades
- partial subsystem failure

### 9.5.5 False confidence detector
Identify areas that look complete but are actually weak, mocked, under-enforced, or not production-safe.

## Tests required
- deterministic simulation repeatability tests
- fixture-based failure scenario tests
- false confidence detector tests
- regression tests for known weak patterns

## Acceptance criteria
- same input yields stable simulation findings
- results separate verified vs inferred information
- false confidence zones appear in reports

## Exit condition
The system can simulate usefully without lying.

---

# 10. Phase 6 — Build the Repair Planning Engine

## Objective
Translate findings into safe, reviewable, staged repair plans.

## Required capabilities
- prioritize findings
- group related fixes
- identify affected files
- generate dry-run patch plans
- define rollback strategy
- specify revalidation steps

## Required constraints
- no silent destructive rewrites
- no broad risky mutation without explicit approval
- no multi-file repair without dependency and impact awareness

## Tests required
- patch plan generation tests
- affected-file mapping tests
- rollback metadata tests
- safe grouping tests

## Acceptance criteria
- findings can be transformed into concrete repair work
- repair work is grouped and reviewable
- every repair plan includes validation expectations

## Exit condition
The system can propose engineering work instead of only diagnosing problems.

---

# 11. Phase 7 — Build the Validation Engine

## Objective
Prove whether proposed or applied changes improved the system.

## Required validation gates
- lint
- typecheck
- tests
- invariant checks
- targeted simulation revalidation

## Required outputs
- gate-by-gate pass/fail
- regression list
- updated confidence score
- remaining blockers

## Tests required
- validation orchestration tests
- failure aggregation tests
- confidence scoring tests
- regression detection tests

## Acceptance criteria
- validation results are aggregated coherently
- regressions are surfaced clearly
- confidence never increases without evidence

## Exit condition
The repo can now evaluate whether a proposed fix actually helped.

---

# 12. Phase 8 — Build Reporting and Traceability

## Objective
Make the system explain itself clearly and consistently.

## Required outputs
- spec report
- architecture report
- dependency report
- environment fit report
- simulation report
- repair report
- validation report
- final readiness report

## Required behavior
Every major report must distinguish:
- verified facts
- inferred facts
- assumptions
- missing data
- false confidence zones

## Tests required
- report rendering tests
- confidence partition tests
- required section presence tests

## Acceptance criteria
- reports are structured and repeatable
- false confidence reporting is mandatory
- traceability exists from finding to fix to validation

## Exit condition
The platform can explain what it knows, how it knows it, and what still remains uncertain.

---

# 13. Phase 9 — Hardening, Fixtures, and Release Readiness

## Objective
Raise the system from promising architecture to robust engineering tool.

## Required work
- add realistic fixture repositories
- expand regression coverage
- add performance checks for analysis and simulation cost
- refine CLI ergonomics
- complete documentation map
- verify packaging and installation path

## Coverage targets
- **100% invariant coverage**
- **90%+ plugin runtime coverage**
- **85%+ core domain coverage**
- **80%+ simulation/dependency/environment coverage**
- **smoke coverage for CLI and reporting surfaces**

## Acceptance criteria
- fixture repos prove behavior under multiple project shapes
- coverage targets are materially met
- docs and code are aligned
- packaging is coherent and repeatable

## Exit condition
The project can be presented as a credible engineering platform, not only a prototype.

---

# 14. Direct Mapping Against the Current Repo

This phase map is intended to apply directly to the current repository.

## Current root files likely to be migrated or reorganized

- `index.ts`
- `plugin_interface.ts`
- `plugin_context.ts`
- `plugin_registry.ts`
- `plugin_loader.ts`
- `plugin_manager.ts`
- `prompt_engineering_plugin.ts`
- `project_simulator_plugin.ts`
- `gemini_cli_integration.ts`
- `example_plugin.ts`
- `integration_test.ts`
- `test_plugin_system.ts`

## Migration direction

### Runtime files
Move toward:
- `src/plugin-runtime/contracts/`
- `src/plugin-runtime/loader/`
- `src/plugin-runtime/registry/`
- `src/plugin-runtime/manager/`

### Prompt and spec files
Move toward:
- `src/prompt/intake/`
- `src/prompt/normalization/`
- `src/prompt/spec/`

### Simulation files
Move toward:
- `src/simulation/engine/`
- `src/simulation/scenarios/`
- `src/simulation/findings/`
- `src/simulation/false-confidence/`

### Tests
Move toward:
- `tests/unit/`
- `tests/integration/`
- `tests/regression/`
- `tests/fixtures/`

This migration should happen in phases, not in one careless rewrite.

---

# 15. Definition of Progress

The repo is making real progress only when each phase produces at least one of these:

- stronger truth model
- stronger boundary enforcement
- stronger test evidence
- better hardware/dependency realism
- better simulation honesty
- clearer repairability
- clearer validation confidence

Adding surface commands without improving these does not count as meaningful progress.

---

# 16. Main Failure Modes to Avoid

## 16.1 Rename without real change
Do not rename weak prototype behavior into “engine” language without changing its actual logic.

## 16.2 More root-level sprawl
Do not keep adding core files at repo root.

## 16.3 Fabricated simulation confidence
Do not make reports sound certain when the engine is inferring or estimating.

## 16.4 Test theater
Do not accept command-execution tests as proof of correctness.

## 16.5 Spec drift
Do not let README, system spec, implementation phases, and actual code describe different projects.

---

# 17. Immediate Next Actions

The next concrete document to add after this one is:

- `docs/testing/testing-strategy.md`

Then execution should begin at:

1. repository normalization
2. plugin runtime hardening
3. prompt/spec engine build-out
4. dependency and environment intelligence
5. deterministic simulation rewrite

---

# 18. Final Statement

This document is the direct implementation bridge between the current `gemini-cli` repository and the Power Build system specification.

Its purpose is to ensure the project evolves through controlled, testable, architecture-led phases rather than through feature drift or prototype accumulation.
