import type { Answer } from './answers'
import type { Source } from './types'

/**
 * /gift-city cluster (Appendix A, Task A.4). Five question-shaped pages under
 * the GIFT City hub, written from facts already verified elsewhere on the site
 * (the IFSCA thresholds answer, the tax schedule, the corridor guides). No
 * threshold, rate or limit here is new. Where a point turns on a fund's own
 * documents or on the reader's own residence, the page says so and sends them
 * to the right professional rather than guessing.
 *
 * No named products. The named shelf stays behind the eligibility gate.
 */

const IFSCA: Source = { label: 'IFSCA (Fund Management) Regulations, 2025', url: 'https://ifsca.gov.in/Pages/Contents/Fund_Management', issuer: 'IFSCA' }
const ITA_2025: Source = { label: 'India — Income-tax Act, 2025 (in force 1 April 2026)', url: 'https://www.incometaxindia.gov.in/income-tax-act-2025', issuer: 'Government of India' }
const RBI_FI: Source = { label: 'RBI Master Direction — Foreign Investment in India', url: 'https://rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=11200', issuer: 'RBI' }

const PUBLISHED = 'September 2026'
const REVIEWED = 'September 2026'
const base = { published: PUBLISHED, reviewed: REVIEWED, regulatoryAsAt: REVIEWED }

const CONFIRM = 'Confirm the position for your own facts with a chartered accountant in India and, if you are taxed abroad, with a professional in that country. GIFT City rules are fund-specific and residence-specific.'

