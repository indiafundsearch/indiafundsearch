import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossary Terms',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'simpleDefinition',
      title: 'Simple Definition',
      type: 'text',
      rows: 3,
      description: 'Explain like the reader is 12 years old',
    }),
    defineField({
      name: 'proDefinition',
      title: 'Pro Definition',
      type: 'text',
      rows: 3,
      description: 'Technical, CA-grade precision',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'string',
      description: 'One sentence connecting this term to an investment decision',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Where You Encounter This',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['PMS', 'AIF', 'GIFT City', 'All'].map((value) => ({ title: value, value })),
      },
    }),
    defineField({
      name: 'relatedTerms',
      title: 'Related Terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossaryTerm' }] }],
    }),
  ],
  preview: {
    select: { title: 'term', subtitle: 'whyItMatters' },
  },
})
