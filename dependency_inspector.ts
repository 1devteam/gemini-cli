export interface DependencySummary {
  isNodeProject: boolean;
  dependencyCount: number;
}

export function analyzePackageJson(pkg: Record<string, unknown>): DependencySummary {
  const deps = (pkg.dependencies as Record<string, unknown> | undefined) ?? {};
  const devDeps = (pkg.devDependencies as Record<string, unknown> | undefined) ?? {};

  const dependencyCount = Object.keys(deps).length + Object.keys(devDeps).length;

  return {
    isNodeProject: dependencyCount > 0,
    dependencyCount,
  };
}
