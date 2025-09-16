export const themeConfiguration = () => {
    setFooterYear();
    setTheme();
    toggleTheme();
}

const setFooterYear = () => {
    let _year: HTMLElement | null = document.getElementById('year');
    if (_year) {
        _year.textContent = new Date().getFullYear().toString();
    }
}

const setTheme = () => {
    const root = document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const saved = localStorage.getItem('theme') || 'system';
    const isDark = saved === 'dark' || (saved === 'system' && mql.matches);

    // Support both selectors: `.dark` and `[data-theme="dark"]`
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
}


const toggleTheme = () => {
    const root = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    const label = btn && btn.querySelector('[data-theme-label]');
    const order = ['light', 'dark'];

    const getSystemMode = () => {
        return localStorage.getItem('theme') || 'system';
    };

    const apply = (mode: string) => {
        const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
        root.classList.toggle('dark', dark);
        root.classList.toggle('light', !dark);
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        if (btn) { btn.setAttribute('aria-pressed', String(dark)); };
        if (label) { label.textContent = mode[0].toUpperCase() + mode.slice(1) };
    };

    apply(getSystemMode());

    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (getSystemMode() === 'system') apply('system');
    });

    btn && btn.addEventListener('click', function () {
        var idx = order.indexOf(getSystemMode());
        var next = order[(idx + 1) % order.length];
        localStorage.setItem('theme', next);
        apply(next);
    });
}
