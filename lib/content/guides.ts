/**
 * Long-form guides for the standalone money-keyword routes under /learn/[slug].
 *
 * WHY THIS FILE EXISTS, SEPARATELY FROM `articles.ts`
 * Each of these three articles is published at two URLs: as a panel on /learn,
 * and as its own page. Serving identical copy at both invites Google to
 * consolidate them and pick the hub, whose title targets "fundamentals" rather
 * than "what is PMS", so the page built for the money keyword never gets its
 * shot. `Article.bodyHtml` stays the short answer the accordion shows. This is
 * the deeper page.
 *
 * HOUSE STYLE (set 2026-08-03)
 * The reader is a busy person with money, not a student. Write for someone
 * reading on a phone between meetings.
 *   - Short sentences. One idea each. Aim under 18 words.
 *   - Plain words. "Buy", not "acquire". "Fee", not "cost structure".
 *   - Cut the throat-clearing. No "it is worth noting", no "importantly".
 *   - Prefer a table or a list over a paragraph whenever the content allows.
 *   - Em-dashes sparingly. A full stop is usually better.
 *   - Numbers in Indian terms: lakh, crore, ₹.
 *   - Say the uncomfortable thing plainly. That is the whole brand.
 *
 * EDITORIAL RULES
 * - No Indian income-tax section numbers. The Income-tax Act, 1961 was repealed
 *   with effect from 1 April 2026 and renumbered wholesale; tax rules are
 *   described by what they do.
 * - SEBI regulation numbers ARE cited. That numbering is stable.
 * - Fee structures are market practice, not law, and are labelled as typical.
 * - Verified 2 August 2026 against the SEBI consolidated regulations.
 */

const SEBI_PMS =
  'https://www.sebi.gov.in/legal/regulations/sep-2025/securities-and-exchange-board-of-india-portfolio-managers-regulations-2020-last-amended-on-september-03-2025-_96560.html'
const SEBI_AIF =
  'https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-alternative-investment-funds-regulations-2012-last-amended-on-july-14-2026-_102975.html'

