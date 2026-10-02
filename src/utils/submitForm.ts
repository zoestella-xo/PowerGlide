/**
 * submitForm — sends a form to Netlify Forms.
 *
 * How it works: index.html contains hidden, static copies of each form
 * (service-request, order-request, enquiry). Netlify finds them at build time
 * and creates the inboxes. This function POSTs to "/" with a matching
 * `form-name`, which Netlify routes into the right inbox.
 *
 * In `npm run dev` there is no Netlify to receive the POST, so we skip the
 * network call and log the payload instead. That lets you test the full flow
 * locally. Real submissions only work on a Netlify deployment.
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
  if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
}
