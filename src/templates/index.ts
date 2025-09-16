// Template imports - Vite will bundle these as text
import homeTemplate from './home.html?raw';
import contactTemplate from './contact.html?raw';
import joinTemplate from './join.html?raw';
import tryAClassTemplate from './try-a-class.html?raw';
import loginTemplate from './login.html?raw';

export const templates = {
  '/': homeTemplate,
  '/home': homeTemplate,
  '/contact': contactTemplate,
  '/join': joinTemplate,
  '/try-a-class': tryAClassTemplate,
  '/login': loginTemplate
} as const;

export type TemplatePath = keyof typeof templates;

export const getTemplate = (path: string): string | null => {
  return templates[path as TemplatePath] || null;
};