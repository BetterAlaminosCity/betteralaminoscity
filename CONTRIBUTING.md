# Contributing to BetterAlaminosCity.org

Thank you for your interest in contributing to BetterAlaminosCity.org! This civic-tech project thrives on community participation. Whether you're a developer, designer, translator, or a concerned resident of Alaminos City, your contributions are welcome.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Setup

```bash
git clone https://github.com/ljsalcedo-dev/betteralaminoscity.git
cd betteralaminoscity
npm install
npm run dev        # start the dev server
```

This project's `.npmrc` sets `legacy-peer-deps=true` — required because `typescript@^7` is ahead of some dependencies' declared peer ranges.

## How to Contribute

### Reporting Bugs

1. Check existing [issues](https://github.com/ljsalcedo-dev/betteralaminoscity/issues) to avoid duplicates
2. Create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and device information
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefit to users
3. Include mockups or examples if possible

### Submitting Code

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. **Make** your changes
4. **Test** your changes (see Testing Requirements below)
5. **Commit** with a Conventional Commits message
   ```bash
   git commit -m "feat: add brief description of changes"
   ```
6. **Push** to your fork
   ```bash
   git push origin feat/your-feature-name
   ```
7. **Open** a Pull Request

### Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
type: brief description

Types:
- feat: New feature or content
- fix: Bug fix
- chore: Tooling, dependencies, or maintenance
- docs: Documentation changes
- test: Adding or updating tests
- ci: CI/CD pipeline changes
- refactor: Code restructuring with no behavior change
```

## Contribution Areas

| Area          | Description                                     |
| ------------- | ----------------------------------------------- |
| Bug Fixes     | Fix reported issues                             |
| Features      | Implement new functionality                     |
| Content       | Update Alaminos City service/office information |
| Translations  | Translate to Filipino (`app/i18n/locales/fil`)  |
| Design        | Improve UI/UX using Kapwa design tokens         |
| Tests         | Improve test coverage                           |
| Documentation | Improve guides and comments                     |

## Code Guidelines

- Functional React components, TypeScript throughout
- Use Kapwa design tokens (`--color-kapwa-*`, `kapwa-brand-*`) instead of ad-hoc CSS colors
- All user-facing copy goes through i18next (`useTranslation`) — no hardcoded English strings in components
- Follow the existing file layout: `app/components/<layer>/`, `app/routes/`, `app/lib/`

## Testing Requirements

Before opening a pull request, all of the following must pass:

```bash
npm test           # Vitest unit/component tests
npm run typecheck  # react-router typegen + tsc
npm run lint       # oxlint
npm run build      # static production build
```

## Pull Request Process

1. Ensure your code follows the style guidelines
2. Update documentation if needed
3. Make sure all Testing Requirements above pass
4. Link related issues
5. Wait for review and address feedback

## Review Criteria

Pull requests are reviewed for:

- Code quality and style consistency
- Functionality and bug-free operation
- Accessibility compliance
- Mobile responsiveness
- Data accuracy (for content changes)

## Questions?

Feel free to open an issue — we're happy to help.

---

By contributing, you agree to follow this project's [Code of Conduct](CODE_OF_CONDUCT.md).
