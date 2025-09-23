# Git Flow Workflow Guide

This document provides comprehensive guidelines for Claude Code to manage source control using Git Flow best practices in the OJJ Lab codebase.

## Git Flow Overview

Git Flow is a branching model that provides a robust framework for managing releases, features, and hotfixes. This workflow ensures clean, traceable development with clear separation of concerns.

### Branch Structure

```
main (production-ready)
├── develop (integration)
│   ├── feature/TASK-123-feature-name
│   ├── feature/TASK-124-another-feature
│   └── release/v1.2.0
└── hotfix/critical-security-fix
```

## Branch Types and Purposes

### 1. Main Branch (`main`)

- **Purpose**: Production-ready code
- **Lifetime**: Permanent
- **Protection**: Requires pull request + review + passing tests
- **Deployment**: Automatically deployed to production

### 2. Develop Branch (`develop`)

- **Purpose**: Integration branch for features
- **Lifetime**: Permanent
- **Source**: Features merge here
- **Target**: Released to `main` via release branches

### 3. Feature Branches (`feature/TASK-ID-description`)

- **Purpose**: Individual feature development
- **Lifetime**: Temporary (deleted after merge)
- **Naming**: `feature/TASK-123-implement-user-authentication`
- **Source**: Created from `develop`
- **Target**: Merged back to `develop`

### 4. Release Branches (`release/vX.Y.Z`)

- **Purpose**: Prepare releases, final testing, version bumping
- **Lifetime**: Temporary (deleted after merge)
- **Naming**: `release/v1.2.0`
- **Source**: Created from `develop`
- **Target**: Merged to both `main` and `develop`

### 5. Hotfix Branches (`hotfix/critical-issue-description`)

- **Purpose**: Critical production fixes
- **Lifetime**: Temporary (deleted after merge)
- **Naming**: `hotfix/security-vulnerability-fix`
- **Source**: Created from `main`
- **Target**: Merged to both `main` and `develop`

## Workflow Commands for Claude

### Starting New Feature Development

```bash
# 1. Ensure you're on develop and pull latest
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/TASK-123-implement-dark-mode

# 3. Make initial commit
git commit --allow-empty -m "feat: initialize dark mode implementation

TASK-123: Add support for light/dark theme switching
- Setting up feature branch for dark mode implementation
- Will follow TDD approach with unit and integration tests"
```

### TDD Development Cycle

For each feature, follow this TDD cycle:

```bash
# 1. RED: Write failing test
# Create test file: src/components/theme-toggle/theme-toggle.test.ts
git add src/components/theme-toggle/theme-toggle.test.ts
git commit -m "test: add failing test for theme toggle component

🔴 RED: Test expects theme toggle to change theme state
- Tests component initialization with light mode
- Tests toggle functionality to switch themes
- Tests persistence of theme preference"

# 2. GREEN: Implement minimal code to pass test
# Create implementation: src/components/theme-toggle/theme-toggle.ts
git add src/components/theme-toggle/theme-toggle.ts
git commit -m "feat: implement basic theme toggle functionality

🟢 GREEN: Minimal implementation to pass tests
- Add ThemeToggle component with basic toggle logic
- Implement theme state management
- Add localStorage persistence"

# 3. REFACTOR: Clean up code while keeping tests green
git add .
git commit -m "refactor: improve theme toggle implementation

🔵 REFACTOR: Clean up theme toggle code
- Extract theme logic to separate utility
- Improve type safety with Theme enum
- Add JSDoc documentation"

# 4. Integration tests with Playwright
git add tests/theme-toggle.spec.ts
git commit -m "test: add integration tests for theme toggle

- Test theme toggle across page navigation
- Verify theme persistence across sessions
- Test accessibility of theme toggle button"
```

### Committing Guidelines

#### Commit Message Format

```
<type>(<scope>): <description>

<body>

<footer>
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

#### Examples

```bash
# Feature implementation
git commit -m "feat(auth): implement user authentication

- Add login/logout functionality
- Integrate with OAuth provider
- Add user session management

Closes TASK-123"

# Bug fix
git commit -m "fix(navigation): resolve mobile menu not closing

- Fix event listener cleanup in mobile navigation
- Prevent body scroll when menu is open
- Add proper ARIA attributes for accessibility

Fixes #456"

# Test addition
git commit -m "test(theme): add comprehensive theme toggle tests

🔴 RED: Add failing tests for theme persistence
🟢 GREEN: Implement localStorage integration
🔵 REFACTOR: Extract theme utilities

Covers TASK-789"
```

### Merging Feature to Develop

```bash
# 1. Ensure all tests pass locally
npm run lint && npm run format:check && npm run build && npm test

# 2. Push feature branch
git push origin feature/TASK-123-implement-dark-mode

# 3. Create pull request to develop
gh pr create --title "feat: implement dark mode functionality" --body "$(cat <<'EOF'
## Summary
- Implement theme toggle component with light/dark mode support
- Add theme persistence using localStorage
- Follow TDD approach with comprehensive test coverage

## Changes Made
- ✅ ThemeToggle component with unit tests
- ✅ Theme utility functions with unit tests
- ✅ Integration tests for theme persistence
- ✅ Accessibility compliance (WCAG AA)
- ✅ Mobile responsive design

## Test Coverage
- Unit tests: `src/components/theme-toggle/theme-toggle.test.ts`
- Integration tests: `tests/theme-toggle.spec.ts`
- All existing tests continue to pass

## Checklist
- [x] Code follows established patterns
- [x] All tests pass (unit + integration)
- [x] Accessibility standards met
- [x] Mobile responsive
- [x] Documentation updated

🤖 Generated with [Claude Code](https://claude.ai/code)

Closes TASK-123
EOF
)"

