import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

// Get version information at build time
function getVersionInfo() {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const version = packageJson.version || '0.0.0';
    const buildTime = new Date().toISOString();

    let gitHash = '';
    try {
      gitHash = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      // Git not available or not in git repository
      gitHash = 'unknown';
    }

    return { version, buildTime, gitHash };
  } catch {
    return {
      version: '0.0.0',
      buildTime: new Date().toISOString(),
      gitHash: 'unknown',
    };
  }
}

const { version, buildTime, gitHash } = getVersionInfo();

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ojjlab.com/' : '/',
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
  plugins: [tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_TIME__: JSON.stringify(buildTime),
    __GIT_HASH__: JSON.stringify(gitHash),
  },
});
