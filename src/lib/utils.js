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

// Convert all-uppercase titles to Title Case, leave mixed-case as-is
export function toDisplayTitle(str) {
  if (!str) return '';
  const trimmed = str.trim();
  const letters = trimmed.replace(/[^a-zA-Z]/g, '');
  if (letters.length > 0 && letters === letters.toUpperCase()) {
    return trimmed.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
  return trimmed;
}

// Normalize video URLs (Vimeo manage links, YouTube short links)
export function getProperUrl(url) {
  if (!url) return url;
  if (url.includes('vimeo.com/manage/videos/')) {
    const parts = url.split('/');
    const id = parts[parts.indexOf('videos') + 1];
    return `https://vimeo.com/${id}`;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/watch?v=${id}`;
  }
  return url;
}
