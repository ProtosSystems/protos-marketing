import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Access',
  description: 'Temporary access gate for Protos Systems.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
