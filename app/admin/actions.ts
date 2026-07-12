'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession, verifyCredentials, getSession } from '@/app/lib/auth';
import * as fs from 'fs';
import * as path from 'path';

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = (formData.get('username') as string || '').trim();
  const password = (formData.get('password') as string || '').trim();

  if (!username || !password) {
    return { error: 'Please enter both username and password.' };
  }

  const valid = verifyCredentials(username, password);
  if (!valid) {
    return { error: 'Invalid credentials. Please try again.' };
  }

  await createSession(username);
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/admin/login');
}

export async function readLogFileAction(filename: string): Promise<string> {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }

  // Prevent directory traversal
  const safeFilename = path.basename(filename);
  if (!safeFilename.endsWith('.jsonl')) {
    throw new Error('Invalid file extension');
  }

  const logsDir = path.join(process.cwd(), 'data', 'analytics', 'logs');
  const filepath = path.join(logsDir, safeFilename);

  if (!fs.existsSync(filepath)) {
    throw new Error('File not found');
  }

  return fs.readFileSync(filepath, 'utf8');
}
