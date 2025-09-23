# Test-Driven Development (TDD) Workflow Guide

This document provides comprehensive guidelines for implementing Test-Driven Development in the OJJ Lab codebase. TDD ensures high-quality, maintainable code with comprehensive test coverage.

## TDD Philosophy

Test-Driven Development follows a simple three-step cycle:

1. **🔴 RED**: Write a failing test
2. **🟢 GREEN**: Write minimal code to make the test pass
3. **🔵 REFACTOR**: Improve the code while keeping tests green

## Testing Strategy

### Two-Tier Testing Approach

#### Unit Tests (Jest)

- **Purpose**: Test individual functions, components, and utilities in isolation
- **Location**: `src/**/*.test.ts` or `tests/unit/**/*.test.ts`
- **Run Command**: `npm run test:unit`
- **Coverage Target**: 90%+

#### Integration Tests (Playwright)

- **Purpose**: Test user workflows and component interactions
- **Location**: `tests/**/*.spec.ts`
- **Run Command**: `npm test`
- **Coverage Target**: 80%+

## TDD Cycle Implementation

### Step 1: 🔴 RED - Write Failing Test

Before writing any implementation code, start with a failing test:

```typescript
// src/components/theme-toggle/theme-toggle.test.ts
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  test('should initialize with light theme by default', () => {
    // 🔴 RED: This will fail because ThemeToggle doesn't exist yet
    const toggle = new ThemeToggle();
    expect(toggle.currentTheme).toBe('light');
  });
});
```

**Commit Message Format:**

```bash
git commit -m "test: add failing test for theme toggle initialization

🔴 RED: Test expects ThemeToggle to initialize with light theme
- Component should have currentTheme property
- Default value should be 'light'
- Test currently fails as component doesn't exist"
```

### Step 2: 🟢 GREEN - Minimal Implementation

Write the minimal code needed to make the test pass:

```typescript
// src/components/theme-toggle/theme-toggle.ts
export class ThemeToggle {
  public currentTheme: string = 'light';
}
```

**Commit Message Format:**

```bash
git commit -m "feat: implement basic theme toggle initialization

🟢 GREEN: Minimal implementation to pass failing test
- Add ThemeToggle class with currentTheme property
- Set default theme to 'light'
- Test now passes with minimal implementation"
```

### Step 3: 🔵 REFACTOR - Improve Code

Enhance the implementation while keeping tests green:

```typescript
// src/components/theme-toggle/theme-toggle.ts
export type Theme = 'light' | 'dark';

export class ThemeToggle {
  private _currentTheme: Theme = 'light';

  public get currentTheme(): Theme {
    return this._currentTheme;
  }

  public toggle(): void {
    this._currentTheme = this._currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

**Commit Message Format:**

```bash
git commit -m "refactor: improve theme toggle with proper types

🔵 REFACTOR: Enhance implementation while maintaining green tests
- Add Theme type for better type safety
- Make currentTheme property private with getter
- Add toggle() method for theme switching
- All tests still pass"
```

## Complete TDD Example

### Feature: User Authentication

#### Iteration 1: Basic User Creation

```bash
# 🔴 RED: Write failing test
git add src/auth/user.test.ts
git commit -m "test: add failing test for user creation

🔴 RED: Test expects User class with email property
- Should create user with valid email
- Should store email property correctly
- Test fails as User class doesn't exist"

# 🟢 GREEN: Minimal implementation
git add src/auth/user.ts
git commit -m "feat: implement basic User class

🟢 GREEN: Minimal implementation for user creation
- Add User class with email property
- Accept email in constructor
- Test now passes"

# 🔵 REFACTOR: Improve implementation
git add src/auth/user.ts
git commit -m "refactor: improve User class with validation

🔵 REFACTOR: Add email validation and better structure
- Add email validation in constructor
- Throw error for invalid emails
- Add private fields with getters
- All tests still pass"
```

#### Iteration 2: Email Validation

```bash
# 🔴 RED: Add validation test
git add src/auth/user.test.ts
git commit -m "test: add failing test for email validation

🔴 RED: Test expects invalid email to throw error
- Should reject emails without @ symbol
- Should reject empty emails
- Test fails as validation not implemented"

# 🟢 GREEN: Add validation
git add src/auth/user.ts
git commit -m "feat: add email validation to User class

🟢 GREEN: Implement email validation
- Add basic email format checking
- Throw error for invalid formats
- Validation test now passes"

