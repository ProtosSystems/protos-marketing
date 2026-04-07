'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Container } from './container'
import { Link } from './link'
import { ThemeToggle } from './theme-toggle'

const links = [
  { href: '/about', label: 'Company' },
  { href: '/blog', label: 'Blog' },
]

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <div key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-normal text-gray-950 bg-blend-multiply data-hover:bg-black/2.5 dark:text-white dark:data-hover:bg-white/10"
          >
            {label}
          </Link>
        </div>
      ))}
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg text-gray-950 data-hover:bg-black/5 dark:text-white dark:data-hover:bg-white/10 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <Container>
        <div className="flex flex-col gap-6 py-4">
          {links.map(({ href, label }, linkIndex) => (
            <motion.div
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.15,
                ease: 'easeInOut',
                rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
              }}
              key={href}
            >
              <Link
                href={href}
                className="text-base font-normal text-gray-950 dark:text-white"
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure
      as="header"
      className="relative bg-gray-100 pt-12 sm:pt-16 dark:bg-[color:var(--color-primary)]"
    >
      <Container>
        <div className="relative flex items-center justify-between">
          <div className="relative flex gap-6">
            <div className="py-3">
              <Link href="/" title="Home">
                <span className="h3 text-2xl font-regular tracking-tight text-[color:var(--color-primary)] dark:text-white">
                  protos systems
                </span>
              </Link>
            </div>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <DesktopNav />
            <ThemeToggle />
            <MobileNavButton />
          </div>
        </div>
      </Container>
      <MobileNav />
    </Disclosure>
  )
}
