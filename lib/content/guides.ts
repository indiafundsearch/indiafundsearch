/**
 * Long-form guides for the standalone money-keyword routes under /learn/[slug].
 *
 * WHY THIS FILE EXISTS, SEPARATELY FROM `articles.ts`
 * Each of these three articles is published at two URLs: as a panel on /learn,
 * and as its own page. Serving identical copy at both invites Google to
 * consolidate them and pick the hub — whose title targets "fundamentals", not
 * "what is PMS" — so the page built for the money keyword never gets its shot.
 *
 * So the two are given different jobs rather than different lengths of the same
 * job. `Article.bodyHtml` stays the short, self-contained ~200-word answer that
 * the /learn accordion shows (and that answer engines can quote whole). The
 * guide below is the deep treatment: question-shaped h2s, a worked example with
 * real arithmetic, and a visible FAQ. The panel then reads as a summary of a
 * longer page rather than a copy of it.
 *
 * EDITORIAL RULES (same as lib/content/corridors.ts)
 * - No Indian income-tax section numbers. The Income-tax Act, 1961 was repealed
 *   with effect from 1 April 2026 and renumbered wholesale; tax rules are
 *   described by what they do.
 * - SEBI regulation numbers ARE cited — that numbering is stable and the
 *   consolidated PDFs are linked.
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
<p class="lead">A mutual fund is a good restaurant — one menu, cooked for hundreds of tables at once. A PMS is a personal chef: your kitchen, your plate, a menu built around you.</p>

<p>Portfolio Management Services sit in an odd spot in Indian investing. Everyone with money has heard of them, almost nobody can explain how they actually differ from a mutual fund, and the difference that matters most — who legally owns the shares — is the one least often mentioned in a sales conversation.</p>

<h2>What is a PMS, exactly?</h2>
<p>A <b>Portfolio Management Service</b> is a managed account. A SEBI-registered portfolio manager buys and sells securities <b>directly in your own demat account</b>, under a written agreement, using their discretion within a mandate you have agreed.</p>
<p>You are not buying units of a pool. You own the underlying shares, in your name. This is not a marketing distinction — it is written into the rules. Under <a href="${SEBI_PMS}" target="_blank" rel="noopener noreferrer">Regulation 24(15) of the SEBI (Portfolio Managers) Regulations, 2020</a>, a portfolio manager <b>must not hold client securities in its own name</b>, and a separate provision requires each client's holdings to be segregated. Open your account on any morning and you can see the twenty-odd companies you own, what was bought, what was sold, and at what price.</p>
<p>Managers offer mandates in three broad shapes: <b>discretionary</b>, where the manager decides and executes; <b>non-discretionary</b>, where they recommend and you approve each trade; and <b>advisory</b>, where they only advise. The overwhelming majority of PMS money in India is discretionary, and that is what people usually mean by "a PMS".</p>

<h2>How is a PMS different from a mutual fund?</h2>
<div class="tablewrap">
<table>
<thead><tr><th>&nbsp;</th><th>Mutual fund</th><th>PMS</th></tr></thead>
<tbody>
<tr><td>What you own</td><td>Units of a pooled scheme</td><td>The actual shares, in your demat</td></tr>
<tr><td>Minimum</td><td>A few hundred rupees</td><td>₹50 lakh, set by SEBI</td></tr>
<tr><td>Typical holdings</td><td>50–80 stocks</td><td>15–30 stocks</td></tr>
<tr><td>Transparency</td><td>Monthly factsheet, periodic disclosure</td><td>Line by line, any day you look</td></tr>
<tr><td>Who pays the tax on churn</td><td>The fund, internally — you are taxed on exit</td><td>You, every year the manager trades</td></tr>
<tr><td>Customisation</td><td>None</td><td>Possible — you can exclude sectors or stocks</td></tr>
</tbody>
</table>
</div>
<p>The concentration is the point. A manager running twenty-five positions instead of eighty can size a conviction so that it actually moves the portfolio. That is where the extra return potential comes from — and it is exactly where the extra risk lives. A concentrated portfolio falls harder, and it falls for longer, than an index.</p>

<h2>What does a PMS actually cost?</h2>
<p>Fee structures are commercial, not regulated, so they vary by house. Two shapes dominate: a <b>fixed fee only</b>, typically around 2–2.5% of assets a year; or a <b>hybrid</b>, with a lower fixed fee plus a share of profits above a hurdle rate. Both attract GST, and both sit on top of brokerage, custody and audit costs.</p>
<p>Investors usually assume the performance-linked structure is the cheaper, better-aligned one. It is — up to a point, and the point is calculable.</p>
<div class="worked">
<p><b>Worked example — ₹50 lakh, one year.</b></p>
<p><b>Option A, fixed only:</b> 2.5% a year. In every year, good or bad, you pay <b>₹1,25,000</b>.</p>
<p><b>Option B, hybrid:</b> 1.5% fixed, plus 15% of gains above a 10% hurdle. At an 18% gross return, your gain is ₹9,00,000. The hurdle absorbs the first ₹5,00,000, leaving ₹4,00,000, of which 15% is ₹60,000. Add the ₹75,000 fixed fee and you pay <b>₹1,35,000</b> — more than Option A.</p>
<p><b>The crossover is about 16.7%.</b> Below that gross return the hybrid is cheaper; above it, the fixed fee is. In a flat year the hybrid costs ₹75,000 against ₹1,25,000, and in a strong year it costs more.</p>
</div>
<p>Neither is dishonest. But "performance fee" reads as though you only pay when the manager does well, and the arithmetic says something more specific: you pay <em>less</em> in bad years and <em>more</em> in very good ones. Ask for the hurdle, whether there is a <b>high-water mark</b> so you are not charged twice for recovering the same loss, and whether the performance fee is charged on realised or notional gains.</p>

<h2>How is a PMS taxed?</h2>
<p>Because the shares are yours, there is no fund wrapper to sit between you and the tax authority. Every sale the manager makes is <b>your</b> disposal, in <b>your</b> return, in the year it happens. For listed equity where securities transaction tax has been paid, short-term gains are currently taxed at 20% and long-term gains at 12.5% above a ₹1.25 lakh annual exemption.</p>
<p>This has a consequence people rarely price in: <b>a high-churn PMS creates a tax bill every year, whether or not you have taken any money out.</b> Two managers can post identical gross returns and hand you materially different post-tax outcomes purely through turnover. When you compare track records, ask for portfolio turnover alongside returns — the second number tells you how much of the first you will keep. Our <a href="/tax">full tax schedule</a> sets out the rates for each structure side by side.</p>

<h2>Who is a PMS actually for?</h2>
<p>The regulator has drawn a line: under <a href="${SEBI_PMS}" target="_blank" rel="noopener noreferrer">Regulation 23(2)</a>, a portfolio manager cannot accept less than <b>₹50 lakh</b> from a client. Accredited investors and co-investment mandates are exempt. That minimum is not arbitrary — it is a judgement that this is a structure for people who can lose a meaningful sum without changing their life.</p>
<p>Beyond the cheque size, a PMS suits you if three things are true. You will not need the money for at least three to five years. You can watch a concentrated portfolio fall thirty or forty per cent without selling — because it will, at some point. And you accept that <b>manager selection is not a detail in PMS, it is the entire decision</b>: the gap between the best and worst performers in the same category is far wider than it is among mutual funds.</p>
<p>If any of those is shaky, that is useful information, not a failure. Our <a href="/fit-finder">Fit Finder</a> walks through seven questions and will tell you plainly when the answer is "not yet".</p>

<h2>What can go wrong?</h2>
<ul class="pts">
<li><b>Concentration cuts both ways</b> — the same sizing that produces outperformance produces deeper drawdowns</li>
<li><b>Key-person risk</b> — you are buying a specific manager's judgement, and they can leave</li>
<li><b>Churn drag</b> — turnover you never see quietly converts gross returns into a smaller post-tax number</li>
<li><b>Comparability</b> — there is no single daily NAV, so comparing two PMS records is harder than comparing two funds, and presentation varies</li>
<li><b>Exit at market</b> — leaving means actually selling the positions, at whatever prices exist that week</li>
</ul>

<h2>Questions people ask</h2>
<h3>Is the ₹50 lakh minimum per PMS or across all of them?</h3>
<p>Per portfolio manager. The rule constrains what a manager may accept from a client, so if you split money across two houses, each needs its own ₹50 lakh.</p>
<h3>Can NRIs invest in a PMS?</h3>
<p>Yes. The SEBI regulations contain no residency condition at all — searching the consolidated text for "non-resident" returns nothing. The real constraints are exchange control, your bank account structure, and each house's own policy. Where you are tax-resident changes the answer significantly, so start with the corridor guide for <a href="/nri/us">the United States</a>, <a href="/nri/uae">the UAE</a> or <a href="/nri/uk">the United Kingdom</a>.</p>
<h3>Can I see and control what is bought?</h3>
<p>You can always see it, because the holdings sit in your own demat account. Whether you control it depends on the mandate: a discretionary agreement means the manager acts without asking you each time.</p>
<h3>Is a PMS better than a mutual fund?</h3>
<p>No — it is a different instrument for a different job. A mutual fund gives you diversification and daily liquidity cheaply. A PMS gives you concentration, direct ownership and customisation, at a higher cost and a higher minimum. If you cannot articulate why you want concentration, the mutual fund is the better answer.</p>
<h3>How quickly can I get my money out?</h3>
<p>Most equity mandates carry no lock-in, and proceeds typically settle within days of the positions being sold. Some strategies apply an exit load in the early period, so read the agreement.</p>

<p>Still deciding between structures? The next question is usually whether you want a managed account at all, or a pooled fund that can reach places listed equity cannot — which is what <a href="/learn/pms-vs-aif">PMS versus AIF</a> is really about.</p>
`,

  // ───────────────────────────────────────────────────────────── what-is-aif
  'what-is-aif': `
<p class="lead">If mutual funds are the main hall, an Alternative Investment Fund is the VIP section — higher entry, fewer rules about what can be served, and dishes the main hall never sees.</p>

<p>An AIF is the vehicle Indian regulation uses for everything a mutual fund is not allowed to do: lending to companies at private-credit rates, buying businesses before they list, backing startups, and running strategies that can make money when markets fall. The entry price is high and the rules are looser, which is precisely the trade the regulator has made.</p>

<h2>What is an AIF, exactly?</h2>
<p>An <b>Alternative Investment Fund</b> is a privately pooled investment vehicle registered with SEBI, which collects money from sophisticated investors and invests it according to a stated policy. You hold <b>units</b> of the fund — unlike a PMS, you do not own the underlying assets directly.</p>
<p>Two structural facts shape everything else. AIFs may only raise money by <b>private placement</b> — they cannot advertise to the public — and a scheme is capped at <b>1,000 investors</b>, with accredited investors excluded from that count. That combination is why AIFs feel invisible until someone shows you one.</p>
<p>On who may invest, the regulations are unusually direct. <a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(a)</a> states that an AIF "may raise funds from any investor whether <b>Indian, foreign or non-resident Indians</b>". There is no nationality or residence bar in the text.</p>

<h2>What are the three categories?</h2>
<div class="tablewrap">
<table>
<thead><tr><th>Category</th><th>What it holds</th><th>Typical shape</th></tr></thead>
<tbody>
<tr><td>Category I</td><td>Areas the government wants capital to reach — venture capital, SMEs, infrastructure, social impact</td><td>Long lock-ins, drawdown structure</td></tr>
<tr><td>Category II</td><td>Everything not in I or III, without significant leverage — private equity, private credit, real-estate debt</td><td>The largest category by far; 5–8 year life</td></tr>
<tr><td>Category III</td><td>Complex or diverse trading strategies, and it may use leverage — long-short, market-neutral, absolute return</td><td>Often open-ended with periodic exit windows</td></tr>
</tbody>
</table>
</div>
<p>The categories are not tiers of quality or risk — they are buckets defined by strategy, and they carry <b>completely different tax treatment</b>. That is the part people miss, and it is covered below.</p>

<h2>What does it cost to get in?</h2>
<p>Under <a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(c)</a>, an AIF cannot accept less than <b>₹1 crore</b> from an investor. Employees and directors of the fund or its manager may come in at ₹25 lakh, and the minimum does not apply to accredited investors at all. Each scheme must also reach a corpus of at least ₹20 crore before it can operate.</p>
<p>Critically, the ₹1 crore is usually a <b>commitment, not a cheque</b>. In most closed-ended funds, capital is drawn down over several years as deals are found. You should plan for the calls, because failing to meet one can carry punitive consequences under the fund documents.</p>
<p>Fees typically comprise a management fee — often around 2%, and worth checking whether it is charged on <em>committed</em> or <em>invested</em> capital, which can differ substantially in the early years — plus <b>carried interest</b>, a share of profits above a hurdle. The carry is where the real money is, and where the documentation matters most.</p>
<div class="worked">
<p><b>Worked example — why "20% over a 10% hurdle" can mean two very different things.</b></p>
<p>You commit ₹1 crore. Six years later the fund returns ₹2 crore, so the gross profit is ₹1 crore.</p>
<p><b>Without a catch-up:</b> the manager takes 20% only of the gains above the hurdle. Compounded at 10% for six years, the hurdle absorbs ₹1.77 crore, leaving ₹22.8 lakh above it. The manager's carry is about <b>₹4.6 lakh</b>.</p>
<p><b>With a full catch-up:</b> once the hurdle is cleared, the manager catches up and then takes 20% of the <em>entire</em> ₹1 crore profit — about <b>₹20 lakh</b>.</p>
<p>Same headline terms. Roughly four times the fee. Ask whether there is a catch-up, and whether the hurdle is soft or hard.</p>
</div>

<h2>How are AIFs taxed?</h2>
<p>This is the sharpest practical difference between the categories, and it is worth getting right before you invest rather than at your first filing.</p>
<p><b>Categories I and II are pass-through.</b> The fund itself is not taxed on most income; instead it is taxed in your hands as though you had made the underlying investments directly, retaining its original character. You will receive a statement from the fund and report the income yourself, and tax is deducted at source on distributions.</p>
<p><b>Category III sits outside that pass-through regime.</b> Tax is generally settled at the fund level, so what reaches you is a post-tax return and you are not separately reporting the fund's underlying income. The mechanics vary with how the fund is constituted, so confirm the specifics for your fund with your Chartered Accountant.</p>
<p>The practical upshot: two funds quoting the same headline return can deliver very different outcomes to you, and comparing a Category II gross return with a Category III post-tax return is not a like-for-like comparison. Our <a href="/tax">tax schedule</a> lays this out structure by structure.</p>

<h2>What does the manager have at stake?</h2>
<p>More than in most structures, and this is a genuinely useful thing to check. <a href="${SEBI_AIF}" target="_blank" rel="noopener noreferrer">Regulation 10(d)</a> requires the manager or sponsor to maintain a continuing interest in the fund: at least <b>2.5% of the corpus or ₹5 crore, whichever is lower</b> — rising to <b>5% or ₹10 crore</b> for Category III. It cannot be met through a waiver of fees.</p>
<p>That is the regulator forcing co-investment. When you meet a manager, asking how much of their own money sits in the fund — and whether it is merely the regulatory minimum or meaningfully more — tells you more about alignment than any pitch deck.</p>

<h2>Who is an AIF for?</h2>
<p>Someone who already has a functioning liquid portfolio and is adding an allocation they can genuinely leave alone for the fund's full life. The honest test is not whether you can find ₹1 crore; it is whether you can commit ₹1 crore, meet capital calls on someone else's timetable, and be unable to access any of it for five to eight years without that affecting a single decision you make in the meantime.</p>
<p>If that describes you, the reason to be here is access rather than performance: private credit, pre-IPO and real-asset exposures simply cannot be packaged into a daily-NAV product. If it does not describe you, the right answer is to wait — the <a href="/fit-finder">Fit Finder</a> will say so.</p>

<h2>What can go wrong?</h2>
<ul class="pts">
<li><b>Blind-pool risk</b> — in most closed-ended funds you commit before you know what will be bought</li>
<li><b>No secondary market to speak of</b> — early exit is difficult, and usually expensive when possible at all</li>
<li><b>Manager dispersion is widest here</b> — the gap between top and bottom quartile is larger than in any listed structure</li>
<li><b>Capital calls arrive on the fund's schedule</b>, not yours, and defaulting is costly</li>
<li><b>Valuations are periodic and estimated</b> until an exit actually happens — an interim mark is not a price</li>
</ul>

<h2>Questions people ask</h2>
<h3>Is the ₹1 crore payable upfront?</h3>
<p>Usually not. It is typically a commitment drawn down in tranches as the fund deploys. Open-ended Category III funds are more likely to take the money at once.</p>
<h3>Can NRIs invest in an AIF?</h3>
<p>Yes — the regulations expressly permit Indian, foreign and non-resident investors. The work sits in the exchange-control route you use, which determines whether your money and gains are repatriable, and in your own country's tax treatment. Start with the corridor guide for <a href="/nri/us">the US</a>, <a href="/nri/uae">the UAE</a> or <a href="/nri/uk">the UK</a>.</p>
<h3>What is the difference between Category II and Category III?</h3>
<p>Category II holds assets — private companies, loans, real-estate credit — and generally does not use leverage. Category III trades strategies, often in listed markets, and may use leverage and derivatives. They also differ fundamentally in tax treatment, as above.</p>
<h3>Are angel funds still ₹25 lakh?</h3>
<p>No. Angel funds were changed in September 2025: they now raise only from accredited investors, and no minimum investment applies to them at all.</p>
<h3>Is an AIF riskier than a PMS?</h3>
<p>Different risk, not uniformly more. A PMS carries concentration and market risk in listed equity you can sell any day. An AIF frequently carries illiquidity and execution risk in assets you cannot sell at all for years. Which is "riskier" depends entirely on whether you need the money.</p>

<p>If you are weighing the two against each other, <a href="/learn/pms-vs-aif">PMS versus AIF</a> sets them side by side on ownership, tax and liquidity.</p>
`,

  // ──────────────────────────────────────────────────────────── pms-vs-aif
  'pms-vs-aif': `
<p class="lead">One puts shares in your name. The other puts your money in a pool. Almost every practical difference between PMS and AIF flows from that single fact.</p>

<p>These two get compared constantly, usually as though they were competing versions of the same thing — a more exclusive mutual fund. They are not. They are different legal structures that happen to share an audience, and choosing between them on past returns alone is how people end up in the wrong one.</p>

<h2>The one-line difference</h2>
<p>In a <b>PMS</b>, a manager buys securities in <b>your own demat account</b>. You own the shares. In an <b>AIF</b>, you subscribe for <b>units of a pooled fund</b>, and the fund owns the assets.</p>
<p>That is not a technicality. It determines who is taxed and when, what the manager is allowed to buy, how quickly you can leave, and what you can see.</p>

<h2>Side by side</h2>
<div class="tablewrap">
<table>
<thead><tr><th>&nbsp;</th><th>PMS</th><th>AIF</th></tr></thead>
<tbody>
<tr><td>What you own</td><td>The underlying shares, in your name</td><td>Units of a fund</td></tr>
<tr><td>SEBI minimum</td><td>₹50 lakh</td><td>₹1 crore</td></tr>
<tr><td>Paid when</td><td>Upfront</td><td>Often committed, then drawn down</td></tr>
<tr><td>What it can hold</td><td>Mostly listed securities</td><td>Unlisted equity, private credit, real-asset debt, derivatives</td></tr>
<tr><td>Leverage</td><td>No</td><td>Category III may use it</td></tr>
<tr><td>Investors per scheme</td><td>Not applicable — separate accounts</td><td>Capped at 1,000</td></tr>
<tr><td>Transparency</td><td>Line by line, any day</td><td>Periodic reporting from the fund</td></tr>
<tr><td>Liquidity</td><td>Usually exit within days by selling</td><td>Lock-ins of years; weak secondary market</td></tr>
<tr><td>Who reports the tax</td><td>You, every year the manager trades</td><td>Depends on the category</td></tr>
</tbody>
</table>
</div>

<h2>Ownership: your demat versus the fund's books</h2>
<p>SEBI requires that a portfolio manager must <b>not</b> hold client securities in its own name, and must keep each client's holdings segregated. So a PMS is genuinely your portfolio, run by someone else — you can log in and count the shares.</p>
<p>An AIF is the opposite by design. Pooling is what allows the fund to write a ₹40 crore cheque into a private company, negotiate terms, and sit on the cap table. You cannot do that as a segregated account, which is precisely why the pooled structure exists.</p>

<h2>Tax: the difference that surprises people</h2>
<p>This is where the two structures diverge most, and where the comparison is most often made badly.</p>
<p>In a <b>PMS</b>, there is no wrapper between you and the tax authority. Every sale the manager makes is your disposal in the year it happens, so <b>a high-turnover PMS generates a tax bill annually even if you never withdraw a rupee</b>. Two managers with identical gross returns can leave you with visibly different post-tax outcomes. Ask for turnover, not just performance.</p>
<p>In an <b>AIF</b>, it depends on the category. Categories I and II are pass-through: the income is taxed in your hands as though you had invested directly, keeping its character, and you report it. Category III sits outside that regime, with tax generally settled at the fund level, so what you receive is already post-tax.</p>
<p>The practical trap: comparing a Category III post-tax return against a PMS gross return, or against a Category II pre-tax figure, is not comparing like with like. Establish which number you are being shown before you compare anything. The <a href="/tax">tax schedule</a> sets out all of them together.</p>

<h2>Liquidity: days versus years</h2>
<p>Most equity PMS mandates have no lock-in. Exiting means the manager sells your positions and the proceeds settle in days — though "liquid" still means selling into whatever market exists that week, which in a concentrated small-cap portfolio is not always a comfortable exercise.</p>
<p>AIFs are built for the opposite. Closed-ended Category I and II funds typically run five to eight years, with capital drawn down over the first few and returned as exits happen. There is no meaningful secondary market. Open-ended Category III funds sit in between, with periodic redemption windows.</p>
<p>If there is a realistic chance you need the money back on your own schedule, that single consideration should settle the question before any discussion of returns.</p>

<h2>So which one fits which job?</h2>
<p>The useful question is not which is better, but what job you are hiring the structure to do.</p>
<ul class="pts">
<li><b>You want concentrated Indian listed equity, with transparency and the ability to leave</b> — that is a PMS. You are buying a manager's stock-picking, and you can watch them do it</li>
<li><b>You want an exposure listed markets cannot give you</b> — private credit, pre-IPO, real-estate debt, a long-short book — that is an AIF. You are buying access to an asset class, and paying for it in liquidity</li>
<li><b>You want to reduce your dependence on Indian equity beta</b> — that points to Category II or III AIFs, not to a second PMS, which would simply concentrate the same risk further</li>
<li><b>You are not sure you can leave the money untouched for five years</b> — that points to a PMS, or to neither yet</li>
</ul>
<p>They are also not mutually exclusive. A common shape for a larger portfolio is a PMS for listed equity alongside one or two AIF commitments for exposures the listed market cannot provide. Our <a href="/fit-finder">Fit Finder</a> works through seven questions and produces a shortlist across all thirteen structures — including telling you when the honest answer is that neither belongs in your portfolio yet.</p>

<h2>Questions people ask</h2>
<h3>Can I invest in both?</h3>
<p>Yes, and for portfolios above a few crore it is common. They are separate structures with separate minimums — ₹50 lakh and ₹1 crore respectively — so each must be met on its own.</p>
<h3>Which one has higher fees?</h3>
<p>Headline management fees are broadly similar, often around 2%. The difference is in the profit share: AIF carried interest, particularly with a catch-up provision, can be substantially more expensive than a typical PMS performance fee. Read how the profit share is calculated, not just its percentage.</p>
<h3>Can NRIs invest in both?</h3>
<p>Yes. Neither set of regulations imposes a residency bar — the AIF rules expressly permit non-resident investors, and the PMS regulations are silent on residence entirely. The constraints are exchange control, the individual house's policy, and your own country's tax rules. See the corridor guides for <a href="/nri/us">the US</a>, <a href="/nri/uae">the UAE</a> and <a href="/nri/uk">the UK</a>.</p>
<h3>Is an AIF just a PMS with a higher minimum?</h3>
<p>No, and this is the most common misconception. An AIF can hold things a PMS cannot — unlisted companies, private loans, leveraged positions. If a fund is doing nothing a managed account could do, the pooled structure is adding lock-in without adding access.</p>
<h3>Which is more transparent?</h3>
<p>A PMS, straightforwardly — the holdings are in your own account. An AIF reports periodically, and interim valuations of private assets are estimates until a deal actually closes.</p>

<p>New to either? Start with <a href="/learn/what-is-pms">what a PMS is</a> and <a href="/learn/what-is-aif">what an AIF is</a>, then come back to this comparison.</p>
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
