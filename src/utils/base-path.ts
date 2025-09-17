/**
 * Get the base path for the application
 * This handles both development (/) and production (/ojjlab.com/) environments
 */
export const getBasePath = (): string => {
  return import.meta.env.BASE_URL || '/';
};

/**
 * Get the full URL for a public asset
 * @param path - Path relative to public directory (e.g., '/images/logo.svg')
 */
export const getAssetUrl = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return basePath === '/' ? `/${cleanPath}` : `${basePath}${cleanPath}`;
};

/**
 * Replace image paths in HTML with correct base path
 */
export const replaceImagePaths = (html: string): string => {
  return html
    .replace(/src="\/images\//g, `src="${getAssetUrl('/images/')}`)
    .replace(/url\('\/images\//g, `url('${getAssetUrl('/images/')}`);
};