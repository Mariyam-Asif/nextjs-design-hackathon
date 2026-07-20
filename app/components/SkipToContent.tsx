/**
 * Skip to Main Content Link
 *
 * Accessibility component that allows keyboard users to skip repetitive navigation
 * and jump directly to the main content area.
 *
 * - Hidden by default
 * - Becomes visible when focused (first Tab press)
 * - Links to the main content landmark
 */

'use client';

export default function SkipToContent() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const mainContent = document.getElementById('main-content');

    if (mainContent) {
      // Make main focusable temporarily if needed
      if (!mainContent.hasAttribute('tabindex')) {
        mainContent.setAttribute('tabindex', '-1');
      }

      // Focus the main content
      mainContent.focus();

      // Scroll into view if needed
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="skip-to-content"
    >
      Skip to main content
    </a>
  );
}
