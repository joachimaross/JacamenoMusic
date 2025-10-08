# Code Standards - JACAMENO

This document defines the code quality standards and best practices for the JACAMENO platform to ensure Fortune 500-level engineering excellence.

## Table of Contents

- [TypeScript Standards](#typescript-standards)
- [JavaScript Standards](#javascript-standards)
- [React Standards](#react-standards)
- [Python Standards](#python-standards)
- [Testing Standards](#testing-standards)
- [Git Commit Standards](#git-commit-standards)
- [Code Review Guidelines](#code-review-guidelines)

## TypeScript Standards

### Strict Mode

All TypeScript code **must** use strict mode. The following compiler options are enforced:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Annotations

- **Always** provide explicit return types for functions
- **Always** type function parameters
- Avoid using `any` type - use `unknown` or proper types instead
- Use union types and type guards for runtime type safety

✅ **Good:**

```typescript
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function processData(data: unknown): ProcessedData {
  if (!isValidData(data)) {
    throw new Error('Invalid data format');
  }
  return transformData(data);
}
```

❌ **Bad:**

```typescript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

function processData(data: any) {
  return data.transform();
}
```

### Interfaces vs Types

- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and utility types
- Be consistent within each module

### Naming Conventions

- **PascalCase**: Types, Interfaces, Classes, Enums, React Components
- **camelCase**: Variables, functions, methods, properties
- **UPPER_SNAKE_CASE**: Constants and environment variables
- **kebab-case**: File names (except React components which use PascalCase)

## JavaScript Standards

### Modern ES6+ Syntax

- Use `const` and `let` instead of `var`
- Prefer arrow functions for callbacks
- Use template literals for string interpolation
- Use destructuring for object and array operations
- Use spread operator over `Object.assign()`

### Code Formatting

We use **Prettier** for automatic code formatting with the following configuration:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

Run `yarn format` before committing code.

### ESLint Rules

All code must pass ESLint checks. Configure your IDE to show ESLint warnings in real-time.

## React Standards

### Component Structure

- Use **functional components** with hooks exclusively
- Keep components under 200 lines of code
- Extract complex logic into custom hooks
- Use proper prop types with TypeScript

✅ **Good:**

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

### Hooks Best Practices

- Follow the Rules of Hooks (official React guidelines)
- Extract reusable logic into custom hooks
- Use `useMemo` and `useCallback` to optimize performance
- Always include proper dependency arrays

### State Management

- Use React Context for lightweight global state
- Use Zustand for complex application state
- Keep state as local as possible
- Avoid prop drilling - lift state up or use context

## Python Standards

### PEP 8 Compliance

All Python code must follow **PEP 8** style guide:

- 4 spaces for indentation (no tabs)
- Maximum line length: 100 characters
- Use `snake_case` for functions and variables
- Use `PascalCase` for classes
- Use `UPPER_SNAKE_CASE` for constants

### Type Hints

Always use type hints for function signatures:

✅ **Good:**

```python
from typing import List, Dict, Optional

def process_tracks(
    tracks: List[Dict[str, str]],
    max_duration: Optional[int] = None
) -> List[Dict[str, str]]:
    """Process and filter music tracks."""
    if max_duration is None:
        return tracks
    return [t for t in tracks if t.get('duration', 0) <= max_duration]
```

### Docstrings

Use Google-style docstrings for all functions and classes:

```python
def generate_lyrics(prompt: str, style: str = "pop") -> str:
    """
    Generate song lyrics based on a prompt.

    Args:
        prompt: The lyrical theme or concept
        style: Musical style (default: "pop")

    Returns:
        Generated lyrics as a string

    Raises:
        ValueError: If prompt is empty or style is invalid
    """
    pass
```

## Testing Standards

### Coverage Requirements

- **Minimum 80% code coverage** for all new code
- **100% coverage** for critical business logic
- Both unit tests and integration tests required

### Test Organization

```
src/
  components/
    Button.tsx
    Button.test.tsx
  utils/
    formatters.ts
    formatters.test.ts
```

### Test Naming

Use descriptive test names that explain the scenario:

✅ **Good:**

```typescript
describe('Button', () => {
  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={jest.fn()} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing Best Practices

- Write tests first (TDD) when possible
- Test behavior, not implementation
- Keep tests simple and focused
- Mock external dependencies
- Use test data builders for complex objects

## Git Commit Standards

### Conventional Commits

We follow the **Conventional Commits** specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling
- `ci`: CI/CD changes

**Examples:**

```
feat(studio): add VST plugin support
fix(api): resolve authentication token expiry issue
docs(readme): update installation instructions
test(components): add Button component tests
chore(deps): update Next.js to v14.0.0
```

### Commit Guidelines

- Write commits in present tense ("add feature" not "added feature")
- Keep subject line under 72 characters
- Provide context in the body for non-trivial changes
- Reference issue numbers in footer: `Closes #123`

## Code Review Guidelines

### For Authors

- Keep PRs small and focused (< 400 lines)
- Write a clear PR description explaining changes
- Ensure all tests pass locally
- Run linters and formatters before pushing
- Respond to review comments promptly

### For Reviewers

- Review within 24 hours if possible
- Be constructive and specific in feedback
- Approve if changes are acceptable (don't nitpick)
- Test the changes locally for complex features
- Check for security vulnerabilities

### Required Checks

Before merging, PRs must pass:

- ✅ All automated tests
- ✅ Linting (ESLint for TS/JS, Black for Python)
- ✅ Type checking (TypeScript compiler)
- ✅ Code coverage threshold (80%+)
- ✅ At least one approving review
- ✅ No merge conflicts

## Pre-commit Hooks

The repository enforces quality checks via Git hooks:

**Pre-commit:**

- Runs ESLint on staged files
- Runs Prettier to format code
- Fixes auto-fixable issues

**Pre-push:**

- Runs TypeScript type checking
- Runs all unit tests
- Ensures build succeeds

## Continuous Integration

All PRs trigger automated CI checks:

1. **Linting**: ESLint, Black, isort
2. **Type Checking**: TypeScript compiler, mypy
3. **Testing**: Jest (JS/TS), pytest (Python)
4. **Coverage**: Must meet 80% threshold
5. **Build**: Verify production build succeeds

## Editor Configuration

### Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features
- Jest Runner
- Python (with Pylance)

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black"
}
```

## Security Standards

- Never commit secrets, API keys, or credentials
- Use environment variables for sensitive configuration
- Validate and sanitize all user inputs
- Follow OWASP security guidelines
- Run security audits regularly (`yarn audit`, `pip-audit`)

## Performance Standards

### Web Performance

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

### API Performance

- Response Time: < 100ms (95th percentile)
- Database queries: Use indexes, avoid N+1
- Implement caching where appropriate

## Documentation Standards

- Update README.md for user-facing features
- Add JSDoc/docstrings for all public APIs
- Include code examples in documentation
- Keep architecture documentation current
- Document breaking changes in CHANGELOG.md

---

## Enforcement

These standards are enforced through:

1. **Automated tools**: ESLint, Prettier, TypeScript compiler
2. **Pre-commit hooks**: Husky + lint-staged
3. **CI/CD pipeline**: GitHub Actions
4. **Code reviews**: Manual review process
5. **Coverage reports**: Jest/pytest with threshold enforcement

For questions or suggestions about these standards, open an issue or discussion on GitHub.
