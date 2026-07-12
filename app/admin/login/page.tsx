'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from '../actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, undefined);

  return (
    <div className="min-h-screen bg-[var(--bg-warm)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logotype */}
        <div className="text-center mb-10">
          <div className="font-sans-anthropic text-base tracking-[0.2em] font-black uppercase text-[var(--text-charcoal)] mb-1">
            SHEHARA
          </div>
          <div className="font-mono-anthropic text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-light)] rounded-3xl p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="font-serif-anthropic text-2xl font-normal text-[var(--text-charcoal)]">
              Sign In
            </h1>
            <p className="font-sans-anthropic text-xs text-[var(--text-secondary)] leading-relaxed">
              Access is restricted. Enter your credentials to continue.
            </p>
          </div>

          <form action={action} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-username"
                className="block font-sans-anthropic text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
              >
                Username
              </label>
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                required
                disabled={pending}
                className="w-full bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-xl px-4 py-3 font-sans-anthropic text-sm text-[var(--text-charcoal)] placeholder-[var(--color-cloud-medium)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors duration-200 disabled:opacity-50"
                placeholder="Username"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block font-sans-anthropic text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={pending}
                className="w-full bg-[var(--bg-warm)] border border-[var(--border-light)] rounded-xl px-4 py-3 font-sans-anthropic text-sm text-[var(--text-charcoal)] placeholder-[var(--color-cloud-medium)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors duration-200 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {state?.error && (
              <div className="font-sans-anthropic text-xs text-[var(--accent-rust)] bg-[var(--accent-rust)]/8 border border-[var(--accent-rust)]/20 rounded-xl px-4 py-3">
                {state.error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-submit"
              type="submit"
              disabled={pending}
              className="w-full bg-[var(--accent-rust)] hover:bg-[var(--accent-rust-hover)] text-[var(--bg-warm)] font-sans-anthropic font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {pending ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center font-mono-anthropic text-[10px] text-[var(--color-cloud-medium)] mt-6 uppercase tracking-wider">
          Restricted Access · Portfolio Admin
        </p>
      </div>
    </div>
  );
}
