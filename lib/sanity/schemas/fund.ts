import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'fund',
  title: 'Funds',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Fund Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'provider', title: 'Provider', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'PMS', value: 'PMS' },
          { title: 'AIF Cat I', value: 'AIF Cat I' },
          { title: 'AIF Cat II', value: 'AIF Cat II' },
          { title: 'AIF Cat III', value: 'AIF Cat III' },
          { title: 'GIFT City', value: 'GIFT City' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          // PMS
          'Equity', 'Debt', 'Multi Asset',
          // AIF
          'Cat I — VC',
          'Cat II — PE',
          'Cat II — Credit',
          'Cat II — RE & Infra',
          'Cat II — Pre-IPO',
          'Cat III — Long Short',
          // GIFT City
          'Inbound — India',
          'Outbound — Global',
        ].map((value) => ({ title: value, value })),
      },
    }),
    defineField({
      name: 'simpleDescription',
      title: 'Simple Description (12-year-old language)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'proDescription',
      title: 'Pro Description (technical)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'simpleCategoryName',
      title: 'Simple Category Name',
      type: 'string',
      description: 'e.g. "Stock Picking Funds" instead of "PMS Equity"',
    }),
    defineField({
      name: 'fees',
      title: 'Fee Structure',
      type: 'object',
      fields: [
        { name: 'managementFee', title: 'Management Fee (%)', type: 'number' },
        { name: 'performanceFee', title: 'Performance Fee (%)', type: 'number' },
        { name: 'hurdleRate', title: 'Hurdle Rate (%)', type: 'number' },
        { name: 'exitLoad', title: 'Exit Load (%)', type: 'number' },
      ],
    }),
    defineField({
      name: 'returns',
      title: 'Returns (CAGR %)',
      type: 'object',
      fields: [
        { name: 'oneYear', title: '1 Year', type: 'number' },
        { name: 'threeYear', title: '3 Year', type: 'number' },
        { name: 'fiveYear', title: '5 Year', type: 'number' },
        { name: 'sinceInception', title: 'Since Inception', type: 'number' },
      ],
    }),
    defineField({ name: 'minInvestment', title: 'Minimum Investment (₹)', type: 'number' }),
    defineField({ name: 'aum', title: 'AUM (₹ Crore)', type: 'number' }),
    defineField({ name: 'fundManager', title: 'Fund Manager Name', type: 'string' }),
    defineField({ name: 'fundManagerBio', title: 'Fund Manager Bio', type: 'text' }),
    defineField({ name: 'benchmark', title: 'Benchmark Index', type: 'string' }),
    defineField({ name: 'sebiRegistration', title: 'SEBI Registration No.', type: 'string' }),
    defineField({ name: 'inceptionDate', title: 'Inception Date', type: 'date' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Active', 'Closed', 'Upcoming'].map((value) => ({ title: value, value })),
        layout: 'radio',
      },
      initialValue: 'Active',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'provider' },
  },
})