# 4. After approval and merge, clean up
git checkout develop
git pull origin develop
git branch -d feature/TASK-123-implement-dark-mode
```

### Creating Release

```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Update version and changelog
npm version 1.2.0
git add CHANGELOG.md package.json
git commit -m "chore(release): bump version to 1.2.0

- Update package.json version
- Add changelog entries for v1.2.0
- Prepare for production release"

# 3. Final testing and bug fixes (if needed)
# Make any necessary bug fixes with commits like:
git commit -m "fix(release): resolve minor styling issue in dark mode

- Adjust contrast ratio for accessibility
- Fix button hover states in dark theme"

# 4. Merge to main and develop
git checkout main
git pull origin main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0

Features:
- Dark mode implementation
- Enhanced theme persistence
- Improved accessibility

Bug fixes:
- Mobile navigation improvements
- Theme toggle edge cases"

git push origin main --tags

# 5. Merge back to develop
git checkout develop
git merge --no-ff release/v1.2.0
git push origin develop

# 6. Clean up
git branch -d release/v1.2.0
```

### Hotfix Workflow

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Implement fix with TDD
# Write test first
git add tests/security.test.ts
git commit -m "test: add test for security vulnerability

🔴 RED: Test exposes security vulnerability in user input
- Add test for XSS prevention
- Test input sanitization"

# Implement fix
git add src/utils/sanitize.ts
git commit -m "fix: patch critical security vulnerability

🟢 GREEN: Implement input sanitization
- Add XSS prevention for user inputs
- Sanitize all user-generated content
- Add validation for dangerous patterns

CVE: CVE-2024-XXXX"

# 3. Merge to main and develop
git checkout main
git merge --no-ff hotfix/critical-security-fix
git tag -a v1.2.1 -m "Hotfix v1.2.1: Critical security patch"
git push origin main --tags

git checkout develop
git merge --no-ff hotfix/critical-security-fix
git push origin develop

# 4. Clean up
git branch -d hotfix/critical-security-fix
```

## Quality Gates

### Pre-Commit Requirements

All commits must pass:

1. **Linting**: `npm run lint`
2. **Formatting**: `npm run format:check`
3. **Type Checking**: `npm run build`
4. **Unit Tests**: `npm run test:unit`
5. **Integration Tests**: `npm test`

### Pre-Merge Requirements (Pull Requests)

1. All quality gates pass
2. Code review approval
3. No merge conflicts
4. Branch is up-to-date with target
5. All conversations resolved

## Branch Protection Rules

### Main Branch

- Require pull request reviews (1+ approvers)
- Require status checks to pass
- Require branches to be up to date
- Restrict pushes to main branch
- Require linear history

### Develop Branch

- Require pull request reviews
- Require status checks to pass
- Allow squash merging

## Emergency Procedures

### Critical Production Issue

1. **Immediate**: Create hotfix branch from main
2. **Fix**: Follow TDD cycle for the fix
3. **Test**: Ensure fix resolves issue without side effects
4. **Deploy**: Merge to main, tag, and deploy
5. **Integrate**: Merge to develop
6. **Document**: Update incident log

### Failed Release

1. **Revert**: `git revert <release-commit>` on main
2. **Investigate**: Identify root cause
3. **Fix**: Create new release branch with fixes
4. **Test**: Comprehensive testing before retry
5. **Deploy**: Follow normal release process

## TDD Integration with Git Flow

### Test-First Development

Every feature must follow this pattern:

```bash
# 1. Create test file
touch src/components/new-feature/new-feature.test.ts

# 2. Write failing test
git add . && git commit -m "test: add failing test for new feature 🔴"

# 3. Implement minimal code
git add . && git commit -m "feat: implement new feature logic 🟢"

# 4. Refactor if needed
git add . && git commit -m "refactor: improve new feature implementation 🔵"

# 5. Add integration tests
git add . && git commit -m "test: add integration tests for new feature"
```

### Test Coverage Requirements

- **Unit Tests**: All functions, components, utilities
- **Integration Tests**: User workflows, component interactions
- **Minimum Coverage**: 90% for unit tests, 80% for integration
- **Critical Paths**: 100% coverage required

## Documentation Standards

### Code Documentation

- JSDoc for all functions and components
- README updates for new features
- Architecture decisions in ADR format

### Git Documentation

- Meaningful commit messages
- Pull request descriptions with context
- Issue linking and cross-references

## Tools and Automation

### Git Hooks

- **pre-commit**: Run linting and formatting
- **pre-push**: Run all tests
- **commit-msg**: Validate commit message format

### CI/CD Integration

- Automated testing on all branches
- Deployment from main branch only
- Rollback capabilities for failed deployments

## Best Practices Summary

1. **Always start from develop** for new features
2. **Write tests first** before implementation
3. **One feature per branch** - keep scope small
4. **Meaningful commit messages** with proper formatting
5. **Regular pushes** to backup work
6. **Clean up branches** after merging
7. **Tag releases** with semantic versioning
8. **Document decisions** in commit messages and PRs

## Troubleshooting Common Issues

### Merge Conflicts

```bash
# 1. Update your branch
git checkout develop
git pull origin develop
git checkout feature/your-branch
git merge develop

# 2. Resolve conflicts
# Edit conflicted files
git add .
git commit -m "fix: resolve merge conflicts with develop"
```

### Failed Tests

```bash
# 1. Fix the failing test
# 2. Ensure all tests pass
npm run test:unit && npm test

# 3. Commit the fix
git add .
git commit -m "fix: resolve failing tests

- Fix unit test assertion for theme toggle
- Update integration test selectors
- All tests now passing"
```

This Git Flow workflow ensures clean, traceable development with proper test coverage and quality gates. Always follow the TDD cycle and maintain clear commit history for effective collaboration and debugging.
