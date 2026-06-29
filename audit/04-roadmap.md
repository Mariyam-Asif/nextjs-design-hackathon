# Implementation Roadmap — Phase 1 Assessment

---

## Overview

This roadmap organizes all findings from the Phase 1 assessment into actionable implementation phases. Each phase has clear objectives, dependencies, and estimated effort.

**Total Issues Identified:** 15 (2 Critical, 5 High, 4 Medium, 4 Low)

---

## Phase 2: Critical Issue Resolution (MUST DO FIRST)

**Goal:** Get the application running and functional

**Duration:** 1-2 days

**Dependencies:** None - this is the foundation

### Issues Addressed

| ID | Issue | Effort |
|----|-------|--------|
| CRIT-001 | Next.js Version Mismatch | Medium |
| CRIT-002 | Missing Sanity Credentials | Small |

### Tasks

1. **Update package.json dependencies**
   - Update Next.js to 15.0.4 or later
   - Ensure React and React-DOM are both 19.x with matching versions
   - Resolve Sanity version conflicts (@sanity/vision requires sanity 6.x)
   - Run `npm install` to apply changes
   - **Acceptance:** `npm run dev` starts without errors

2. **Configure Sanity credentials**
   - Obtain Sanity Project ID from Sanity dashboard
   - Obtain Sanity Dataset name
   - Update `.env.local` with real values
   - **Acceptance:** Application connects to Sanity and fetches products

3. **Verify application startup**
   - Start development server
   - Access localhost:3000 in browser
   - Verify home page loads
   - Check browser console for errors
   - **Acceptance:** Application loads without errors

4. **Test basic functionality**
   - Navigate to all pages
   - Verify products display on home and shop pages
   - Test navigation between pages
   - **Acceptance:** All pages accessible and render content

### Success Criteria

- ✅ Application starts successfully
- ✅ No startup errors
- ✅ All pages load
- ✅ Products fetch from Sanity
- ✅ Basic navigation works

### Risks

- **Dependency conflicts:** May need `--legacy-peer-deps` during installation
- **Sanity access:** Need valid credentials from project owner
- **Breaking changes:** Next.js 9→15 is a major version jump, may expose other issues

---

## Phase 3: High Priority Fixes (CORE FUNCTIONALITY)

**Goal:** Fix security issues and implement missing core features

**Duration:** 1-2 weeks

**Dependencies:** Phase 2 must be complete

### Issues Addressed

| ID | Issue | Effort |
|----|-------|--------|
| HIGH-001 | Hardcoded Sanity Credentials | Small |
| HIGH-002 | Missing Product Detail Page | Large |
| HIGH-003 | Non-Functional Cart in Search | Small |
| HIGH-004 | Incomplete Checkout | Large |
| HIGH-005 | Missing Image Configuration | Small |

### Tasks

#### 3.1: Security Fix (HIGH-001)

1. **Remove hardcoded credentials from shop page**
   - Replace hardcoded sanityClient with import from `@/sanity/lib/client`
   - Verify credentials come from environment variables only
   - Search codebase for any other hardcoded values
   - **Acceptance:** No credentials in client-side code

**Effort:** 30 minutes

#### 3.2: Build Product Detail Page (HIGH-002)

1. **Create dynamic route: `app/shop/[slug]/page.tsx`**
   - Implement product detail layout
   - Fetch single product from Sanity by slug
   - Display full product information
   - Include image gallery
   - Add to cart functionality
   - Related products section

2. **Update ProductCard to link to detail page**
   - Wrap product card in Link component
   - Use product slug for URL
   - Maintain hover state functionality

3. **Test product navigation flow**
   - Click product from home page → detail page
   - Click product from shop page → detail page
   - Click product from search results → detail page
   - Add to cart from detail page
   - **Acceptance:** Product detail pages work for all products

**Effort:** 2-3 days

#### 3.3: Fix Search Page Cart (HIGH-003)

1. **Import and use CartContext in search page**
   - Add `const { addToCart } = useCart();`
   - Replace console.log with actual addToCart call
   - Remove console.log statement
   - **Acceptance:** Products can be added to cart from search results

**Effort:** 15 minutes

#### 3.4: Complete Checkout Implementation (HIGH-004)

1. **Connect checkout to cart data**
   - Import cart context
   - Display cart items in order summary
   - Calculate totals (subtotal, tax if applicable, shipping if applicable, total)

2. **Implement form submission**
   - Add onSubmit handler to form
   - Validate required fields
   - Handle country/state selection

3. **Add payment integration placeholder**
   - Document payment provider options (Stripe, PayPal, etc.)
   - Add placeholder for payment step
   - Or implement actual payment if provider chosen

