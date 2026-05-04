import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/** Loose type — Sanity image source covers asset refs, full asset docs, and URLs. */
export type ImageSource =
  | { asset?: { _ref?: string; url?: string } | null; alt?: string }
  | { _ref?: string }
  | string

export function urlFor(source: ImageSource) {
  return builder.image(source as never)
}
