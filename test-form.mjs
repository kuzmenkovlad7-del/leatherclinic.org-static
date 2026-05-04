// Playwright test — intercepts /api/leatherclinic, never hits production.
// Run: node test-form.mjs
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  // Start Vite dev server
  const vite = await createServer({
    root: __dirname,
    server: { port: 5199, strictPort: true },
    logLevel: 'silent',
  });
  await vite.listen();
  console.log('Vite dev server started on http://localhost:5199');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let capturedPayload = null;

  // Intercept the webhook request — abort so nothing hits production
  await page.route('**/api/leatherclinic', async (route) => {
    const request = route.request();
    const postData = request.postDataBuffer();

    // Parse multipart boundary to extract the `fields` part
    const contentType = request.headers()['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=([^\s;]+)/);
    const boundary = boundaryMatch ? boundaryMatch[1] : null;

    let fieldsJson = null;
    if (boundary && postData) {
      const body = postData.toString('latin1');
      const parts = body.split('--' + boundary);
      for (const part of parts) {
        const nameMatch = part.match(/Content-Disposition:[^\r\n]*name="fields"/i);
        if (nameMatch) {
          // Value is after the double CRLF header separator
          const valueStart = part.indexOf('\r\n\r\n');
          if (valueStart !== -1) {
            fieldsJson = part.slice(valueStart + 4).replace(/\r\n$/, '');
          }
        }
      }
    }

    capturedPayload = {
      contentType,
      hasFields: fieldsJson !== null,
      fields: fieldsJson ? JSON.parse(fieldsJson) : null,
    };

    // Fulfill with fake 200 — never reaches production
    await route.fulfill({ status: 200, body: 'ok' });
  });

  await page.goto('http://localhost:5199/#book');

  // Fill the form
  await page.fill('#name', 'Website Test');
  await page.fill('#phone', '(843) 555-0199');
  await page.fill('#email', 'test@example.com');
  await page.fill('#zip', '27605');
  await page.fill('#comments', 'Test request. Please ignore.');

  // Submit
  await page.click('button[type="submit"]');

  // Wait for intercepted request to resolve
  await page.waitForTimeout(500);

  await browser.close();
  await vite.close();

  // Report
  if (!capturedPayload) {
    console.error('FAIL: No request was intercepted.');
    process.exit(1);
  }

  console.log('\n── Captured outgoing payload ──────────────────────────────');
  console.log('Content-Type:', capturedPayload.contentType.slice(0, 80));
  console.log('fields part found:', capturedPayload.hasFields);
  console.log('\nfields JSON:');
  console.log(JSON.stringify(capturedPayload.fields, null, 2));

  const f = capturedPayload.fields;
  const checks = [
    ['short_text.value', f?.short_text?.value, 'Website Test'],
    ['contactForm_phoneNumber.value', f?.contactForm_phoneNumber?.value, '(843) 555-0199'],
    ['contactForm_email.value', f?.contactForm_email?.value, 'test@example.com'],
    ['zip.value', f?.['11ce3fc7-015d-4c01-9976-1b6949db3619']?.value, '27605'],
    ['comments.value', f?.['a5f36c2a-78b4-4f4b-b8f7-c8c81b8b0189']?.value, 'Test request. Please ignore.'],
  ];

  console.log('\n── Assertions ─────────────────────────────────────────────');
  let passed = true;
  for (const [label, actual, expected] of checks) {
    const ok = actual === expected;
    console.log(`${ok ? '✅' : '❌'} ${label}: ${JSON.stringify(actual)} ${ok ? '==' : '!='} ${JSON.stringify(expected)}`);
    if (!ok) passed = false;
  }

  console.log('\n' + (passed ? '✅ ALL ASSERTIONS PASSED' : '❌ SOME ASSERTIONS FAILED'));
  process.exit(passed ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
