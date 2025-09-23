# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. Follow these instructions precisely to ensure consistent, high-quality development practices.

## Project Overview

This is a premium brand website built with modern web technologies, emphasizing performance, accessibility, and sophisticated design. The codebase follows industry best practices for maintainability, security, and user experience.

### Project Structure

```
/
├── CLAUDE.md                 # This file - Claude Code guidance
├── context/                  # Claude context files and design system
│   ├── design-principles.md  # Premium brand design checklist
│   ├── style-guide.md       # Brand identity and implementation guide
│   ├── next-steps.md        # Structured task management for Claude
│   ├── roadmap.md           # Long-term project planning and vision
│   ├── COMPONENTS.md        # Component development guidelines
│   ├── DEPLOYMENT.md        # Deployment procedures and guidelines
│   └── DEVELOPMENT.md       # Development environment setup
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── functionality/       # Business logic and utilities
│   ├── templates/           # HTML page templates
│   ├── animations/          # GSAP animation modules
│   └── style.css           # Design system CSS with tokens
├── tests/                   # Playwright test suites
│   ├── router.spec.ts       # SPA navigation tests
│   └── style-guide-validation.spec.ts # Brand compliance tests
├── playwright.config.ts     # Testing configuration
└── package.json            # Dependencies and scripts
```

### Core Files and Utilities

**Key Configuration Files:**

- `src/style.css` - Design system with CSS custom properties
- `src/router/router.ts` - SPA routing system
- `src/main.ts` - Application entry point
- `playwright.config.ts` - Testing framework configuration

**Important Utilities:**

- `src/functionality/toggle-theme.ts` - Light/dark mode switching
- `src/animations/` - GSAP animation modules for brand interactions
- `src/components/` - Reusable UI components following design system

### Unexpected Behaviors

**Build System:**

- TypeScript checking is integrated into build process (no separate typecheck command)
- Vite may warn about dynamic imports (this is expected, not an error)
- Pre-commit hooks automatically run linting, formatting, and build

**Testing:**

- Playwright tests require dev server to be running (auto-started via webServer config)
- Style guide validation tests check actual CSS values against brand standards
- Some tests may timeout on slower machines (adjust in playwright.config.ts if needed)

**Theme System:**

- Theme switching affects CSS custom properties dynamically
- Dark mode detection uses data-theme attribute, not media queries
- Some components have different layouts for mobile landscape orientation

## Commands

### Development Commands

- `npm run dev` - Start Vite development server with hot reload
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks on TypeScript files
- `npm run lint:fix` - Auto-fix ESLint issues where possible
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes
- `npm test` - Run Playwright test suite
- `npm test:ui` - Run Playwright tests with UI mode
- `npm test:headed` - Run Playwright tests in headed mode
- `npm test:debug` - Debug Playwright tests
- `npm run commit` - Use Commitizen for conventional commits
- `npm run pre-commit` - Run pre-commit hooks (lint + format + build)

### Quality Assurance

Before committing any changes, ALWAYS run:

```bash
npm run lint && npm run format:check && npm run build && npm test
```

**Note**: TypeScript type checking is included in the build process. The build command runs `tsc && vite build` which performs type checking before building.

### Git Workflow

Use conventional commits with Commitizen:

```bash
npm run commit
```

This ensures consistent commit messages and enables automated changelog generation.

## Architecture Overview

### Key Architecture Patterns

- Component-based architecture with reusable UI elements
- Type-safe development with TypeScript
- Modern CSS architecture with design tokens
- Performance-optimized asset handling
- Accessibility-first approach

### Technology Stack

- **Frontend Framework**: Vanilla TypeScript with Web Components
- **Build System**: Vite 7.x (fast build tool with hot reload)
- **Styling**:
  - Tailwind CSS 4.x (utility-first CSS framework)
  - Custom CSS with design tokens and CSS custom properties
  - Responsive design with mobile-first approach
