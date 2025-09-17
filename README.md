# Oregon Jiu Jitsu Lab Website

A modern single-page application (SPA) for Oregon Jiu Jitsu Lab, built with TypeScript, Vite, and a custom router.

## Features

- **Single Page Application**: Fast navigation without page reloads
- **Custom TypeScript Router**: Clean, type-safe routing system
- **Template-based Architecture**: Individual HTML templates for each route
- **History API Routing**: Clean URLs without hash fragments
- **Theme System**: Dark/light mode with persistence
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **GSAP Animations**: Smooth, performant animations

## Project Structure

```
src/
├── router/
│   └── router.ts          # Custom SPA router implementation
├── templates/
│   ├── home.html          # Homepage template
│   ├── contact.html       # Contact page template
│   ├── join.html          # Membership page template
│   ├── try-a-class.html   # Trial class page template
│   └── login.html         # Login page template
├── functionality/
│   ├── toggle-theme.ts    # Dark/light theme switching
│   └── ...
├── animations/
│   └── ...                # GSAP animation modules
├── main.ts                # Application entry point
└── style.css              # Global styles
```

## Router Implementation

### Overview

The custom TypeScript router provides:

- **Clean URLs**: `/contact`, `/join`, `/try-a-class`, `/login`
- **Template Loading**: Fetches HTML templates dynamically
- **Error Handling**: 404 handling and graceful fallbacks
- **Browser Integration**: Back/forward button support
- **Automatic Link Handling**: Links with `data-route` attributes

### Usage

```typescript
import { createRouter } from './router/router';

const router = createRouter({ mode: 'history' });

router
  .add('/', handleHomeRoute, 'Page Title', '/src/templates/home.html')
  .add(
    '/contact',
    handleContactRoute,
    'Contact - Oregon Jiu Jitsu Lab',
    '/src/templates/contact.html'
  );
```

### Route Configuration

Routes are configured in `src/main.ts`:

```typescript
router
  .add(
    '/',
    handleHomeRoute,
    'Oregon Jiu Jitsu Lab | Jiu Jitsu, Wrestling & Kickboxing in Hillsboro',
    '/src/templates/home.html'
  )
  .add(
    '/contact',
    handleContactRoute,
    'Contact - Oregon Jiu Jitsu Lab',
    '/src/templates/contact.html'
  )
  .add(
    '/join',
    handleJoinRoute,
    'Join - Oregon Jiu Jitsu Lab',
    '/src/templates/join.html'
  )
  .add(
    '/try-a-class',
    handleTryAClassRoute,
    'Try a Class - Oregon Jiu Jitsu Lab',
    '/src/templates/try-a-class.html'
  )
  .add(
    '/login',
    handleLoginRoute,
    'Login - Oregon Jiu Jitsu Lab',
    '/src/templates/login.html'
  );
```

### Navigation Links

Add `data-route` attribute to links for SPA navigation:

```html
<a href="/contact" data-route="/contact">Contact Us</a>
<a href="/join" data-route="/join">Join Today</a>
```

### Router API

**Methods:**

- `add(path, handler, title?, template?)` - Add a route
- `remove(path)` - Remove a route
- `navigate(path)` - Navigate to a path
- `back()` - Go back in history
- `forward()` - Go forward in history
- `getCurrentPath()` - Get current path
- `destroy()` - Clean up router

**Features:**

- **Type Safety**: Full TypeScript support with interfaces
- **Method Chaining**: Fluent API for route configuration
- **Access Modifiers**: Proper encapsulation with public/private methods
- **Error Handling**: Graceful handling of route errors and 404s

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

The project uses:

- **ESLint**: TypeScript-specific linting rules
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking
- **Clean Code Principles**: Proper access modifiers and separation of concerns

## Architecture

### Router Architecture

The router follows clean code best practices:

1. **Interface-driven Design**: Clear contracts with `Route` and `RouterOptions` interfaces
2. **Single Responsibility**: Each method has a focused purpose
3. **Error Handling**: Comprehensive error management
4. **Type Safety**: Full TypeScript integration
5. **Browser Integration**: Proper history API usage

### Template System

Templates are standalone HTML files that:

- Include navigation with proper `data-route` attributes
- Maintain consistent structure across pages
- Support theme integration
- Are loaded dynamically into the `#app` container

### Theme Integration

The router automatically reinitializes theme functionality when loading templates:

- Detects theme toggle buttons
- Reinitializes theme configuration
- Maintains theme state across navigation

## Deployment

The application is built as a static site that can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

**Build output**: `dist/` directory contains all static assets.

## Contributing

1. Follow TypeScript strict mode
2. Use proper access modifiers (`public`, `private`, `readonly`)
3. Add JSDoc comments for public APIs
4. Write clean, self-documenting code
5. Test routing functionality across all routes

## License

[Add your license information here]
