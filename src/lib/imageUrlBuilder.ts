import {
  createImageUrlBuilder,
  type SanityImageObject,
  type SanityImageSource,
} from "@sanity/image-url"

import { sanityClient } from "./sanity"

const builder = createImageUrlBuilder(sanityClient)

// An image field as stored in Sanity: an asset reference plus the crop and
// hotspot chosen in the Studio. Pass the whole object to urlFor, not the
// asset URL, or the crop and hotspot are ignored
export type SanityImage = SanityImageObject

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
