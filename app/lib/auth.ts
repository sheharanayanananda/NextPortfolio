import * as crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// ─────────────────────────────────────────────
// Secret key — AES-256-GCM needs 32 bytes
// ─────────────────────────────────────────────

function getSecret(): Buffer {
  const raw = process.env.SESSION_SECRET;
  if (raw && raw.length >= 32) {
    return Buffer.from(raw.slice(0, 32), 'utf8');
  }
  // Ephemeral fallback: stable per process instance but not across restarts
  if (!(globalThis as any).__adminSecret) {
    (globalThis as any).__adminSecret = crypto.randomBytes(32);
  }
  return (globalThis as any).__adminSecret as Buffer;
}

// ─────────────────────────────────────────────
// Encrypt / decrypt (AES-256-GCM)
// ─────────────────────────────────────────────

export function encrypt(plaintext: string): string {
  const key = getSecret();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Format: iv(24):tag(32):ciphertext
  return iv.toString('hex') + ':' + tag.toString('hex') + ':' + enc.toString('hex');
}

export function decrypt(token: string): string | null {
  try {
    const [ivHex, tagHex, encHex] = token.split(':');
    if (!ivHex || !tagHex || !encHex) return null;
    const key = getSecret();
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const enc = Buffer.from(encHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return decipher.update(enc).toString('utf8') + decipher.final('utf8');
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Session cookie helpers
// ─────────────────────────────────────────────

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_DAYS = 7;

export interface SessionPayload {
  user: string;
  exp: number;
}

export async function createSession(username: string): Promise<void> {
  const payload: SessionPayload = {
    user: username,
    exp: Date.now() + SESSION_TTL_DAYS * 86400 * 1000,
  };
  const token = encrypt(JSON.stringify(payload));
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 86400,
  });
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const decrypted = decrypt(raw);
  if (!decrypted) return null;
  try {
    const payload: SessionPayload = JSON.parse(decrypted);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────
// Guard — call in admin server components to protect routes
// ─────────────────────────────────────────────

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

// ─────────────────────────────────────────────
// Credential verification
// ─────────────────────────────────────────────

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'admin';
  // Constant-time comparison to prevent timing attacks
  const userMatch = crypto.timingSafeEqual(
    Buffer.from(username.padEnd(64)),
    Buffer.from(expectedUser.padEnd(64))
  );
  const passMatch = crypto.timingSafeEqual(
    Buffer.from(password.padEnd(64)),
    Buffer.from(expectedPass.padEnd(64))
  );
  return userMatch && passMatch;
}
