'use server';

import { redirect } from 'next/navigation';
import { createSession, deleteSession, verifyCredentials } from '@/app/lib/auth';

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
