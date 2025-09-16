// Template imports - Vite will bundle these as text
import homeTemplate from './home.html?raw';
import contactTemplate from './contact.html?raw';
import joinTemplate from './join.html?raw';
import tryAClassTemplate from './try-a-class.html?raw';
import loginTemplate from './login.html?raw';

// Import base path utility
import { replaceImagePaths } from '../utils/base-path';

const templates = {
  '/': homeTemplate,
  '/home': homeTemplate,
  '/contact': contactTemplate,
  '/join': joinTemplate,
  '/try-a-class': tryAClassTemplate,
  '/login': loginTemplate
} as const;

export type TemplatePath = keyof typeof templates;

export const getTemplate = (path: string): string | null => {
  const template = templates[path as TemplatePath];
  return template ? replaceImagePaths(template) : null;
};