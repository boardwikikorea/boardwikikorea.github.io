import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {renewPolicy} from './renew-version-policy.mjs';
const policy = () => ({schema:1, expiresAt:'2026-11-18T00:00:00Z', ios:{enabled:false,minimumVersion:'2.0.5'}, android:{enabled:true,minimumVersion:'2.0.5'}});
test('rolls forward six days, preserving enabled/minimum and input', () => {
 const p=policy(), old=structuredClone(p), now=Date.parse('2026-11-13T10:00:00Z'), r=renewPolicy(p,now);
 assert.equal(Date.parse(r.expiresAt)-now,6*86400000); assert.deepEqual(p,old);
 assert.deepEqual({...r,expiresAt:p.expiresAt},p);
});
test('keeps working after November 18 and after a delayed run', () => {
 for(const date of ['2026-11-19','2026-12-01','2027-01-01']) {
  const now=Date.parse(date), r=renewPolicy(policy(),now);
  assert.ok(Date.parse(r.expiresAt)>now && Date.parse(r.expiresAt)<=now+7*86400000);
 }
});
test('does not reactivate disabled platforms or renew fully disabled policy', () => {
 const p=policy();p.android.enabled=false;assert.deepEqual(renewPolicy(p),p);
 const r=renewPolicy(policy());assert.equal(r.ios.enabled,false);assert.equal(r.android.minimumVersion,'2.0.5');
});
test('invalid schemas, flags, versions, expiry and extra fields fail before write', () => {
 for(const p of [null,{}, {...policy(),schema:2},{...policy(),extra:true},{...policy(),expiresAt:'bad'}, {...policy(),android:{enabled:'true',minimumVersion:'2.0.5'}},{...policy(),android:{enabled:true,minimumVersion:'2.5'}},{...policy(),android:{enabled:true,minimumVersion:'9007199254740999.0.0'}}]) assert.throws(()=>renewPolicy(p));
 assert.throws(()=>renewPolicy(policy(),NaN));
});
test('CLI changes only expiry bytes and leaves invalid input intact', () => {
 const dir=mkdtempSync(join(tmpdir(),'obota-policy-test-'));const file=join(dir,'policy.json');
 try {
  const original=JSON.stringify(policy(),null,2)+'\n';writeFileSync(file,original);
  execFileSync(process.execPath,[new URL('./renew-version-policy.mjs',import.meta.url).pathname,file]);
  const next=readFileSync(file,'utf8'), value=JSON.parse(next);
  assert.equal(next.replace(value.expiresAt,policy().expiresAt),original);
  writeFileSync(file,'{"schema":9}');assert.throws(()=>execFileSync(process.execPath,[new URL('./renew-version-policy.mjs',import.meta.url).pathname,file],{stdio:'pipe'}));
  assert.equal(readFileSync(file,'utf8'),'{"schema":9}');
 } finally {rmSync(dir,{recursive:true,force:true});}
});
