/**
 * Version Utility
 *
 * Provides version information for the application including:
 * - Version number from package.json
 * - Build timestamp
 * - Git commit hash (when available)
 */

// Version is injected at build time by Vite
declare const __APP_VERSION__: string;
declare const __BUILD_TIME__: string;
declare const __GIT_HASH__: string;

export interface VersionInfo {
  version: string;
  buildTime: string;
  gitHash?: string;
  fullVersion: string;
}

/**
 * Get application version information
 * Falls back to package.json version if build-time injection fails
 */
export function getVersionInfo(): VersionInfo {
  // Try to get build-time injected version first
  const version =
    typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0';
  const buildTime =
    typeof __BUILD_TIME__ !== 'undefined'
      ? __BUILD_TIME__
      : new Date().toISOString();
  const gitHash =
    typeof __GIT_HASH__ !== 'undefined' ? __GIT_HASH__ : undefined;

  const fullVersion = gitHash
    ? `v${version} (${gitHash.slice(0, 7)})`
    : `v${version}`;

  return {
    version,
    buildTime,
    gitHash,
    fullVersion,
  };
}

/**
 * Get short version string for display
 * Format: v1.2.3
 */
export function getDisplayVersion(): string {
  const { version } = getVersionInfo();
  return `v${version}`;
}

/**
 * Get detailed version string with build info
 * Format: v1.2.3 (abc1234) - 2024-01-15
 */
export function getDetailedVersion(): string {
  const { version, buildTime, gitHash } = getVersionInfo();
  const date = new Date(buildTime).toLocaleDateString();

  if (gitHash) {
    return `v${version} (${gitHash.slice(0, 7)}) - ${date}`;
  }

  return `v${version} - ${date}`;
}
