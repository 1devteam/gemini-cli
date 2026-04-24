import os from 'os';
import process from 'process';

export interface EnvironmentSummary {
  platform: NodeJS.Platform;
  arch: string;
  cpuCount: number;
  memoryMB: number;
  nodeVersion: string;
}

export function inspectEnvironment(): EnvironmentSummary {
  return {
    platform: process.platform,
    arch: process.arch,
    cpuCount: os.cpus().length,
    memoryMB: Math.round(os.totalmem() / 1024 / 1024),
    nodeVersion: process.version,
  };
}

export function classifyMemory(memoryMB: number): 'low' | 'standard' | 'high' {
  if (memoryMB < 4096) return 'low';
  if (memoryMB < 16384) return 'standard';
  return 'high';
}
