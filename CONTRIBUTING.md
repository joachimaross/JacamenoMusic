# Contributing to JACAMENO

Thank you for your interest in contributing to JACAMENO! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature has already been requested
- Provide a clear use case
- Explain how it benefits users
- Consider implementation complexity

### Code Contributions

1. **Fork the Repository**

   ```bash
   git clone https://github.com/joachimaross/JacamenoMusic.git
   cd JacamenoMusic
   ```

2. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the code style guidelines
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**

   ```bash
   npm test
   npm run lint
   npm run build
   ```

5. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

**Please refer to [CODE_STANDARDS.md](./CODE_STANDARDS.md) for comprehensive code quality standards.**

### Quick Reference

- **TypeScript**: Strict mode enabled, explicit types required
- **Formatting**: Prettier (automatic via pre-commit hooks)
- **Linting**: ESLint for JS/TS, Black/isort for Python
- **Testing**: 80%+ code coverage required
- **Commits**: Follow Conventional Commits specification

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### React Components

- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic into custom hooks
- Use proper prop types
- Avoid inline styles (use Tailwind CSS)

### Python

- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions pure when possible

## 🧪 Testing

**See [CODE_STANDARDS.md](./CODE_STANDARDS.md#testing-standards) for detailed testing guidelines.**

- Write tests for new features
- Maintain test coverage above 80%
- Test edge cases
- Use descriptive test names

### Running Tests

```bash
# All tests
yarn test

# With coverage report
yarn test --coverage

# Specific workspace
yarn test --workspace=apps/web
yarn test --workspace=services/api

# Python tests
cd services/ai-microservices
pytest --cov
```

### Pre-commit Hooks

We use Husky for automated quality checks:

- **Pre-commit**: Runs ESLint and Prettier on staged files
- **Pre-push**: Runs TypeScript type check and tests

These hooks ensure code quality before committing.

## 📚 Documentation

- Update README.md if adding features
- Add JSDoc comments for functions
- Update API documentation
- Include code examples

## 🎯 Pull Request Guidelines

### PR Title Format

```
type(scope): description

Examples:
feat(studio): add VST plugin support
fix(api): resolve authentication issue
docs(readme): update installation instructions
```

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🌳 Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation only
- `refactor/` - Code refactoring
- `test/` - Test updates
- `chore/` - Maintenance tasks

## 🚀 Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Python >= 3.9
- Docker (optional)

### Initial Setup

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp services/api/.env.example services/api/.env
   ```

3. **Start Services**

   ```bash
   # Start databases with Docker
   docker-compose up -d postgres redis minio

   # Start web app
   npm run dev

   # Start API (new terminal)
   npm run dev:api

   # Start AI services (new terminal)
   cd services/ai-microservices
   python main.py
   ```

## 🏗️ Project Structure

**See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.**

```
jacameno-music/
├── apps/
│   ├── web/              # Next.js web app
│   └── mobile/           # React Native app
├── services/
│   ├── api/              # Node.js backend
│   └── ai-microservices/ # Python AI services
├── packages/
│   ├── ui/               # Shared UI components
│   └── shared/           # Shared utilities
└── docs/                 # Documentation
```

## 🎨 UI/UX Guidelines

- Follow Material Design principles
- Ensure mobile responsiveness
- Support dark mode
- Use accessible colors (WCAG AA)
- Test with screen readers
- Provide keyboard navigation

## 🔐 Security

- Never commit secrets or API keys
- Use environment variables
- Sanitize user inputs
- Implement rate limiting
- Follow OWASP guidelines
- Report security issues privately

## 📋 Code Review Process

1. **Automated Checks**
   - Linting passes
   - Tests pass
   - Build succeeds
   - No merge conflicts

2. **Manual Review**
   - Code quality
   - Architecture fit
   - Performance impact
   - Security considerations

3. **Approval**
   - At least one maintainer approval
   - All comments addressed
   - CI/CD pipeline green

## 🎯 Focus Areas

We especially welcome contributions in:

- VST plugin integration
- Audio processing algorithms
- AI model improvements
- Performance optimization
- Mobile app features
- Documentation
- Testing coverage

## 💬 Communication

- GitHub Issues for bugs and features
- GitHub Discussions for questions
- Pull Requests for code contributions
- Email for security issues

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing to JACAMENO! 🎵
