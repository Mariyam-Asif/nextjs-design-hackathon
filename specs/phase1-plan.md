# Plan — Phase 1: Rapid Assessment

---

## Objective

Conduct a 15-30 minute (up to 40 if needed) rapid assessment of the Next.js eCommerce platform to identify Critical and High severity issues, establish a baseline understanding, and produce an actionable implementation roadmap.

---

## Assessment Philosophy

**Reuse over replacement:** Evaluate what exists rather than proposing rewrites.

**Behavior over implementation:** Focus on observable user-facing issues.

**Speed over perfection:** 15 well-prioritized findings > 100 undifferentiated observations.

**Adapt to reality:** Assess the actual application state, not assumptions.

---

## Technology Stack (Existing)

The assessment will evaluate the existing stack without proposing changes or additions:

- **Framework:** Next.js (App Router architecture)
- **Language:** JavaScript/TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Package Manager:** npm
- **Runtime:** Node.js

**Decision:** Reuse all existing dependencies and tooling.

**Trade-off:** 
- ✅ Preserves working functionality
- ✅ Reduces implementation risk
- ✅ Avoids dependency bloat
- ❌ May inherit technical debt
- ❌ Cannot propose architectural changes during assessment

---

## Assessment Tools

### Browser & DevTools

**Primary browser:** Chrome (latest stable)

**Tools:**
- Chrome DevTools (Network, Console, Elements, Lighthouse)
- Responsive Design Mode for viewport testing

**Decision:** Chrome-only during rapid assessment.

**Trade-off:**
- ✅ Consistent, reproducible results
- ✅ Best developer tooling
- ✅ Fastest assessment workflow
- ❌ May miss browser-specific issues
- ✅ Cross-browser testing deferred to implementation phases

### Automated Testing Tools

**Accessibility:**
- Chrome Lighthouse Accessibility Audit
- axe DevTools browser extension (if available)

**Performance:**
- Chrome Lighthouse Performance Audit
  - Mobile: Default Lighthouse mobile throttling (Slow 4G, mid-tier device, CPU throttling)
  - Desktop: Default Lighthouse desktop configuration

**Decision:** Automated tools only during assessment; no manual screen reader testing except basic NVDA validation if time permits.

**Trade-off:**
- ✅ Fast, repeatable results
- ✅ Catches 70-80% of accessibility issues
- ✅ Provides quantitative performance baseline
- ❌ May miss issues only detectable through manual testing
- ✅ Manual testing deferred to implementation phases

### Code Analysis

**Tools:**
- IDE/editor built-in TypeScript/ESLint checking
- Browser console for runtime errors
- Manual code inspection for obvious issues

**Decision:** High-level code quality scan, not exhaustive review.

**Trade-off:**
- ✅ Identifies major maintainability issues quickly
- ✅ Catches TypeScript/ESLint violations
- ❌ May miss subtle code quality issues
- ✅ Detailed code review happens during implementation

---

## Assessment Methodology

### Phase Sequence (35-40 minutes total)

#### 1. Application Startup (3-5 minutes)

**Steps:**
1. Check project structure and dependencies
2. Review `.env.local` for required variables
3. Run `npm install`
4. Start development server (`npm run dev`)
5. Verify application loads in browser

**Minimal fixes allowed:**
- Install missing dependencies
- Add placeholder environment variables to enable startup
- Fix obvious configuration errors

**Deliverable:** Startup status (Success/Blocked), required environment variables documented

**Trade-off:**
- ✅ Enables runtime testing
- ✅ Self-sufficient assessment
- ❌ Minor configuration changes made (acceptable per constitution)

---

#### 2. Core User Flow Testing (5-8 minutes)

**Priority flows:**
1. Browse products: Home → Shop → Product Detail
2. Add to cart
3. View and modify cart
4. Basic navigation (header, footer, mobile menu)

**Testing method:**
- Manual interaction in Chrome desktop view
- Quick mobile viewport check (375px)
- Observe console for errors
- Monitor Network tab for API calls

**Deliverable:** Flow completion status, blocking issues, console errors

