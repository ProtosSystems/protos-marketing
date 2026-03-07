'use client'

import { Button } from '@/components/button'
import { sanitizeNextPath } from '@/lib/access-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

export function AccessForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const nextPath = useMemo(() => {
    return sanitizeNextPath(searchParams.get('next'))
  }, [searchParams])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/access-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          next: nextPath,
        }),
      })

      const data = (await response.json()) as {
        ok: boolean
        error?: string
        redirectTo?: string
      }

      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Unable to sign in.')
        return
      }

      router.replace(sanitizeNextPath(data.redirectTo ?? nextPath))
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-3xl border border-[color:var(--color-soft-gray)] bg-white p-8 shadow-xl dark:border-white/10 dark:bg-[color:var(--color-protos-navy)]">
      <div className="inline-flex items-center">
        <span className="text-2xl tracking-tight text-[color:var(--color-primary)] dark:text-white">
          protos systems
        </span>
      </div>

      <h1 className="mt-8 text-3xl font-medium tracking-tight text-[color:var(--color-primary)] dark:text-white">
        Private Preview Access
      </h1>
      <p className="mt-3 text-sm/6 text-gray-700 dark:text-[color:var(--color-slate-300)]">
        This site is temporarily gated while final updates are completed.
      </p>

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="username"
            className="block text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:border-[color:var(--color-deep-steel-blue)] focus:ring-2 focus:ring-[color:var(--color-deep-steel-blue)]/25 dark:border-white/15 dark:bg-white/5 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm outline-none focus:border-[color:var(--color-deep-steel-blue)] focus:ring-2 focus:ring-[color:var(--color-deep-steel-blue)]/25 dark:border-white/15 dark:bg-white/5 dark:text-white"
          />
        </div>

        {error ? (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200"
          >
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Unlock site'}
        </Button>
      </form>
    </div>
  )
}
