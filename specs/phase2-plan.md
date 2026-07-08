# Technical Plan — Phase 2: Core Functionality & Stability

---

## Objective

Implement all Phase 2 functional requirements by reusing existing architecture, maintaining code quality, and avoiding unnecessary complexity or dependencies.

---

## Technical Stack (Existing - No Changes)

**Reuse existing stack entirely:**

- **Framework:** Next.js 15+ (App Router)
- **Language:** JavaScript/TypeScript (existing mix, TS conversion deferred to Phase 5)
- **UI Library:** React 19
- **Styling:** Tailwind CSS (existing)
- **CMS:** Sanity CMS
- **State Management:** React Context (existing CartContext)
- **Storage:** Browser localStorage (cart persistence)
- **HTTP Client:** Native fetch API / Sanity client
- **Validation:** HTML5 + custom validation logic
- **Package Manager:** npm

**No new dependencies required.** All functionality can be implemented with existing tools.

---

## Architecture Overview

### Product Detail Pages

**Approach:** Dynamic route at `/shop/[slug]` using Next.js App Router dynamic segments.

- Fetch single product from Sanity by slug
- Reuse existing ProductCard visual patterns for consistency
- Add to cart using existing CartContext
- Show 404 for invalid slugs

### Search Functionality

**Approach:** Live search with debounce on existing search page.

- Implement debounce in search component (no library needed - use setTimeout)
- Query Sanity with GROQ for title/description/category/tags matching
- Reuse existing ProductCard components for results display
- Minimal character check (2+) before triggering

### Shopping Cart

**Approach:** Enhance existing CartContext with additional features.

- Add localStorage persistence with 30-day expiration
- Add price refresh logic on cart load
- Add stock validation
- Add unavailable item handling
- Reuse existing cart UI components

### Checkout Flow

**Approach:** Single-page checkout with form validation and order creation.

- Enhance existing checkout page
- Add form validation inline
- Add payment method UI (mock)
- Generate order number client-side
- Save order to Sanity CMS
- Redirect to confirmation page

### Order Management

**Approach:** Confirmation page retrieves order from Sanity by order number.

- Query parameter: `/checkout/confirmation?order=ORD-XXXXXXXX`
- Fetch order document from Sanity
- Display order details
- Handle invalid order numbers with 404-style message

---

## Key Technical Decisions

### Decision 1: Slug-Based Product URLs

**Decision:** Use `/shop/[slug]` pattern with slugs from Sanity.

**Reason:**
- Human-readable URLs improve UX and SEO
- Sanity already has slug field in product schema
- Consistent with `/shop` hierarchy for shopping pages

**Trade-offs:**
- ✅ Better UX, shareable URLs, SEO-friendly
- ✅ No slug generation needed (use Sanity slugs)
- ❌ Requires slug uniqueness in Sanity (content editing constraint)
- ❌ If slug changes, old URLs break (acceptable - handle in future phase)

**Alternative Considered:** ID-based URLs (`/shop/abc123`)
- Rejected: Less user-friendly, poor SEO, not human-readable

---

### Decision 2: Cart Persistence with localStorage

**Decision:** Store cart in localStorage with 30-day expiration timestamp.

**Reason:**
- No backend needed for cart storage
- Persists across sessions
- Simple to implement with existing CartContext
- Aligns with common eCommerce patterns

**Trade-offs:**
- ✅ Fast (no network requests)
- ✅ Works offline
- ✅ No backend complexity
- ❌ Not synced across devices
- ❌ Cleared if user clears browser data
- ❌ Limited to ~5-10MB storage (acceptable for cart data)

**Alternative Considered:** Sanity-based cart storage
- Rejected: Requires authentication, adds complexity, slower, overkill for Phase 2

**Implementation:**
- Store: `{ items: [...], timestamp: Date.now() }`
- On load: Check `(Date.now() - timestamp) > 30 days` → clear if expired
- Update timestamp on every cart modification

---

### Decision 3: Client-Side Order Number Generation

**Decision:** Generate random alphanumeric order numbers in browser before Sanity save.

**Reason:**
- Simple implementation with crypto.getRandomValues()
- No server-side sequence management needed
- Collision probability extremely low with 8-character base-32 format

