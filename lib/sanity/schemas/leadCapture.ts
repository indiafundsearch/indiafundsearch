import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'leadCapture',
  title: 'Lead Captures',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string' }),
    defineField({
      name: 'source',
      title: 'Lead Magnet Source',
      type: 'string',
      options: {
        list: ['Fee X-Ray', 'Diagnostic', 'Scorecard', 'FD Visualiser', 'Translator Pathfinder'].map(
          (value) => ({ title: value, value }),
        ),
      },
    }),
    defineField({ name: 'diagnosticVerdict', title: 'Diagnostic Verdict', type: 'string' }),
    defineField({ name: 'diagnosticScore', title: 'Diagnostic Score', type: 'number' }),
    defineField({
      name: 'feeXRayInputs',
      title: 'Fee X-Ray Inputs',
      type: 'object',
      fields: [
        { name: 'amount', title: 'Investment Amount', type: 'number' },
        { name: 'feeType', title: 'Fee Structure Type', type: 'string' },
        { name: 'expectedReturn', title: 'Expected Return %', type: 'number' },
        { name: 'timeHorizon', title: 'Time Horizon (years)', type: 'number' },
      ],
    }),
    defineField({ name: 'scorecardPMS', title: 'PMS Evaluated (Scorecard)', type: 'string' }),
    defineField({ name: 'investableSurplus', title: 'Investable Surplus Range', type: 'string' }),
    defineField({
      name: 'createdAt',
      title: 'Captured At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  orderings: [
    { title: 'Newest First', name: 'newest', by: [{ field: 'createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'email', subtitle: 'source' },
  },
})
