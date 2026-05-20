/**
 * api-guard.js
 * Drop this function into the /api/leatherclinic handler.
 *
 * Call isMissingContact(fields) BEFORE forwarding to n8n.
 * If it returns true, respond with 400 and do not call n8n.
 *
 * Usage (pseudo-code, adapt to the actual handler):
 *
 *   const parsed = parseMultipart(req);          // however the handler parses today
 *   if (isMissingContact(parsed)) {
 *     res.writeHead(400, {'Content-Type':'application/json'});
 *     res.end(JSON.stringify({ ok: false, error: 'missing_required_contact' }));
 *     return;
 *   }
 *   // ... existing forward-to-n8n logic unchanged ...
 */

function isMissingContact(fields) {
  const phone = (fields.phone || '').trim();
  const email = (fields.email || '').trim();
  // phone AND email are both required
  return !phone || !email;
}

module.exports = { isMissingContact };