- **TypeScript**: v5.8+ (strict type checking enabled)
- **Testing**: Playwright (end-to-end and component testing)
- **Animation**: GSAP (GreenSock Animation Platform)
- **Code Quality**:
  - ESLint (linting with TypeScript support)
  - Prettier (code formatting)
  - Husky (Git hooks)
  - Commitizen (conventional commits)
- **Package Manager**: npm
- **Node Version**: Modern Node.js (ES modules enabled)

### MDX Configuration

**Status**: Not yet implemented - planned for future blog functionality

When implementing MDX for blog content:

- **Content Structure**: Organize blog posts in `/content/blog/` directory
- **Frontmatter**: Include title, date, description, tags, author
- **Components**: Create reusable MDX components for rich content
- **SEO**: Implement meta tags, Open Graph, and structured data
- **Build Integration**: Process MDX files during Vite build
- **Routing**: Dynamic routing for blog post URLs
- **RSS Feed**: Generate RSS feed from blog posts
- **Sitemap**: Include blog posts in sitemap generation

**Implementation Priority**: Medium - implement after core website features are complete

## Code Quality & Reviews

### Automated Code Review

Every code change should be evaluated for:

- **Syntax & Standards**: Adherence to coding standards and best practices
- **Completeness**: All features fully implemented and tested
- **Performance**: Optimized for speed and efficiency
- **Security**: No vulnerabilities or exposed secrets
- **Maintainability**: Clean, readable, and well-documented code

### Code Review Checklist

- [ ] Code follows established patterns and conventions
- [ ] All TypeScript types are properly defined
- [ ] No console.log statements in production code
- [ ] Error handling is comprehensive and user-friendly
- [ ] Performance implications considered
- [ ] Security best practices followed
- [ ] Accessibility standards met
- [ ] Tests written and passing

## Security Review

### Security Standards

Follow OWASP Top 10 security practices:

- [ ] **Input Validation**: All user inputs properly sanitized
- [ ] **Authentication**: Secure authentication mechanisms
- [ ] **Authorization**: Proper access controls implemented
- [ ] **Data Protection**: Sensitive data encrypted and protected
- [ ] **Secure Communication**: HTTPS enforced, secure headers set
- [ ] **Error Handling**: No sensitive information exposed in errors
- [ ] **Logging**: Comprehensive logging without exposing secrets
- [ ] **Dependencies**: Regular security updates and vulnerability scanning

### Secret Management

- Never commit API keys, passwords, or sensitive data
- Use environment variables for configuration
- Regularly rotate secrets and access tokens
- Scan for accidentally committed secrets

### Security Review Process

Before any deployment:

1. Scan for exposed secrets or credentials
2. Review authentication and authorization logic
3. Check for injection vulnerabilities
4. Validate input sanitization
5. Ensure secure headers and HTTPS configuration

## Visual Development

### Design System References

- **Design Principles**: Comprehensive design checklist in `/context/design-principles.md`
- **Style Guide**: Brand standards and visual guidelines in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, ALWAYS refer to these files for guidance

### Design Review Process

IMMEDIATELY after implementing any front-end change:

1. **Identify what changed** - Review the modified components/pages
2. **Check design principles** - Ensure alignment with `/context/design-principles.md`
3. **Validate brand consistency** - Confirm adherence to `/context/style-guide.md`
4. **Test responsive behavior** - Verify design works across all devices
5. **Accessibility check** - Ensure WCAG AA compliance
6. **Performance impact** - Measure and optimize loading times

### Visual Quality Standards

- [ ] Pixel-perfect implementation of designs
- [ ] Consistent spacing and typography
- [ ] Proper color usage per brand guidelines
- [ ] Smooth animations and micro-interactions
- [ ] Responsive design across all breakpoints
- [ ] Loading states and error handling
- [ ] Dark mode support (if applicable)

### Quick Visual Check

After any visual change:

IMMEDIATELY after implementing any front-end change:

