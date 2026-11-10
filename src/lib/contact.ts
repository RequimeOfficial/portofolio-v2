import { profile } from '../data/profile';

export interface OutgoingMessage {
  subject: string;
  name?: string;
  email?: string;
  /** Extra key/value pairs included in the message body. */
  fields?: Record<string, string>;
  message: string;
}

/** `sent` = delivered through the form API, `mailto` = handed off to the visitor's email app. */
export type SendResult = 'sent' | 'mailto';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();

export const hasFormBackend = Boolean(WEB3FORMS_KEY);

function buildBody(msg: OutgoingMessage) {
  const lines: string[] = [];
  if (msg.name) lines.push(`Name: ${msg.name}`);
  if (msg.email) lines.push(`Email: ${msg.email}`);
  for (const [key, value] of Object.entries(msg.fields ?? {})) {
    if (value) lines.push(`${key}: ${value}`);
  }
  if (lines.length) lines.push('');
  lines.push(msg.message);
  return lines.join('\n');
}

/**
 * Sends a message to the site owner.
 * With `VITE_WEB3FORMS_KEY` configured it is delivered straight to the inbox;
 * otherwise the visitor's email client opens with everything pre-filled.
 */
export async function sendMessage(msg: OutgoingMessage): Promise<SendResult> {
  if (WEB3FORMS_KEY) {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: msg.subject,
        from_name: msg.name || 'Portfolio visitor',
        email: msg.email,
        message: buildBody(msg),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return 'sent';
  }

  const href =
    `mailto:${profile.email}?subject=${encodeURIComponent(msg.subject)}` +
    `&body=${encodeURIComponent(buildBody(msg))}`;
  window.location.href = href;
  return 'mailto';
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
