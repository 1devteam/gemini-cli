# Simulation Subsystem

This directory is the extraction target for the current root-level simulation implementation.

Current live implementation remains in:

- `simulation_policy.ts`
- `project_simulator_plugin.ts`

Do not move behavior here until the boundary is protected by tests and compatibility exports.

## Extraction order

1. classifier registry and scenario classification
2. policy versioning and policy tags
3. risk signal generation
4. decision mapping
5. guidance generation
6. trace construction
7. simulator plugin integration

## Non-negotiable constraints

- Preserve the public output contract from `evaluateSimulationPolicy`.
- Preserve simulator output fields.
- Preserve classifier specificity ordering.
- Keep root-level imports working until consumers migrate.
- Make each extraction behavior-preserving and independently validated.

## Current reason for this boundary

The simulation engine is already heavily tested and green, but it still lives in root-level files. This directory exists to stop further flat-file growth and provide a controlled destination for subsystem extraction.