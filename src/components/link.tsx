import NextLink, { type LinkProps } from 'next/link'

export function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<'a'> & { ref?: React.Ref<HTMLAnchorElement> },
) {
  return <NextLink {...props} />
}
