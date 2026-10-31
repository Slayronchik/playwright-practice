# Practice Software Testing - Playwright E2E Framework

A TypeScript end-to-end testing framework for [Practice Software Testing](https://practicesoftwaretesting.com/). It uses Playwright Test and the Page Object Model (POM) to keep page interactions reusable and test scenarios easy to read and maintain.

## Technology Stack

[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://github.com/motdotla/dotenv)

- **Playwright Test** - browser automation, assertions, auto-waiting, and HTML reporting.
- **TypeScript** - typed page objects and test scenarios.
- **dotenv** - loads optional test credentials from a local `.env` file.

## Test Coverage

- **Authentication:** valid and invalid login flows, field validation, and navigation to registration.
- **Product catalog:** product search, category filtering, and pagination.
- **Shopping cart:** add products, update quantities and totals, and remove products.
- **API tests:** product-list response validation and handling of searches with no matches.
- **Advanced scenarios:** data-driven login validation and catalog API interception with an empty mock response.
- **Manual test cases:** documented shopping-cart cases and their automation status in [`docs/test-cases.md`](docs/test-cases.md).

## Installation

```bash
git clone https://github.com/Slayronchik/playwright-practice.git
cd playwright-practice
npm install
npx playwright install
```

For the successful-login test, provide credentials in a local `.env` file:

```dotenv
TEST_EMAIL=your-test-account@example.com
TEST_PASSWORD=your-test-password
```

Do not commit real credentials. The successful-login test is skipped when these variables are not set.

## Running Tests

Run the full suite in headless mode (the default):

```bash
npx playwright test
```

Open Playwright UI mode:

```bash
npx playwright test --ui
```

Generate the configured HTML report by running the tests, then open it:

```bash
npx playwright test
npx playwright show-report
```

Run a specific test file, for example:

```bash
npx playwright test tests/ui/cart.spec.ts
```

Run the API tests:

```bash
npx playwright test tests/api/products.spec.ts
```

## Project Structure

```text
.
├── pages/                  # Page objects and shared page behavior
│   ├── base.page.ts
│   ├── cart.page.ts
│   ├── home.page.ts
│   ├── login.page.ts
│   └── product.page.ts
├── tests/
│   ├── api/                 # API request tests
│   │   └── products.spec.ts
│   └── ui/                  # UI and E2E test scenarios
│       ├── advanced.spec.ts
│       ├── cart.spec.ts
│       ├── catalog.spec.ts
│       ├── home.spec.ts
│       └── login.spec.ts
├── utils/                  # Reusable test data and helpers
│   ├── data-generator.ts
│   └── helpers.ts
├── docs/                   # Manual test documentation
│   └── test-cases.md
├── .github/
│   └── workflows/          # GitHub Actions workflow
├── playwright.config.ts
├── package.json
└── package-lock.json
```