# 🔵 REFACTOR: Improve validation
git add src/auth/user.ts src/utils/email-validator.ts
git commit -m "refactor: extract email validation utility

🔵 REFACTOR: Move validation to separate utility
- Create EmailValidator utility class
- Add comprehensive email validation rules
- User class uses validator utility
- All tests pass with improved architecture"
```

## Testing Patterns and Best Practices

### Unit Test Structure

```typescript
// src/utils/email-validator.test.ts
import { EmailValidator } from './email-validator';

describe('EmailValidator', () => {
  let validator: EmailValidator;

  beforeEach(() => {
    validator = new EmailValidator();
  });

  describe('isValid', () => {
    it('should return true for valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@subdomain.example.org',
      ];

      validEmails.forEach((email) => {
        expect(validator.isValid(email)).toBe(true);
      });
    });

    it('should return false for invalid email addresses', () => {
      const invalidEmails = ['invalid-email', '@domain.com', 'user@', ''];

      invalidEmails.forEach((email) => {
        expect(validator.isValid(email)).toBe(false);
      });
    });
  });

  describe('validate', () => {
    it('should throw error for invalid email', () => {
      expect(() => {
        validator.validate('invalid-email');
      }).toThrow('Invalid email format');
    });

    it('should not throw for valid email', () => {
      expect(() => {
        validator.validate('user@example.com');
      }).not.toThrow();
    });
  });
});
```

### Component Testing with DOM

```typescript
// src/components/theme-toggle/theme-toggle.test.ts
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle Component', () => {
  let container: HTMLElement;
  let themeToggle: ThemeToggle;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    themeToggle = new ThemeToggle();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should render toggle button', () => {
    themeToggle.render(container);

    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  test('should toggle theme when clicked', () => {
    themeToggle.render(container);
    const button = container.querySelector('button') as HTMLButtonElement;

    expect(themeToggle.currentTheme).toBe('light');

    button.click();
    expect(themeToggle.currentTheme).toBe('dark');

    button.click();
    expect(themeToggle.currentTheme).toBe('light');
  });
});
```

### Mocking External Dependencies

```typescript
// src/services/api-client.test.ts
import { ApiClient } from './api-client';

// Mock fetch
global.fetch = jest.fn();

describe('ApiClient', () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient('https://api.example.com');
    (fetch as jest.Mock).mockClear();
  });

  test('should make GET request with correct URL', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const result = await apiClient.get('/users');

    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/users',
      expect.objectContaining({
        method: 'GET',
      })
    );
    expect(result).toEqual({ data: 'test' });
  });
});
```

## Integration Testing with TDD

### Writing Integration Tests First

```typescript
// tests/user-registration.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should register new user successfully', async ({ page }) => {
    // 🔴 RED: This test will fail until we implement the registration flow
    await page.goto('/register');

    await page.fill('[data-testid="email-input"]', 'user@example.com');
    await page.fill('[data-testid="password-input"]', 'securePassword123');
    await page.click('[data-testid="register-button"]');

    await expect(page.locator('[data-testid="success-message"]')).toContainText(
      'Registration successful'
    );

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Building Components to Pass Integration Tests

After the integration test fails, build the components using unit TDD:

```bash
# 🔴 RED: Integration test fails
npm test # Playwright test fails

# Build components with unit TDD
# 1. Create RegistrationForm component with unit tests
# 2. Create EmailInput component with unit tests
# 3. Create PasswordInput component with unit tests
# 4. Create RegistrationService with unit tests

# 🟢 GREEN: Integration test passes
npm test # Playwright test now passes
```

## File Organization

```
src/
├── components/
│   └── theme-toggle/
│       ├── theme-toggle.ts          # Implementation
│       ├── theme-toggle.test.ts     # Unit tests
│       └── index.ts                 # Exports
├── services/
│   └── api-client/
│       ├── api-client.ts            # Implementation
│       ├── api-client.test.ts       # Unit tests
│       └── index.ts                 # Exports
└── utils/
    └── email-validator/
        ├── email-validator.ts       # Implementation
        ├── email-validator.test.ts  # Unit tests
        └── index.ts                 # Exports

tests/
├── unit/                            # Additional unit tests
├── integration/                     # Cross-component tests
├── user-flows/                      # End-to-end user journeys
│   ├── registration.spec.ts         # User registration flow
│   ├── authentication.spec.ts      # User login flow
│   └── theme-switching.spec.ts     # Theme toggle flow
└── setup/
    └── jest.setup.ts               # Jest configuration
```

