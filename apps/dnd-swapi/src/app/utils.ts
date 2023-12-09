export function isControlCharOrSpace(str: string): boolean {
  return str.charCodeAt(0) <= 0x20 && str.charCodeAt(0) !== 0x7f;
}

export function isAlphanumericOrSingleQt(str: string): boolean {
  const charCode = str.charCodeAt(0);
  return (
    (0x40 < charCode && charCode < 0x5B) ||
    (0x60 < charCode && charCode < 0x7B) ||
    (0x30 < charCode && charCode < 0x3A) || charCode === 0x27
  );
}

export function isAlphanumericOrSpace(str: string): boolean {
  const charCode = str.charCodeAt(0);
  return (
    (0x40 < charCode && charCode < 0x5B) ||
    (0x60 < charCode && charCode < 0x7B) ||
    (0x30 < charCode && charCode < 0x3A) || charCode === 0x20
  );
}