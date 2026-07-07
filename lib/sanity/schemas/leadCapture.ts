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
      title: 'Lead Source',
      type: 'string',
      options: {
        list: ['Fit Finder', 'GIFT City Enquiry', 'Contact'].map((value) => ({
          title: value,
          value,
        })),
      },
    }),
    // Fit Finder
    defineField({ name: 'fitObjective', title: 'Fit Finder — Objective', type: 'string' }),
    defineField({ name: 'fitHorizon', title: 'Fit Finder — Horizon', type: 'string' }),
    defineField({ name: 'fitShortlist', title: 'Fit Finder — Shortlist', type: 'string' }),
    // GIFT City enquiry
    defineField({ name: 'giftProduct', title: 'GIFT Product Enquired', type: 'string' }),
    defineField({ name: 'giftDirection', title: 'GIFT Direction', type: 'string' }),
    // Contact form
    defineField({ name: 'interest', title: 'Interest Area', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 4 }),
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
