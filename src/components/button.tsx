import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from './link'

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-[color:var(--color-primary)] shadow-md',
    'text-base font-medium whitespace-nowrap text-white',
    'data-disabled:bg-[color:var(--color-primary)] data-disabled:opacity-40 data-hover:bg-[color:var(--color-deep-steel-blue)]',
    'dark:bg-[color:var(--color-mist-300)] dark:text-[color:var(--color-mist-950)] dark:data-hover:bg-[color:var(--color-mist-200)]',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(--spacing(2)-1px)]',
    'rounded-full border border-transparent bg-white/70 shadow-md ring-1 ring-[color:var(--color-primary)]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'text-base font-medium whitespace-nowrap text-[color:var(--color-primary)]',
    'data-disabled:bg-white/70 data-disabled:opacity-40 data-hover:bg-white/85',
    'dark:bg-white/12 dark:text-white dark:ring-white/20 dark:data-hover:bg-white/18',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(--spacing(1.5)-1px)]',
    'rounded-lg border border-transparent shadow-sm ring-1 ring-[color:var(--color-primary)]/15',
    'text-sm font-medium whitespace-nowrap text-[color:var(--color-primary)]',
    'data-disabled:bg-transparent data-disabled:opacity-40 data-hover:bg-[color:var(--color-soft-gray)]',
    'dark:text-white dark:ring-white/20 dark:data-hover:bg-white/10',
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (Headless.ButtonProps & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant])

  if (typeof props.href === 'undefined') {
    return <Headless.Button {...props} className={className} />
  }

  return <Link {...props} className={className} />
}