1.  **Identify what changed** - Review the modified components/pages
2.  **Navigate to affected pages** - Use `mcp_playwright_browser_navigate` to visit each changed view
3.  **Verify Design compliance** - Compare against `context/design-principles.md` and `/context/style-guide.md`
4.  **Validate feature implementation** - Ensure the change fulfills the user's specific request
5.  **Check acceptance criteria** - Review any provided context files or requirements
6.  **Capture evidence** - Take full page screenshot at desktop viewport (1440px) of each changed view
7.  **Check for errors** - Run `mpc_playwright_browser_console_messages`

### Comprehensive Design Review

Use the `agent-design-review` subagent for thorough design validation when:

- Completing significant UI/UX features
- Before finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing
- Conducting systematic brand compliance reviews

**How to invoke:**
Use the Task tool to launch the design review agent:

```typescript
// Example usage in Claude Code
await Task({
  subagent_type: 'general-purpose',
  description: 'Design review validation',
  prompt:
    'Act as the agent-design-review specialist from /context/agent-design-review.md. Conduct a comprehensive design review of the current home page, testing all 7 phases: preparation, user flow, responsive design, accessibility, brand compliance, robustness, and code health. Provide detailed findings categorized by priority level.',
});
```

**Agent Capabilities (see `/context/agent-design-review.md`):**

- **7-Phase Systematic Review**: Preparation → User Flow → Responsive → Accessibility → Brand → Robustness → Code Health
- **Cross-Viewport Testing**: Mobile (375px) → Tablet (768px) → Desktop (1440px) → Large Desktop (1920px+)
- **WCAG 2.1 AA Compliance**: Keyboard navigation, focus management, color contrast, semantic HTML
- **Brand Standards Validation**: Colors, typography, spacing, component consistency against style guide
- **Performance & Robustness**: Loading states, error handling, edge cases
- **Evidence-Based Reporting**: Screenshots, accessibility tree analysis, triage matrix (Blockers/High/Medium/Low)

## Testing Strategy

### Testing Requirements

- [ ] Unit tests for utility functions and business logic
- [ ] Component tests for UI elements
- [ ] Integration tests for user workflows
- [ ] Accessibility tests for WCAG compliance
- [ ] Performance tests for core user journeys
- [ ] Visual regression tests for UI consistency

### Test Before Commit

Always run the full test suite before committing:

```bash
npm test
```

## Documentation Standards

### Code Documentation

- Use JSDoc comments for functions and components
- Include examples in complex utility functions
- Document API endpoints and data structures
- Maintain up-to-date README files

### Change Documentation

- Clear commit messages following conventional commits
- Update relevant documentation with code changes
- Include migration guides for breaking changes

## Performance Standards

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Performance Checklist

- [ ] Images optimized and properly sized
- [ ] Critical CSS inlined
- [ ] JavaScript bundles optimized
- [ ] Fonts loaded efficiently
- [ ] Third-party scripts minimized
- [ ] Caching strategies implemented

## Accessibility Standards

### WCAG AA Compliance

- [ ] Color contrast ratios meet standards
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatibility
- [ ] Alt text for all images
- [ ] Proper heading hierarchy
- [ ] Focus indicators visible
- [ ] Form labels and error messages

## Deployment & Release

### Pre-deployment Checklist

- [ ] All tests passing
- [ ] Code review completed
- [ ] Security review passed
- [ ] Performance benchmarks met
- [ ] Accessibility validated
- [ ] Documentation updated
- [ ] Environment variables configured

### Release Process

1. Create feature branch from main
2. Implement changes following all guidelines
3. Run complete test suite
4. Create pull request with detailed description
5. Code review and approval
6. Merge to main
7. Automated deployment to staging
8. Manual testing and validation
9. Production deployment

## Emergency Procedures

### Rollback Process

If issues are discovered in production:

1. Immediately assess impact and severity
2. Communicate with stakeholders
3. Execute rollback to previous stable version
4. Investigate and fix issues
5. Re-deploy with proper testing

### Incident Response

