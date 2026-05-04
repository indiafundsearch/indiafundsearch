import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './lib/sanity/schemas'
import { apiVersion, dataset, projectId } from './lib/sanity/env'

export default defineConfig({
  name: 'indiafundsearch',
  title: 'IndiaFundSearch CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
