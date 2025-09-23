# Development Guide

## Code Quality and Workflow Setup

This project uses automated code quality tools and git hooks to ensure consistent code and proper project management integration.

### Tools Configured

- **Husky**: Git hooks manager
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **Commitlint**: Commit message validation with Jira integration
- **Commitizen**: Interactive commit message creation

### Making Commits

#### Option 1: Using Commitizen (Recommended)

```bash
npm run commit
```

This will guide you through creating a properly formatted commit message.

#### Option 2: Manual Commits

Ensure your commit messages follow this format:

```
type: Description [JIRA-TICKET]

- Bullet point details
- More details if needed

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Required format:**

- `type`: feat, fix, docs, style, refactor, test, chore
- `Description`: Sentence case description
- `[JIRA-TICKET]`: Must end with Jira ticket reference like [PROJ-123], [DEV-001], or [TASK-456]

### Pre-commit Hooks

Before each commit, the following checks run automatically:

1. **ESLint**: Code linting
2. **Prettier**: Code formatting validation
3. **TypeScript**: Type checking and build

If any check fails, the commit will be rejected. Fix the issues and try again.

### Available Scripts

- `npm run format` - Auto-format all files with Prettier
- `npm run format:check` - Check if files need formatting
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run commit` - Interactive commit with Commitizen
- `npm run pre-commit` - Manually run pre-commit checks

### Example Workflow

1. Make your code changes
2. Stage your changes: `git add .`
3. Create commit: `npm run commit` (or use manual format)
4. Push to remote: `git push`

The pre-commit hooks will ensure your code meets quality standards before it enters the repository.
