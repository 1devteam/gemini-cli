import { describe, expect, it } from 'vitest';
import { analyzePackageJson } from '../dependency_inspector.js';

describe('Dependency inspector', () => {
  it('detects node project with dependencies', () => {
    const result = analyzePackageJson({ dependencies: { a: '1.0.0' } });

    expect(result.isNodeProject).toBe(true);
    expect(result.dependencyCount).toBe(1);
  });

  it('counts devDependencies', () => {
    const result = analyzePackageJson({ devDependencies: { a: '1.0.0', b: '1.0.0' } });

    expect(result.isNodeProject).toBe(true);
    expect(result.dependencyCount).toBe(2);
  });

  it('handles empty package', () => {
    const result = analyzePackageJson({});

    expect(result.isNodeProject).toBe(false);
    expect(result.dependencyCount).toBe(0);
  });
});
