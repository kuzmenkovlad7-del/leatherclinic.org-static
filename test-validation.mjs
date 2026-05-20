// Tests that the validation guard requires phone (email is optional).
// Run: node test-validation.mjs
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runCase(page, label, fillFn) {
  // Force a full reload by going to blank first, then the target URL
  await page.goto('about:blank');
  await page.goto('http://localhost:5200/#book');

  let requestFired = false;
  const handler = route => { requestFired = true; route.abort(); };
  await page.route('**/api/leatherclinic', handler);

  await fillFn(page);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(400);
  await page.unroute('**/api/leatherclinic', handler);

  const msgEl = await page.$('.form-msg--error');
  const msgText = msgEl ? await msgEl.innerText() : null;

  return { label, requestFired, msgText };
}

async function main() {
  const vite = await createServer({
    root: __dirname,
    server: { port: 5200, strictPort: true },
    logLevel: 'silent',
  });
  await vite.listen();
  console.log('Vite dev server started on http://localhost:5200\n');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const cases = [
    {
      label: 'A — both empty → blocked',
      fill: async (p) => { /* leave all fields empty */ },
      expectBlocked: true,
      expectMsg: 'Please enter your phone number.',
    },
    {
      label: 'B — email only, no phone → blocked',
      fill: async (p) => { await p.fill('#email', 'x@example.com'); },
      expectBlocked: true,
      expectMsg: 'Please enter your phone number.',
    },
    {
      label: 'C — phone only (no email) → allowed',
      fill: async (p) => { await p.fill('#phone', '(843) 555-0199'); },
      expectBlocked: false,
      expectMsg: null,
    },
    {
      label: 'D — phone + email → allowed',
      fill: async (p) => {
        await p.fill('#phone', '(843) 555-0199');
        await p.fill('#email', 'x@example.com');
      },
      expectBlocked: false,
      expectMsg: null,
    },
  ];

  const results = [];
  for (const c of cases) {
    const r = await runCase(page, c.label, c.fill);
    const blocked = !r.requestFired;
    const blockPass = blocked === c.expectBlocked;
    const msgPass = c.expectMsg === null ? true : r.msgText === c.expectMsg;
    results.push({ ...r, expectBlocked: c.expectBlocked, expectMsg: c.expectMsg, pass: blockPass && msgPass });
  }

  await browser.close();
  await vite.close();

  console.log('── Validation Guard Test Results ──────────────────────────');
  let allPass = true;
  for (const r of results) {
    const icon = r.pass ? '✅' : '❌';
    const blockedStr = !r.requestFired ? 'BLOCKED' : 'FIRED  ';
    console.log(`${icon} ${r.label}`);
    console.log(`   request: ${blockedStr}  msg: ${JSON.stringify(r.msgText)}${r.expectMsg !== null ? '  (expected: ' + JSON.stringify(r.expectMsg) + ')' : ''}`);
    if (!r.pass) allPass = false;
  }
  console.log('\n' + (allPass ? '✅ ALL PASSED' : '❌ SOME FAILED'));
  process.exit(allPass ? 0 : 1);
}

main().catch(err => { console.error(err); process.exit(1); });
