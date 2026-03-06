"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist-200 text-slate-700"
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mist-200 text-slate-700 transition hover:border-mist-300 hover:text-mist-900 dark:border-mist-800 dark:text-slate-300 dark:hover:border-mist-700 dark:hover:text-white"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 18a6 6 0 0 1-5.64-8.12 1 1 0 0 1 1.86.74A4 4 0 0 0 12 16a4 4 0 0 0 3.38-6.15 1 1 0 1 1 1.69-1.06A6 6 0 0 1 12 18Zm0-12a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm0 16a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm9-9h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2ZM5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm12.36-4.36a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0ZM3.82 19.18a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 0 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0Zm14.95 1.41a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41ZM6.64 6.64a1 1 0 0 1-1.41 0L3.82 5.23a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="currentColor"
            d="M21 14.5a1 1 0 0 0-1.35-.94 7 7 0 1 1-9.21-9.21A1 1 0 0 0 9.5 3 9 9 0 1 0 21 14.5Z"
          />
        </svg>
      )}
    </button>
  )
}
