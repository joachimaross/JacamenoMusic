# Contributing to JACAMENO Music Studio

We love your input! We want to make contributing to JACAMENO as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the ISC Software License

In short, when you submit code changes, your submissions are understood to be under the same [ISC License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker]

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/joachimaross/JacamenoMusic/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

1. Install dependencies:
```bash
npm install
cd packages/backend && npm install
cd ../mobile && npm install
cd ../ai-services && pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development servers:
```bash
# Backend
cd packages/backend && npm run dev

# AI Services
cd packages/ai-services && python -m uvicorn main:app --reload

# Mobile
cd packages/mobile && npm start
```

## Testing

- Backend: `cd packages/backend && npm test`
- AI Services: `cd packages/ai-services && pytest`
- Linting: `cd packages/backend && npm run lint`

## Code Style

- JavaScript/React: We use ESLint
- Python: We follow PEP 8 and use Black for formatting

## License

By contributing, you agree that your contributions will be licensed under its ISC License.
