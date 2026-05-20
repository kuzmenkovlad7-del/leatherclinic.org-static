# Empty Submission Guard — Server Admin Runbook

## Environment
- Production server: 46.62.234.91
- Live webroot: /var/www/leatherclinic.org/
- React work folder: /var/www/leatherclinic-react/

---

## PART A — custom.js frontend guard

### Step 1: Find and back up custom.js

```bash
TS=$(date +%Y%m%d_%H%M%S)
cp /var/www/leatherclinic.org/custom.js \
   /var/www/leatherclinic.org/custom.js.bak.$TS
echo "Backup: /var/www/leatherclinic.org/custom.js.bak.$TS"
```

### Step 2: Deploy fixed custom.js

Pull the new file from the repo (already at scripts/custom.js.new), or apply
the patch manually. The ONLY change vs the original is these lines added in
sendToApi(), BEFORE fd.append("name", name):

```js
// Guard: phone AND email are both required
if (!phone.trim() || !email.trim()) {
  setMsg(form, "Please enter your phone number and email.", false);
  return;
}
```

Deploy:
```bash
cp /var/www/leatherclinic-react/scripts/custom.js.new \
   /var/www/leatherclinic.org/custom.js
```

### Step 3: Update cache-busting version param in index.html

The live index.html loads:
  <script src="/custom.js?v=20260124213841" defer></script>

Update the version to today's date so browsers get the new file:

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
# Find the Node process serving /api/leatherclinic:
pm2 list 2>/dev/null
pm2 show leatherclinic 2>/dev/null

# Or find by port/process:
ss -tlnp | grep -E '3000|4000|8000|8080'
ps aux | grep node | grep -v grep

# Or find by file content:
grep -rn "leatherclinic\|api.*leatherclinic" /var/www/ /srv/ /opt/ \
     --include="*.js" --include="*.mjs" --include="*.cjs" \
     2>/dev/null | grep -v node_modules | grep -v ".git"
```

### Step 2: Back up the handler

```bash
# Replace <HANDLER_PATH> with the actual path found above
HANDLER_PATH=<HANDLER_PATH>
TS=$(date +%Y%m%d_%H%M%S)
cp "$HANDLER_PATH" "${HANDLER_PATH}.bak.$TS"
echo "Backup: ${HANDLER_PATH}.bak.$TS"
```

### Step 3: Add required-fields guard

Find the section in the handler where it parses the multipart body and BEFORE
it calls the n8n webhook URL, add:

```js
// Required fields guard: phone AND email are both required
const phone = (fields.phone || '').trim();
const email = (fields.email || '').trim();
if (!phone || !email) {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'missing_required_contact' }));
  return;
}
```

The helper module at scripts/api-guard.js can be copied alongside the handler
if you prefer to keep validation isolated.

### Step 4: Restart the handler process

```bash
pm2 restart leatherclinic   # if managed by PM2
# or
systemctl restart leatherclinic-api   # if systemd service
# or whatever process manager is in use
```

---

## TESTS

### Test 1a — Both phone+email empty (expect 400, no n8n execution)

Run from the server itself (bypasses host allowlist):
```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=" -F "email=" -F "zip=" -F "comments=" \
  -F "page_url=http://localhost/test" \
  -F 'fields={"short_text":{"value":""},"contactForm_phoneNumber":{"value":""},"contactForm_email":{"value":""}}'
```
Expected response: `{"ok":false,"error":"missing_required_contact"}`
Expected n8n: NO new execution

### Test 1b — Phone only, no email (expect 400)

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=(843) 555-0100" -F "email=" -F "zip=" -F "comments=" \
  -F "page_url=http://localhost/test" \
  -F 'fields={"contactForm_phoneNumber":{"value":"(843) 555-0100"},"contactForm_email":{"value":""}}'
```
Expected response: `{"ok":false,"error":"missing_required_contact"}`

### Test 1c — Email only, no phone (expect 400)

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=" -F "phone=" -F "email=x@example.com" -F "zip=" -F "comments=" \
  -F "page_url=http://localhost/test" \
  -F 'fields={"contactForm_phoneNumber":{"value":""},"contactForm_email":{"value":"x@example.com"}}'
```
Expected response: `{"ok":false,"error":"missing_required_contact"}`

### Test 2 — Valid submit (expect 200, n8n executes)

⚠️  BEFORE THIS TEST: Disable Telegram nodes in n8n to avoid client notification.
In n8n: open the Leather Clinic workflow → right-click each Telegram node → Disable.

```bash
curl -s -X POST http://localhost:<PORT>/api/leatherclinic \
  -F "name=Server Test" \
  -F "phone=(843) 555-0100" \
  -F "email=servertest@example.com" \
  -F "zip=29577" \
  -F "comments=Empty guard test. Please ignore." \
  -F "page_url=http://localhost/test" \
  -F 'fields={"short_text":{"value":"Server Test"},"contactForm_phoneNumber":{"value":"(843) 555-0100"},"contactForm_email":{"value":"servertest@example.com"}}'
```
Expected response: `{"ok":true}` (or whatever the handler currently returns on success)
Expected n8n: execution visible, all field values non-empty

Re-enable Telegram nodes after confirming n8n received correct values.

### Test 3 — Live browser form validation

1. Open https://leatherclinic.org
2. Scroll to the form
3. Click "Request a quote" without filling any fields
4. Expected: red message "Please enter your phone number and email." appears
5. Expected: no request sent to /api/leatherclinic (check browser Network tab)
6. Fill phone only, submit — same error message, no request sent
7. Fill email only, submit — same error message, no request sent
8. Fill both phone and email, submit — request sent (200 OK)

---

## Rollback

If anything breaks:
```bash
cp /var/www/leatherclinic.org/custom.js.bak.$TS \
   /var/www/leatherclinic.org/custom.js

cp /var/www/leatherclinic.org/index.html.bak.$TS \
   /var/www/leatherclinic.org/index.html

cp "${HANDLER_PATH}.bak.$TS" "$HANDLER_PATH"
pm2 restart leatherclinic   # or systemctl restart
```
