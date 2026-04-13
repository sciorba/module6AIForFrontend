# Grid University — AI-Assisted Web Development Course

A comprehensive React + TypeScript course project built with Cursor AI, covering component fundamentals, state management, E2E testing with Playwright, and complex UI patterns.

## Tech Stack

- **React 19** with functional components
- **TypeScript 5.6** (strict mode)
- **Vite 6** build tool
- **Tailwind CSS v4** with dark mode support
- **Playwright** for E2E testing
- **React Router v7** for navigation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Playwright tests
npm test

# View test report
npm run test:report

# Build for production
npm run build
```

Open `http://localhost:5173` to see the landing page with links to all modules.

## Course Structure

### Module 1: Component Fundamentals

| Exercise | Description | Route |
|----------|-------------|-------|
| Instructor Demo | UserProfile component with avatar, stats, follow/message | `/module-1/instructor-demo` |
| Exercise 1 | ProductCard with image, rating stars, price, add-to-cart | `/module-1/exercise-1` |
| Exercise 2 | Responsive Navbar with dropdowns, search, mobile menu | `/module-1/exercise-2` |

### Module 2: State & Interactivity

| Exercise | Description | Route |
|----------|-------------|-------|
| Instructor Demo | Task Management Dashboard with sidebar, stats, dark mode | `/module-2/instructor-demo` |
| Exercise 3 | Settings Panel with 4-tab form, toggles, save/cancel | `/module-2/exercise-3` |
| Exercise 4 | Analytics Dashboard with KPI cards, SVG charts, data table | `/module-2/exercise-4` |

### Module 3: Testing with Playwright

| Exercise | Description | Route |
|----------|-------------|-------|
| Instructor Demo | 30 E2E tests for the Task Dashboard | `/module-3/instructor-demo` |
| Exercise 5 | Product Search page + 26 Playwright tests | `/module-3/exercise-5` |
| Exercise 6 | Contact Form page + 15 Playwright tests | `/module-3/exercise-6` |

### Module 4: Complex Components

| Exercise | Description | Route |
|----------|-------------|-------|
| Instructor Demo | Team Dashboard with Context API cross-component state | `/module-4/instructor-demo` |
| Exercise 7 | Kanban Board with columns, task cards, move, add/delete | `/module-4/exercise-7` |
| Exercise 8 | Social Media Feed with posts, likes, comments, share | `/module-4/exercise-8` |

## Test Suite

71 Playwright E2E tests across 7 test files:

```
tests/
├── dashboard.spec.ts        # 8 tests — KPI stats, task filters, card content
├── navigation.spec.ts       # 5 tests — sidebar, collapse, user menu
├── accessibility.spec.ts    # 6 tests — ARIA roles, keyboard nav
├── responsive.spec.ts       # 6 tests — mobile/tablet/desktop layouts
├── dark-mode.spec.ts        # 5 tests — theme toggle, localStorage persistence
├── product-search.spec.ts   # 26 tests — search, filters, sort, pagination
└── contact-form.spec.ts     # 15 tests — validation, submission, reset
```

Run all tests: `npm test`

## Submission Documents

Each exercise includes a markdown file (`exercise1.md` through `exercise8.md`) with:
- Setup instructions
- Component architecture description
- Screenshots of the running application
- AI prompts used during development
- Acceptance criteria checklist

## Project Structure

```
src/
├── App.tsx                  # Router + landing page
├── pages/                   # 12 page components (one per exercise)
├── modules/
│   ├── module-1/            # Component Fundamentals
│   ├── module-2/            # State & Interactivity
│   ├── module-3/            # Testing with Playwright
│   └── module-4/            # Complex Components
tests/                       # Playwright E2E tests
screenshots/                 # Application screenshots
```