4. **Create order confirmation flow**
   - Submit order (to Sanity or order management system)
   - Clear cart after successful order
   - Redirect to confirmation page
   - Display order summary

5. **Build order confirmation page**
   - Create `app/checkout/confirmation/page.tsx`
   - Display order details
   - Thank you message
   - Order number
   - **Acceptance:** Users can complete full checkout flow

**Effort:** 4-5 days

#### 3.5: Configure Product Images (HIGH-005)

1. **Verify @sanity/image-url setup**
   - Check if imageUrlBuilder is properly configured
   - Test image URL generation
   - Add error handling for missing images
   - **Acceptance:** All product images load correctly

**Effort:** 1 hour

### Success Criteria

- ✅ No hardcoded credentials
- ✅ Product detail pages functional
- ✅ Cart works on all pages
- ✅ Checkout flow complete end-to-end
- ✅ Product images load correctly

---

## Phase 4: Medium Priority Improvements (QUALITY & UX)

**Goal:** Improve code quality, accessibility, and user experience

**Duration:** 1-2 weeks

**Dependencies:** Phase 3 must be complete

### Issues Addressed

| ID | Issue | Effort |
|----|-------|--------|
| MEDIUM-001 | TypeScript Errors | Small |
| MEDIUM-002 | Missing ARIA Labels | Medium |
| MEDIUM-003 | Cart Uses Title as ID | Medium |
| MEDIUM-004 | Inconsistent Error Handling | Medium |

### Tasks

#### 4.1: Fix TypeScript Errors (MEDIUM-001)

1. **Run `npx tsc --noEmit` to verify errors**
   - Most should be resolved by Phase 2 Next.js update
   - Fix any remaining type errors
   - Add proper types to untyped code
   - **Acceptance:** TypeScript compiles with 0 errors

**Effort:** 2-4 hours

#### 4.2: Add ARIA Labels (MEDIUM-002)

1. **Audit all interactive elements**
   - Profile icon → `aria-label="User profile"`
   - Search icon → `aria-label="Search products"`
   - Wishlist icon → `aria-label="Wishlist"`
   - Cart icon → `aria-label="Shopping cart"`
   - Share button → `aria-label="Share product"`
   - Compare button → `aria-label="Compare product"`
   - Like button → `aria-label="Add to wishlist"`

2. **Add focus management**
   - Ensure visible focus indicators
   - Test keyboard navigation
   - Verify tab order is logical

3. **Test with screen reader (NVDA)**
   - Navigate site with keyboard only
   - Verify all actions are announced
   - **Acceptance:** All interactive elements have proper labels

**Effort:** 1-2 days

#### 4.3: Fix Cart ID System (MEDIUM-003)

1. **Update CartContext to use product _id**
   - Change `find((i) => i.title === item.title)` to use `i.id === item.id`
   - Update all cart operations
   - Update ProductCard to pass actual product _id

2. **Migrate existing localStorage data (if needed)**
   - Handle case where old cart format exists
   - Transform title-based IDs to proper IDs
   - **Acceptance:** Cart uses stable product IDs

**Effort:** 2-3 hours

#### 4.4: Implement Consistent Error Handling (MEDIUM-004)

1. **Create error handling patterns**
   - Define standard error display component
   - Create error boundary components
   - Add try-catch to all async operations

2. **Replace console.log with user-facing messages**
   - Remove all console.log/error calls
   - Show toast notifications or error alerts
   - Display helpful error messages to users

3. **Add loading and empty states**
   - Loading spinners for async operations
   - "No products found" messages
   - "Failed to load" messages with retry option
   - **Acceptance:** All errors show user-friendly messages

**Effort:** 2-3 days

### Success Criteria

- ✅ TypeScript compiles without errors
- ✅ All interactive elements accessible
- ✅ Cart uses proper unique identifiers
- ✅ Consistent error handling throughout

---

## Phase 5: Low Priority Cleanup (POLISH)

**Goal:** Code quality improvements and best practices

**Duration:** 2-3 days

**Dependencies:** Phase 4 complete (or can run in parallel)

### Issues Addressed

| ID | Issue | Effort |
|----|-------|--------|
| LOW-001 | CartContext in JavaScript | Small |
| LOW-002 | Console Logs in Production | Small |
| LOW-003 | ESLint Misconfigured | Small |
| LOW-004 | Head Component Misuse | Small |

### Tasks

#### 5.1: Convert CartContext to TypeScript (LOW-001)

1. **Rename CartContext.js → CartContext.tsx**
2. **Add TypeScript types**
   - CartItem interface
   - CartContext interface
   - CartProvider props type