**Trade-off:**
- ✅ Identifies blocking user experience issues
- ✅ Validates core business functionality
- ❌ Not exhaustive (deferred to implementation)

---

#### 3. Page & Feature Inventory (3-5 minutes)

**Method:**
- Navigate through accessible routes
- List all pages/sections
- Note feature status: Working, Partial, Broken, Not Implemented
- Identify obvious missing functionality

**Deliverable:** Page inventory with status for each

**Trade-off:**
- ✅ Provides complete application map
- ✅ Identifies scope gaps
- ❌ Quick observation, not detailed testing per page

---

#### 4. API Integration Verification (3-4 minutes)

**Three-layer verification:**
1. **Sanity CMS:** Verify product data exists in Sanity Studio
2. **API responses:** Check Network tab for API calls and responses
3. **Frontend rendering:** Verify data displays correctly

**What to verify:**
- Products load from Sanity
- Product details display correctly
- Cart operations trigger API calls
- Loading states appear
- Error states are handled

**Deliverable:** API integration status, data flow verification

**Trade-off:**
- ✅ Validates content source → display pipeline
- ✅ Catches data integrity issues early
- ❌ Edge cases (timeouts, malformed data) deferred

---

#### 5. Responsive Behavior Spot-Check (2-3 minutes)

**Viewports to test:**
- Desktop: 1440px
- Mobile: 375px

**Pages to test:**
- Home
- Shop
- Product Detail
- Cart

**What to check:**
- Layout adapts appropriately
- Navigation is usable
- Content is readable
- No horizontal scroll
- Touch targets are adequate (mobile)

**Deliverable:** Major responsive issues documented

**Trade-off:**
- ✅ Catches major layout breaks quickly
- ✅ Tests most common viewports
- ❌ Tablet (768px) and laptop (1024px) deferred to implementation
- ❌ Not pixel-perfect inspection

---

#### 6. Automated Accessibility Scan (3-4 minutes)

**Method:**
1. Run Lighthouse Accessibility audit on:
   - Home page
   - Product detail page
   - Cart page

2. Run axe DevTools (if available) on same pages

3. Basic keyboard navigation test:
   - Tab through navigation
   - Tab through product cards
   - Tab through form controls

**Deliverable:** Critical/High accessibility violations, keyboard navigation issues

**Trade-off:**
- ✅ Automated tools catch majority of WCAG violations
- ✅ Keyboard test catches interaction blockers
- ❌ Full manual NVDA testing deferred
- ❌ Detailed WCAG mapping deferred to implementation

---

#### 7. Performance Baseline (4-5 minutes)

**Method:**
1. Clear cache
2. Run Lighthouse Performance audit (3 runs, report average):
   - Home page (mobile + desktop)
   - Product detail page (mobile + desktop)

**Metrics to record:**
- Overall Performance Score
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Interaction to Next Paint (INP)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)

**Deliverable:** Performance baseline scores, major bottlenecks

**Trade-off:**
- ✅ Establishes quantitative baseline
- ✅ Uses industry-standard metrics
- ✅ Repeatable methodology
- ❌ Only 2 pages tested (others deferred)
- ❌ 3 runs per scenario (not exhaustive statistical analysis)

---

#### 8. Security Quick-Scan (2-3 minutes)

**Method:**
- Inspect client-side code for exposed secrets
- Review Network tab for API keys in requests
- Check `.env.local` vs. hardcoded values
- Review console for security warnings
- Check if sensitive data appears in URLs

**Deliverable:** Security issues documented

**Trade-off:**
- ✅ Catches obvious vulnerabilities
- ✅ Quick manual inspection
- ❌ No penetration testing
- ❌ No automated security scanning tools

---

#### 9. Code Quality Overview (3-4 minutes)

**Method:**
- Check IDE for TypeScript/ESLint errors
- Review browser console for runtime warnings
- Quick scan for:
  - Console.log statements
  - Obvious dead code
  - Obvious code duplication
  - Missing error handling in key areas

**Deliverable:** Major code quality issues documented

**Trade-off:**
- ✅ Identifies significant technical debt
- ✅ Leverages existing tooling
- ❌ Not comprehensive codebase review
- ❌ Detailed refactoring opportunities deferred

