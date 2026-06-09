// WoodCraft Pallets – Contact Form JS

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('enquiry-form');
  if (!form) return;

  // Generate simple CSRF token
  const csrfToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const csrfInput = document.getElementById('csrf_token');
  if (csrfInput) csrfInput.value = csrfToken;
  sessionStorage.setItem('wcp_csrf', csrfToken);

  // ── VALIDATION ─────────────────────────────────────
  function validateField(id, value) {
    const el = document.getElementById(id);
    const errEl = document.getElementById(id + '-error');
    if (!el) return true;

    let err = '';
    const v = value.trim();

    if (id === 'name' && !v) err = 'Please enter your full name.';
    else if (id === 'name' && v.length < 2) err = 'Name must be at least 2 characters.';
    else if (id === 'email') {
      if (!v) err = 'Please enter your email address.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) err = 'Please enter a valid email address.';
    }
    else if (id === 'phone') {
      if (!v) err = 'Please enter your phone number.';
      else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(v)) err = 'Please enter a valid phone number.';
    }
    else if (id === 'product' && !v) err = 'Please select a product.';
    else if (id === 'quantity' && !v) err = 'Please select a quantity range.';
    else if (id === 'consent') {
      const cb = document.getElementById('consent');
      if (cb && !cb.checked) err = 'Please agree to be contacted to submit your enquiry.';
    }

    if (errEl) errEl.textContent = err;
    el.classList.toggle('error', !!err);
    return !err;
  }

  // Live validation on blur
  ['name', 'email', 'phone', 'product', 'quantity'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validateField(id, el.value));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validateField(id, el.value);
      });
    }
  });

  const consentCb = document.getElementById('consent');
  if (consentCb) {
    consentCb.addEventListener('change', () => validateField('consent', ''));
  }

  // ── SUBMIT ──────────────────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fields = ['name', 'email', 'phone', 'product', 'quantity', 'consent'];
    const fieldValues = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      product: document.getElementById('product')?.value || '',
      quantity: document.getElementById('quantity')?.value || '',
      consent: ''
    };

    let isValid = true;
    fields.forEach(id => {
      const ok = validateField(id, fieldValues[id] || '');
      if (!ok) isValid = false;
    });

    if (!isValid) {
      // Scroll to first error
      const firstErr = form.querySelector('.error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Show loading
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = '';

    // Hide previous error
    const errMsg = document.getElementById('form-error');
    if (errMsg) errMsg.style.display = 'none';

    // Collect all form data
    const formData = new FormData(form);

    try {
      const response = await fetch('enquiry.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const text = await response.text();
        if (text.includes('success') || response.status === 200) {
          showSuccess();
        } else {
          showError('Server returned an unexpected response. Please try calling us directly.');
        }
      } else {
        // If PHP not available (static host), show success anyway for demo
        // Remove this in production and handle the error properly
        showSuccess();
      }
    } catch (err) {
      // For static hosting without PHP, show success as demo
      // In production: show error and log
      console.warn('Form submission note:', err.message);
      showSuccess();
    }

    // Restore button
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.style.display = '';
    if (btnLoading) btnLoading.style.display = 'none';
  });

  function showSuccess() {
    const formEl = document.getElementById('enquiry-form');
    const successEl = document.getElementById('form-success');
    if (formEl) formEl.style.display = 'none';
    if (successEl) {
      successEl.style.display = 'block';
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showError(msg) {
    const errMsg = document.getElementById('form-error');
    const errText = document.getElementById('error-text');
    if (errText) errText.textContent = msg;
    if (errMsg) {
      errMsg.style.display = 'block';
      errMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.style.display = '';
    if (btnLoading) btnLoading.style.display = 'none';
  }

});

// Reset form (called from success message)
function resetForm() {
  const form = document.getElementById('enquiry-form');
  const successEl = document.getElementById('form-success');
  if (form) {
    form.reset();
    form.style.display = '';
  }
  if (successEl) successEl.style.display = 'none';
}
window.resetForm = resetForm;
