# Constitution — Next.js eCommerce Platform

## Project

Production-ready Next.js eCommerce platform powered by Sanity CMS with secure API integrations, responsive UI, accessible user experience, and maintainable architecture.

---

## Core Principles

- Functionality over appearance. Every feature must work correctly before visual enhancements.
- Simplicity over complexity. Prefer native Next.js, React, JavaScript, HTML, and CSS solutions before introducing abstractions.
- Maintainability over shortcuts. Code should be understandable by a new contributor within minutes.
- Consistency across the entire codebase. Reuse existing patterns before creating new ones.
- Performance is a feature. Every implementation should minimize unnecessary rendering, network requests, and bundle size.
- Accessibility is mandatory, not optional.
- Security must be built into every implementation.
- Production-ready code only. No temporary fixes, hacks, placeholder implementations, or commented-out code.

---

## Development Standards

- Keep the existing technology stack.
- Use Next.js App Router architecture.
- Use React functional components only.
- Use modern JavaScript (ES2023+) best practices.
- Prefer server components unless client-side interactivity is required.
- Keep components modular and reusable.
- Follow DRY (Don't Repeat Yourself).
- Follow SOLID principles where applicable.
- Avoid unnecessary dependencies.
- Propose new libraries instead of installing them automatically.

---

## UI & UX Standards

- Pixel-perfect implementation based on the existing design.
- Fully responsive on mobile, tablet, laptop, and desktop.
- Cross-browser compatibility is required.
- Navigation must remain consistent throughout the application.
- Loading, empty, success, and error states must always exist.
- Forms must provide clear validation and feedback.
- Animations should improve usability, never reduce performance.
- No layout shifts during page loading.

---

## Accessibility Standards

- Meet WCAG 2.2 AA guidelines.
- All pages must be keyboard accessible.
- Proper semantic HTML is required.
- Interactive elements must have accessible labels.
- Images require meaningful alt text.
- Maintain sufficient color contrast.
- Visible keyboard focus indicators are mandatory.
- Use ARIA only when semantic HTML cannot achieve the same result.

---

## API Standards

- APIs are the single source of truth.
- Sanity CMS is the authoritative backend for content.
- Validate all API responses.
- Handle loading, empty, timeout, and failure states gracefully.
- Never assume API responses are complete.
- Prevent duplicate requests whenever possible.
- Keep frontend and backend schemas synchronized.
- Display user-friendly error messages instead of raw exceptions.

---

## Data Integrity

- Product data must accurately reflect Sanity CMS.
- Cart calculations must always be correct.
- Prices, totals, discounts, and quantities must remain synchronized.
- Stock availability must be validated.
- Order data must remain consistent throughout checkout.
- Never silently discard user data.

---

## Environment Configuration

- Store all secrets inside `.env.local`.
- Never hardcode API keys, tokens, secrets, or credentials.
- Environment variables must be validated before use.
- Missing configuration should fail with clear error messages.
- Separate development and production configurations.

---

## Security Standards

- Protect against XSS.
- Protect against CSRF where applicable.
- Prevent injection attacks.
- Never expose secrets to the client.
- Validate and sanitize all user input.
- Validate all server requests.
- Escape rendered content when necessary.
- Use HTTPS-only production configurations.
- Follow the Principle of Least Privilege.
- Avoid exposing unnecessary API data.
- Never trust client-side validation alone.

---

## Performance Standards

- Optimize images using Next.js Image.
- Lazy load non-critical components.
- Reduce unnecessary client-side JavaScript.
- Cache data where appropriate.
- Minimize re-renders.
- Avoid duplicated API requests.
- Optimize Core Web Vitals.
- Prefer static rendering whenever possible.
- Use dynamic rendering only when necessary.

---

## Code Quality

- Every function should have a single responsibility.
- Avoid deeply nested logic.
- Remove dead code immediately.
- Remove unused imports and variables.
- Prefer descriptive names over comments.
- Comments should explain "why," not "what."
- No duplicated business logic.
- No console logs in production code.
- No TypeScript or ESLint warnings.
- No runtime errors.

---

## Error Handling

- Every async operation must handle failures.
- Never crash the application because of one failed request.
- Show meaningful fallback UI.
- Log useful debugging information during development.
- Provide graceful recovery whenever possible.

---

## Testing Expectations

- Verify every user flow after implementation.
- Test responsive layouts.
- Test keyboard navigation.
- Test API failures.
- Test invalid user input.
- Test slow network conditions.
- Test different browsers.
- Test different screen sizes.
- Ensure checkout flow works end-to-end.

---

## Constraints

- Keep the existing project architecture.
- Preserve existing functionality unless intentionally improving it.
- Do not break public APIs.
- Do not modify Sanity schemas unless required.
- Do not introduce breaking changes.
- Keep dependencies minimal.
- Prefer built-in Next.js capabilities.

---

## Definition of Done

- All pages are fully functional.
- All API integrations work correctly.
- Sanity CMS data displays accurately.
- Environment variables are correctly configured.
- Responsive across all major screen sizes.
- Compatible with modern browsers.
- WCAG 2.2 AA accessibility requirements are satisfied.
- No security vulnerabilities introduced.
- No console errors.
- No hydration errors.
- No ESLint warnings.
- No runtime exceptions.
- Performance remains optimized.
- Code follows the established architecture and conventions.
- The application is production-ready.
