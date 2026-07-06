/**
 * GIFT City product — the curated shelf for the promoted section.
 * Managed by the desk in /studio. `direction` splits the two hubs:
 * inbound (overseas capital → Indian strategies) and outbound
 * (resident LRS → global markets).
 */
const giftProduct = {
  name: 'giftProduct',
  title: 'GIFT City Products',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    {
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: { list: ['Inbound — Into India', 'Outbound — Global'] },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'structure',
      title: 'Structure Badge',
      type: 'string',
      description: 'e.g. "GIFT AIF Cat III", "GIFT PMS", "Retail Scheme (IFSCA)"',
    },
    { name: 'manager', title: 'Manager / Issuer', type: 'string' },
    {
      name: 'thesis',
      title: 'One-line Thesis',
      type: 'string',
      description: 'The italic line on the card — what job this product does',
    },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    {
      name: 'minInvestment',
      title: 'Minimum Investment',
      type: 'string',
      description: 'e.g. "US $150,000" — always as displayed text',
    },
    {
      name: 'indicativeReturn',
      title: 'Indicative Return Range',
      type: 'string',
      description: 'e.g. "10–12% p.a. in USD (indicative)" — always mark as indicative',
    },
    { name: 'liquidity', title: 'Liquidity / Lock-in', type: 'string' },
    { name: 'currency', title: 'Currency', type: 'string', initialValue: 'USD' },
    {
      name: 'eligibility',
      title: 'Who Can Invest',
      type: 'string',
      description: 'e.g. "NRIs & foreign investors (not resident Indians)"',
    },
    { name: 'taxNote', title: 'Tax Note', type: 'text', rows: 2 },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['Open', 'Closing Soon', 'Waitlist', 'Closed'] },
      initialValue: 'Open',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'direction' },
  },
}

export default giftProduct
