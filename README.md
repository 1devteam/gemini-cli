# gemini-cli

## Purpose

`gemini-cli` is being shaped into a plugin-driven engineering CLI focused on turning prompts into structured specifications, building coherent implementation plans, analyzing codebases as systems, and simulating likely runtime behavior before changes are made.

The intended direction is not a generic chatbot wrapper. The intended direction is a **power build** for software engineering work:

- prompt -> structured spec
- spec -> implementation plan
- project -> dependency and environment analysis
- project -> runtime and failure simulation
- findings -> repair planning
- repair plan -> validation workflow

## Current State

This repository is an early-stage build with a viable spine already present:

- plugin contract concepts
- registry / loader / manager split
- CLI integration beginnings
- simulator-oriented plugin surface
- early tests and integration scaffolding

It is not yet a completed production system. The current job of the repo is to evolve from a promising prototype into a deterministic, testable, architecture-led engineering platform.

## Project Direction

The target system is intended to support these core capabilities:

### 1. Prompt-to-Spec
Convert user intent into structured engineering specifications with:

- explicit goals
- assumptions
- constraints
- ambiguities
- acceptance criteria
- phased implementation plans

### 2. Project Modeling
Inspect a repository as a system rather than as isolated files:

- file graph
- module graph
- contracts and interfaces
- entry points
- configuration surfaces
- operational dependencies

### 3. Dependency and Environment Awareness
Reason about whether a project can actually run and evolve in a given environment:

- dependency inspection
- lockfile awareness
- tooling availability
- runtime compatibility
- hardware fit
- local environment readiness

### 4. Simulation Engine
Model likely behavior before execution or refactor:

- startup scenarios
- dependency failure scenarios
- configuration failure scenarios
- runtime bottlenecks
- false confidence zones

### 5. Repair and Validation
Translate findings into safe, reviewable engineering work:

- patch planning
- dry-run repair bundles
- rollback-aware changes
- lint/type/test validation
- regression prevention

## Architecture Direction

The long-term direction is to organize the codebase into dedicated subsystems rather than continuing flat-file growth.

Planned top-level areas:

- `src/plugin-runtime/`
- `src/prompt/`
- `src/project-model/`
- `src/dependency/`
- `src/environment/`
- `src/simulation/`
- `src/repair/`
- `src/validation/`
- `src/reporting/`
- `src/cli/`
- `src/plugins/builtins/`

## Documentation Map

Detailed docs are being added under `docs/`.

- `docs/specs/system-spec.md` — full system specification
- `docs/specs/implementation-phases.md` — directly executable repo rewrite plan
- `docs/testing/testing-strategy.md` — testing model and coverage targets

## Testing Direction

The testing strategy for the completed system is intended to prioritize truth-bearing logic.

Coverage targets:

- **100% invariant coverage**
- **90%+ plugin runtime coverage**
- **85%+ core domain coverage**
- **80%+ simulation / dependency / environment coverage**
- **smoke coverage for CLI and reporting surfaces**

Tests are expected to emphasize:

- deterministic behavior
- lifecycle correctness
- duplicate prevention
- dependency truth
- environment fit
- simulation evidence
- regression resistance

## Immediate Focus

The current execution path is:

1. normalize repository identity and structure
2. harden plugin runtime
3. rewrite prompt handling into a true spec engine
4. replace fake simulation with deterministic analysis
5. add dependency, hardware, and environment awareness
6. add repair planning and validation orchestration
7. expand tests around invariants and critical paths

## Principle

This repo should move toward a system that can truthfully:

- understand a software request
- write a usable specification
- model the target project
- reason about dependencies and hardware constraints
- simulate likely outcomes and failure paths
- identify false confidence zones
- propose safe repair work
- validate whether the proposed work improves the system