3. **Update imports throughout codebase**
   - **Acceptance:** CartContext is fully typed

**Effort:** 1 hour

#### 5.2: Remove Console Logs (LOW-002)

1. **Search for all console.* calls**
   - Remove from search/page.tsx
   - Remove from shop/page.tsx
   - Verify no others exist
   - **Acceptance:** No console.log in production code

**Effort:** 15 minutes

#### 5.3: Fix ESLint Configuration (LOW-003)

1. **Debug npm run lint command**
   - Check package.json scripts
   - Fix ESLint configuration
   - Run lint and fix any issues
   - **Acceptance:** `npm run lint` works correctly

**Effort:** 30 minutes

#### 5.4: Fix Head Component Usage (LOW-004)

1. **Remove Head import from layout.tsx**
2. **Move preconnect link to proper location**
   - Add to metadata or directly in head
3. **Verify fonts still load correctly**
   - **Acceptance:** Follows Next.js 15 best practices

**Effort:** 15 minutes

### Success Criteria

- ✅ All code is TypeScript
- ✅ No debug statements in production
- ✅ Linting works and passes
- ✅ Following Next.js 15 best practices

---

## Phase 6: Comprehensive Testing & Optimization

**Goal:** Complete assessment items that were blocked in Phase 1

**Duration:** 1 week

**Dependencies:** Phases 2-5 complete

### Tasks

1. **Performance Testing**
   - Run Lighthouse on all major pages (mobile + desktop)
   - Measure Core Web Vitals
   - Identify and fix performance bottlenecks
   - Optimize images
   - Implement lazy loading where appropriate

2. **Responsive Testing**
   - Test at all viewport sizes (375px, 768px, 1024px, 1440px)
   - Fix any layout breaks
   - Verify touch targets on mobile
   - Test navigation on all screen sizes

3. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Document any browser-specific issues
   - Implement fixes or workarounds

4. **Accessibility Audit**
   - Run automated scans (Lighthouse, axe)
   - Manual keyboard navigation testing
   - Basic NVDA screen reader testing
   - Fix any remaining accessibility issues

5. **User Flow Testing**
   - Test all user flows end-to-end
   - Browse → Product Detail → Add to Cart → Checkout → Confirmation
   - Search → Add to Cart
   - Test error scenarios
   - Verify cart persistence

6. **Security Review**
   - Verify no secrets exposed
   - Check input sanitization
   - Review API security
   - Test for common vulnerabilities

### Success Criteria

- ✅ Lighthouse Performance > 90
- ✅ Lighthouse Accessibility > 90
- ✅ All Core Web Vitals in "Good" range
- ✅ Responsive on all devices
- ✅ Works in all major browsers
- ✅ All user flows complete successfully
- ✅ No security vulnerabilities

---

## Summary Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| Phase 2 | 1-2 days | Get application running |
| Phase 3 | 1-2 weeks | Core functionality & security |
| Phase 4 | 1-2 weeks | Quality & accessibility |
| Phase 5 | 2-3 days | Code cleanup |
| Phase 6 | 1 week | Testing & optimization |

**Total Estimated Time:** 4-6 weeks to production ready

---

## Dependencies Chart

```
Phase 2 (Critical)
    ↓
Phase 3 (High Priority)
    ↓
Phase 4 (Medium Priority) ←→ Phase 5 (Low Priority - can run in parallel)
    ↓
Phase 6 (Testing & Optimization)
```

---

## Risk Mitigation

**Technical Risks:**
- Next.js version jump may expose unforeseen issues → Test thoroughly after Phase 2
- Sanity schema changes may break integration → Document current schema
- Dependencies may have breaking changes → Review changelogs before updating

**Project Risks:**
- Timeline may extend if unexpected issues found → Build buffer into schedule
- Missing requirements may emerge during implementation → Clarify requirements before Phase 3
- Stakeholder priorities may shift → Regular check-ins with project owner

---

## Definition of Done (Production Ready)

The application is production ready when:

- ✅ Application starts without errors
- ✅ All pages load and function correctly
- ✅ All Critical and High issues resolved
- ✅ Core user flows work end-to-end
- ✅ No security vulnerabilities
- ✅ Meets WCAG 2.2 AA accessibility standards
- ✅ Performance meets targets (Lighthouse > 90)
- ✅ Responsive on all device sizes
- ✅ Works in all major browsers
- ✅ Code quality meets constitution standards
- ✅ No TypeScript errors
- ✅ All tests pass (when implemented)
- ✅ Documentation complete

---

**End of Roadmap**

See individual finding documents for detailed issue descriptions and technical context.