- Document all incidents
- Perform post-mortem analysis
- Update procedures to prevent recurrence
- Communicate learnings to team

## Workflow Examples

### Complete Feature Development Workflow

#### 1. New Feature Implementation

```bash
# 1. Create feature branch
git checkout -b feature/new-component

# 2. Implement feature following design system
# - Check `/context/design-principles.md` for guidance
# - Follow `/context/style-guide.md` for colors/typography
# - Use established component patterns

# 3. Run quality checks during development
npm run dev          # Test in browser
npm run lint         # Check for issues
npm run format       # Format code

# 4. Write and run tests
npm test             # Run full test suite
npm run test:ui      # Interactive testing

# 5. Final quality assurance
npm run lint && npm run format:check && npm run build && npm test

# 6. Commit with conventional commits
npm run commit

# 7. Push and create PR
git push origin feature/new-component
```

#### 2. Bug Fix Workflow

```bash
# 1. Create hotfix branch
git checkout -b hotfix/fix-navigation-issue

# 2. Reproduce and fix the issue
# - Add test case to prevent regression
# - Fix the root cause, not just symptoms
# - Ensure no side effects

# 3. Verify fix
npm run build        # Ensure no build errors
npm test             # Confirm tests pass
npm run dev          # Manual testing

# 4. Quick quality check
npm run lint && npm run format:check

# 5. Commit and deploy
npm run commit
git push origin hotfix/fix-navigation-issue
```

#### 3. Design System Update Workflow

```bash
# 1. Update design system files
# - Modify `/context/style-guide.md`
# - Update `/context/design-principles.md`
# - Update CSS custom properties in `src/style.css`

# 2. Test across all components
npm run dev          # Visual testing
npm test             # Automated testing
npm run build        # Build verification

# 3. Document changes
# - Update style guide with new patterns
# - Add examples for new components
# - Update CLAUDE.md if workflow changes

# 4. Commit design system changes
npm run commit
```

### Daily Development Workflow

#### Morning Setup

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development server
npm run dev

# 4. Check for any issues
npm run lint
```

#### Before Each Commit

```bash
# 1. Quality assurance pipeline
npm run lint && npm run format:check && npm run build && npm test

# 2. If any step fails, fix issues and repeat

# 3. Use conventional commits
npm run commit

# 4. Push changes
git push
```

### Component Development Pattern

#### 1. New Component Creation

```typescript
// 1. Create component file: src/components/new-component/new-component.ts
// 2. Follow established patterns from existing components
// 3. Import required dependencies
// 4. Implement with TypeScript types
// 5. Add proper JSDoc documentation
// 6. Export for use in other components
```

#### 2. CSS/Styling Pattern

```css
/* 1. Add component styles to src/style.css */
/* 2. Use @layer components for organization */
/* 3. Follow design system variables */
/* 4. Use Tailwind utilities where appropriate */
/* 5. Ensure responsive design */
/* 6. Test dark mode compatibility */
```

#### 3. Testing Pattern

```typescript
// 1. Create test file: tests/component-name.spec.ts
// 2. Test component functionality
// 3. Test responsive behavior
// 4. Test accessibility
// 5. Test performance
```

## Troubleshooting & Common Issues

### Build Issues

#### TypeScript Errors

**Problem**: Build fails with TypeScript errors
**Solution**:

```bash
# 1. Check TypeScript configuration
cat tsconfig.json

# 2. Run TypeScript compiler directly
npx tsc --noEmit

# 3. Fix type errors in code
# 4. Ensure all imports have proper types
```

#### Vite Build Failures

**Problem**: Vite build process fails
**Solution**:

```bash
# 1. Clear Vite cache
rm -rf node_modules/.vite

# 2. Reinstall dependencies
npm ci

# 3. Check for missing imports
npm run build

