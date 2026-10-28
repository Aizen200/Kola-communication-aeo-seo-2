export type TargetParseResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

/**
 * Configuration validation ONLY. No DNS lookup, network request, or SSRF guarantee.
 * A future server transport must independently authorize every destination and hop.
 */
export function parseAuditTarget(input: string): TargetParseResult {
  const value = input.trim();
  if (!value) return { ok: false, error: 'Enter a website address.' };
  if (value.length > 2048) return { ok: false, error: 'Use an address of at most 2,048 characters.' };
  if (/\s|[\u0000-\u001f\u007f]|\\/.test(value)) {
    return { ok: false, error: 'Remove spaces, control characters and backslashes from the address.' };
  }
  if (/^[a-z][a-z\d+.-]*:/i.test(value) && !/^https?:\/\//i.test(value)) {
    return { ok: false, error: 'Use an http:// or https:// website address.' };
  }
  if (value.startsWith('//')) return { ok: false, error: 'Include https:// or enter a domain name.' };

  try {
    const target = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    if (!['http:', 'https:'].includes(target.protocol)) {
      return { ok: false, error: 'Only HTTP and HTTPS addresses are supported.' };
    }
    if (target.username || target.password) return { ok: false, error: 'Remove credentials from the address.' };
    if (target.port) return { ok: false, error: 'Use the standard port for HTTP or HTTPS.' };
    const host = target.hostname;
    if (!host.includes('.') || host.endsWith('.') || host.includes(':') || /^\d+\.\d+\.\d+\.\d+$/.test(host)
      || /(^|\.)(localhost|local|internal)$/.test(host)
      || host.split('.').some((label) => !/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(label))) {
      return { ok: false, error: 'Enter a domain name such as example.com, rather than a local address or IP.' };
    }
    target.hash = '';
    return { ok: true, url: target.href };
  } catch {
    return { ok: false, error: 'Enter a valid website address, such as https://example.com.' };
  }
}
