# Phone Guard — Server Admin Runbook

## Required behavior
- Phone empty → blocked (400 missing_phone / frontend error)
- Email only, no phone → blocked
- Phone only → allowed
- Phone + email → allowed

## Environment
- Production server: 46.62.234.91
- Live webroot: /var/www/leatherclinic.org/
- React work folder: /var/www/leatherclinic-react/

---

## PART A — custom.js frontend guard

### Step 1: Back up current custom.js

```bash
TS=$(date +%Y%m%d_%H%M%S)
cp /var/www/leatherclinic.org/custom.js \
   /var/www/leatherclinic.org/custom.js.bak.$TS
echo "Backup: /var/www/leatherclinic.org/custom.js.bak.$TS"
```

### Step 2: Deploy fixed custom.js

The new file is at scripts/custom.js.new. Changes vs original:
1. `pickForm()` now detects form by phone input (not email), so it works even if Email field is optional
2. Guard in `sendToApi()` blocks if phone is empty:

```js
// Guard: phone is required
if (!phone.trim()) {
  setMsg(form, "Please enter your phone number.", false);
  return;
}
```

Deploy:
```bash
cp /var/www/leatherclinic-react/scripts/custom.js.new \
   /var/www/leatherclinic.org/custom.js
```

### Step 3: Bump cache-busting version in index.html

```bash
TS=$(date +%Y%m%d_%H%M%S)
cp /var/www/leatherclinic.org/index.html \
   /var/www/leatherclinic.org/index.html.bak.$TS

NEW_V=$(date +%Y%m%d%H%M%S)
sed -i "s|custom\.js?v=[0-9]*|custom.js?v=$NEW_V|g" \
   /var/www/leatherclinic.org/index.html

echo "New version param: $NEW_V"
```

---

## PART B — Server-side /api/leatherclinic guard

### Step 1: Find the handler

```bash
pm2 list 2>/dev/null
pm2 show leatherclinic 2>/dev/null

ss -tlnp | grep -E '3000|4000|8000|8080'
ps aux | grep node | grep -v grep

grep -rn "leatherclinic\|api.*leatherclinic" /var/www/ /srv/ /opt/ \
     --include="*.js" --include="*.mjs" --include="*.cjs" \
     2>/dev/null | grep -v node_modules | grep -v ".git"
```

### Step 2: Back up the handler

```bash
HANDLER_PATH=<HANDLER_PATH>
TS=$(date +%Y%m%d_%H%M%S)
cp "$HANDLER_PATH" "${HANDLER_PATH}.bak.$TS"
echo "Backup: ${HANDLER_PATH}.bak.$TS"
```

### Step 3: Add phone guard

Find the section AFTER multipart body parse, BEFORE n8n forward. Add:

```js
// Phone guard: phone is required
const flatPhone = (fields.phone || '').trim();
let jsonPhone = '';
try {
  const f = typeof fields.fields === 'string' ? JSON.parse(fields.fields) : fields.fields;
  jsonPhone = (f?.contactForm_phoneNumber?.value || '').trim();
} catch (_) {}
const phone = flatPhone || jsonPhone;
if (!phone) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'missing_phone' }));
  return;
}
```

Or copy scripts/api-guard.js alongside the handler and use:

```js
const { isMissingPhone } = require('./api-guard');
// ...after multipart parse...
if (isMissingPhone(fields)) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'missing_phone' }));
  return;
}
```

### Step 4: Restart the handler process

```bash
pm2 restart leatherclinic   # if managed by PM2
# or
systemctl restart leatherclinic-api
```

---

## PART C — n8n workflow

1. Open the Leather Clinic workflow in n8n
2. Add an **IF** node before Telegram nodes:
   - Condition: `{{ $json.phone }}` is not empty (or `{{ $json.contactForm_phoneNumber }}`)
   - True branch → Telegram; False branch → Stop
3. Rename the Set node label **"Submitted (Raleigh time)"** → **"Submitted (Myrtle Beach time)"**
   (timezone stays Eastern — only the label changes)
4. Re-enable Telegram nodes after testing

---

## TESTS

### Test 1 — Empty submit (expect 400 / frontend block)

From server (bypasses host allowlist):
```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=" -F "email=" -F "zip=" -F "comments=" \
  -F "page_url=http://localhost/test" \
  -F 'fields={"short_text":{"value":""},"contactForm_phoneNumber":{"value":""},"contactForm_email":{"value":""}}'
```
Expected: `{"ok":false,"error":"missing_phone"}`
Expected n8n: NO new execution

### Test 2 — Email only, no phone (expect 400)

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=" -F "email=x@example.com" -F "zip=" -F "comments=" \
  -F "page_url=http://localhost/test" \
  -F 'fields={"contactForm_phoneNumber":{"value":""},"contactForm_email":{"value":"x@example.com"}}'
```
Expected: `{"ok":false,"error":"missing_phone"}`

### Test 3 — Phone only (expect 200, n8n executes)

⚠️  BEFORE THIS TEST: Disable Telegram nodes in n8n.
In n8n: open workflow → right-click each Telegram node → Disable.

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=(843) 555-0199" -F "email=" -F "zip=29579" -F "comments=Test request. Please ignore." \
  -F "page_url=http://localhost/test" \
  -F 'fields={"contactForm_phoneNumber":{"value":"(843) 555-0199"},"contactForm_email":{"value":""}}'
```
Expected: `{"ok":true}`
Expected n8n: execution visible, phone = `(843) 555-0199`

Re-enable Telegram nodes after confirming.

### Test 4 — Phone + email (expect 200)

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=Server Test" \
  -F "phone=(843) 555-0199" \
  -F "email=servertest@example.com" \
  -F "zip=29579" \
  -F "comments=Empty guard test. Please ignore." \
  -F "page_url=http://localhost/test" \
  -F 'fields={"short_text":{"value":"Server Test"},"contactForm_phoneNumber":{"value":"(843) 555-0199"},"contactForm_email":{"value":"servertest@example.com"}}'
```
Expected: `{"ok":true}`

### Test 5 — Live browser form

1. Open https://leatherclinic.org
2. Submit with no fields → error "Please enter your phone number." — no request in Network tab
3. Fill email only, submit → same error, no request
4. Fill phone only, submit → request fires (200)
5. Email label shows no asterisk (*) — optional

---

## Rollback

```bash
cp /var/www/leatherclinic.org/custom.js.bak.$TS \
   /var/www/leatherclinic.org/custom.js

cp /var/www/leatherclinic.org/index.html.bak.$TS \
   /var/www/leatherclinic.org/index.html

cp "${HANDLER_PATH}.bak.$TS" "$HANDLER_PATH"
pm2 restart leatherclinic
```
