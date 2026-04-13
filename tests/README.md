# E2E Test Suite — Task Management Dashboard

Comprehensive Playwright tests for the Module 2 Task Management Dashboard.

## Running Tests

```bash
# Run all tests
npx playwright test

# Run with headed browser (visible)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/dashboard.spec.ts

# View HTML test report
npx playwright show-report
```

## Test Files

| File | Tests | Description |
|------|-------|-------------|
| `dashboard.spec.ts` | 8 | KPI stats, task filters, card content, tags |
| `navigation.spec.ts` | 5 | Sidebar items, collapse/expand, user menu |
| `accessibility.spec.ts` | 6 | ARIA roles, keyboard nav, semantic HTML |
| `responsive.spec.ts` | 6 | Mobile/tablet/desktop layouts, grid columns |
| `dark-mode.spec.ts` | 5 | Theme toggle, localStorage, persistence |

**Total: 30 tests**