# 4. Review build warnings for issues
```

### CSS/Styling Issues

#### Design System Conflicts

**Problem**: Colors or typography don't match design system
**Solution**:

1. Check `/context/style-guide.md` for correct values
2. Verify CSS custom properties in `src/style.css`
3. Use design system variables instead of hardcoded values
4. Test in both light and dark modes

#### Responsive Design Issues

**Problem**: Layout breaks on mobile/tablet
**Solution**:

```bash
# 1. Test in development server
npm run dev

# 2. Use browser dev tools to test breakpoints
# 3. Check mobile-first CSS approach
# 4. Verify Tailwind responsive utilities
# 5. Test landscape orientation
```

### Testing Issues

#### Playwright Test Failures

**Problem**: Tests fail or are flaky
**Solution**:

```bash
# 1. Run tests in headed mode to see what's happening
npm run test:headed

# 2. Debug specific test
npm run test:debug

# 3. Check test timeouts and selectors
# 4. Ensure test data is properly set up
```

#### Performance Test Failures

**Problem**: Performance benchmarks not met
**Solution**:

1. Use browser dev tools to profile performance
2. Check image optimization and compression
3. Review JavaScript bundle sizes
4. Verify CSS is properly optimized
5. Test network throttling scenarios

### Development Server Issues

#### Hot Reload Not Working

**Problem**: Changes don't reflect in browser
**Solution**:

```bash
# 1. Restart development server
npm run dev

# 2. Clear browser cache
# 3. Check for JavaScript errors in console
# 4. Verify file paths and imports
```

#### Port Conflicts

**Problem**: Development server can't start
**Solution**:

```bash
# 1. Check what's running on port 5173
lsof -ti:5173

# 2. Kill conflicting process or use different port
# 3. Restart development server
```

### Git and Deployment Issues

#### Commit Hook Failures

**Problem**: Pre-commit hooks fail
**Solution**:

```bash
# 1. Run the failing command manually
npm run lint
npm run format:check
npm run build

# 2. Fix any issues found
# 3. Try commit again
npm run commit
```

#### Merge Conflicts

**Problem**: Git merge conflicts in generated files
**Solution**:

```bash
# 1. For package-lock.json conflicts
npm install

# 2. For build file conflicts, rebuild
npm run build

# 3. Resolve conflicts manually and commit
```

### Emergency Procedures

#### Production Issue Response

1. **Immediate Assessment**: Determine severity and user impact
2. **Communication**: Notify stakeholders of the issue
3. **Quick Fix or Rollback**: Choose fastest path to resolution
4. **Investigation**: Identify root cause while fix is deploying
5. **Post-Mortem**: Document lessons learned and prevent recurrence

#### Rollback Checklist

- [ ] Database migrations backed up (if applicable)
- [ ] Previous version tested and verified
- [ ] Rollback script prepared and tested
- [ ] Monitoring in place to verify rollback success
- [ ] Communication plan for users and stakeholders

## Code Quality Enforcement

### Automated Quality Gates

Every commit must pass:

1. **Linting**: ESLint with TypeScript rules
2. **Formatting**: Prettier code style
3. **Type Checking**: TypeScript compilation
4. **Build**: Successful Vite build
5. **Tests**: All Playwright tests passing

### Manual Quality Checks

For every feature:

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS Safari, Android Chrome)
- [ ] Accessibility testing with screen readers
- [ ] Performance testing with slow networks
- [ ] Security review for new functionality

### Performance Monitoring

- **Core Web Vitals**: Monitor FCP, LCP, CLS, FID
- **Bundle Size**: Track JavaScript and CSS bundle sizes
- **Load Times**: Measure page load performance
- **User Experience**: Monitor real user metrics

---

## Additional Resources

### Claude Context Files
- **Next Steps**: `/context/next-steps.md` - Structured task management and immediate priorities for Claude
- **Roadmap**: `/context/roadmap.md` - Long-term project vision and strategic planning
- **Components**: `/context/COMPONENTS.md` - Component development guidelines and patterns
- **Deployment**: `/context/DEPLOYMENT.md` - Deployment procedures and environment management
- **Development**: `/context/DEVELOPMENT.md` - Development environment setup and tools

### Design System Files
- **Design Principles**: `/context/design-principles.md` - Comprehensive design checklist and guidelines
- **Style Guide**: `/context/style-guide.md` - Brand standards, colors, typography, and component specifications

### Configuration Files
- **Package Configuration**: `package.json` - All available scripts and dependencies
- **TypeScript Config**: `tsconfig.json` - TypeScript compilation settings
- **Playwright Config**: `playwright.config.ts` - Testing framework configuration
- **ESLint Config**: ESLint configuration for code quality
- **Prettier Config**: Code formatting standards
- **Tailwind Config**: CSS framework configuration
- **Vite Config**: Build tool configuration

### External Documentation

- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [GSAP Documentation](https://greensock.com/docs/)

### Quick Reference Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Quality Assurance
npm run lint            # Check code quality
npm run format          # Format code
npm test               # Run all tests

# Git Workflow
npm run commit         # Conventional commit
npm run pre-commit     # Pre-commit checks

# Full Quality Pipeline
npm run lint && npm run format:check && npm run build && npm test
```

