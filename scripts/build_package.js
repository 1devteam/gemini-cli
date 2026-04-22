const { execSync } = require('child_process');
const path = require('path');

console.log('Building custom Gemini CLI fork...');

// Simple tsc build (assumes tsconfig.json exists or defaults)
try {
  execSync('tsc --noEmit false --outDir dist', { stdio: 'inherit' });
  console.log('TypeScript compiled to dist/');
} catch (err) {
  console.error('TypeScript build failed:', err.message);
  process.exit(1);
}

// Copy entrypoint if needed
console.log('Build complete. Run with: node dist/index.js');
