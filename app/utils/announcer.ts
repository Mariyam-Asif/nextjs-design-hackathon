/**
 * Global ARIA Live Region Announcer
 *
 * Provides a centralized way to announce dynamic content changes to screen readers.
 * Uses a single global aria-live region to ensure consistent, reliable announcements.
 */

type AnnouncementPriority = 'polite' | 'assertive';

interface QueuedAnnouncement {
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
}

let announcementQueue: QueuedAnnouncement[] = [];
let isProcessing = false;
let lastAnnouncementTime = 0;
const BATCH_WINDOW = 1000; // 1 second window for batching rapid announcements

/**
 * Announce a message to screen readers via ARIA live region
 *
 * @param message - The message to announce
 * @param priority - 'polite' (default) waits for current reading, 'assertive' interrupts
 *
 * @example
 * announce("Item added to cart. Cart now contains 3 items.", "polite");
 * announce("Order submission failed. Please try again.", "assertive");
 */
export function announce(message: string, priority: AnnouncementPriority = 'polite'): void {
  if (!message || typeof window === 'undefined') return;

  const now = Date.now();

  // Check if we should batch this announcement
  if (now - lastAnnouncementTime < BATCH_WINDOW && announcementQueue.length > 0) {
    // Within batch window - queue it
    announcementQueue.push({ message, priority, timestamp: now });
    return;
  }

  // Start new batch or announce immediately
  announcementQueue.push({ message, priority, timestamp: now });

  if (!isProcessing) {
    processQueue();
  }
}

/**
 * Process the announcement queue
 * Batches multiple announcements within the batch window into a single announcement
 */
function processQueue(): void {
  if (announcementQueue.length === 0) {
    isProcessing = false;
    return;
  }

  isProcessing = true;

  // Wait for batch window to collect all rapid announcements
  setTimeout(() => {
    if (announcementQueue.length === 0) {
      isProcessing = false;
      return;
    }

    // Determine priority (assertive takes precedence)
    const hasAssertive = announcementQueue.some(a => a.priority === 'assertive');
    const priority = hasAssertive ? 'assertive' : 'polite';

    // If multiple announcements in queue, combine them
    const messages = announcementQueue.map(a => a.message);
    const combinedMessage = messages.length > 1
      ? messages.join(' ')
      : messages[0];

    // Clear queue
    announcementQueue = [];
    lastAnnouncementTime = Date.now();

    // Perform announcement
    performAnnouncement(combinedMessage, priority);

    // Process any new items that came in during batching
    isProcessing = false;
    if (announcementQueue.length > 0) {
      processQueue();
    }
  }, BATCH_WINDOW);
}

/**
 * Perform the actual announcement by updating the live region
 */
function performAnnouncement(message: string, priority: AnnouncementPriority): void {
  const liveRegionId = priority === 'assertive'
    ? 'aria-live-assertive'
    : 'aria-live-polite';

  let liveRegion = document.getElementById(liveRegionId);

  // Create live region if it doesn't exist
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = liveRegionId;
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  // Update the message
  liveRegion.textContent = message;

  // Clear after announcement (screen reader has already captured it)
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = '';
    }
  }, 1000);
}

/**
 * Clear all pending announcements
 * Useful for cleanup or when navigating away from a page
 */
export function clearAnnouncements(): void {
  announcementQueue = [];
  isProcessing = false;
}