**Trade-offs:**
- ✅ Simple implementation
- ✅ No server coordination needed
- ✅ Immediate generation (no round-trip)
- ❌ Tiny collision risk (mitigated by retry logic)
- ❌ Not sequential (acceptable - randomness preferred for security)

**Alternative Considered:** Sanity auto-increment field
- Rejected: Sanity doesn't support auto-increment, would need custom API

**Implementation:**
- Character set: A-Z (uppercase) + 2-9 (23 characters)
- Length: 8 characters = 23^8 = ~8 trillion combinations
- Collision check: Query Sanity for existing orderNumber before save
- Retry: Up to 5 attempts, fail with error if all collide

---

### Decision 4: Dynamic Price Synchronization

**Decision:** Always fetch current prices from Sanity at cart load, checkout load, and order creation.

**Reason:**
- Ensures customers pay current prices
- Prevents price manipulation
- Aligns with eCommerce best practices
- Product prices are authoritative in Sanity

**Trade-offs:**
- ✅ Accurate pricing always
- ✅ No stale price issues
- ✅ Server-side truth (Sanity)
- ❌ Additional API calls (acceptable - prices must be current)
- ❌ Cart load slightly slower (mitigated by loading states)

**Alternative Considered:** Lock prices at add-to-cart time
- Rejected: Allows stale prices, pricing errors, doesn't reflect current data

**Implementation:**
- Cart load: Fetch all cart product IDs, merge current prices
- Checkout load: Re-fetch prices, show banner if changed
- Order creation: Final validation, block if changed, require re-confirm

---

### Decision 5: Multi-Point Stock Validation

**Decision:** Validate stock at cart operations, checkout page, and order creation.

**Reason:**
- Prevents overselling
- Handles concurrent purchases
- Provides early feedback to users
- Final validation ensures data integrity

**Trade-offs:**
- ✅ Prevents invalid orders
- ✅ Good UX (early feedback)
- ✅ Race condition protection
- ❌ Multiple validation points (necessary complexity)
- ❌ Slight performance cost (acceptable for correctness)

**Alternative Considered:** Only validate at order creation
- Rejected: Poor UX, user discovers issue too late in flow

**Implementation:**
- Cart load: Fetch stock status, mark unavailable items
- Quantity selector: Limit max to available stock
- Order creation: Final check against Sanity, block if insufficient

---

### Decision 6: GROQ-Based Search

**Decision:** Use Sanity GROQ queries for product search.

**Reason:**
- Built into Sanity client (no additional dependency)
- Supports partial matching with `match` operator
- Can search multiple fields in single query
- Sufficient for Phase 2 requirements

**Trade-offs:**
- ✅ No additional search service needed
- ✅ Works with existing Sanity setup
- ✅ Simple implementation
- ❌ Limited fuzzy matching (typo tolerance out of scope)
- ❌ Relevance scoring basic (acceptable for Phase 2)

**Alternative Considered:** Algolia or ElasticSearch
- Rejected: Adds dependency, complexity, cost; overkill for current scale

**Implementation:**
```
*[_type == "product" && (
  title match $query + "*" ||
  description match $query + "*" ||
  category match $query + "*"
)]
```

---

### Decision 7: Client-Side Form Validation

**Decision:** Implement validation in checkout form component with HTML5 + custom logic.

**Reason:**
- Immediate user feedback
- No server round-trip needed for validation
- Standard HTML5 patterns available
- Custom rules easy to add

**Trade-offs:**
- ✅ Fast feedback
- ✅ Works offline
- ✅ Reduces server load
- ❌ Can be bypassed (acceptable - orders validated server-side in Sanity)
- ❌ Validation logic in client (acceptable for UX-focused validation)

**Alternative Considered:** Server-side validation only
- Rejected: Poor UX, slow feedback, unnecessary network requests

**Implementation:**
- HTML5: `required`, `type="email"`, `pattern` attributes
- Custom: Phone format, ZIP format, name length checks
- Display inline errors near fields
- Disable submit until valid

---

### Decision 8: Single-Page Checkout

**Decision:** Keep checkout as single page with all sections visible.