export const GIFT_CITY: Answer[] = [
  {
    ...base,
    slug: 'eligibility',
    question: 'Who can invest in GIFT City funds?',
    answer:
      'Four classes of investor. A person resident outside India. A non-resident Indian. An Indian company or institution allowed to invest offshore under exchange-control rules. And an individual resident in India, within the annual limit of the liberalised remittance scheme. Each fund then adds its own conditions on top.',
    metaTitle: 'Who Can Invest in GIFT City Funds: Eligibility',
    metaDescription:
      'The four investor classes the IFSCA rules allow into GIFT City funds, where residence changes the answer, and why SEBI accreditation does not carry across.',
    sections: [
      { h: 'Who the rules let in',
        body: ['The IFSCA fund rules list eligible investors directly rather than by exclusion.'],
        points: [
          '<b>A person resident outside India.</b> Foreign nationals and foreign institutions.',
          '<b>A non-resident Indian.</b> Including OCI cardholders resident abroad.',
          '<b>A non-individual resident in India</b> that exchange-control rules allow to invest offshore.',
          '<b>An individual resident in India,</b> to the extent the liberalised remittance scheme allows. That cap is US $250,000 a person a year.',
        ] },
      { h: 'Does residence change what you can buy?',
        body: ['Yes, in two directions.',
               'An NRI investing as a non-resident is not subject to the US $250,000 remittance cap. A resident Indian is. So the same restricted scheme with a US $150,000 minimum is open to a resident only inside their annual allowance, and a second subscription in the same year may not fit.',
               'In the other direction, a resident cannot use the inbound India-strategy funds built for NRIs. Those exist to bring overseas money into Indian strategies. A resident reaches Indian strategies onshore, and uses GIFT City for the outbound, global route.'] },
      { h: 'Does being a US person change it?',
        body: ['Not under Indian law. Under US law it changes everything. Many GIFT funds are offered under a US securities exemption that requires the offering to stay outside the United States, so they decline US persons at onboarding. Those that accept US persons will ask for US tax documentation.',
               'If you hold a US passport, green card or meet the substantial presence test, read the US tax pages before you look at any shelf. A pooled GIFT fund is usually a PFIC for you regardless of how India treats it.'] },
      { h: 'Does SEBI accreditation carry across?',
        body: ['No. IFSCA runs its own accredited investor regime, separate from SEBI\'s. Being accredited under one does not make you accredited under the other. Where a fund offers a lower minimum to accredited investors, it means accreditation under the IFSCA rules.'] },
      { h: 'What the fund adds on top',
        body: ['The rules set who may invest. Each fund then decides whom it will accept, and that is a commercial decision by the house. Country of residence drives it. Two funds with identical structures can give a UK resident two different answers.',
               CONFIRM] },
    ],
    related: [
      { label: 'GIFT City fund minimum investment', href: '/learn/gift-city-minimum-investment' },
      { label: 'How to invest in GIFT City funds', href: '/gift-city/how-to-invest' },
      { label: 'GIFT City for resident Indians', href: '/gift-city/for-resident-indians' },
      { label: 'US tax for NRIs', href: '/us-tax' },
    ],
    sources: [IFSCA, RBI_FI],
    faqs: [
      { q: 'Can an NRI invest in GIFT City funds?', a: 'Yes. Non-resident Indians are one of the four investor classes the IFSCA rules name, and they are not subject to the US $250,000 remittance cap that applies to residents.' },
      { q: 'Can a resident Indian invest in GIFT City?', a: 'Yes, within the liberalised remittance scheme limit of US $250,000 a person a year, and only in the outbound, global funds. The inbound India-strategy funds are built for overseas money.' },
      { q: 'Does SEBI accredited investor status work in GIFT City?', a: 'No. IFSCA has its own accreditation regime. Neither status carries into the other.' },
    ],
  },
  {
    ...base,
    slug: 'how-to-invest',
    question: 'How do you invest in a GIFT City fund?',
    answer:
      'Choose the route first. An NRI subscribes in US dollars from an overseas bank account, with no Indian bank account required. A resident Indian remits through an authorised bank under the liberalised remittance scheme. Both then complete the fund\'s own KYC. The fund, not you, handles most of the Indian tax.',
    metaTitle: 'How to Invest in GIFT City Funds: The Route',
    metaDescription:
      'The account, KYC and money route for an NRI and for a resident Indian investing in a GIFT City fund. What the manager asks for, and how money comes back.',
    sections: [
      { h: 'If you are an NRI or a foreign investor',
        body: ['You are using the inbound route: overseas money into Indian strategies.'],
        points: [
          '<b>No NRE or NRO account.</b> You subscribe in US dollars from the bank account you already hold abroad.',
          '<b>The fund\'s KYC.</b> Passport, proof of overseas address, proof of residence status, and a tax identification number from your country. US persons are asked for US tax documentation.',
          '<b>Subscription.</b> A wire in US dollars to the fund\'s account at GIFT City. Restricted schemes start at US $150,000.',
          '<b>Redemption.</b> Proceeds return in US dollars to the same overseas account. Capital and gains move without the usual repatriation steps.',
        ] },
      { h: 'If you are resident in India',
        body: ['You are using the outbound route: rupees into global funds through GIFT City.'],
        points: [
          '<b>Remit under LRS.</b> Through an authorised dealer bank, within US $250,000 a person a year.',
          '<b>Tax collected at source.</b> The bank collects tax on remittances above ₹10 lakh a year. It is adjustable against your income tax, not a cost.',
          '<b>KYC with the fund.</b> PAN, Indian address proof, and the LRS declaration.',
          '<b>Report it.</b> Foreign assets, including GIFT City fund units, go on Schedule FA of your return every year you hold them.',
        ] },
      { h: 'Who is on the other side?',
        body: ['A GIFT City fund is run by a fund management entity registered with the IFSCA. The onboarding, the KYC and the tax at fund level are its job. What differs between funds is the paperwork and the timeline, not the regulator.'] },
      { h: 'What to have ready before you start',
        body: ['Three things decide whether onboarding takes a week or a quarter.'],
        points: [
          'Which country you are tax-resident in, with evidence. It decides what the fund will ask for and whether it will accept you at all.',
          'Whether you are a US person. Say so at the first conversation, not the last.',
          'The private placement memorandum, read before you sign. The minimum, the lock-in and the redemption terms are in there, not on the factsheet.',
        ] },
      { h: 'What we do not know until we see the fund',
        body: ['Timelines, document lists and cut-off dates are set by each fund management entity and change. We confirm them against the PPM at onboarding rather than print them here. ' + CONFIRM] },
    ],
    related: [
      { label: 'Who can invest in GIFT City funds', href: '/gift-city/eligibility' },
      { label: 'GIFT City fund taxation', href: '/gift-city/taxation' },
      { label: 'NRE vs NRO account', href: '/learn/nre-vs-nro-account' },
      { label: 'NRI repatriation limit', href: '/learn/nri-repatriation-limit' },
    ],
    sources: [IFSCA, RBI_FI, ITA_2025],
    faqs: [
      { q: 'Do I need an NRE or NRO account to invest in GIFT City?', a: 'No. An NRI subscribes in US dollars from an overseas bank account and receives redemptions to the same account.' },
      { q: 'How does a resident Indian invest in a GIFT City fund?', a: 'By remitting through an authorised dealer bank under the liberalised remittance scheme, within US $250,000 a year, then completing the fund\'s KYC.' },
      { q: 'Is tax collected on an LRS remittance?', a: 'Yes, on remittances above ₹10 lakh a year. It is collected by the bank and adjustable against your income tax.' },
    ],
  },
  {
    ...base,
    slug: 'taxation',
    question: 'How are GIFT City funds taxed?',
    answer:
      'At two levels, and the second one decides it. In India, many GIFT City fund structures settle tax inside the fund, so an NRI files nothing in India. Then your own country taxes you on what you receive. India\'s exemption is only worth something if nobody else taxes you. In the UAE that is true. In the US and the UK it is not.',
    metaTitle: 'GIFT City Fund Taxation: India and Abroad',
    metaDescription:
      'How a GIFT City fund is taxed in India, how the investor is taxed at home, and why an Indian exemption can be worth nothing to a US or UK taxpayer.',
    sections: [
      { h: 'How India taxes the fund',
        body: ['GIFT City sits legally inside India but works under its own regulator and its own tax settlement. For many inbound structures, Indian tax is settled at the level of the fund, and the investor receives a post-tax return with no Indian filing.',
               'That treatment is structure-specific. Whether it applies to a given fund depends on how that fund is set up, and the answer is in its private placement memorandum. We do not assume it.'] },
      { h: 'How India taxes a resident investor',
        body: ['A resident holding units of a GIFT City fund, bought under the liberalised remittance scheme, is taxed on the units like any unlisted foreign holding.'],
        points: [
          'Held more than 24 months: long-term capital gains at 12.5%.',
          'Held 24 months or less: taxed at your slab rate.',
          'Foreign dividends: at your slab rate.',
          'Schedule FA reporting every year you hold the units, and tax collected at source on remittances above ₹10 lakh a year, adjustable against your return.',
        ] },
      { h: 'Why the second level decides it',
        body: ['India\'s IFSC exemptions were designed for investors who are taxed nowhere else. If your own country taxes your worldwide income anyway, an Indian exemption removes the foreign tax credit you would otherwise have claimed. The saving passes to your own government, not to you.'],
        points: [
          '<b>UAE.</b> The strongest case. No personal income tax at home, so the Indian exemption is real money.',
          '<b>United States.</b> The weakest. The treaty gives no relief on capital gains, and a pooled GIFT fund is usually a PFIC, taxed at the top marginal rate with an interest charge. The vehicle\'s classification matters more than any exemption.',
          '<b>United Kingdom.</b> Turns on one thing: whether your share class holds HMRC reporting fund status. Without it, your gain on sale is taxed as income at up to 45%, not as a capital gain.',
        ] },
      { h: 'What to ask before you subscribe',
        body: ['Ask how the vehicle is structured, not only what it invests in. For a US taxpayer, whether it is a corporation, a partnership or a trust changes your filing completely. For a UK resident, whether your exact share class is on HMRC\'s list changes your rate by twenty points. Neither is on the factsheet.',
               CONFIRM] },
    ],
    related: [
      { label: 'GIFT City vs Indian mutual fund for NRIs', href: '/learn/gift-city-vs-mutual-fund-for-nri' },
      { label: 'The full tax schedule', href: '/tax' },
      { label: 'US tax for NRIs', href: '/us-tax' },
      { label: 'UK tax for NRIs', href: '/uk-tax' },
    ],
    sources: [ITA_2025, IFSCA],
    faqs: [
      { q: 'Does an NRI pay tax in India on a GIFT City fund?', a: 'For many inbound structures, Indian tax is settled inside the fund and the NRI files nothing in India. It is structure-specific and confirmed against the fund\'s own documents.' },
      { q: 'How is a resident Indian taxed on GIFT City fund units?', a: 'Long-term capital gains at 12.5% after 24 months, slab rate if sooner, dividends at slab, with Schedule FA reporting each year.' },
      { q: 'Is a GIFT City fund tax-free for a US taxpayer?', a: 'No. The US taxes worldwide income and a pooled GIFT fund is usually a PFIC. India\'s exemption does not reduce the US bill.' },
    ],
  },
  {
    ...base,
    slug: 'for-resident-indians',
    question: 'Can a resident Indian invest in GIFT City funds?',
    answer:
      'Yes, on the outbound route. A resident reaches global markets in US dollars through GIFT City under the liberalised remittance scheme, US $250,000 a person a year. The inbound India-strategy funds are not for residents; those exist to bring overseas money into Indian strategies. Residents reach Indian strategies onshore.',
    metaTitle: 'GIFT City Funds for Resident Indians: The Route',
    metaDescription:
      'What a resident Indian can and cannot access in GIFT City, the remittance cap, tax collected at source, and the Schedule FA reporting that follows.',
    sections: [
      { h: 'What a resident can use',
        body: ['The outbound shelf: global funds, dollar assets, themes India does not list, held through a GIFT City wrapper with Indian paperwork. This is a currency and geography decision, not an India-strategy decision.'] },
      { h: 'What a resident cannot use',
        body: ['The inbound funds. Those are India-dedicated strategies built for NRIs and foreign investors, so that overseas money can reach Indian markets in dollars. A resident already has rupee access to the same strategies onshore, through a PMS or an AIF, without the remittance cap.'] },
      { h: 'The limit, and the tax on the way out',
        body: [],
        points: [
          '<b>US $250,000 a person a financial year</b> under the liberalised remittance scheme, across everything you remit, not only fund subscriptions.',
          '<b>Tax collected at source</b> on remittances above ₹10 lakh a year. Collected by the bank, adjustable against your income tax.',
          '<b>The fund minimum still applies.</b> A restricted scheme at US $150,000 uses most of a year\'s allowance in one go.',
        ] },
      { h: 'The reporting that follows',
        body: ['Units in a GIFT City fund are a foreign asset for a resident. They go on Schedule FA of your return every year you hold them, whether or not anything was sold. Gains are taxed at 12.5% after 24 months and at slab if sooner; dividends at slab.'] },
      { h: 'Is it worth it for a resident?',
        body: ['That depends on what you want the money to do. If the job is a dollar hedge and exposure to markets and themes India does not list, GIFT City does it with Indian KYC and no foreign brokerage account. If the job is Indian equity, stay onshore. ' + CONFIRM] },
    ],
    related: [
      { label: 'GIFT City and global USD investing', href: '/learn/gift-city-global-usd' },
      { label: 'GIFT City fund taxation', href: '/gift-city/taxation' },
      { label: 'Who can invest in GIFT City funds', href: '/gift-city/eligibility' },
      { label: 'Which structure fits: the Fit Finder', href: '/fit-finder' },
    ],
    sources: [IFSCA, ITA_2025],
    faqs: [
      { q: 'Can a resident Indian invest in GIFT City mutual funds?', a: 'Yes, in the outbound global funds, under the liberalised remittance scheme within US $250,000 a year. Not in the inbound India-strategy funds, which are for overseas investors.' },
      { q: 'Is there tax collected at source on GIFT City investments by residents?', a: 'Yes, on LRS remittances above ₹10 lakh a year. It is adjustable against your income tax.' },
      { q: 'Do I have to report GIFT City fund units on my return?', a: 'Yes. They are a foreign asset and go on Schedule FA every year you hold them.' },
    ],
  },
  {
    ...base,
    slug: 'funds-list',
    question: 'What funds are available in GIFT City?',
    answer:
      'Two shelves. Inbound: India-dedicated strategies for NRIs and foreign investors, mostly IFSC feeder vehicles into Indian equity, government securities, infrastructure debt, real estate debt and private equity secondaries. Outbound: global funds for resident Indians. Named products sit behind an eligibility gate, because they are private placements.',
    metaTitle: 'GIFT City Funds List: What Is Available',
    metaDescription:
      'The categories of fund available in GIFT City on the inbound and outbound routes, how the shelf is curated, and why named products are not listed publicly.',
    sections: [
      { h: 'The inbound shelf, by category',
        body: ['India-dedicated funds accessible through GIFT City, for NRIs, OCIs and foreign investors, subscribed in US dollars.'],
        points: [
          '<b>Indian equity.</b> The largest group. Mid-cap, small-cap, multi-cap and concentrated mandates, plus a passive Nifty 50 route. Mostly IFSC feeder vehicles into a Category III AIF; a few are Category III AIFs directly.',
          '<b>Fixed income.</b> Indian government securities, infrastructure debt and real estate debt, through Category II AIF feeders.',
          '<b>Unlisted.</b> Private equity secondaries, through a Category II AIF feeder.',
        ] },
      { h: 'The outbound shelf, by role',
        body: ['Global funds for resident Indians under the liberalised remittance scheme, grouped by the job each does in a global sleeve: innovation and growth, diversification and a rupee hedge, and alternatives and absolute return. Domiciles include GIFT City and offshore centres; the domicile of each is shown on the shelf.'] },
      { h: 'What the minimums look like',
        body: ['Most inbound routes start at US $150,000, the IFSCA restricted-scheme floor. Two retail-scheme routes start far lower. Several houses set a materially lower minimum for investors accredited under the IFSCA rules; the shelf marks those and states the figure.'] },
      { h: 'Why the names are not on this page',
        body: ['These are private placements and restricted schemes. Listing them on an open page would be an offer to the public that the structures are not built for, and it would put fund names in front of readers the funds may not accept. So the named shelf sits behind a one-line eligibility declaration and is served only after it.',
               'The curated list is dated, reviewed monthly, and states for each fund the structure, the minimum and whether the house accepts investors from the US, the UK and Canada, as confirmed with each house.'] },
      { h: 'How to read it',
        body: ['Start with where you file your taxes, not with the fund. The same GIFT City fund is treated three different ways in the US, the UK and the UAE. Then read the corridor guide for your country, then the shelf. ' + CONFIRM] },
    ],
    related: [
      { label: 'Inbound shelf: NRIs into India', href: '/gift-city/inbound' },
      { label: 'Outbound shelf: residents going global', href: '/gift-city/outbound' },
      { label: 'Who can invest in GIFT City funds', href: '/gift-city/eligibility' },
      { label: 'IFSCA threshold table', href: '/gift-city/thresholds' },
    ],
    sources: [IFSCA],
    faqs: [
      { q: 'Are there GIFT City mutual funds?', a: 'GIFT City offers retail schemes, restricted schemes and venture capital schemes under the IFSCA rules. Most of the India-strategy routes NRIs use are restricted schemes, structured as feeders into an Indian AIF.' },
      { q: 'Why are the fund names not listed publicly?', a: 'They are private placements and restricted schemes, not public offers. The named shelf is served only after a one-line eligibility declaration.' },
      { q: 'What is the minimum for a GIFT City fund?', a: 'Restricted schemes start at US $150,000. Retail schemes have no per-investor minimum. Some houses set lower minimums for IFSCA-accredited investors.' },
    ],
  },
]

export const giftCityBySlug = (slug: string): Answer | undefined => GIFT_CITY.find((a) => a.slug === slug)
export const GIFT_CITY_SLUGS = GIFT_CITY.map((a) => a.slug)
