/**
 * api-guard.js
 * Drop this function into the /api/leatherclinic handler.
 *
 * Call isEmptySubmission(fields) BEFORE forwarding to n8n.
 * If it returns true, respond with 400 and do not call n8n.
 *
 * Usage (pseudo-code, adapt to the actual handler):
 *
 *   const parsed = parseMultipart(req);          // however the handler parses today
 *   if (isEmptySubmission(parsed)) {
 *     res.writeHead(400, {'Content-Type':'application/json'});
 *     res.end(JSON.stringify({ ok: false, error: 'empty_submission' }));
 *     return;
 *   }
 *   // ... existing forward-to-n8n logic unchanged ...
 */

function isEmptySubmission(fields) {
  const phone    = (fields.phone    || '').trim();
  const email    = (fields.email    || '').trim();
  const comments = (fields.comments || '').trim();
  // files: handler may store as fields.file1 / fields.file2 / fields.file3
  // OR as fields.files[] array. Check both conventions.
  const hasFile1 = !!(fields.file1 || fields.file2 || fields.file3);
  const hasFilesArr = Array.isArray(fields.files) ? fields.files.length > 0
                    : !!(fields.files);

  const hasContact = phone || email || comments;
  const hasFile    = hasFile1 || hasFilesArr;

  return !hasContact && !hasFile;
}

module.exports = { isEmptySubmission };
