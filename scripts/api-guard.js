/**
 * api-guard.js
 * Drop this function into the /api/leatherclinic handler.
 *
 * Call isMissingPhone(fields) BEFORE forwarding to n8n.
 * If it returns true, respond with 400 and do not call n8n.
 *
 * Usage (pseudo-code, adapt to the actual handler):
 *
 *   const parsed = parseMultipart(req);          // however the handler parses today
 *   if (isMissingPhone(parsed)) {
 *     res.writeHead(400, {'Content-Type':'application/json'});
 *     res.end(JSON.stringify({ ok: false, error: 'missing_phone' }));
 *     return;
 *   }
 *   // ... existing forward-to-n8n logic unchanged ...
 */

function isMissingPhone(fields) {
  // Check flat field first, then fall back to fields JSON value
  const flatPhone = (fields.phone || '').trim();
  if (flatPhone) return false;

  // Try parsing nested fields JSON (contactForm_phoneNumber.value)
  try {
    const parsed = typeof fields.fields === 'string' ? JSON.parse(fields.fields) : fields.fields;
    const jsonPhone = (parsed?.contactForm_phoneNumber?.value || '').trim();
    if (jsonPhone) return false;
  } catch (_) {}

  return true;
}

module.exports = { isMissingPhone };
