import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDisplayTitle(str: string): string {
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

export function getProperUrl(url: string): string {
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
