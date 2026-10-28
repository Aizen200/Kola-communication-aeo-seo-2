import assert from 'node:assert/strict';
import { test } from 'node:test';
import { authorizeAddresses, isPublicAddress, validateDestination } from '../src/features/audit/server/transport/destination-policy';

for (const address of [
  '127.0.0.1', '0.0.0.0', '10.2.3.4', '172.16.0.1', '192.168.1.1', '169.254.169.254',
  '100.64.0.1', '192.0.0.1', '192.0.2.1', '198.18.0.1', '198.51.100.1', '203.0.113.1',
  '224.0.0.1', '240.0.0.1', '255.255.255.255', '::', '::1', 'fe80::1', 'fc00::1',
  'ff02::1', '::ffff:127.0.0.1', '::ffff:8.8.8.8', '64:ff9b::808:808', '2002:0808:0808::1',
  '2001:db8::1', '2001::1', '3fff::1', 'not-an-address', '127.1', '2130706433', '168.63.129.16', '2606:4700::1%lo0',
]) {
  test(`blocks special-use or invalid address ${address}`, () => assert.equal(isPublicAddress(address), false));
}
test('accepts ordinary public unicast and prefers IPv4 only after checking all answers', () => {
  assert.equal(isPublicAddress('8.8.8.8'), true);
  assert.equal(isPublicAddress('2606:4700:4700::1111'), true);
  assert.equal(authorizeAddresses(['2606:4700:4700::1111', '8.8.8.8']), '8.8.8.8');
  assert.throws(() => authorizeAddresses(['8.8.8.8', '10.0.0.1']), /not an allowed/);
  assert.throws(() => authorizeAddresses([]), /not an allowed/);
});
test('applies URL policy to redirect destinations including encoded IPs', () => {
  for (const url of ['http://2130706433', 'http://[::ffff:7f00:1]', 'file:///etc/passwd', 'https://user:pw@example.com', 'http://example.com:8080', 'http://example.internal']) {
    assert.throws(() => validateDestination(new URL(url)));
  }
  assert.doesNotThrow(() => validateDestination(new URL('https://example.com/a')));
});