## Repository Etiquette

### Code Standards

- **Follow established patterns**: Study existing components before creating new ones
- **Use design tokens**: Always reference CSS custom properties instead of hardcoded values
- **Component reusability**: Prefer enhancing existing components over creating duplicates
- **Accessibility first**: Every interactive element must be keyboard navigable and screen reader accessible
- **Performance conscious**: Consider loading times and runtime performance in every decision

### Commit Practices

- **Conventional commits**: Always use `npm run commit` for standardized messages
- **Atomic commits**: Each commit should represent a single logical change
- **Quality gates**: Never commit without passing `npm run lint && npm run format:check && npm run build && npm test`
- **Descriptive messages**: Explain the 'why' behind changes, not just the 'what'

### Branch Management

- **Feature branches**: Use descriptive names like `feature/navigation-enhancement` or `fix/mobile-scroll-issue`
- **Small PRs**: Keep pull requests focused and reviewable
- **Clean history**: Squash commits when merging to maintain clean main branch history

### Documentation

- **Update context files**: Modify `/context/style-guide.md` or `/context/design-principles.md` when adding new patterns
- **Component documentation**: Add JSDoc comments for complex components
- **README updates**: Keep project documentation current with changes

## Developer Environment Setup

### Prerequisites

```bash
# Node.js 18+ required
node --version  # Should be 18.0.0 or higher

# npm 9+ recommended
npm --version   # Should be 9.0.0 or higher
```

### Initial Setup

```bash
# 1. Clone repository
git clone [repository-url]
cd ojjlab.com

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Start development server
npm run dev

# 5. Verify setup by running tests
npm test
```

### IDE Configuration

**Recommended VS Code Extensions:**

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- TypeScript Importer (`pmneo.tsimporter`)

**VS Code Settings (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Environment Variables

Create `.env.local` for local development:

```bash
# Add any necessary environment variables
# (None required for basic development)
```

### Troubleshooting Common Setup Issues

**Playwright Installation Issues:**

```bash
# If browser download fails
npx playwright install --force

# For M1 Macs, may need Rosetta
arch -x86_64 npx playwright install
```

**Port Conflicts:**

```bash
# If port 5173 is in use
lsof -ti:5173 | xargs kill -9
# Or modify vite.config.ts to use different port
```

**Node Version Issues:**

```bash
# Use nvm to manage Node versions
nvm install 18
nvm use 18
```

### Development Workflow

1. **Morning routine**: `git pull origin main && npm install && npm run dev`
2. **Before coding**: Check `/context/` files for design guidance
3. **During development**: Use `npm run lint:fix` to auto-fix issues
4. **Before committing**: Run full quality pipeline
5. **For visual changes**: Use design review agent for validation

Remember: **Quality is not negotiable. Take time to do things right the first time.**

_Every line of code should serve the user's needs while maintaining the highest standards of performance, accessibility, and brand excellence._
