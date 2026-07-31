import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Gallery pages are statically generated (generateStaticParams), so fetches
  // happen at build time — hit the live API, not a possibly-stale CDN.
  useCdn: false,
})
