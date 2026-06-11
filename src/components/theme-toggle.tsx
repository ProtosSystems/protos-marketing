"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

// Cycle: system → dark → light → system
const CYCLE: Record<string, string> = { system: "dark", dark: "light", light: "system" }
const LABELS: Record<string, string> = { system: "Auto (system)", dark: "Dark mode", light: "Light mode" }

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3Zm0 2a7 7 0 0 1 6.93 6H17a5 5 0 0 0-5-5V4.07c0 .01 0 .01 0 0Zm0 0v1.07A5 5 0 0 0 7 11H5.07A7 7 0 0 1 12 5Zm-7 7h1.07A5 5 0 0 0 11 17.93V19A7 7 0 0 1 5 12Zm7 7v-1.07A5 5 0 0 0 17 13h1.93A7 7 0 0 1 12 19Z"
      />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a6 6 0 0 1-5.64-8.12 1 1 0 0 1 1.86.74A4 4 0 0 0 12 16a4 4 0 0 0 3.38-6.15 1 1 0 1 1 1.69-1.06A6 6 0 0 1 12 18Zm0-12a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm0 16a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm9-9h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2ZM5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm12.36-4.36a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0ZM3.82 19.18a1 1 0 0 1 0-1.41l1.41-1.41a1 1 0 0 1 1.41 1.41l-1.41 1.41a1 1 0 0 1-1.41 0Zm14.95 1.41a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41ZM6.64 6.64a1 1 0 0 1-1.41 0L3.82 5.23a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41Z"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 14.5a1 1 0 0 0-1.35-.94 7 7 0 1 1-9.21-9.21A1 1 0 0 0 9.5 3 9 9 0 1 0 21 14.5Z"
      />
    </svg>
  )
}

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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
      />
    )
  }

  const current = theme ?? "system"
  const next = CYCLE[current] ?? "dark"

  return (
    <button
      type="button"
      aria-label={`${LABELS[current]} — click to switch to ${LABELS[next]}`}
      title={`${LABELS[current]} — click for ${LABELS[next]}`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/40 hover:bg-white/10"
      onClick={() => setTheme(next)}
    >
      {current === "dark" ? <SunIcon /> : current === "light" ? <MoonIcon /> : <SystemIcon />}
    </button>
  )
}