## TDD Commands Reference

### Development Workflow

```bash
# Start TDD cycle for new feature
npm run test:unit:watch                    # Watch unit tests during development

# Red phase - write failing test
git add src/component/feature.test.ts
git commit -m "test: add failing test for new feature 🔴"

# Green phase - minimal implementation
git add src/component/feature.ts
git commit -m "feat: implement minimal feature logic 🟢"

# Refactor phase - improve code
git add .
git commit -m "refactor: improve feature implementation 🔵"

# Integration testing
npm test                                   # Run Playwright tests

# Full test suite
npm run test:all                          # Run both unit and integration tests
```

### Test Development Commands

```bash
# Unit testing
npm run test:unit                         # Run all unit tests
npm run test:unit:watch                   # Watch mode for development
npm run test:unit:coverage                # Generate coverage report
npm run test:unit:debug                   # Debug unit tests

# Integration testing
npm test                                  # Run Playwright tests
npm run test:ui                          # Playwright UI mode
npm run test:debug                       # Debug Playwright tests

# Quality assurance
npm run lint && npm run format:check && npm run build && npm run test:unit
```

## Testing Anti-Patterns to Avoid

### ❌ Don't Write Tests After Implementation

```bash
# Wrong approach:
git commit -m "feat: implement user authentication"
git commit -m "test: add tests for user authentication"
```

### ❌ Don't Write All Tests Before Any Implementation

```bash
# Wrong approach:
git commit -m "test: add all tests for authentication system"
git commit -m "feat: implement entire authentication system"
```

### ❌ Don't Skip the Refactor Phase

```bash
# Wrong approach:
git commit -m "test: add failing test 🔴"
git commit -m "feat: implement feature 🟢"
# Missing refactor phase!
git commit -m "test: add next failing test 🔴"
```

## ✅ Correct TDD Patterns

### One Test, One Implementation, One Refactor

```bash
# Correct approach:
git commit -m "test: add failing test for user creation 🔴"
git commit -m "feat: implement basic user creation 🟢"
git commit -m "refactor: improve user creation with validation 🔵"

git commit -m "test: add failing test for email validation 🔴"
git commit -m "feat: implement email validation 🟢"
git commit -m "refactor: extract email validation utility 🔵"
```

### Small, Focused Tests

```typescript
// Good: Small, focused test
test('should return user email', () => {
  const user = new User('test@example.com');
  expect(user.email).toBe('test@example.com');
});

// Good: Another small, focused test
test('should throw error for invalid email', () => {
  expect(() => new User('invalid')).toThrow();
});
```

## Coverage and Quality Metrics

### Coverage Thresholds

- **Functions**: 90%+ coverage required
- **Lines**: 90%+ coverage required
- **Branches**: 80%+ coverage required
- **Statements**: 90%+ coverage required

### Test Quality Indicators

- Each test tests one specific behavior
- Tests are independent and can run in any order
- Tests have clear, descriptive names
- Tests follow Arrange-Act-Assert pattern
- Mocks are used appropriately for external dependencies

## Continuous Integration

### Pre-commit Hooks

```bash
# Runs automatically before each commit
npm run lint && npm run format:check && npm run build && npm run test:unit
```

### Pull Request Requirements

- All unit tests pass
- All integration tests pass
- Coverage thresholds met
- No linting errors
- Code formatted correctly

## TDD Benefits

1. **Better Design**: Writing tests first leads to better API design
2. **Confidence**: Comprehensive test coverage provides confidence in changes
3. **Documentation**: Tests serve as living documentation
4. **Regression Prevention**: Catch bugs before they reach production
5. **Refactoring Safety**: Change code confidently with test coverage

## Getting Started Checklist

- [ ] Understand the TDD cycle: Red → Green → Refactor
- [ ] Set up Jest for unit testing (`npm run test:unit`)
- [ ] Set up Playwright for integration testing (`npm test`)
- [ ] Write your first failing test
- [ ] Implement minimal code to pass the test
- [ ] Refactor while keeping tests green
- [ ] Commit each phase with appropriate emoji and message
- [ ] Repeat the cycle for each new feature or bug fix

Remember: **Test first, implement second, refactor third**. This discipline leads to higher quality, more maintainable code with excellent test coverage.
