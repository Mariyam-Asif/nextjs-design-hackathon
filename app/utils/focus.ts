/**
 * Focus Management Utilities
 *
 * Provides helpers for managing keyboard focus throughout the application.
 * Ensures focus is always visible and moves logically after user actions.
 */

/**
 * Selector for all focusable elements
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement | Document = document): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
}

/**
 * Get the first focusable element within a container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const focusable = getFocusableElements(container);
  return focusable[0] || null;
}

/**
 * Get the next focusable element after the given element
 */
export function getNextFocusable(currentElement: HTMLElement): HTMLElement | null {
  const allFocusable = getFocusableElements();
  const currentIndex = allFocusable.indexOf(currentElement);

  if (currentIndex === -1 || currentIndex === allFocusable.length - 1) {
    return null;
  }

  return allFocusable[currentIndex + 1];
}

/**
 * Get the previous focusable element before the given element
 */
export function getPreviousFocusable(currentElement: HTMLElement): HTMLElement | null {
  const allFocusable = getFocusableElements();
  const currentIndex = allFocusable.indexOf(currentElement);

  if (currentIndex <= 0) {
    return null;
  }

  return allFocusable[currentIndex - 1];
}

/**
 * Move focus to a specific element
 * Returns true if successful, false otherwise
 */
export function moveFocusTo(element: HTMLElement | null): boolean {
  if (!element) return false;

  try {
    element.focus();
    return document.activeElement === element;
  } catch (error) {
    console.warn('Failed to move focus:', error);
    return false;
  }
}

/**
 * Focus the first focusable element in a container
 * Useful for focusing into a new section or modal
 */
export function focusFirstIn(container: HTMLElement): boolean {
  const firstFocusable = getFirstFocusable(container);
  return moveFocusTo(firstFocusable);
}

/**
 * Find the next sibling container and focus its first focusable element
 * Used after removing an item from a list
 */
export function focusNextSiblingContainer(currentContainer: HTMLElement): boolean {
  const nextSibling = currentContainer.nextElementSibling as HTMLElement;

  if (nextSibling) {
    return focusFirstIn(nextSibling);
  }

  return false;
}

/**
 * Find the previous sibling container and focus its first focusable element
 * Used when removing the last item in a list
 */
export function focusPreviousSiblingContainer(currentContainer: HTMLElement): boolean {
  const previousSibling = currentContainer.previousElementSibling as HTMLElement;

  if (previousSibling) {
    return focusFirstIn(previousSibling);
  }

  return false;
}

/**
 * Focus the first element with an error in a form
 * Used after form validation fails
 */
export function focusFirstError(formElement: HTMLElement): boolean {
  // Look for elements with aria-invalid="true" or with error classes
  const errorElements = formElement.querySelectorAll<HTMLElement>(
    '[aria-invalid="true"], .error input, .error textarea, .error select'
  );

  if (errorElements.length > 0) {
    return moveFocusTo(errorElements[0]);
  }

  return false;
}

/**
 * Focus a heading element by its text content or ID
 * Used for focusing "empty cart" heading after last item removed
 */
export function focusHeading(textOrId: string): boolean {
  // Try by ID first
  const byId = document.getElementById(textOrId);
  if (byId) {
    // Make heading focusable temporarily if needed
    if (!byId.hasAttribute('tabindex')) {
      byId.setAttribute('tabindex', '-1');
    }
    return moveFocusTo(byId);
  }

  // Try finding by text content
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const heading = headings.find(h => h.textContent?.trim() === textOrId) as HTMLElement;

  if (heading) {
    if (!heading.hasAttribute('tabindex')) {
      heading.setAttribute('tabindex', '-1');
    }
    return moveFocusTo(heading);
  }

  return false;
}

/**
 * Create a focus trap for modal dialogs
 * Returns cleanup function to remove the trap
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);

  if (focusableElements.length === 0) {
    console.warn('Focus trap created on container with no focusable elements');
    return () => {};
  }

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Focus first element
  moveFocusTo(firstFocusable);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift+Tab - moving backwards
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        moveFocusTo(lastFocusable);
      }
    } else {
      // Tab - moving forwards
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        moveFocusTo(firstFocusable);
      }
    }
  };

  container.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Save the currently focused element and return a function to restore it
 * Used for modal dialogs that need to restore focus after closing
 */
export function saveFocus(): () => void {
  const activeElement = document.activeElement as HTMLElement;

  return () => {
    if (activeElement) {
      moveFocusTo(activeElement);
    }
  };
}
