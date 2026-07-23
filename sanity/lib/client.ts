import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Read-only client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Write-enabled client for mutations (creating orders, contact submissions)
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.NEXT_PUBLIC_SANITY_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Write token from environment
})

