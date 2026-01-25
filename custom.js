(function () {
  function pickForm() {
    const forms = Array.from(document.querySelectorAll("form"));
    return forms.find((f) => {
      const hasSubmit = f.querySelector('button[type="submit"], input[type="submit"]');
      const hasEmail = f.querySelector('input[type="email"], input[name*="email" i]');
      return !!hasSubmit && !!hasEmail;
    });
  }

  function setMsg(form, text, ok) {
    let div = form.querySelector(".lc-inline-msg");
    if (!div) {
      div = document.createElement("div");
      div.className = "lc-inline-msg";
      div.style.cssText = "margin-top:14px;padding:12px 14px;border-radius:12px;font-size:14px;font-weight:600;";
      form.appendChild(div);
    }
    div.textContent = text;
    div.style.background = ok ? "rgba(46,204,113,.16)" : "rgba(255,77,79,.15)";
    div.style.color = ok ? "#2ecc71" : "#ff4d4f";
  }

  async function sendToApi(form) {
    const fd = new FormData();

    const name =
      form.querySelector('input[name="name"]')?.value ||
      form.querySelector('input[name*="name" i]')?.value ||
      "";
    const phone =
      form.querySelector('input[type="tel"]')?.value ||
      form.querySelector('input[name*="phone" i]')?.value ||
      "";
    const email =
      form.querySelector('input[type="email"]')?.value ||
      form.querySelector('input[name*="email" i]')?.value ||
      "";
    const zip =
      form.querySelector('input[name*="zip" i]')?.value ||
      form.querySelector('input[name*="postal" i]')?.value ||
      "";
    const comments =
      form.querySelector("textarea")?.value ||
      form.querySelector('textarea[name*="comment" i]')?.value ||
      "";

    fd.append("name", name);
    fd.append("phone", phone);
    fd.append("email", email);
    fd.append("zip", zip);
    fd.append("comments", comments);
    fd.append("page_url", location.href);

    const fileInputs = Array.from(form.querySelectorAll('input[type="file"]'));
    const files = [];
    for (const inp of fileInputs) {
      if (inp.files && inp.files.length) {
        for (const f of Array.from(inp.files)) files.push(f);
      }
    }
    files.slice(0, 3).forEach((f) => fd.append("files", f, f.name));

    const r = await fetch("/api/leatherclinic", { method: "POST", body: fd });
    const j = await r.json().catch(() => null);

    if (!r.ok || !j || j.ok !== true) {
      const err = j?.error || "Send failed";
      const det = j?.detail ? " " + j.detail : "";
      throw new Error(err + det);
    }
    return true;
  }

  function hook() {
    const form = pickForm();
    if (!form) return;
    if (form.dataset.lcHooked === "1") return;
    form.dataset.lcHooked = "1";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      setMsg(form, "Sending...", true);

      try {
        await sendToApi(form);
        setMsg(form, "Sent successfully ✅", true);
        try { form.reset(); } catch (_) {}
      } catch (err) {
        setMsg(form, "Can't send form. Please try again later.", false);
        console.error("[LC FORM ERROR]", err);
      }
      return false;
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hook);
  } else {
    hook();
  }
})();
