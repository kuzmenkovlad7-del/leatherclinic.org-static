import React, { useState, useRef } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function FileUpload({ files, onChange, error, onError }) {
  const ref = useRef(null);

  const label =
    files.length === 0 ? 'No files selected' :
    files.length === 1 ? '1 file selected' :
    `${files.length} files selected`;

  const handleChange = (e) => {
    const picked = Array.from(e.target.files).slice(0, 3);
    const invalid = picked.filter(f => !ALLOWED_TYPES.includes(f.type));
    if (invalid.length > 0) {
      onError(`Unsupported file type: ${invalid.map(f => f.name).join(', ')}. Please upload JPEG, PNG, or WebP images only.`);
      e.target.value = '';
      return;
    }
    onError('');
    onChange(picked);
  };

  return (
    <div className="file-upload-wrap">
      <div className="file-upload">
        <button
          type="button"
          className="file-upload__btn"
          onClick={() => ref.current && ref.current.click()}
        >
          Choose photos
        </button>
        <span className="file-upload__status">{label}</span>
        <input
          ref={ref}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleChange}
          className="file-upload__hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
      {error && <p className="file-upload__error">{error}</p>}
    </div>
  );
}

export default function QuoteForm() {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const zipRef = useRef(null);
  const commentsRef = useRef(null);
  const formRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [status, setStatus] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const fieldsJson = JSON.stringify({
      short_text: { title: 'Name', type: 'short_text', value: nameRef.current?.value ?? '' },
      contactForm_phoneNumber: { title: 'Phone', type: 'phone', value: phoneRef.current?.value ?? '' },
      contactForm_email: { title: 'Email', type: 'email', value: emailRef.current?.value ?? '' },
      '11ce3fc7-015d-4c01-9976-1b6949db3619': { title: 'Zip code', type: 'short_text', value: zipRef.current?.value ?? '' },
      'a5f36c2a-78b4-4f4b-b8f7-c8c81b8b0189': { title: 'Comments', type: 'long_text', value: commentsRef.current?.value ?? '' },
    });

    const fd = new FormData();
    fd.append('time', new Date().toISOString());
    fd.append('page_url', window.location.href);
    fd.append('meta', JSON.stringify({ source: 'react-site', userAgent: navigator.userAgent }));
    fd.append('fields', fieldsJson);
    ['file1', 'file2', 'file3'].forEach((key, i) => {
      if (files[i]) fd.append(key, files[i]);
    });

    try {
      const res = await fetch('/api/leatherclinic', { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      formRef.current?.reset();
      setFiles([]);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="book" className="section section--dark">
      <div className="wrap form-wrap">
        <div className="form-intro">
          <p className="eyebrow">Free Quote</p>
          <h2>Get a Free Quote</h2>
          <p className="form-sub">Send photos and details. We will contact you shortly.</p>
          <div className="form-contact-hint">
            <a href="tel:+18438558272" className="form-hint-link">📞 (843) 855-8272</a>
            <a href="mailto:info@leatherclinic.org" className="form-hint-link">✉️ info@leatherclinic.org</a>
          </div>
        </div>

        <form ref={formRef} className="quote-form" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input ref={nameRef} id="name" type="text" placeholder="Your name" defaultValue="" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number <span className="req">*</span></label>
              <input ref={phoneRef} id="phone" type="tel" placeholder="(843) 000-0000" defaultValue="" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email <span className="req">*</span></label>
              <input ref={emailRef} id="email" type="email" placeholder="you@example.com" defaultValue="" required />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip Code</label>
              <input ref={zipRef} id="zip" type="text" placeholder="27605" defaultValue="" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea ref={commentsRef} id="comments" rows={4} placeholder="Describe what needs to be repaired..." defaultValue="" />
          </div>

          <div className="form-group">
            <label>Upload Photos (up to 3)</label>
            <FileUpload files={files} onChange={setFiles} error={fileError} onError={setFileError} />
            {files.length > 0 && (
              <p className="file-names">{files.map(f => f.name).join(', ')}</p>
            )}
          </div>

          <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Request a Quote'}
          </button>

          {status === 'success' && <p className="form-msg form-msg--success">Sent successfully ✅</p>}
          {status === 'error' && <p className="form-msg form-msg--error">Could not send. Please call or text us.</p>}
        </form>
      </div>
    </section>
  );
}
