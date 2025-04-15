/**
 * Utility functions for the portfolio
 */

// Function to scroll to an element with ID
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
