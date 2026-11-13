import {readFileSync, writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';

export function renewPolicy(raw, now = Date.now()) {
  assert.ok(Number.isFinite(now), 'Invalid clock');
  assert.ok(raw && typeof raw === 'object' && !Array.isArray(raw), 'Invalid policy');
  assert.deepEqual(Object.keys(raw).sort(), ['android', 'expiresAt', 'ios', 'schema']);
  assert.equal(raw.schema, 1, 'Unsupported schema');
  assert.ok(typeof raw.expiresAt === 'string' && Number.isFinite(Date.parse(raw.expiresAt)), 'Invalid expiry');
  for (const platform of ['android', 'ios']) {
    const row = raw[platform];
    assert.ok(row && typeof row === 'object' && !Array.isArray(row), 'Invalid platform');
    assert.deepEqual(Object.keys(row).sort(), ['enabled', 'minimumVersion']);
    assert.equal(typeof row.enabled, 'boolean', 'Invalid enabled');
    assert.ok(typeof row.minimumVersion === 'string' && /^\d+\.\d+\.\d+$/.test(row.minimumVersion), 'Invalid minimum');
    assert.ok(row.minimumVersion.split('.').map(Number).every(Number.isSafeInteger), 'Unsafe minimum');
  }
  const result = structuredClone(raw);
  if (raw.android.enabled || raw.ios.enabled) {
    result.expiresAt = new Date(now + 6 * 86400000).toISOString();
  }
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  assert.ok(file, 'Policy file required');
  const before = readFileSync(file, 'utf8');
  const raw = JSON.parse(before);
  const result = renewPolicy(raw);
  if (result.expiresAt !== raw.expiresAt) {
    // Preserve all formatting and fields except the single validated expiry value.
    const matches = [...before.matchAll(/"expiresAt"\s*:\s*"([^"\n]*)"/g)];
    assert.equal(matches.length, 1, 'Ambiguous expiry');
    writeFileSync(file, before.replace(matches[0][0], matches[0][0].replace(matches[0][1], result.expiresAt)));
  }
  console.log(JSON.stringify({expiresAt: result.expiresAt, android: result.android, ios: result.ios}));
}