---

#### 10. Finding Documentation & Prioritization (5-8 minutes)

**Method:**
1. Group findings by category:
   - Functionality
   - API Integration
   - Accessibility
   - Performance
   - Responsive Design
   - Security
   - Code Quality

2. Assign severity using decision tree:
   - Can user complete task? No → Critical
   - Significantly affects core journey? Yes → High
   - Noticeable but allows completion? Yes → Medium
   - Cosmetic/minor? Yes → Low

3. Document each finding with moderate detail:
   - Issue ID (e.g., FUNC-001, A11Y-002)
   - Severity
   - Category
   - Affected area/page
   - Brief description (2-4 sentences)
   - Observed behavior
   - Why it matters

**Deliverable:** Categorized, prioritized findings list

**Trade-off:**
- ✅ Clear severity-based prioritization
- ✅ Sufficient context for implementation
- ❌ Not exhaustive reproduction steps (added during implementation)
- ✅ Focuses on actionable findings

---

#### 11. Implementation Roadmap Creation (3-4 minutes)

**Method:**
1. Assign findings to phases:
   - **Phase 2:** Critical issues (blocks core functionality)
   - **Phase 3:** High issues (significantly impairs UX)
   - **Phase 4:** Medium/Low issues (refinements)

2. Note dependencies between issues

3. Estimate scope: Small, Medium, Large

**Deliverable:** Phased implementation roadmap

**Trade-off:**
- ✅ Provides clear implementation sequence
- ✅ Enables immediate Phase 2 work
- ❌ Scope estimates are rough (refined during implementation)

---

## Report Structure

### Deliverable Organization

```
audit/
├── 00-executive-summary.md
├── 01-findings-critical.md
├── 02-findings-high.md
├── 03-findings-medium-low.md
└── 04-roadmap.md
```

### Finding Template

```markdown
## [ID]: [Brief Title]

**Severity:** Critical | High | Medium | Low

**Category:** Functionality | API | Accessibility | Performance | Responsive | Security | Code Quality

**Affected Area:** [Page/Component/Section]

**Description:**

[2-4 sentence description of the issue]

**Observed Behavior:**

[What currently happens]

**Expected Behavior:**

[What should happen, per constitution/spec/best practice]

**Why It Matters:**

[User impact, business impact]

**Recommended Phase:** Phase 2 | Phase 3 | Phase 4
```

**Decision:** Multiple markdown files organized by severity.

**Trade-off:**
- ✅ Easy to navigate by priority
- ✅ Critical issues immediately visible
- ✅ Machine-readable for future AI agents
- ✅ Human-readable for project owner
- ❌ Requires consistent formatting discipline

---

## Key Technical Decisions

### Decision 1: Minimal Configuration Fixes

**Approach:** Allow minimal configuration changes to enable testing (add env vars, install deps), but never modify application code.

**Trade-off:**
- ✅ Self-sufficient assessment
- ✅ Enables runtime testing
- ✅ Investigative changes only
- ❌ Slight deviation from "observe only" (acceptable per agreed guidelines)

### Decision 2: Adapt Scope to Reality

**Approach:** If application state differs from assumptions (e.g., skeleton vs. full app), adapt assessment to what exists.

**Trade-off:**
- ✅ Produces useful assessment regardless of current state
- ✅ Avoids "not implemented" spam if app is early-stage
- ❌ May not perfectly match original spec assumptions

### Decision 3: Complete All Checks

**Approach:** Complete all FR-1 through FR-11 even if it takes 35-40 minutes instead of strict 30-minute cutoff.

**Trade-off:**
- ✅ Comprehensive coverage
- ✅ All assessment areas addressed
- ❌ Slightly longer than target (acceptable per agreed guidelines)

### Decision 4: Quality Over Quantity

**Approach:** Target 10-15 well-documented findings rather than 50+ superficial observations.

**Trade-off:**
- ✅ Actionable findings with sufficient context
- ✅ Clear prioritization
- ❌ May not document every minor issue (deferred to implementation)

### Decision 5: Chrome-Only Assessment

**Approach:** Use Chrome exclusively during rapid assessment; defer cross-browser testing to implementation phases.

