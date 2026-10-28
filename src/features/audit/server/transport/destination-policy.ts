import ipaddr from 'ipaddr.js';
import { Resolver } from 'node:dns/promises';
import { isIP } from 'node:net';
import { AuditError, abortError } from '../errors';

/** Conservative policy: only ordinary global unicast; no transition/mapped ranges. */
export function isPublicAddress(address: string): boolean {
  // Azure platform virtual IP: https://learn.microsoft.com/azure/virtual-network/what-is-ip-address-168-63-129-16
  if (address === '168.63.129.16' || address.includes('%') || !isIP(address) || !ipaddr.isValid(address)) return false;
  const parsed = ipaddr.parse(address);
  if (parsed.range() !== 'unicast') return false;
  if (parsed.kind() === 'ipv6') {
    return parsed.match(ipaddr.parse('2000::'), 3) && !parsed.match(ipaddr.parse('2001::'), 23)
      && !parsed.match(ipaddr.parse('3fff::'), 20);
  }
  return true;
}

export function authorizeAddresses(addresses: string[]): string {
  if (!addresses.length || addresses.some((address) => !isPublicAddress(address))) {
    throw new AuditError('BLOCKED_DESTINATION', 'This destination is not an allowed public website.', 400);
  }
  // IPv4 first avoids selecting IPv6 on hosts without IPv6 egress. No unvalidated fallback.
  return addresses.find((address) => isIP(address) === 4) ?? addresses[0];
}

export function validateDestination(url: URL): void {
  const host = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (url.href.length > 2048 || !['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port
    || host.endsWith('.') || /(^|\.)(localhost|local|internal|home|lan)$/.test(host)) {
    throw new AuditError('BLOCKED_DESTINATION', 'Use a public HTTP or HTTPS website on its standard port.', 400);
  }
  if (isIP(host)) authorizeAddresses([host]);
  else if (!host.includes('.') || host.split('.').some((part) => part.length > 63 || !/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(part))) {
    throw new AuditError('BLOCKED_DESTINATION', 'This hostname is not supported.', 400);
  }
}

export async function resolveAddresses(host: string, signal: AbortSignal): Promise<string[]> {
  if (signal.aborted) throw abortError(signal);
  if (isIP(host)) return [host];
  const resolver = new Resolver({ timeout: 3000, tries: 1 });
  const cancel = () => resolver.cancel();
  signal.addEventListener('abort', cancel, { once: true });
  try {
    const results = await Promise.allSettled([resolver.resolve4(host), resolver.resolve6(host)]);
    if (signal.aborted) throw abortError(signal);
    const addresses: string[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') addresses.push(...result.value);
      else if (!['ENODATA', 'ENOTFOUND'].includes((result.reason as NodeJS.ErrnoException).code ?? '')) {
        throw new AuditError('DNS_FAILED', 'The website DNS lookup failed. Please try again.');
      }
    }
    if (!addresses.length) throw new AuditError('DNS_FAILED', 'The website hostname could not be resolved. Check the address.');
    return addresses;
  } finally {
    signal.removeEventListener('abort', cancel);
  }
}
