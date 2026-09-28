export const MAX_CERTIFICATE_NAME_LENGTH = 32;

export function normalizeCertificateName(value: string): string {
  return Array.from(value.trim()).slice(0, MAX_CERTIFICATE_NAME_LENGTH).join("");
}