**Reason:**
- Matches existing implementation
- Simple navigation (no multi-step state)
- User can see entire form at once
- Fewer page loads

**Trade-offs:**
- ✅ Simple implementation
- ✅ No step state management
- ✅ User sees full requirements upfront
- ❌ Longer page (acceptable - standard form length)
- ❌ No progress indicator needed

**Alternative Considered:** Multi-step wizard (billing → payment → review)
- Rejected: Adds complexity, more code, unnecessary for form size

---

### Decision 9: Sanity Order Schema

**Decision:** Create Order document type in Sanity with all order data.

**Reason:**
- Centralized order storage
- Queryable from confirmation page
- Matches existing Sanity architecture
- No separate order database needed

**Trade-offs:**
- ✅ Consistent with CMS approach
- ✅ Easy to query and display
- ✅ Can be managed in Sanity Studio
- ❌ Not a transactional database (acceptable - simple order storage)
- ❌ No automatic inventory decrement (future enhancement)

**Alternative Considered:** Separate order API/database
- Rejected: Adds infrastructure complexity, unnecessary for Phase 2

**Schema Structure:**
- Order number (unique string)
- Timestamp, status, payment status
- Customer info (billing fields)
- Items array (product reference, quantity, price snapshot)
- Totals, currency, notes

---

### Decision 10: Consistent Error Handling Pattern

**Decision:** Standardize error display with inline messages and user-friendly text.

**Reason:**
- Consistent UX across application
- User-friendly (no stack traces)
- Clear next actions
- Maintains application usability

**Trade-offs:**
- ✅ Better UX
- ✅ Consistent patterns
- ✅ Easier maintenance
- ❌ Requires discipline (acceptable - architecture standard)

**Alternative Considered:** Generic error pages
- Rejected: Poor UX, breaks flow, loses context

**Implementation:**
- Try-catch around all async operations
- Display error messages in UI (not console only)
- Provide retry or alternative actions
- Log errors for debugging (console in dev, monitoring service in future)

---

## Security Plan

### Environment Variable Protection

**Approach:** Never hardcode credentials; always use environment variables.

- Remove hardcoded Sanity projectId from shop page
- Use centralized Sanity client from `@/sanity/lib/client`
- Verify all Sanity calls use environment-configured client
- Prefix public variables with `NEXT_PUBLIC_` for client-side access

### Input Validation

**Approach:** Validate all user input at form submission.

- Sanitize form inputs (trim whitespace, validate formats)
- Use HTML5 validation attributes
- Add custom validation for complex rules
- Never trust client-side validation alone

### Price/Stock Integrity

**Approach:** Always validate against Sanity before order creation.

- Fetch current prices immediately before order save
- Check stock availability before order save
- Block order if validation fails
- Display clear error requiring user action

### Client-Side Trust Boundaries

**Approach:** Treat client state as untrusted; validate critical data server-side (Sanity).

- Cart prices are informational only
- Final prices come from Sanity at order time
- Stock checks use Sanity data, not cart data
- Order totals recalculated from Sanity prices

---

## Performance Strategy

### Minimize API Requests

**Approach:** Batch requests and cache where appropriate.

- Fetch cart products in single GROQ query (all IDs at once)
- Reuse fetched product data across components
- Don't re-fetch on every render (use React state)

### Image Optimization

**Approach:** Use Next.js Image component (already in use).

- Automatic image optimization
- Lazy loading by default
- Responsive images
- WebP format where supported

### Reduce Re-Renders

**Approach:** Optimize context usage and component structure.

- Use React.memo for expensive product cards (if needed)
- Avoid unnecessary context updates
- Keep cart context updates minimal

### Debounced Search

**Approach:** 300ms debounce on search input.

- Prevents search on every keystroke
- Reduces API load
- Still feels responsive
- Simple setTimeout implementation

---

## Implementation Responsibilities

### UI Components

**Responsibility:** Rendering and user interactions.

- ProductCard (existing - reuse)
- Cart display components (existing - enhance)
- Checkout form (existing - complete)
- Order confirmation (new)
- Loading indicators (add where missing)
- Error messages (add where missing)

### Business Logic

**Responsibility:** Core operations and rules.