export const GUIDE_HTML: Record<string, string> = {
  // ───────────────────────────────────────────────────────────── what-is-pms
  'what-is-pms': `
<p class="lead">A mutual fund is a restaurant. A PMS is a personal chef.</p>

<h2>What is a PMS?</h2>
<p>A managed account. A SEBI-registered manager buys and sells shares <b>directly in your own demat account</b>. You hold the shares in your name, not units of a pool.</p>
<p>Under <a href="${SEBI_PMS}" target="_blank" rel="noopener noreferrer">Regulation 24(15)</a>, a portfolio manager must not hold your securities in its own name.</p>
<p><b>Discretionary</b>: the manager decides and acts. <b>Non-discretionary</b>: they suggest, you approve. <b>Advisory</b>: they only advise. Almost all PMS money in India is discretionary.</p>

<h2>How is it different from a mutual fund?</h2>
<div class="tablewrap">
<table>
<thead><tr><th>&nbsp;</th><th>Mutual fund</th><th>PMS</th></tr></thead>
<tbody>
<tr><td>You own</td><td>Units of a pool</td><td>The shares, in your demat</td></tr>
<tr><td>Minimum</td><td>A few hundred rupees</td><td>₹50 lakh</td></tr>
<tr><td>Holdings</td><td>50 to 80 stocks</td><td>15 to 30 stocks</td></tr>
<tr><td>You can see</td><td>A monthly factsheet</td><td>Every share, any day</td></tr>
<tr><td>Tax on churn</td><td>Paid inside the fund</td><td>Paid by you, every year</td></tr>
</tbody>
</table>
</div>
<p>Fewer stocks, each one bigger. That is where the extra return can come from, and the extra fall.</p>

<h2>What does a PMS cost?</h2>
<p>Fees are commercial, not regulated. Two shapes are common:</p>
<ul class="pts">
<li><b>Flat fee only.</b> Usually 2 to 2.5% a year.</li>
<li><b>Flat plus profit share.</b> A lower fixed fee, plus a cut of gains above a hurdle.</li>
</ul>
<p>GST, brokerage, custody and audit costs apply to both.</p>
<div class="worked">
<p><b>On ₹50 lakh, for one year.</b></p>
<p><b>Flat 2.5%:</b> you pay <b>₹1,25,000</b>. Good year or bad.</p>
<p><b>1.5% plus 15% above a 10% hurdle:</b> at an 18% return, your gain is ₹9,00,000. The hurdle takes the first ₹5,00,000. Of the remaining ₹4,00,000, the manager takes 15%, or ₹60,000. Add the ₹75,000 fixed fee. You pay <b>₹1,35,000</b>.</p>
<p><b>The crossover is around 16.7%.</b> Below that, the profit-share is cheaper. Above it, the flat fee is.</p>
</div>
<p>So a profit share means you pay less in bad years and more in very good ones.</p>
<p>Ask before you sign:</p>
<ul class="pts">
<li>What is the hurdle?</li>
<li>Is there a <b>high-water mark</b>, so you are not charged twice for recovering the same loss?</li>
<li>Is the profit share charged on gains booked, or gains on paper?</li>
</ul>

<h2>How is a PMS taxed?</h2>
<p>The shares are yours, so every sale the manager makes is your sale, in your return, that year. On listed equity where STT has been paid:</p>
<ul class="pts">
<li><b>Held under a year:</b> 20%</li>
<li><b>Held over a year:</b> 12.5%, with the first ₹1.25 lakh of gains exempt each year</li>
</ul>
<p><b>A manager who trades a lot hands you a tax bill every year, even if you withdraw nothing.</b> Two managers can report the same gross return and leave you with very different money. Ask for portfolio turnover alongside performance. Our <a href="/tax">tax schedule</a> has the rates for every structure.</p>

<h2>Who is a PMS for?</h2>
<p>SEBI sets the floor at <b>₹50 lakh</b> (<a href="${SEBI_PMS}" target="_blank" rel="noopener noreferrer">Regulation 23(2)</a>). Accredited investors are exempt. Three things should also be true:</p>
<ul class="pts">
<li>You will not need this money for three to five years.</li>
<li>You can watch it fall 30 or 40% without selling. At some point it will.</li>
<li>You accept that <b>picking the manager is the whole decision</b>. The gap between the best and worst in the same category is far wider than in mutual funds.</li>
</ul>
<p>If any feels shaky, our <a href="/fit-finder">Fit Finder</a> takes 90 seconds and will tell you when the answer is "not yet".</p>

<h2>What can go wrong?</h2>
<ul class="pts">
<li><b>Concentration cuts both ways.</b> The sizing that wins big also loses big.</li>
<li><b>Key-person risk.</b> You are buying one manager's judgement. They can leave.</li>
<li><b>Churn drag.</b> Turnover you never see turns gross returns into a smaller net number.</li>
<li><b>Hard to compare.</b> There is no single daily NAV, and houses present records differently.</li>
<li><b>Exit means selling.</b> At whatever price the market offers that week.</li>
</ul>

<h2>Questions people ask</h2>
<h3>Is ₹50 lakh per PMS, or across all of them?</h3>
<p>Per manager. Two houses need ₹50 lakh each.</p>
<h3>Can NRIs invest in a PMS?</h3>
<p>Yes. The SEBI rules contain no residency condition. Exchange control, your bank accounts and each house's own policy decide it. Where you pay tax changes the answer a lot, so start with your corridor: <a href="/nri/us">United States</a>, <a href="/nri/uae">UAE</a> or <a href="/nri/uk">United Kingdom</a>.</p>
<h3>Can I control what gets bought?</h3>
<p>You can always see it, in your demat. Control depends on the mandate. Discretionary means the manager acts without asking you each time.</p>
<h3>Is a PMS better than a mutual fund?</h3>
<p>No. It is a different tool: a mutual fund for cheap diversification and daily liquidity, a PMS for concentration and direct ownership at a higher price and minimum. If you cannot say why you want concentration, the mutual fund is the better answer.</p>
<h3>How fast can I get out?</h3>
<p>Most equity mandates have no lock-in, and money usually arrives within days of the shares being sold. Some strategies charge an exit load early on. Read the agreement.</p>

<p>Managed account or pooled fund? See <a href="/learn/pms-vs-aif">PMS versus AIF</a>.</p>
`,

  // ───────────────────────────────────────────────────────────── what-is-aif
  'what-is-aif': `
<p class="lead">If mutual funds are the main hall, an AIF is the VIP room: higher entry, fewer rules.</p>

<h2>What is an AIF?</h2>
<p>A privately pooled fund, registered with SEBI, that invests according to a stated plan. You hold <b>units</b>, not the underlying assets.</p>
<p>An AIF can only raise money by <b>private placement</b>, so it cannot advertise. A scheme is capped at <b>1,000 investors</b>.</p>
<p><a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(a)</a> says an AIF may raise funds from "any investor whether <b>Indian, foreign or non-resident Indians</b>". No nationality or residency bar.</p>

<h2>What are the three categories?</h2>
<div class="tablewrap">
<table>
<thead><tr><th>Category</th><th>What it holds</th><th>Typical shape</th></tr></thead>
<tbody>
<tr><td>Category I</td><td>Where the government wants money to go: venture capital, SMEs, infrastructure, social impact</td><td>Long lock-ins</td></tr>
<tr><td>Category II</td><td>Everything else without much leverage: private equity, private credit, real-estate debt</td><td>The biggest category. 5 to 8 years</td></tr>
<tr><td>Category III</td><td>Trading strategies, and it may borrow: long-short, market-neutral, absolute return</td><td>Often open, with exit windows</td></tr>
</tbody>
</table>
</div>
<p>These are strategy buckets, not risk grades. They are <b>taxed completely differently</b>.</p>

<h2>What does it cost to get in?</h2>
<p>The minimum is <b>₹1 crore</b> (<a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(c)</a>). Staff and directors of the fund can come in at ₹25 lakh. Accredited investors have no minimum.</p>
<p>Usually that ₹1 crore is a <b>promise, not a cheque</b>. Closed-ended funds draw it down over years, as deals appear.</p>
<p>Fees are a management fee, often around 2%, plus <b>carried interest</b>: a share of profits above a hurdle. Check whether the management fee is charged on money committed or money actually invested. In the early years those differ a lot.</p>
<div class="worked">
<p><b>Why "20% over a 10% hurdle" can mean two different things.</b></p>
<p>You commit ₹1 crore. Six years later the fund returns ₹2 crore. Profit: ₹1 crore.</p>
<p><b>No catch-up:</b> the manager takes 20% of the gains above the hurdle only. The hurdle absorbs ₹1.77 crore, leaving ₹22.8 lakh. Carry is about <b>₹4.6 lakh</b>.</p>
<p><b>Full catch-up:</b> once the hurdle is cleared, the manager takes 20% of the <em>whole</em> ₹1 crore. Carry is about <b>₹20 lakh</b>.</p>
<p>Same headline terms. Four times the fee. Ask whether there is a catch-up.</p>
</div>

<h2>How are AIFs taxed?</h2>
<ul class="pts">
<li><b>Category I and II are pass-through.</b> The fund is not taxed on most income. You are, as though you had made the investments yourself, and the income keeps its original character. The fund sends you a statement. Tax is deducted on distributions.</li>
<li><b>Category III is not.</b> Tax is generally settled inside the fund, so what reaches you is already post-tax. The mechanics vary with how the fund is set up, so check yours with your CA.</li>
</ul>
<p>Do not compare a Category II gross return with a Category III post-tax return. Our <a href="/tax">tax schedule</a> lays them out side by side.</p>

<h2>What has the manager got at stake?</h2>
<p><a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(d)</a> requires the manager or sponsor to keep money in the fund: at least <b>2.5% of the corpus or ₹5 crore, whichever is lower</b>. For Category III it is <b>5% or ₹10 crore</b>. It cannot be met by waiving fees.</p>
<p>Ask how much of their own money is in, and whether it is the legal minimum or meaningfully more.</p>

<h2>Who is an AIF for?</h2>
<p>Someone with a working liquid portfolio, adding money they can genuinely forget about.</p>
<p>The test: can you commit ₹1 crore, meet capital calls on someone else's timetable, and not touch it for five to eight years, without that changing a decision you make meanwhile?</p>
<p>If so, the reason to be here is <b>access</b>, not performance. Private credit, pre-IPO and real assets cannot be packaged into a daily-NAV product. If not, wait. The <a href="/fit-finder">Fit Finder</a> will say so.</p>

<h2>What can go wrong?</h2>
<ul class="pts">
<li><b>You commit before you know what is bought.</b> Most closed-ended funds are blind pools.</li>
<li><b>There is no real secondary market.</b> Early exit is hard, and costly when possible at all.</li>
<li><b>Manager dispersion is widest here.</b> Top and bottom quartile are further apart than anywhere listed.</li>
<li><b>Capital calls come on the fund's schedule.</b> Defaulting is expensive.</li>
<li><b>Interim valuations are estimates.</b> A mark is not a price until something is sold.</li>
</ul>

<h2>Questions people ask</h2>
<h3>Do I pay ₹1 crore upfront?</h3>
<p>Usually not. It is drawn down in tranches. Open-ended Category III funds are more likely to take it at once.</p>
<h3>Can NRIs invest in an AIF?</h3>
<p>Yes. The rules expressly allow Indian, foreign and non-resident investors. The work is the exchange-control route, which decides whether your money and gains can go back out, and your own country's tax rules. Start with <a href="/nri/us">the US</a>, <a href="/nri/uae">the UAE</a> or <a href="/nri/uk">the UK</a>.</p>
<h3>What is the difference between Category II and III?</h3>
<p>Category II holds things: private companies, loans, property credit. Category III trades strategies, often listed, and may borrow. They are also taxed differently.</p>
<h3>Are angel funds still ₹25 lakh?</h3>
<p>No. Since September 2025 they raise only from accredited investors, and no minimum applies.</p>
<h3>Is an AIF riskier than a PMS?</h3>
<p>Different, not simply more. A PMS carries market risk in shares you can sell any day. An AIF often carries illiquidity risk in assets you cannot sell for years. Which is riskier depends on whether you need the money.</p>

<p>See <a href="/learn/pms-vs-aif">PMS versus AIF</a> side by side.</p>
`,

  // ──────────────────────────────────────────────────────────── pms-vs-aif
  'pms-vs-aif': `
<p class="lead">One puts shares in your name. The other puts your money in a pool.</p>

<h2>The one-line difference</h2>
<p>In a <b>PMS</b>, a manager buys shares in <b>your own demat account</b>. You own them. In an <b>AIF</b>, you buy <b>units of a fund</b>. The fund owns the assets.</p>
<p>That decides who pays tax and when, what the manager can buy, how fast you can leave, and what you see.</p>

<h2>Side by side</h2>
<div class="tablewrap">
<table>
<thead><tr><th>&nbsp;</th><th>PMS</th><th>AIF</th></tr></thead>
<tbody>
<tr><td>You own</td><td>The shares, in your name</td><td>Units of a fund</td></tr>
<tr><td>Minimum</td><td>₹50 lakh</td><td>₹1 crore</td></tr>
<tr><td>You pay</td><td>Upfront</td><td>Committed, then drawn down</td></tr>
<tr><td>It can hold</td><td>Mostly listed shares</td><td>Unlisted equity, private credit, property debt, derivatives</td></tr>
<tr><td>Borrowing</td><td>No</td><td>Category III may</td></tr>
<tr><td>You can see</td><td>Every share, any day</td><td>A NAV and a report</td></tr>
<tr><td>Getting out</td><td>Usually days</td><td>Years. Weak secondary market</td></tr>
<tr><td>Tax</td><td>You report, every year</td><td>Depends on the category</td></tr>
</tbody>
</table>
</div>

<h2>Ownership: your demat, or the fund's books</h2>
<p>SEBI says a portfolio manager must not hold your securities in its own name, and must keep each client separate.</p>
<p>An AIF pools deliberately. Pooling lets a fund write a ₹40 crore cheque into a private company and take a seat on the cap table. A segregated account cannot.</p>

<h2>Tax: where the comparison usually goes wrong</h2>
<p>In a <b>PMS</b>, every sale the manager makes is yours, that year. <b>A high-turnover PMS bills you tax annually even if you never withdraw a rupee.</b> Ask for turnover, not just performance.</p>
<p>In an <b>AIF</b>, it depends. Categories I and II pass income through to you, keeping its character. Category III settles tax inside the fund, so what you receive is already net.</p>
<p>The trap: comparing a Category III post-tax number against a PMS gross number. Find out which you are being shown. The <a href="/tax">tax schedule</a> has all of them.</p>

<h2>Liquidity: days, or years</h2>
<p>Most equity PMS mandates have no lock-in. Exiting means selling your shares, and the money lands in days. But "liquid" still means selling into whatever market exists that week, which in a concentrated small-cap book is not always comfortable.</p>
<p>Closed-ended Category I and II AIFs run five to eight years. Money goes in over the first few and comes back as deals exit. Category III sits in between, with periodic windows.</p>
<p>If you may need this money back on your own schedule, that settles the question before returns.</p>

<h2>So which one fits?</h2>
<p>Ask what job you are hiring it to do.</p>
<ul class="pts">
<li><b>Concentrated Indian shares, visible, exitable.</b> That is a PMS. You are buying a manager's stock-picking.</li>
<li><b>Something the stock market cannot give you.</b> Private credit, pre-IPO, property debt, a long-short book. That is an AIF. You are buying access, and paying in liquidity.</li>
<li><b>Less dependence on Indian equity.</b> That points to a Category II or III AIF. A second PMS just concentrates the same risk.</li>
<li><b>Not sure you can leave it alone for five years.</b> That points to a PMS, or to neither yet.</li>
</ul>
<p>They are not either/or. Above a few crore, a common shape is a PMS for listed equity plus one or two AIF commitments. Our <a href="/fit-finder">Fit Finder</a> asks seven questions and shortlists across all thirteen structures, including telling you when neither belongs in your portfolio yet.</p>

<h2>Questions people ask</h2>
<h3>Can I have both?</h3>
<p>Yes, and above a few crore it is common. They have separate minimums: ₹50 lakh and ₹1 crore.</p>
<h3>Which has higher fees?</h3>
<p>Management fees are similar, often around 2%. AIF carried interest, especially with a catch-up clause, can cost far more than a typical PMS performance fee.</p>
<h3>Can NRIs invest in both?</h3>
<p>Yes. The AIF rules expressly allow non-residents, and the PMS rules say nothing about residence. The constraints are exchange control, the house's own policy, and your own country's tax. See <a href="/nri/us">the US</a>, <a href="/nri/uae">the UAE</a> and <a href="/nri/uk">the UK</a>.</p>
<h3>Is an AIF just a PMS with a bigger minimum?</h3>
<p>No. An AIF can hold things a PMS cannot: unlisted companies, private loans, leveraged positions. If a fund does nothing a managed account could do, the pooled structure adds lock-in without adding access.</p>
<h3>Which is more transparent?</h3>
<p>A PMS. The holdings are in your own account. An AIF reports periodically, and private assets are valued by estimate until something sells.</p>

<p>New to either? Start with <a href="/learn/what-is-pms">what a PMS is</a> and <a href="/learn/what-is-aif">what an AIF is</a>.</p>
`,
}

export const guideBySlug = (slug: string): string | undefined => GUIDE_HTML[slug]

/** Reading time for the long guide, derived from the copy so it can't go stale
 *  the way the hand-written `Article.min` did once these pages grew. */
export const guideReadingTime = (slug: string): string | undefined => {
  const html = GUIDE_HTML[slug]
  if (!html) return undefined
  const words = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter((w) => /[a-zA-Z0-9]/.test(w)).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}
