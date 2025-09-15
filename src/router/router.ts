interface Route {
    readonly path: string;
    readonly handler: () => void | Promise<void>;
    readonly title?: string;
    readonly template?: string;
}

interface RouterOptions {
    readonly root?: string;
    readonly mode?: 'hash' | 'history';
}

export class Router {
    private readonly routes: Map<string, Route> = new Map();
    private current: string = '';
    private readonly root: string;
    private readonly mode: 'hash' | 'history';

    public constructor(options: RouterOptions = {}) {
        this.root = options.root || '';
        this.mode = options.mode || 'history';
        this.bindEvents();
        this.navigate(this.getCurrentPath());
    }

    public add(path: string, handler: () => void | Promise<void>, title?: string, template?: string): Router {
        const route: Route = { path, handler, title, template };
        this.routes.set(this.cleanPath(path), route);
        return this;
    }

    public remove(path: string): Router {
        this.routes.delete(this.cleanPath(path));
        return this;
    }

    public navigate(path: string): void {
        const cleanedPath = this.cleanPath(path);

        if (this.current === cleanedPath) {
            return;
        }

        const route = this.routes.get(cleanedPath);

        if (!route) {
            this.handleNotFound(cleanedPath);
            return;
        }

        this.current = cleanedPath;

        if (this.mode === 'history') {
            history.pushState({}, '', this.root + cleanedPath);
        } else {
            window.location.hash = cleanedPath;
        }

        if (route.title) {
            document.title = route.title;
        }

        this.executeRoute(route);
    }

    public back(): void {
        history.back();
    }

    public forward(): void {
        history.forward();
    }

    public getCurrentPath(): string {
        if (this.mode === 'hash') {
            return window.location.hash.slice(1) || '/';
        }

        const path = window.location.pathname;
        return this.root ? path.replace(this.root, '') || '/' : path;
    }

    private cleanPath(path: string): string {
        const cleaned = path.replace(/^\/+|\/+$/g, '');
        return cleaned === '' ? '/' : cleaned;
    }

    private bindEvents(): void {
        if (this.mode === 'history') {
            window.addEventListener('popstate', () => {
                this.navigate(this.getCurrentPath());
            });
        } else {
            window.addEventListener('hashchange', () => {
                this.navigate(this.getCurrentPath());
            });
        }

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const link = target.closest('a[data-route]');

            if (link && link instanceof HTMLAnchorElement) {
                event.preventDefault();
                const path = link.getAttribute('data-route') || link.getAttribute('href') || '/';
                this.navigate(path);
            }
        });
    }

    private async executeRoute(route: Route): Promise<void> {
        try {
            if (route.template) {
                await this.loadTemplate(route.template);
            }
            await route.handler();
        } catch (error) {
            console.error('Router: Error executing route handler:', error);
            this.handleRouteError(error);
        }
    }

    private async loadTemplate(templatePath: string): Promise<void> {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            const appElement = document.getElementById('app');

            if (!appElement) {
                throw new Error('App container element not found');
            }

            appElement.innerHTML = html;

            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle && !themeToggle.hasAttribute('data-initialized')) {
                const { themeConfiguration } = await import('../functionality/toggle-theme');
                themeConfiguration();
                themeToggle.setAttribute('data-initialized', 'true');
            }
        } catch (error) {
            console.error('Router: Error loading template:', error);
            throw error;
        }
    }

    private handleNotFound(path: string): void {
        console.warn(`Router: Route not found: ${path}`);

        const notFoundRoute = this.routes.get('404') || this.routes.get('/404');
        if (notFoundRoute) {
            this.executeRoute(notFoundRoute);
        } else {
            const homeRoute = this.routes.get('/');
            if (homeRoute && path !== '/') {
                this.navigate('/');
            } else {
                console.error('Router: No home route defined and no 404 handler');
            }
        }
    }

    private handleRouteError(error: unknown): void {
        console.error('Router: Route execution failed:', error);
    }

    public destroy(): void {
        this.routes.clear();
        window.removeEventListener('popstate', () => {});
        window.removeEventListener('hashchange', () => {});
    }
}

export function createRouter(options?: RouterOptions): Router {
    return new Router(options);
}