- Cart operations (add, update, remove, persist)
- Price synchronization
- Stock validation
- Order number generation
- Form validation rules
- Search query logic

### API Interactions

**Responsibility:** Communication with Sanity CMS.

- Product queries (fetch by ID, slug, search)
- Order creation mutations
- Order retrieval queries
- Price fetching
- Stock checking
- Use existing Sanity client throughout

### Validation

**Responsibility:** Input checking and business rule enforcement.

- Form field validation (email, phone, ZIP, names)
- Stock availability checks
- Price consistency checks
- Order data completeness
- Unique order number verification

### Utility Functions

**Responsibility:** Reusable helpers.

- Order number generator
- Date/timestamp utilities for cart expiration
- Price formatting
- Debounce implementation
- LocalStorage wrapper with expiration

### Shared State

**Responsibility:** Cross-component data.

- CartContext (existing - enhance with persistence, price sync, stock validation)
- No additional global state needed for Phase 2

---

## Risk Mitigation

### Risk 1: Order Number Collisions

**Risk:** Two users generate same order number simultaneously.

**Mitigation:**
- 8-character base-32 format = 8 trillion combinations (collision extremely unlikely)
- Check Sanity for existing order number before save
- Retry up to 5 times if collision detected
- Show error if all retries fail (edge case, log for monitoring)

---

### Risk 2: Cart Price Desynchronization

**Risk:** User adds product, price changes in Sanity, user checks out with old price.

**Mitigation:**
- Refresh prices at cart load, checkout load, and order creation
- Display price change banner when detected
- Require user acknowledgment if price changed at order time
- Final validation prevents saving incorrect prices

---

### Risk 3: Race Conditions on Stock

**Risk:** Two users checkout last item simultaneously.

**Mitigation:**
- Final stock validation at order creation (last-write-wins)
- Block order if stock insufficient
- Clear error message directing user to update cart
- Accept that occasional stock oversell possible (handled by fulfillment in real system)

---

### Risk 4: localStorage Unavailable

**Risk:** User has disabled localStorage or is in private mode.

**Mitigation:**
- Wrap localStorage operations in try-catch
- Fall back to session-only cart (lost on browser close)
- Log warning but continue functioning
- Display message if persistence unavailable

---

### Risk 5: Sanity API Failures

**Risk:** Sanity service unavailable or request times out.

**Mitigation:**
- Display user-friendly error messages
- Allow retry without losing user data
- Maintain application usability (don't crash)
- Cart data persists locally (not lost on API failure)

---

### Risk 6: Next.js Version Migration Issues

**Risk:** Updating Next.js 9 → 15 exposes breaking changes.

**Mitigation:**
- Test thoroughly after dependency update
- Review Next.js migration guides for 10, 11, 12, 13, 14, 15
- Fix TypeScript errors systematically
- Verify all routes still work
- Test in production build mode before deploying

---

### Risk 7: Form Validation Bypass

**Risk:** Users bypass client validation and submit invalid data.

**Mitigation:**
- Client validation is UX-focused, not security-focused
- Sanity schema validation catches invalid data
- Order creation will fail if required fields missing
- Acceptable risk - poor UX if bypassed but data integrity maintained

---

## Success Metrics

Phase 2 implementation is successful when:

- ✅ All AC-1 through AC-15 acceptance criteria pass
- ✅ No new dependencies added
- ✅ Existing code reused where possible
- ✅ No performance regressions introduced
- ✅ All Phase 1 Critical and High findings resolved
- ✅ Code follows constitution standards
- ✅ Manual testing of all user scenarios succeeds

---

## Next Steps After Plan Approval

1. Update package.json dependencies (resolve CRIT-001)
2. Configure Sanity credentials (resolve CRIT-002)
3. Remove hardcoded credentials from shop page (HIGH-001)
4. Build product detail page with [slug] route (HIGH-002)
5. Fix search page cart functionality (HIGH-003)
6. Enhance CartContext with persistence and validation (MEDIUM-003)
7. Complete checkout flow with order creation (HIGH-004)
8. Build order confirmation page
9. Add loading/empty/error states throughout (MEDIUM-004)
10. Test all acceptance criteria
11. Verify no regressions

---

**End of Technical Plan**
