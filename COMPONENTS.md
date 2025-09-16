# Web Components

## Navigation Component (`<ojj-navigation>`)

### Overview
A reusable TypeScript web component that provides consistent, simplified navigation across all pages of the Oregon Jiu Jitsu Lab website.

### Usage
```html
<header>
    <ojj-navigation></ojj-navigation>
</header>
```

### Features
- **Clean, Simple Design**: Minimal navigation without hero styling
- **TypeScript Architecture**: Proper public/private modifiers and type safety
- **Responsive Layout**: Desktop horizontal navigation (mobile version pending)
- **Consistent Branding**: Logo with light/dark theme variants that links to home
- **Essential Navigation**: Core site links including:
  - Home (route)
  - About (anchor link on home page)
  - Programs (anchor link on home page)
  - Instructors (anchor link on home page)
  - Contact (route)
  - Join (route)
  - Try a Class (route)
- **Integrated Theme Toggle**: Built-in dark/light mode switcher
- **Router Integration**: Uses `data-route` attributes for SPA navigation

### TypeScript Implementation
```typescript
export class NavigationComponent extends HTMLElement {
    public connectedCallback(): void
    private getTemplate(): string
    private initializeThemeToggle(): void
}
```

### Architecture Details
- **File**: `src/components/navigation.ts`
- **Custom Element**: `<ojj-navigation>`
- **Access Modifiers**: Proper TypeScript public/private separation
- **Template Method**: Private `getTemplate()` for clean HTML separation
- **Auto-initialization**: Theme toggle functionality loads automatically
- **Template Consistency**: Used in all non-home templates

### Styling Classes
The component uses dedicated CSS classes:
- `.site-nav` - Main navigation container with sticky positioning
- `.nav-logo` - Logo container with hover effects
- `.nav-menu` - Desktop menu styling with responsive visibility
- `.nav-theme-toggle` - Theme toggle button container
- `#theme-toggle` - Theme toggle button styles

### Design Philosophy
- **Simple & Clean**: Removed hero styling for cleaner appearance
- **Sticky Navigation**: Always visible at top of page
- **Professional Appearance**: Clean borders and spacing
- **Brand Consistency**: Logo always links to home page
- **Performance**: Lightweight component with minimal overhead

### Router Compatibility
- Uses `data-route` attributes for internal navigation
- Compatible with hash-based routing for GitHub Pages
- Anchor links work for same-page navigation on home page
- External links work normally without route handling