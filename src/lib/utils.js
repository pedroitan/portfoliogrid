/**
 * Utility functions for the portfolio
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function for combining Tailwind CSS classes
export function cn(...classes) {
  return twMerge(clsx(...classes));
}

// Function to scroll to an element with ID
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
