export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function getCurrentPartialWord(text: string): string {
  if (!text || text.endsWith(' ')) return '';
  const parts = text.split(' ');
  return parts[parts.length - 1];
}

export function getLastCompletedWord(text: string): string {
  const trimmed = text.trimEnd();
  if (!trimmed) return '';
  const parts = trimmed.split(' ').filter(Boolean);
  if (text.endsWith(' ')) {
    return parts[parts.length - 1] || '';
  }
  return parts.length >= 2 ? parts[parts.length - 2] : '';
}

export function replacePartialWord(text: string, word: string): string {
  if (!text || text.endsWith(' ')) return text + word + ' ';
  const lastSpace = text.lastIndexOf(' ');
  const prefix = lastSpace === -1 ? '' : text.slice(0, lastSpace + 1);
  return prefix + word + ' ';
}

export function deleteLastWord(text: string): string {
  const trimmed = text.trimEnd();
  if (!trimmed) return '';
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace === -1) return '';
  return trimmed.slice(0, lastSpace + 1);
}
