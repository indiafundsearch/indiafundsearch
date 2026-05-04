'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/lib/sanity/imageUrl'

type Props = { value: unknown[] }

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold leading-snug text-text-primary md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold text-text-primary md:text-2xl">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-l-gold pl-5 text-lg italic text-text-primary">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-base leading-relaxed text-text-primary">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-text-primary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-relaxed text-text-primary">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? '#'
      const external = href.startsWith('http')
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-text-primary underline decoration-gold underline-offset-4 hover:text-gold"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-text-primary underline decoration-gold underline-offset-4 hover:text-gold"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset?._ref
        ? urlFor(value).width(1200).fit('max').auto('format').url()
        : null
      if (!src) return null
      return (
        <figure className="mt-8 overflow-hidden rounded-card border border-card-border">
          <Image
            src={src}
            alt={value?.alt ?? ''}
            width={1200}
            height={750}
            className="h-auto w-full"
          />
          {value?.caption ? (
            <figcaption className="px-4 py-2 text-xs text-text-muted">{value.caption}</figcaption>
          ) : null}
        </figure>
      )
    },
  },
}

export function PortableTextBody({ value }: Props) {
  if (!value || value.length === 0) {
    return (
      <p className="mt-6 text-base text-text-muted">No body content yet.</p>
    )
  }
  // next-sanity's PortableText accepts unknown[]; cast to satisfy the local type.
  return <PortableText value={value as never} components={components} />
}
