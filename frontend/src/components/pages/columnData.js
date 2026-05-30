import React from 'react'

// StockWaveJP Column & Analysis Articles (English Edition)
// Body text for major articles; additional articles translated progressively.

const COLUMNS = [
  {
    id: 'murata-seisakusho-analysis',
    category: 'Stock Analysis',
    tag: 'Electronic Components',
    title: 'Murata Manufacturing (6981): The Electronic Components Giant That Crossed ¥14T Market Cap',
    date: '2026/05/29',
    summary: 'Murata Manufacturing hit a record ¥14T market cap in May 2026, surpassing Nintendo to become Kyoto's No.1 company. We analyze the business model, competitive advantages, AI/EV growth drivers, and key risks.',
    body: `
## What is Murata Manufacturing?

Murata Manufacturing (Ticker: 6981) was founded in 1944 in Nagaokakyo, Kyoto Prefecture. It is the world's leading manufacturer of multilayer ceramic capacitors (MLCC), along with ceramic resonators, EMI filters, communication devices, power modules, and sensors.

FY2025 consolidated net sales reached **¥1,830.9B** (up 5.0% YoY), an all-time high. Market capitalization surpassed ¥14 trillion in May 2026, making it Kyoto's largest company, ahead of Nintendo.

---

## Key Products & Revenue Mix

### Capacitors (~45% of revenue)
MLCC is the flagship product with approximately 40–45% global market share. Used in everything from AI servers and smartphones to EVs and industrial equipment — often called "the rice of electronics."

### Communication Devices (~25%)
Antenna modules, SAW filters, and BT modules for smartphones. Deep integration into Qualcomm and Apple supply chains.

### Power & Energy (~10%)
DC-DC converters for AI servers. With NVIDIA H100/H200 GPUs consuming 700W+, demand for stable power conversion is surging.

---

## Why AI is Driving MLCC Demand

One AI server rack requires 10,000–20,000+ MLCCs — 10–20x more than a smartphone. AI infrastructure investment by Microsoft, Google, Amazon, Meta, and Chinese hyperscalers is generating massive structural demand for high-quality MLCCs.

---

## Key Risks

- **China exposure**: ~55% of sales are to Chinese customers. Trade friction and tariff risks apply.
- **Demand cycle reversal**: The electronics components industry historically cycles every 3–5 years.
- **Competition**: Samsung Electro-Mechanics (No.2) and Chinese manufacturers are expanding capacity.

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'mlcc-murata-analysis',
    category: 'Theme',
    tag: 'MLCC/Electronic Components',
    theme: 'MLCC・電子部品',
    themes: ['MLCC・電子部品'],
    title: 'MLCC Industry Analysis: The Most Critical Component for AI & EV Transformation',
    date: '2026/05/29',
    summary: 'One AI server uses 10–20x more MLCCs than a smartphone. We analyze the structural shift in MLCC demand, Japan's dominant position, and how to invest in this theme.',
    body: `
## What is an MLCC?

A Multilayer Ceramic Capacitor (MLCC) temporarily stores and releases electrical charge in a circuit. A smartphone contains ~1,000 MLCCs; a car ~10,000; an AI server rack **10,000–20,000 or more**.

At just 0.4mm × 0.2mm, these tiny components are the invisible backbone of all modern electronics.

---

## Why AI is the Game Changer

| Application | MLCC Count (est.) |
|---|---|
| Smartphone | ~1,000 |
| High-end PC | ~3,000–5,000 |
| AI Server (1 rack) | ~10,000–20,000+ |
| Large datacenter (1 building) | Hundreds of millions |

AI accelerators like NVIDIA H100 consume 300–700W. Stable power delivery requires premium MLCCs that cheap Chinese/Korean alternatives cannot substitute.

---

## Key Stocks in This Theme

| Stock | Ticker | Role |
|---|---|---|
| Murata Manufacturing | 6981 | World #1 MLCC (40-45% share) |
| TDK | 6762 | World #2 MLCC |
| Taiyo Yuden | 6976 | World #3, high profit leverage |
| Kyocera | 6971 | Ceramics specialist |
| MARUWA | 5344 | High-margin ceramic substrate niche |
| Sumitomo Metal Mining | 5713 | Nickel for MLCC electrodes |

---

## Risks

- Demand cycle reversal (2022–23 slump after smartphone oversupply)
- Korean/Chinese capacity expansion (Samsung Electro-Mechanics, Yageo)
- Geopolitical risks in Asia

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'theme-investing-basics',
    category: 'Theme',
    tag: 'Basics',
    title: 'What is Theme Investing? How It Differs from Individual Stocks and Index Funds',
    date: '2026/03/14',
    summary: 'Theme investing groups stocks by structural trends — AI, defense, EVs, inbound tourism — and tracks their collective momentum. This article explains how to use StockWaveJP's data for theme-based analysis.',
    body: `
## What is Theme Investing?

Theme investing means grouping stocks by a shared structural tailwind — such as AI infrastructure, Japanese defense spending, EV adoption, or inbound tourism — and tracking how that theme performs as a whole.

Unlike individual stock picking, theme investing lets you:
- Spot **early capital flows** into emerging trends
- Diversify risk across multiple stocks in one theme
- Compare themes to identify which sectors are gaining vs. losing momentum

---

## How StockWaveJP Uses Themes

StockWaveJP tracks 67+ Japanese stock themes, showing:
- **Price change** (1D, 1W, 1M, 3M, 6M, 1Y)
- **Volume** and **trading value** (aggregate of stocks in theme)
- **Heatmap** visualization of fund flows
- **Weekly reports** summarizing top/bottom themes

---

## Theme vs. Index vs. Individual Stocks

| Approach | Pros | Cons |
|---|---|---|
| Index (e.g. TOPIX) | Low risk, passive | No alpha, slow to respond to trends |
| Individual stock | High upside | High risk, research-intensive |
| **Theme** | Trend exposure + diversification | Still requires market timing |

---

## Getting Started

1. Visit the **Theme List** page to see all 67+ themes ranked by performance
2. Click a theme to see its constituent stocks and charts
3. Add interesting stocks to your **Custom Theme** watchlist
4. Read the **Weekly Report** every Friday for a market summary

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'semiconductor-theme',
    category: 'Theme',
    tag: 'Semiconductor',
    title: 'Semiconductor Theme: AI Demand, Key Stocks, and Japan's Role in the Global Supply Chain',
    date: '2026/04/01',
    summary: 'Japan's semiconductor equipment manufacturers — Tokyo Electron, Advantest, Lasertec — are at the center of AI-driven chip demand. This article explains the theme structure and investment considerations.',
    body: `
## Japan's Unique Position in Semiconductors

Japan does not fabricate leading-edge chips at scale (that's TSMC in Taiwan). But Japan dominates **semiconductor equipment and materials** — the tools and chemicals needed to make chips.

Key Japanese companies:
- **Tokyo Electron (8035)**: Coaters, developers, CVD equipment — essential for every fab
- **Advantest (6857)**: Test equipment for NVIDIA, AMD, and HBM chips
- **Lasertec (6920)**: EUV mask inspection — near-monopoly position
- **Shin-Etsu Chemical (4063)**: Silicon wafers (#1 globally)

---

## AI Demand Driving Structural Growth

AI chips (H100, H200, MI300) require the most advanced manufacturing processes. Every NVIDIA GPU must be tested by Advantest. Every fab producing them uses Tokyo Electron equipment.

This creates a **recurring revenue model** — as AI server demand grows, Japanese equipment and materials companies benefit continuously.

---

## Key Risk: US Export Controls

US restrictions on semiconductor exports to China affect Japanese equipment makers. Both Tokyo Electron and Lasertec have significant China exposure and face regulatory uncertainty.

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'defense-theme',
    category: 'Theme',
    tag: 'Defense',
    title: 'Defense & Space Theme: Japan's Defense Spending Surge and Investment Opportunities',
    date: '2026/04/01',
    summary: 'Japan's defense budget is on track to double by 2027. Mitsubishi Heavy Industries, Kawasaki Heavy Industries, and IHI are the key beneficiaries. We analyze the structural tailwinds and key stocks.',
    body: `
## Japan's Historic Defense Buildup

Japan is implementing its largest defense spending increase since WWII, targeting 2% of GDP by 2027 (from ~1%). This generates multi-year, predictable revenue for domestic defense contractors.

### Key Beneficiaries

| Company | Ticker | Role |
|---|---|---|
| Mitsubishi Heavy Industries | 7011 | Fighters, missiles, ships |
| Kawasaki Heavy Industries | 7012 | Submarines, helicopters |
| IHI Corporation | 7013 | Jet engines, missiles |
| NEC Corporation | 6701 | Defense electronics, C4ISR |
| Fujitsu | 6702 | Military IT systems |

---

## Space & Satellite Subsector

Japan's Space Security Strategy includes satellite constellation development, which benefits:
- Terra Drone (278A): Defense drone manufacturer
- AXELSPACE (278A-related): Small satellite developer
- IHI: Rocket engines

---

## Why This Theme Has Stayed Strong

Unlike AI (which had a correction in 2024–2025), defense spending is driven by **government budgets**, not market sentiment. Multi-year contracts provide visibility, making this one of the most resilient themes in StockWaveJP.

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'ai-cloud-theme',
    category: 'Theme',
    tag: 'AI/Cloud',
    title: 'AI & Cloud Theme: Japan's Generative AI Investment Wave and Key Players',
    date: '2026/04/01',
    summary: 'SoftBank Group's massive AI investment, Japanese tech companies' LLM development, and the datacenter buildout are driving AI-related themes. We analyze the opportunity and risks.',
    body: `
## Japan's AI Ecosystem

While Japan lacks a domestic hyperscaler of Google/Microsoft scale, it is investing heavily in AI infrastructure:

- **SoftBank Group (9984)**: $100B+ committed to AI via ARM, OpenAI partnership, and domestic datacenter buildout
- **NTT (9432)**: Proprietary LLM (tsuzumi) and IOWN optical network for AI
- **Fujitsu (6702)**: Enterprise AI solutions and quantum computing
- **Ricoh / Kyocera**: Edge AI devices

---

## Datacenter Infrastructure Play

Japanese power and cooling companies benefit from datacenter demand:
- **Tokyo Electron**: Chip fab equipment (indirect play)
- **Meidensha / Fuji Electric**: Datacenter power systems
- **NTT DATA**: Datacenter operation

---

## Key Risk: Monetization Timeline

Most Japanese AI investments have not yet generated meaningful revenue. The risk is that AI spending peaks before returns materialize.

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'ev-green-theme',
    category: 'Theme',
    tag: 'EV/Green',
    title: 'EV & Green Theme: Japan's Role in the Electric Vehicle Supply Chain',
    date: '2026/04/01',
    summary: 'Toyota's EV pivot, all-solid-state battery development, and the global EV supply chain create a complex but important investment theme. We analyze Japan's position and key stocks.',
    body: `
## Japan and EVs: A Complex Relationship

Japan was late to pure battery EVs (BEVs) but leads in hybrid technology and is now investing aggressively in:
- **All-solid-state batteries** (Toyota, Panasonic)
- **EV motors and power electronics** (Nidec, Hitachi Astemo)
- **MLCC and capacitors for EVs** (Murata, TDK)

---

## Key Stocks

| Company | Ticker | Role |
|---|---|---|
| Toyota Motor | 7203 | All-solid-state battery leader |
| Panasonic Holdings | 6752 | EV battery (Primearth/Tesla supplier) |
| Nidec | 6594 | EV traction motors |
| Sumitomo Metal Mining | 5713 | Nickel for EV batteries |
| Murata Manufacturing | 6981 | MLCC for EV systems |

---

## Green Energy Expansion

Japan is also investing in:
- Offshore wind (Mitsubishi Heavy, Hitachi)
- Nuclear restarts (Toshiba, Mitsubishi Heavy)
- Hydrogen infrastructure (Kawasaki Heavy)

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'inbound-theme',
    category: 'Theme',
    tag: 'Inbound Tourism',
    title: 'Inbound Tourism Theme: Record Visitors and Japan's Consumption Boom',
    date: '2026/04/01',
    summary: 'Japan welcomed over 35M foreign visitors in 2024. Weak yen and pent-up demand are driving spending at hotels, department stores, and theme parks. We analyze the key stocks and outlook.',
    body: `
## Japan's Inbound Tourism Boom

Japan hit a record 35M+ inbound tourists in 2024, driven by:
- **Weak yen**: Makes Japan ~30–40% cheaper for foreign visitors vs. 2019
- **Post-COVID pent-up demand**
- **New routes**: More direct flights from Asia, Middle East, and Europe

---

## Key Beneficiaries

| Category | Companies | Tickers |
|---|---|---|
| Hotels/Resorts | Hoshino Resorts REIT | 3287 |
| Department stores | Takashimaya, Isetan Mitsukoshi | 8233, 3099 |
| Theme parks | Oriental Land (Tokyo Disney) | 4661 |
| Cosmetics | Shiseido, Kosé | 4911, 4922 |
| Sake/Whisky | Suntory (unlisted), Asahi | 2502 |
| Duty-free | Laox | 8202 |

---

## Risks

- Yen appreciation would reduce the price advantage for foreign visitors
- Overtourism backlash in Kyoto, Osaka causing policy changes
- Concentration in urban areas; rural Japan has not benefited as much

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'banking-finance-theme',
    category: 'Theme',
    tag: 'Banking/Finance',
    title: 'Banking & Finance Theme: Japan's Rate Hike Cycle and Bank Profitability',
    date: '2026/04/01',
    summary: 'After 25 years of near-zero rates, the Bank of Japan is raising rates. This structurally improves net interest margins for Japanese megabanks and regional banks. We analyze the opportunity.',
    body: `
## Japan's Historic Rate Normalization

The Bank of Japan began raising rates in 2024 for the first time in 17 years. Even small rate increases dramatically improve bank profitability:

- A 1% rate increase can add ¥500B+ to Mitsubishi UFJ's net interest income
- Regional banks benefit from fixed-rate loan repricing
- Insurance companies benefit from higher bond yields

---

## Key Stocks

| Company | Ticker | Notes |
|---|---|---|
| Mitsubishi UFJ Financial | 8306 | Largest Japanese bank by assets |
| Sumitomo Mitsui Financial | 8316 | Strong fee income, overseas expansion |
| Mizuho Financial | 8411 | Digital transformation leader |
| Concordia Financial | 7186 | Top regional bank |

---

## Risk: BOJ Policy Reversal

If Japan's economy slows or the yen strengthens too rapidly, the BOJ may pause rate hikes. Inflation data and wage growth are key indicators to watch.

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
  {
    id: 'optical-communication',
    category: 'Theme',
    tag: 'Optical Communication',
    title: 'Optical Communication Theme: AI Datacenter Bandwidth Demand and Japanese Leaders',
    date: '2026/04/01',
    summary: 'AI datacenters require massive bandwidth between servers. Japanese optical fiber and component manufacturers — Fujikura, Sumitomo Electric — are benefiting from this structural shift.',
    body: `
## Why AI Needs Optical Communication

Training large AI models requires extremely high-speed data transfer between thousands of GPUs. Copper interconnects are too slow and hot for this — **optical fiber** is the only solution.

Japanese companies hold dominant positions in:
- **Optical fiber**: Sumitomo Electric, Fujikura (top 3 globally)
- **Optical modules**: Sumitomo Electric Industries, Oclaro Japan
- **Network equipment**: NTT DATA, Fujitsu

---

## NTT's IOWN Network

NTT is developing the **IOWN (Innovative Optical and Wireless Network)** — an all-photonics network that transmits data using light instead of electricity. This could revolutionize datacenter architecture and is a major long-term investment theme.

---

## Key Stocks

| Company | Ticker | Role |
|---|---|---|
| Fujikura | 5803 | Optical fiber, cables |
| Sumitomo Electric Industries | 5802 | Optical fiber, components |
| NTT | 9432 | IOWN infrastructure |
| Furukawa Electric | 5801 | Optical fiber |

> **Disclaimer**: This column is for informational purposes only and does not constitute investment advice.
`,
  },
]

export default COLUMNS