**Trade-off:**
- ✅ Faster assessment
- ✅ Consistent tooling
- ✅ Best developer tools
- ❌ Browser-specific issues discovered later (acceptable)

### Decision 6: Automated Tools First

**Approach:** Rely on Lighthouse and axe for accessibility/performance; minimal manual testing.

**Trade-off:**
- ✅ Fast, repeatable results
- ✅ Quantitative baselines
- ❌ May miss nuanced issues (discovered during implementation)

---

## Success Criteria

Phase 1 is complete when:

- ✅ Application startup verified (or blocker documented)
- ✅ Core user flows tested (browse, cart, navigation)
- ✅ Page inventory created
- ✅ API integration verified (Sanity → API → Frontend)
- ✅ Responsive behavior spot-checked (desktop + mobile)
- ✅ Automated accessibility scans run
- ✅ Performance baseline established (Lighthouse on home + product)
- ✅ Security quick-scan completed
- ✅ Code quality overview done
- ✅ 10-15 findings documented with moderate detail
- ✅ Findings categorized by severity (Critical/High/Medium/Low)
- ✅ Implementation roadmap created (Phase 2/3/4 assignments)
- ✅ Report delivered in organized format (audit/*.md files)
- ✅ Completed in 15-40 minutes

---

## Out of Scope for Phase 1

This phase **does not**:

- ❌ Fix bugs or implement improvements
- ❌ Refactor code
- ❌ Add new features
- ❌ Optimize performance
- ❌ Remediate accessibility issues
- ❌ Test in multiple browsers
- ❌ Test on real devices
- ❌ Conduct manual screen reader testing
- ❌ Write automated tests
- ❌ Modify Sanity schemas
- ❌ Deploy or configure infrastructure
- ❌ Perform exhaustive code review
- ❌ Provide detailed reproduction steps (added during implementation)

---

## Expected Outcomes

### Immediate Deliverables

1. **Executive Summary** — High-level assessment results, critical findings
2. **Critical Findings Report** — All Critical severity issues
3. **High Findings Report** — All High severity issues
4. **Medium/Low Findings Report** — Remaining issues
5. **Implementation Roadmap** — Phase assignments, dependencies, scope estimates

### Enables Next Steps

- Project owner can make informed prioritization decisions
- Phase 2 implementation can begin immediately
- Critical blockers are known and documented
- Performance baseline established for future comparison
- Accessibility issues identified for remediation
- Security risks flagged for mitigation

---

## Risk Mitigation

### Risk: Application won't start

**Mitigation:** Allow minimal configuration fixes (env vars, deps). If still blocked after 5 minutes, document blocker and continue with static review.

### Risk: Scope significantly different from assumptions

**Mitigation:** Adapt assessment to actual state. Document what exists, not what was expected.

### Risk: Time overrun

**Mitigation:** Prioritize dynamically. If running behind, focus on Critical/High findings. Complete all checks even if it takes 35-40 minutes.

### Risk: Too many findings to document

**Mitigation:** Group similar issues. Focus on patterns rather than individual instances. Target 10-15 well-described findings.

### Risk: Insufficient detail for implementation

**Mitigation:** Use moderate detail template (2-4 sentences). Implementation phases can investigate further as needed.

---

## Alignment with Constitution

This plan aligns with the project constitution:

- ✅ **Reuse existing stack** — No new dependencies proposed
- ✅ **Observe without modification** — Assessment only, no fixes
- ✅ **Security-first** — Security quick-scan included
- ✅ **Accessibility mandatory** — Automated accessibility audit
- ✅ **Performance is a feature** — Performance baseline established
- ✅ **Maintainability focus** — Code quality overview included
- ✅ **Production-ready mindset** — Identifies blockers to production readiness
- ✅ **Behavior-driven** — Focus on observable user-facing issues

---

## Next Steps After Plan Approval

Once this plan is approved:

1. Begin Phase 1 rapid assessment
2. Follow methodology outlined above
3. Document findings using agreed templates
4. Deliver assessment report in `audit/` directory
5. Present roadmap for Phase 2/3/4 implementation
