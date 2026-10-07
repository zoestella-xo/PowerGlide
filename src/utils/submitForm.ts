/**
 * submitForm — sends a form to Netlify Forms.
 *
 * How it works: index.html contains hidden, static copies of each form
 * (service-request, order-request, enquiry). Netlify finds them at build time
 * and creates the inboxes. This function POSTs to "/" with a matching
 * `form-name`, which Netlify routes into the right inbox.
 * Every field sent here MUST also exist in the matching hidden form, or Netlify drops it.
 *
 * In `npm run dev` there is no Netlify to receive the POST, so we skip the
 * network call and log the payload instead. Real submissions only work on a
 * Netlify deployment.
 */
export async function submitForm(formName: string, data: Record<string, string>): Promise<void> {
  if (import.meta.env.DEV) {
    console.info(`[dev] "${formName}" would be sent to Netlify Forms:`, data);
    return;
  }

  const body = new URLSearchParams({ 'form-name': formName, ...data }).toString();
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) {
    // Visible in the browser console (F12) so a failure can be diagnosed, not just reported.
    console.error(
      `[PowerGlide] Form "${formName}" was rejected: HTTP ${response.status} ${response.statusText} (${response.url}). ` +
        (response.status === 404
          ? 'Netlify did not recognise this form — enable form detection in Site configuration → Forms and redeploy.'
          : 'See the Network tab for the response.'),
    );
    throw new Error(`Form submission failed (${response.status})`);
  }
}
