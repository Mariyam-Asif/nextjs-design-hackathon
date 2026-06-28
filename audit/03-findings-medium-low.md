# Medium & Low Priority Findings — Phase 1 Assessment

---

## MEDIUM-001: Extensive TypeScript Errors Prevent Type Safety

**Severity:** Medium

**Category:** Code Quality / Configuration

**Affected Area:** Entire codebase (47+ TypeScript errors)

**Description:**

The codebase has extensive TypeScript errors preventing type checking. Most errors stem from Next.js 9.3.3 not having type definitions for modern features (next/image, next/form, Next.js 15 Link props).

**Observed Behavior:**

- 47+ TypeScript errors when running `tsc --noEmit`
- Errors include: "Cannot find module 'next/image'", "Property 'className' does not exist on type Link"
- These are symptoms of the Next.js version mismatch (CRIT-001)

**Expected Behavior:**

TypeScript should compile without errors, providing type safety throughout the application.

**Why It Matters:**

- Eliminates type safety benefits of TypeScript
- Masks real type errors that could cause runtime bugs
- IDE/editor IntelliSense is degraded
- Cannot use TypeScript build step in CI/CD

**Recommended Phase:** Phase 2 (Resolve with CRIT-001 fix)

---

## MEDIUM-002: Missing ARIA Labels on Interactive Elements

**Severity:** Medium

**Category:** Accessibility

**Affected Area:** Multiple interactive elements (buttons, links, icons)

**Description:**

Most interactive elements lack ARIA labels for screen reader users. Out of dozens of buttons and icon-based controls, only the hamburger menu button has an aria-label.

**Observed Behavior:**

Examples of missing labels:
- Profile icon button (Navbar line 86-92) - no aria-label
- Search icon button (Navbar line 93-99) - no aria-label
- Heart/wishlist icon (Navbar line 127-131) - no aria-label
- Cart icon (Navbar line 132-138) - no aria-label
- ProductCard hover actions (Share, Compare, Like) - no labels

**Expected Behavior:**

All icon-based buttons and interactive elements should have descriptive aria-labels or visible text labels.

**Why It Matters:**

- Screen reader users cannot understand what icons do
- Violates WCAG 2.2 SC 4.1.2 (Name, Role, Value)
- Poor accessibility for visually impaired users
- Affects all pages with these components

**Recommended Phase:** Phase 3 (High Priority Accessibility Fix)

---

## MEDIUM-003: Cart Uses Product Title as Unique Identifier

**Severity:** Medium

**Category:** Data Integrity / Logic Error

**Affected Area:** CartContext.js, ProductCard.tsx

**Description:**

The cart system uses product titles as unique identifiers instead of product IDs. This creates issues if two products have the same title or if titles change.

**Observed Behavior:**

```javascript
// CartContext.js line 20
const existingItem = prevItems.find((i) => i.title === item.title);

// CartContext.js line 29
removeFromCart = (title) => { ... }

// ProductCard.tsx line 28
id: title  // Uses title as ID
```

**Expected Behavior:**

Should use stable product IDs (_id from Sanity) as unique identifiers.

**Why It Matters:**

- Products with identical titles will be treated as the same product
- Changing a product title breaks cart references
- Cannot have multiple variants with same name
- Cart data integrity issues

**Recommended Phase:** Phase 3 (Data Integrity Fix)

---

## MEDIUM-004: Inconsistent Error Handling

**Severity:** Medium

**Category:** Code Quality / User Experience

**Affected Area:** API calls, data fetching

**Description:**

Error handling is inconsistent across the application. Some errors are logged to console only, others are silently caught, and user-facing error messages are missing.

**Observed Behavior:**

```typescript
// shop/page.tsx line 62
console.log("Error fetching products:", error);
// No user-facing error message

// search/page.tsx line 50
.catch(() => setLoading(false));
// Error silently ignored, no message to user
```

**Expected Behavior:**

- Consistent error handling pattern
- User-facing error messages
- Graceful degradation
- No console.log in production code

**Why It Matters:**

- Users don't know when things fail
- Debugging is harder
- Poor user experience
- Console logs left in production (code quality issue)

**Recommended Phase:** Phase 3 (UX Improvement)

---

## LOW-001: CartContext Uses JavaScript Instead of TypeScript

**Severity:** Low

**Category:** Code Quality / Consistency

**Affected Area:** app/CartContext.js

**Description:**

CartContext.js is the only core application file using JavaScript instead of TypeScript, creating inconsistency in the codebase.

**Observed Behavior:**

File is named CartContext.js and contains no type annotations, while all other application code uses TypeScript (.tsx, .ts).

**Expected Behavior:**

Should be renamed to CartContext.tsx with proper TypeScript types for cart items, context interface, and provider props.

**Why It Matters:**

- Inconsistent with project standards
- Misses type safety benefits
- Type errors in cart operations won't be caught
- Minor technical debt

**Recommended Phase:** Phase 4 (Code Quality Improvement)

---

## LOW-002: Console.log Statements in Production Code

**Severity:** Low

**Category:** Code Quality

**Affected Area:** app/search/page.tsx (line 54), app/shop/page.tsx (line 62)

**Description:**

Console.log statements remain in production code, used for debugging but not removed.

**Observed Behavior:**

```typescript
console.log("Added to cart:", item);  // search/page.tsx
console.log("Error fetching products:", error);  // shop/page.tsx
```

**Expected Behavior:**

Production code should not contain console logging. Use proper error reporting/monitoring tools instead.

**Why It Matters:**

- Exposes internal data to browser console
- Minor performance impact
- Unprofessional appearance
- Violates constitution code quality standards

**Recommended Phase:** Phase 4 (Code Quality Cleanup)

---

## LOW-003: ESLint Configuration Issue

**Severity:** Low

**Category:** Tooling / Configuration

**Affected Area:** npm scripts, ESLint config

**Description:**

Running `npm run lint` fails with error "No such directory exists as the project root: lint" - appears to be misconfigured.

**Observed Behavior:**

ESLint is looking for a directory called "lint" instead of linting the project directory.

**Expected Behavior:**

`npm run lint` should run ESLint against the project source code.

**Why It Matters:**

- Cannot use linting in development workflow
- Code quality checks are not running
- CI/CD pipeline cannot include linting
- Minor tooling issue but reduces code quality enforcement

**Recommended Phase:** Phase 4 (Tooling Fix)

---

## LOW-004: Head Component Misused in App Router

**Severity:** Low

**Category:** Code Quality / Next.js Best Practices

**Affected Area:** app/layout.tsx (line 20-23)

**Description:**

The layout uses `<Head>` from next/head which is a Pages Router API, not App Router. In App Router, metadata should be exported as a static object, not rendered in the component tree.

**Observed Behavior:**

```tsx
import Head from "next/head";
// ...
<Head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</Head>
```

**Expected Behavior:**

Should use App Router metadata API or add link in the `<head>` section directly (App Router automatically moves it).

**Why It Matters:**

- Using wrong API for architecture
- May not work correctly in App Router
- Minor best practices violation
- Should follow Next.js 13+ patterns

**Recommended Phase:** Phase 4 (Best Practices Cleanup)

---

## Assessment Note

Additional potential issues that could not be fully assessed due to runtime testing being blocked:
- Responsive behavior at tablet/laptop breakpoints
- Form validation in checkout
- Product filtering/sorting functionality
- Image loading performance
- Layout shifts during page load
- Focus management in modals/overlays

These require runtime testing once critical blockers are resolved.
