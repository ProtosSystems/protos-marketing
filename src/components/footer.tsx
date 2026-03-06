import { Button } from './button'
import { Container } from './container'
// Link component no longer used in this footer layout.

const navigation = {
  main: [
    { name: 'Legal', href: '/legal' },
    { name: 'Terms', href: '/legal/terms' },
    { name: 'Privacy', href: '/legal/privacy' },
    { name: 'Data Disclaimer', href: '/legal/data-disclaimer' },
    { name: 'Security', href: '/legal/security' },
  ],
  social: [
    // {
    //   name: 'X',
    //   href: '#',
    //   icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
    //     </svg>
    //   ),
    // },
    // {
    //   name: 'GitHub',
    //   href: '#',
    //   icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path
    //         fillRule="evenodd"
    //         d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   ),
    // },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/protos-sys',
      icon: (props: React.ComponentPropsWithoutRef<'svg'>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.339 10.456H5.667V18H8.339V10.456ZM7.003 6.19A1.552 1.552 0 1 0 7.003 9.294A1.552 1.552 0 0 0 7.003 6.19ZM18.333 13.701C18.333 11.378 17.838 9.592 15.123 9.592C13.818 9.592 12.942 10.308 12.584 10.986H12.546V10.456H9.982V18H12.654V14.266C12.654 13.283 12.84 12.332 14.058 12.332C15.258 12.332 15.276 13.453 15.276 14.329V18H17.949V13.701H18.333Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

function CallToAction() {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        <p className="font-mono text-xs/5 font-normal tracking-widest text-gray-700 uppercase dark:text-[color:var(--color-soft-gray)]">
          Next steps
        </p>
        <p className="mt-6 text-3xl font-normal tracking-tight text-[color:var(--color-primary)] sm:text-5xl dark:text-white">
          Build on a foundation you can trust.
        </p>
      </hgroup>
      <p className="mx-auto mt-6 max-w-md text-sm/6 text-gray-700 dark:text-[color:var(--color-soft-gray)]">
        Arche is available to a limited set of design partners building systems
        where financial correctness is non-negotiable.
      </p>
      <div className="mt-6">
        <Button
          className="w-full sm:w-auto"
          href="https://arche.fi/request-access"
        >
          Request Arche access
        </Button>
      </div>
    </div>
  )
}

// Footer navigation is defined above.

export function Footer() {
  return (
    <footer>
      <div className="relative border-t border-[color:var(--color-mist-300)] bg-gray-100 dark:border-[color:var(--color-mist-700)] dark:bg-[color:var(--color-protos-navy)]">
        <Container>
          <CallToAction />
          <div className="overflow-hidden px-6 pt-0 pb-8 sm:pt-2 sm:pb-12 lg:px-8">
            <nav
              aria-label="Footer"
              className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
            >
              {navigation.main.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex justify-center gap-x-10">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-800 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </a>
              ))}
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-800 dark:text-gray-300">
              &copy; {new Date().getFullYear()} Protos Systems, Inc. All rights
              reserved.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
