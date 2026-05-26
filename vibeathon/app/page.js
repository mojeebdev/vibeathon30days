import { useState, useEffect } from "react";

const builds = [
  {
    day: 1,
    name: "PitchSlap",
    tagline: "AI VC that roasts your startup idea — then tells you how to fix it.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a single-page web app called PitchSlap.

CORE IDEA:
The user pastes their startup idea (2–5 sentences). The app runs it through an AI model playing the role of a brutally honest seed-stage VC. The output has two sections: [THE ROAST] — 3–4 sentences of honest, sharp critique with no sugarcoating; [THE FIX] — 3 actionable, specific improvements the founder must address before the next pitch.

DESIGN:
- Dark background (#0A0908), accent color red (#ff3434) for the roast section, green (#34ff8a) for the fix section
- Monospace font for the AI output to feel like a terminal response
- Single-page, one input textarea, one "Slap My Pitch" CTA button
- Output appears with a typewriter animation

TECH:
- Next.js App Router (or plain HTML/vanilla JS if simple)
- Claude API (claude-sonnet model) with a system prompt that forces the VC persona
- No auth, no DB — stateless, one interaction per session

SYSTEM PROMPT FOR AI:
"You are a brutally honest seed-stage venture capitalist who has seen 10,000 pitches. You do not use motivational language. When you receive a startup idea, respond ONLY in this JSON format: { 'roast': '3-4 sentence brutal critique', 'fix': ['actionable fix 1', 'actionable fix 2', 'actionable fix 3'] }. Be specific, not generic."

DEPLOY: Vercel. Add a Share to X button that generates a tweet: "Just got my pitch slapped 😭 [roast excerpt] — fixed it with PitchSlap [url]"`
  },
  {
    day: 2,
    name: "GhostForms",
    tagline: "Anonymous feedback forms. AI summarizes everything. You only see the truth.",
    category: "SaaS",
    stack: "Next.js · Supabase · Claude API",
    prompt: `Build a micro-SaaS called GhostForms.

CORE IDEA:
A user creates an anonymous feedback form (just a title + description + link). They share the link. Anyone can submit responses without logging in. Once per day, an AI summary digest is generated from all new responses and shown on the creator's private dashboard.

FEATURES:
- Form creation: title, description, up to 5 custom questions (text only)
- Shareable link: /f/[slug] — fully anonymous, no user tracking
- Creator dashboard: view raw responses + AI-generated daily digest
- AI digest prompt: "Summarize these feedback responses into 3 key themes, 1 surprising insight, and 1 recommended action. Be direct."
- No auth for responders. Simple email/magic-link auth for creators.

TECH:
- Next.js App Router
- Supabase (forms table, responses table, digests table)
- Claude API for digest generation (triggered manually or via cron)
- No payment gate for MVP — free, no limits

DESIGN:
- Clean, minimal. White or very light gray background.
- Ghost/invisible aesthetic — the product is about anonymity
- Monospace font for responses to feel raw and unfiltered

DEPLOY: Vercel. Add an OG image for the shared form link.`
  },
  {
    day: 3,
    name: "ChainCV",
    tagline: "Your GitHub + wallet history turned into a visual on-chain résumé.",
    category: "Web3",
    stack: "Next.js · Wagmi · GitHub API · Base",
    prompt: `Build a web app called ChainCV.

CORE IDEA:
The user connects their GitHub username and EVM wallet. The app fetches their GitHub stats (repos, commits, top languages, streak) and on-chain activity (tx count, NFTs held, protocols interacted with on Base). It renders a beautiful visual CV card. The user can mint it as a soulbound ERC-721 NFT on Base.

DATA SOURCES:
- GitHub REST API (public data only — repos, languages, commit activity)
- Basescan API or Alchemy for wallet activity
- Combine into a structured "CV object"

CV CARD LAYOUT:
- Name/ENS name top-left
- GitHub stats: total commits, top 3 languages, most starred repo
- On-chain stats: wallet age, total txs, chains active on, NFTs held
- A "vibe score" computed from activity — purely aesthetic, 0–100
- Shareable as PNG (use html2canvas or similar)

MINT:
- Simple ERC-721 contract on Base with soulbound logic (transfer disabled)
- Token URI points to the generated card metadata
- One mint per wallet

DESIGN:
- Dark void background, gold accent (#f5c518) for the CV card
- Syne font for the name, Fragment Mono for all stats
- Card has a subtle holographic shimmer CSS effect

DEPLOY: Vercel + Base Mainnet. Contract on Basescan.`
  },
  {
    day: 4,
    name: "VibeScore",
    tagline: "Paste a tweet thread. Get a viral probability score with AI reasoning.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a single-purpose web app called VibeScore.

CORE IDEA:
The user pastes a tweet or thread (plain text). The AI analyzes it across 5 dimensions: Hook Strength, Emotional Pull, Shareability, Clarity, and Novelty. Each dimension gets a score (0–10) and a one-line reason. A final "Vibe Score" (0–100) is computed as a weighted average. The UI renders the scores visually.

AI SCORING PROMPT:
"You are a social media virality analyst. Analyze this tweet/thread across 5 dimensions: Hook Strength (how compelling is the first line?), Emotional Pull (does it trigger emotion?), Shareability (would people retweet?), Clarity (is the message clear?), Novelty (is this take fresh?). Score each 0–10. Respond ONLY in JSON: { hook: {score, reason}, emotion: {score, reason}, shareability: {score, reason}, clarity: {score, reason}, novelty: {score, reason}, total: number }"

UI:
- 5 animated score bars that fill up on result load
- Color coding: 0–4 red, 5–7 amber, 8–10 green
- Final Vibe Score displayed huge in the center (like a dial/gauge)
- One-line AI verdict below the score: e.g., "Strong hook, weak novelty. Post it but tweak the angle."
- Share to X button: "My thread scored [X]/100 on VibeScore 🔥 [url]"

DESIGN:
- Black background, neon green (#00ff88) accent
- Cabinet Grotesk for the score numbers
- Minimalist, no clutter

DEPLOY: Vercel.`
  },
  {
    day: 5,
    name: "TimeVault",
    tagline: "Write a letter to your future self. Lock it on-chain. Unlock it on a date you set.",
    category: "Web3",
    stack: "Next.js · Viem · Solidity · Base",
    prompt: `Build a dApp called TimeVault.

CORE IDEA:
The user writes a message to their future self. They set an unlock date (minimum 30 days from now). The message is encrypted client-side and stored in a smart contract on Base. The contract prevents reading the message until the block timestamp exceeds the unlock date. On unlock, the user decrypts and reads it.

SMART CONTRACT:
- Mapping: wallet address → { encryptedMessage, unlockTimestamp, isUnlocked }
- createVault(encryptedMessage, unlockTimestamp) — stores message
- openVault() — requires block.timestamp >= unlockTimestamp, returns message
- One vault per wallet for MVP

ENCRYPTION:
- Client-side AES encryption using the user's wallet signature as the key seed
- The encrypted blob is stored on-chain; only the wallet owner can decrypt

FRONTEND:
- Step 1: Connect wallet
- Step 2: Write message (textarea), pick date (date picker, min +30 days)
- Step 3: Encrypt → submit to contract
- Step 4: Vault sealed screen — countdown to unlock date
- Step 5 (on unlock date): Decrypt and reveal message with a cinematic "vault opening" animation

DESIGN:
- Deep navy background (#060a14), gold accent (#f5c518)
- Cormorant SC font — luxurious, time-anchored feel
- Vault door animation on open (CSS transform)

DEPLOY: Vercel + Base Mainnet. Verify contract on Basescan.`
  },
  {
    day: 6,
    name: "MoodMint",
    tagline: "Describe your mood. AI generates art from it. Mint it before the feeling fades.",
    category: "NFT / AI",
    stack: "Next.js · Claude API · DALL-E / Replicate · Base",
    prompt: `Build a dApp called MoodMint.

CORE IDEA:
The user types a raw emotional state in plain language (e.g., "I feel like I'm standing at the edge of something huge but I'm scared to jump"). An AI pipeline: (1) interprets the emotion and generates an image prompt, (2) generates an abstract SVG or raster art piece, (3) lets the user mint it as an ERC-721 NFT on Base with their text as metadata.

PIPELINE:
Step 1 — Emotion → Prompt: Claude API converts the raw text into a DALL-E image prompt. System prompt: "You are an abstract art director. Convert this emotional description into a vivid, abstract image generation prompt. Focus on color palette, texture, form — not literal imagery. Max 100 words."
Step 2 — Prompt → Image: Replicate API (SDXL or similar) or DALL-E generates the art
Step 3 — Image → NFT: User previews the art, clicks "Mint My Mood", transaction goes to Base

METADATA:
- name: "Mood #[tokenId]"
- description: the user's original emotional text
- image: IPFS-pinned generated image (use NFT.Storage or Pinata)
- attributes: [{ trait_type: "Emotion", value: AI-detected primary emotion }]

DESIGN:
- Near-black bg, the generated art piece is the hero visual
- Clash Display font — expressive, collector energy
- Emotion input is minimal: just a large textarea, centered

DEPLOY: Vercel + Base Mainnet.`
  },
  {
    day: 7,
    name: "SoloPR",
    tagline: "AI press release generator built specifically for indie hackers and solo founders.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a tool called SoloPR.

CORE IDEA:
Solo founders never write press releases because it feels corporate and wrong. This tool makes it feel natural. The user fills in a structured form (product name, what it does, who it's for, the big number/milestone, launch date, quote from founder). The AI generates a polished 400-word press release formatted for distribution.

FORM FIELDS:
- Product name
- One sentence: what does it do?
- Who is it for?
- Your milestone/number (e.g., "500 waitlist signups", "£10k MRR", "1,000 users")
- Launch or announcement date
- Your founder quote (optional — AI will generate one if blank)
- Your Twitter/X handle

AI PROMPT:
"Write a press release for an indie hacker product launch. Tone: confident, direct, human — not corporate jargon. Structure: headline, dateline, opening paragraph (the news), body (what it does and why it matters), founder quote, boilerplate (one sentence about the founder/studio), contact info. Use the provided data. Max 400 words."

OUTPUT UI:
- Formatted press release in a clean readable layout
- Copy to clipboard button
- Download as .txt
- Share excerpt to X button

DESIGN:
- Newspaper/editorial aesthetic — cream background (#f8f5ee), black text
- Playfair Display + DM Mono for that editorial print feel

DEPLOY: Vercel.`
  },
  {
    day: 8,
    name: "TweetAutopsy",
    tagline: "Paste a viral tweet. Get a surgical breakdown of exactly why it worked.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a tool called TweetAutopsy.

CORE IDEA:
The user pastes the text of a viral tweet (or thread). The AI performs an "autopsy" — dissecting it across multiple angles to reveal the structural and psychological mechanisms that made it spread.

AUTOPSY SECTIONS:
1. The Hook Anatomy — what specifically made the first line stop the scroll
2. Psychological Triggers — which human triggers it activated (FOMO, identity, curiosity, controversy, relatability, etc.)
3. Structural Blueprint — the template underneath it (list? hot take? story? data drop?)
4. The X Factor — the one thing that made this specific tweet different from 1,000 similar ones
5. Steal This — a reusable template the user can apply to their own content

AI SYSTEM PROMPT:
"You are a viral content strategist who has analyzed 100,000+ tweets. Given a tweet or thread, perform a complete structural and psychological autopsy. Be specific and tactical, not generic. Identify the exact mechanisms. Format your response as JSON with keys: hook_anatomy, psychological_triggers (array), structural_blueprint, x_factor, steal_this_template."

UI:
- Each section unfolds like a medical report
- Monospace font for the "steal this template" section
- Dark theme, red accent — surgical/forensic aesthetic

DEPLOY: Vercel. Add "Analyze Another" to reset state.`
  },
  {
    day: 9,
    name: "BlockBio",
    tagline: "On-chain link-in-bio. Wallet-connected. NFT gallery built-in. Fully yours.",
    category: "Web3",
    stack: "Next.js · Wagmi · Alchemy API · Base",
    prompt: `Build a dApp called BlockBio.

CORE IDEA:
A link-in-bio tool but on-chain-native. The user connects their wallet, fills in their profile (name, bio, links), and their data is stored in a simple smart contract or Supabase keyed to wallet address. Their public page shows: profile info, live NFT gallery (pulled from their wallet), live token holdings, and custom links.

SMART CONTRACT (or Supabase fallback):
- Store: name, bio, links[], avatar_ipfs_hash
- Read: public page uses wallet address as slug → /0x1234...

PUBLIC PAGE (/[address]):
- ENS name resolution (show ENS if available, else truncated address)
- Avatar (ENS avatar or uploaded)
- Bio text
- Custom links (with icons)
- NFT Gallery section: last 6 NFTs held (via Alchemy NFT API)
- "On-Chain Since" — wallet creation date estimate

EDIT PAGE (wallet-gated):
- Simple form to update all profile fields
- IPFS upload for avatar (Pinata)

DESIGN:
- Void dark background, each section has a subtle glass card
- Syne font for the name, Fragment Mono for wallet address/stats
- Clean, minimal — the wallet/NFTs are the content

DEPLOY: Vercel + Base. Optional: ENS text record integration.`
  },
  {
    day: 10,
    name: "NightWatch",
    tagline: "Monitor competitor GitHub repos. Get a Telegram alert the moment they ship something specific.",
    category: "Dev Tool",
    stack: "Python · FastAPI · GitHub API · Telegram Bot",
    prompt: `Build a tool called NightWatch.

CORE IDEA:
A developer inputs a GitHub repo URL and a set of keywords or file paths they want to watch (e.g., "payments", "auth", "openai", "/api/routes"). A background job checks the repo's commit history every hour. If a new commit matches any keyword, a Telegram message is sent immediately.

FEATURES:
- Web UI (or Telegram-only interface): add/remove repos to watch
- Keyword matching against commit messages + file diffs
- Telegram bot for instant alerts: "🚨 [repo] just committed something matching 'payments': [commit message] [link]"
- Dashboard showing last 10 matched commits per repo

TECH STACK:
- Python + FastAPI backend
- GitHub REST API (polling commits/events endpoint)
- python-telegram-bot for notifications
- APScheduler for hourly checks
- SQLite or Supabase for persistence (repos, keywords, matches)
- Simple frontend (HTML + HTMX, or React) for adding repos

TELEGRAM ALERT FORMAT:
"🔎 NightWatch Alert
Repo: [owner/repo]
Keyword matched: '[keyword]'
Commit: [message]
Author: [github username]
Time: [timestamp]
→ View: [commit url]"

DEPLOY: Railway (always-on polling). Keep it lean — this is a dev tool, not a startup.`
  },
  {
    day: 11,
    name: "ColdScript",
    tagline: "Paste a Twitter profile. Get a hyper-personalized cold DM that doesn't feel cold.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Twitter/X scrape",
    prompt: `Build a tool called ColdScript.

CORE IDEA:
Cold DMs fail because they're generic. The user pastes a Twitter/X profile URL (or username). The app fetches their recent tweets and bio. Claude analyzes their content, tone, interests, and recent activity, then generates 3 cold DM variants calibrated to that specific person.

DATA INPUT:
- Twitter username (user pastes manually or provides URL)
- The user's pitch/ask (what are they reaching out about? Max 2 sentences)
- Desired outcome: collaboration, advice, partnership, job, sales

SINCE WE CAN'T SCRAPE TWITTER LIVE:
- Ask the user to paste the target's bio + 3–5 recent tweets manually (simple textarea)
- This is the MVP — no API dependency

AI PROCESSING:
- Analyze tone: formal, casual, technical, philosophical, humorous
- Identify interests from tweets
- Generate 3 DM variants: Direct, Curious, Value-First
- Each DM: max 3 sentences. No "I hope this finds you well." No generic openers.

AI SYSTEM PROMPT:
"You are an expert at crafting personalized outreach. You never write generic openers. Every DM must reference something specific from the target's content. Generate 3 variants. Format as JSON: { direct: string, curious: string, value_first: string }"

UI:
- Step 1: Paste bio + tweets
- Step 2: Describe your ask
- Step 3: Pick outcome type
- Step 4: 3 DM cards with copy buttons

DEPLOY: Vercel.`
  },
  {
    day: 12,
    name: "FounderFit",
    tagline: "10 questions. Discover your founder archetype. Know your actual edge.",
    category: "SaaS",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a quiz app called FounderFit.

CORE IDEA:
10 scenario-based questions reveal the user's true founder archetype. Not generic Myers-Briggs vibes — this is specifically calibrated to the 6 real startup archetypes: The Builder, The Distributor, The Visionary, The Operator, The Hustler, The Niche Dominator. The result includes: archetype name, strengths, blind spots, best business model fit, and 3 founders who match this archetype.

THE 10 QUESTIONS (scenario-based, multiple choice A/B/C):
1. You have 4 free hours. You...
2. Your first instinct when a product has no users is...
3. What energizes you most in a build?
4. You'd rather have: 10,000 Twitter followers OR 100 paying customers?
5. When something breaks in production at 2am, you...
6. Your co-founder wants to pivot. You...
7. You'd describe your edge as...
8. Your dream exit is...
9. When building, you start with...
10. Your relationship with code is...

SCORING:
Each answer maps to archetype weights. After 10 questions, tally scores per archetype, return top match + secondary match.

RESULT PAGE:
- Archetype name (large, bold)
- 1-paragraph description
- Strengths: 3 bullet points
- Blind spots: 2 bullet points
- Best business models for this archetype
- "Famous founders like you": 3 real names with short context
- Share to X: "I'm a [Archetype] founder. Take the test → [url]"

DESIGN:
- Dark background, each question fills the screen (full-page card transitions)
- Progress bar at top
- Bold, editorial typography — Cabinet Grotesk

DEPLOY: Vercel. Make it shareable (result has unique URL via query params).`
  },
  {
    day: 13,
    name: "PromptBank",
    tagline: "Your personal prompt library. Versioned. Tagged. Always one click away.",
    category: "Productivity",
    stack: "Next.js · Supabase · Tailwind",
    prompt: `Build a personal tool called PromptBank.

CORE IDEA:
A private, minimal prompt library where the user saves their best prompts, organizes them by tag/category, and accesses them instantly. Supports versioning (v1, v2 of a prompt), performance notes, and one-click copy.

FEATURES:
- Add prompt: title, body, tags (multi-select), model target (Claude/GPT/Gemini), notes
- List view: searchable, filterable by tag
- Version history: edit a prompt and it saves v1, v2, etc. — you can roll back
- Performance note: a free-text field to write "this worked well for X"
- One-click copy to clipboard
- Keyboard shortcut: Cmd+K to open search

TECH:
- Next.js App Router
- Supabase (prompts table, versions table)
- NextAuth or Supabase Auth (email/magic link)
- No AI features — this is a pure human tool

DATABASE SCHEMA:
prompts: id, user_id, title, current_body, tags[], model_target, notes, created_at
prompt_versions: id, prompt_id, version_number, body, created_at

DESIGN:
- Dark mode default (#0d0d12 bg, #7b54ff accent for BlindspotLab signature)
- Monospace font for the prompt body — it's code, treat it like code
- Clean list layout — like Notion's database view but lighter

EXTRAS:
- Export all prompts as JSON
- Import prompts from JSON

DEPLOY: Vercel + Supabase.`
  },
  {
    day: 14,
    name: "SeedDeck",
    tagline: "One-line idea → full seed-stage pitch deck. AI-generated. Download-ready.",
    category: "AI Tool",
    stack: "Next.js · Claude API · PPTX or HTML slides",
    prompt: `Build a tool called SeedDeck.

CORE IDEA:
The user types one sentence describing their startup idea. The AI generates all 10 slides of a seed-stage pitch deck — structured, investor-ready, with real content. The output renders as a web-based slide deck and can be downloaded as HTML or copied slide by slide.

THE 10 SLIDES AI GENERATES:
1. Cover: Company name + one-line tagline
2. Problem: The specific pain, with a relatable framing
3. Solution: What you built and how it works
4. Market Size: TAM/SAM/SOM (AI estimates with reasoning)
5. Product: Key features (3 bullets per feature)
6. Business Model: How you make money
7. Traction: Placeholder or "here's what to put here" guidance
8. Competition: 2x2 matrix description (text format)
9. Team: Prompt user to fill in — AI leaves placeholders
10. Ask: Funding amount + use of funds breakdown

AI PROMPT:
"You are a seed-stage startup advisor. Given this idea: [idea], generate a complete 10-slide pitch deck. For each slide, provide: title, headline (1 line), content (3–5 bullet points or short paragraphs). Be specific, not generic. Use realistic market framing. Respond in JSON array format: [{slide_number, title, headline, content}]"

UI:
- Slide-by-slide preview (left nav, right content)
- Edit mode: user can click any text block and edit
- Download: HTML export or copy as markdown

DESIGN:
- Clean dark presentation theme
- Chillax font for slide titles — AI product energy

DEPLOY: Vercel.`
  },
  {
    day: 15,
    name: "NFTRoast",
    tagline: "Drop an NFT contract address. AI analyzes, evaluates, and absolutely roasts it.",
    category: "Web3 / AI",
    stack: "Next.js · Alchemy API · Claude API · Base",
    prompt: `Build a tool called NFTRoast.

CORE IDEA:
The user pastes an EVM NFT contract address. The app fetches collection metadata (floor price, total supply, holders, recent sales, traits distribution). Claude then writes: (1) a serious technical/market analysis, and (2) a sharp, comedic roast of the project. Both are shown side by side.

DATA FETCHING:
- Alchemy NFT API: collection metadata, floor price, holder count, total minted
- OpenSea API (or Reservoir): recent sales volume, listing count
- Trait distribution if available

SERIOUS ANALYSIS (Claude):
- Holder concentration (whale risk)
- Liquidity assessment
- Utility and roadmap signals from metadata
- Market sentiment: floor vs. mint price history
- One-line verdict: "Buy / Hold / Exit / Avoid"

ROAST (Claude):
- 3–4 sentences of sharp, funny critique
- Targets: art quality signals, roadmap promises, Discord activity, token name, supply size
- Style: not mean-spirited, but genuinely funny — like a crypto Twitter reply guy

AI SYSTEM PROMPT:
"You are simultaneously a sober NFT market analyst AND a crypto Twitter comedian. Given this collection data: [data], produce: { analysis: {holder_risk, liquidity, utility_signals, verdict}, roast: 'funny 3-4 sentence takedown' }. The roast should be witty, not malicious."

UI:
- Split screen: left = serious, right = roast (with laugh emoji accents)
- Dark bg, Clash Display font

DEPLOY: Vercel.`
  },
  {
    day: 16,
    name: "MicroOracle",
    tagline: "Input a niche keyword. Get 5 validated micro-SaaS ideas with demand proof.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Web Search API",
    prompt: `Build a tool called MicroOracle.

CORE IDEA:
The user inputs a niche (e.g., "podcast editors", "Nigerian real estate agents", "Shopify store owners"). The AI generates 5 micro-SaaS ideas for that niche — each with a name, description, evidence of demand, suggested price point, and a build complexity rating (1–5).

FOR EACH IDEA, AI OUTPUTS:
- Product name
- One-sentence description
- Who pays and why (the exact buyer persona)
- Demand signal: where this pain shows up (Reddit threads, job boards, tweets — AI cites type, not hallucinated links)
- Pricing suggestion: $X/mo, why
- Build complexity: 1 (2 days) to 5 (2 months)
- Unfair advantage: who is best-positioned to build this?

AI SYSTEM PROMPT:
"You are a micro-SaaS idea validator. Given this niche: [niche], generate 5 distinct micro-SaaS product ideas. For each, think deeply about: who has money and pain in this niche, what workflows are broken, what tools they currently cobble together. Respond ONLY in JSON array: [{name, description, buyer_persona, demand_signal, pricing, build_complexity, unfair_advantage}]. Be specific to the niche — no generic 'AI assistant' ideas."

UI:
- Input: single text field + "Oracle, Speak" button
- 5 idea cards in a grid
- Each card is expandable for full detail
- Filter by build complexity (1–5 stars)
- Save ideas (localStorage)

DESIGN:
- Dark mystical aesthetic — deep purple (#1a0a2e), gold accents
- Boska font for idea names

DEPLOY: Vercel.`
  },
  {
    day: 17,
    name: "BreakPoint",
    tagline: "Pomodoro timer that generates a new build idea for every break you take.",
    category: "Productivity / AI",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build an app called BreakPoint.

CORE IDEA:
A Pomodoro timer (25 min work / 5 min break). But every time a break starts, the app calls Claude API and generates a fresh micro build idea tailored to the user's declared focus area. The idea is shown during the break. The user can save it to a "Vault" or dismiss it. Over time, the vault becomes a personal idea backlog.

FEATURES:
- Pomodoro timer: 25/5 configurable, start/pause/reset
- On break start: API call generates one build idea (category, name, description, estimated build time)
- Idea shown with animation during break — the user reads it while resting
- Save to Vault: persisted in localStorage
- Vault page: all saved ideas, with a "build this" toggle

AI PROMPT FOR IDEA GENERATION:
"Generate one specific, buildable product idea that a solo developer could ship in 1–7 days. Category: [user's focus area, e.g., 'AI tools', 'Web3', 'productivity']. Output as JSON: { name, category, one_line_description, why_it_works, estimated_days_to_build }"

USER SETUP:
- Before first session: "What are you building for?" (tags: AI, Web3, SaaS, Games, Utilities)
- This context is passed to the AI each time

DESIGN:
- Full-screen timer — minimal, focused
- Work mode: dark, calm (#0a0a0f bg, subtle breathing animation on timer)
- Break mode: the background shifts to a warm tone, idea card slides in
- Cabinet Grotesk for the timer numerals

DEPLOY: Vercel. PWA-enabled so it works as a mobile app.`
  },
  {
    day: 18,
    name: "ChainLog",
    tagline: "Your public build log, stored on-chain. Immutable. Forever.",
    category: "Web3",
    stack: "Next.js · Viem · Solidity · Base",
    prompt: `Build a dApp called ChainLog.

CORE IDEA:
A builder writes daily build log entries. Each entry is stored on-chain as an immutable record. The public page becomes a transparent, uncensorable record of their shipping journey. No one can edit history. No platform can delete it.

SMART CONTRACT:
- Mapping: wallet → LogEntry[]
- struct LogEntry { uint256 timestamp, string projectName, string entry, uint256 dayNumber }
- addEntry(projectName, entry) public — appends to the sender's log
- getLog(address) public view returns LogEntry[]
- One entry per day enforced (block.timestamp check)

FRONTEND:
- Connect wallet
- Write today's log: project name + entry text (max 500 chars — keep it lean)
- Submit → transaction → confirmed → log updated
- Public profile page: /log/[address] — shows all entries in reverse chronological order
- Visual streak counter (consecutive days logged)
- On-chain "shipping since" date (first entry timestamp)

DESIGN:
- Terminal/log aesthetic: dark bg (#0a0a0a), green monospace text (#00ff41)
- IBM Plex Mono for all log entries — authentic log feel
- Entries look like git commit messages

SHARE:
- Share today's entry as a tweet with the public URL

DEPLOY: Vercel + Base Mainnet. Contract verified on Basescan.`
  },
  {
    day: 19,
    name: "ShipTape",
    tagline: "Record a 60-second voice memo. Get a complete product spec doc back.",
    category: "AI Tool",
    stack: "Next.js · Whisper API · Claude API · Tailwind",
    prompt: `Build a tool called ShipTape.

CORE IDEA:
The user records up to 60 seconds of themselves talking about a product idea — raw, unstructured, stream of consciousness. The app transcribes it (Whisper), then Claude structures it into a complete product spec document.

FLOW:
1. Record button (browser MediaRecorder API, max 60 seconds)
2. Upload audio to OpenAI Whisper API → transcription
3. Pass transcription to Claude with structuring prompt
4. Output: full product spec doc

SPEC DOC STRUCTURE (Claude generates):
- Product Name (AI-suggested based on idea)
- Problem Statement
- Target User
- Core Features (MVP scope — max 5)
- Non-Features (what this is NOT)
- Tech Stack Recommendation
- Success Metric (how do you know it worked?)
- First 3 Build Steps

AI SYSTEM PROMPT:
"You are a product manager and technical architect. You will receive a raw, unstructured voice transcription of a product idea. Extract signal from the noise and produce a clean, actionable product spec. Do not add features that weren't mentioned. Fill gaps with the simplest possible assumption. Output as structured markdown."

UI:
- Giant microphone button in the center
- Recording visualization (audio waveform using Web Audio API)
- Loading state after recording: "Transcribing... Structuring..."
- Spec doc appears with download as .md option

DESIGN:
- Minimal, distraction-free
- Red recording indicator dot (pulsing)
- Chillax + Geist Mono

DEPLOY: Vercel.`
  },
  {
    day: 20,
    name: "LastCommit",
    tagline: "Your latest GitHub commit as a beautiful, shareable card. For builders who ship.",
    category: "Dev Tool",
    stack: "Next.js · GitHub API · Canvas/OG",
    prompt: `Build a tool called LastCommit.

CORE IDEA:
The user enters their GitHub username. The app fetches their most recent commit across all public repos. It renders a beautiful card showing: repo name, commit message, timestamp, languages used, and a GitHub contribution graph snippet. The card is shareable as an image or tweet.

DATA FROM GITHUB API:
- Latest commit: repo, message, timestamp, SHA (first 7 chars)
- Repo language
- User avatar + bio
- Contribution streak (approximate via events API)

CARD DESIGN:
- Dark card with subtle gradient
- Top: user avatar + username + "Last Shipped"
- Center: commit message in large monospace
- Bottom left: repo name + language badge
- Bottom right: timestamp ("3 hours ago")
- Background: abstract noise texture generated from the commit SHA as a seed

SHARING:
- "Share to X" pre-fills: "Last shipped: [commit message] → [repo] [url]"
- Download as PNG (Satori/html2canvas for card rendering)
- Permalink: /commit/[username] — always shows latest

DESIGN:
- Dark card, subtle void bg
- JetBrains Mono for commit message (this is sacred)
- Multiple card themes: Void (dark), Terminal (green on black), Cream (editorial light)

EXTRAS:
- Auto-refresh on page load (always latest commit)
- "vs yesterday" — shows if today's commit is more/less activity than yesterday

DEPLOY: Vercel. OG image auto-generated from card.`
  },
  {
    day: 21,
    name: "GasAlert",
    tagline: "Set your ETH gas threshold. Get a Telegram ping the moment fees drop below it.",
    category: "Web3 Tool",
    stack: "Python · FastAPI · Telegram Bot · Alchemy",
    prompt: `Build a tool called GasAlert.

CORE IDEA:
Users set a max gas price threshold (in Gwei). A background service polls the Ethereum network every 2 minutes. When base fee drops below the threshold, a Telegram message is sent instantly.

FEATURES:
- Web UI or Telegram-only setup:
  - /start → "What's your gas threshold in Gwei?" → saves to DB
  - /update [number] → update threshold
  - /status → shows current gas and your threshold
  - /stop → pause alerts
- Alert message: "⛽ Gas is now [X] Gwei — below your threshold of [Y] Gwei. Go transact: [etherscan gas tracker link]"
- Alert rate limiting: max 1 alert per 30 minutes (prevent spam)

TECH:
- Python + FastAPI
- Alchemy or Infura for gas price polling (eth_gasPrice or fee history endpoint)
- python-telegram-bot
- APScheduler: poll every 2 minutes
- SQLite: user_id → threshold, last_alert_at, is_active

BONUS:
- Also support Base network gas alerts
- "Gas history" command: /history → chart of last 24h gas prices (ASCII chart in Telegram)

POLLING LOGIC:
- Fetch current base fee
- Loop through all users with is_active = True
- If base_fee < threshold AND (now - last_alert_at) > 30 min: send alert, update last_alert_at

DEPLOY: Railway (always-on). Single Python file + requirements.txt.`
  },
  {
    day: 22,
    name: "VibeCV",
    tagline: "Describe yourself in plain language. Get a live portfolio page in 30 seconds.",
    category: "AI / SaaS",
    stack: "Next.js · Claude API · Supabase",
    prompt: `Build a tool called VibeCV.

CORE IDEA:
The user writes a short paragraph about themselves — no structure required ("I'm a self-taught developer from Lagos, I've shipped 18 products, I love Web3 and AI, I build under BlindspotLab"). The AI parses this into structured portfolio data. A beautiful one-page site is generated instantly, live at a subdomain.

AI PARSING (Claude):
Input: free text paragraph
Output JSON: { name, title, location, bio_short, skills[], projects[{name, description, url}], social_links{}, headline }

PAGE GENERATION:
- Take the parsed JSON, render a styled portfolio page
- User can preview, then claim a subdomain: /cv/[slug]
- Saved to Supabase, accessible publicly

EDIT MODE:
- After generation, the user can click any section to edit inline
- Changes saved to Supabase immediately

PAGE SECTIONS:
- Hero: name + title + one-line bio
- Skills: tag cloud
- Projects: card grid (AI-filled from their description)
- Contact: social links from their text

DESIGN:
- Two theme options: Void (dark) and Cream (editorial light)
- Boska font for the name — it's a portfolio, make it signature
- The page looks like it was designed by a real designer, not a form

DEPLOY: Vercel + Supabase. Subdomains via Vercel wildcard routing.`
  },
  {
    day: 23,
    name: "AnonBoard",
    tagline: "Anonymous public idea board. Top-voted idea gets AI-developed every week.",
    category: "Social / AI",
    stack: "Next.js · Supabase · Claude API",
    prompt: `Build an app called AnonBoard.

CORE IDEA:
A fully anonymous public board where anyone can post a product idea (no account needed). Ideas are upvoted by visitors. Every Sunday, the top-voted idea gets AI-developed into a full spec + MVP scope + landing page copy. The "developed" idea is pinned at the top of the board.

FEATURES:
- Post an idea: title + description (max 280 chars). No login.
- Upvote: one vote per IP per idea (simple IP hash)
- Weekly winner: cron job every Sunday, top-voted idea auto-triggers Claude
- AI development output: { product_name, problem, solution, mvp_features, suggested_stack, landing_page_headline, landing_page_subtext }
- Winner page: /winner/[week] — shows the developed idea
- All past winners archived

DB SCHEMA (Supabase):
- ideas: id, title, description, votes, created_at, ip_hash
- winners: id, week_number, idea_id, ai_output, created_at

MODERATION:
- Simple keyword filter (no profanity)
- Report button → flags idea for manual review

DESIGN:
- Raw, Reddit-ish but designed
- Dark background, upvote is a fire emoji counter 🔥
- Winner banner at top — gold border, AI badge
- General Sans + Azeret Mono

DEPLOY: Vercel + Supabase. Cron via Vercel cron jobs (free tier).`
  },
  {
    day: 24,
    name: "RecapBot",
    tagline: "Send a YouTube or article URL to Telegram. Get a structured summary in 30 seconds.",
    category: "AI Bot",
    stack: "Python · Telegram Bot · Claude API · YouTube API",
    prompt: `Build a Telegram bot called RecapBot.

CORE IDEA:
The user sends any URL to the bot — YouTube video, blog post, or news article. The bot fetches the content, sends it to Claude, and replies with a structured summary: TL;DR, 3 key points, one actionable takeaway, and a credibility note.

SUPPORTED INPUTS:
- YouTube URL: fetch transcript via youtube-transcript-api (Python library)
- Web article: fetch with httpx + BeautifulSoup, extract main article text
- PDF URL: fetch and extract text (pdfplumber)

AI SUMMARY STRUCTURE:
{ tldr: "1-2 sentence summary", key_points: ["point 1", "point 2", "point 3"], takeaway: "one action to take or thing to remember", source_note: "brief context on who created this content" }

TELEGRAM OUTPUT FORMAT:
"📋 *Recap*

*TL;DR:* [tldr]

*Key Points:*
• [point 1]
• [point 2]  
• [point 3]

*Takeaway:* [takeaway]

*Source:* [source_note]"

COMMANDS:
- /start → intro + instructions
- /help → list what it can summarize
- Just send a URL → triggers recap

TECH:
- Python + python-telegram-bot
- youtube-transcript-api for YouTube
- httpx + BeautifulSoup for articles
- Claude API for summarization

DEPLOY: Railway. Polling mode. Single file app.`
  },
  {
    day: 25,
    name: "OneLiner",
    tagline: "Compress any product description into one unforgettable tagline. Instantly.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a micro-tool called OneLiner.

CORE IDEA:
The user pastes a product description (long, messy, technical — doesn't matter). The AI generates 5 tagline variants, each with a different strategic angle. The user picks their favorite, copies it, done.

THE 5 TAGLINE ANGLES:
1. Outcome-first: What life looks like after using the product
2. Contrarian: What makes it different from expected solutions
3. Audience-direct: Speaks directly to the exact user ("For [persona] who...")
4. The Simple Truth: The single most important thing, stated plainly
5. The Tension: Names the exact pain and the resolution

AI SYSTEM PROMPT:
"You are a world-class copywriter. Given this product description, generate 5 taglines — one per strategic angle: outcome_first, contrarian, audience_direct, simple_truth, tension. Each tagline must be under 12 words. No buzzwords. No 'AI-powered' or 'next-gen'. Write like David Abbott, not a startup LinkedIn post. Return JSON: { outcome_first, contrarian, audience_direct, simple_truth, tension }"

UI:
- Input: large textarea with placeholder "Describe your product. Don't worry about it being perfect."
- Output: 5 cards, each labeled with the angle name
- Each card has: tagline (large) + one-sentence explanation of why this angle works
- Copy button on each
- "Regenerate all" button

DESIGN:
- Pure minimal — white background (#fafaf8), black text
- Boska font for the tagline output — it's writing, it should feel literary
- One of the cleanest tools you've ever built

DEPLOY: Vercel. No auth, no DB — pure stateless.`
  },
  {
    day: 26,
    name: "TraitSnap",
    tagline: "Upload an image. AI reads it as NFT traits. Outputs ready-to-use metadata JSON.",
    category: "NFT / AI",
    stack: "Next.js · Claude Vision · Tailwind",
    prompt: `Build a tool called TraitSnap.

CORE IDEA:
NFT artists manually write trait metadata JSON for every piece. This is tedious. TraitSnap lets you upload any image and Claude Vision analyzes it, identifies traits across up to 8 categories (Background, Color Palette, Style, Mood, Subject, Rarity Signal, Texture, Special), and outputs a complete ERC-721 metadata JSON ready for IPFS upload.

FLOW:
1. Upload image (PNG/JPG/WebP)
2. Claude Vision analyzes it
3. Output: full metadata JSON

AI PROMPT:
"You are an NFT collection curator and metadata specialist. Analyze this image and identify traits across these categories: Background, Primary Color, Style, Mood, Subject, Texture, Special Feature, Rarity Tier (Common/Uncommon/Rare/Legendary based on visual complexity). Return ONLY valid ERC-721 metadata JSON in this exact format: { name: 'Token #[auto]', description: '[1 sentence describing the piece]', attributes: [{trait_type, value}] }"

OUTPUT UI:
- Left: image preview
- Right: formatted JSON with syntax highlighting
- Copy JSON button
- Download as .json button
- "Generate name" button: AI suggests a collection-worthy name for this specific piece

BONUS:
- Batch upload: up to 10 images, get batch metadata JSON

DESIGN:
- Drag-and-drop zone as the hero
- Dark bg, purple accent
- Clash Display for headers — mint site energy

DEPLOY: Vercel.`
  },
  {
    day: 27,
    name: "BuildBudget",
    tagline: "Describe your product idea. Get a realistic cost breakdown before you write one line of code.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Tailwind",
    prompt: `Build a tool called BuildBudget.

CORE IDEA:
Developers and non-technical founders consistently underestimate what a product costs to build and run. BuildBudget takes a product idea description and outputs a detailed cost breakdown: development time estimate, infra costs, API costs, and total first-year burn estimate.

INPUT FORM:
- Product description (free text)
- Builder type: Solo dev / Small team (2–3) / Outsourced
- Target platform: Web / Mobile / Telegram Bot / Chrome Extension
- Key features (multi-select): Auth, Payments, AI/LLM, Real-time, File upload, Email, SMS, Blockchain/Web3

AI OUTPUT:
- Dev time estimate (hours range, e.g., "40–80 hours for solo dev")
- Breakdown by phase: Design, Backend, Frontend, Testing, Deploy
- Monthly infra cost: Hosting + DB + CDN + Domain
- API cost estimate: if they selected AI: "Claude API at ~$X/1k tokens, estimated $Y/month at Z users"
- Total first-year cost range (low/high)
- One "cost trap" warning: the thing most builders forget to budget for
- One "cost saver" tip

AI PROMPT:
"You are a technical project estimator with 10 years experience in SaaS development. Given this product description and constraints, produce a realistic cost breakdown. Be honest — don't minimize to please. Return as JSON: { dev_hours, phase_breakdown, monthly_infra, api_costs, first_year_range, cost_trap, cost_saver }"

DESIGN:
- Spreadsheet-clean aesthetic — light mode works here
- DM Mono for all numbers — they're data points

DEPLOY: Vercel.`
  },
  {
    day: 28,
    name: "FlowGhost",
    tagline: "Describe an automation workflow in plain English. Get the n8n-style steps back.",
    category: "Automation / AI",
    stack: "Next.js · Claude API · React Flow",
    prompt: `Build a tool called FlowGhost.

CORE IDEA:
The user describes an automation in plain English ("When someone fills my Typeform, add them to Notion, send a Slack notification, and email them a welcome PDF"). FlowGhost parses this and generates: (1) a visual node graph of the workflow, (2) a step-by-step implementation guide, (3) the n8n JSON workflow you can import directly.

AI PARSING:
Input: plain English automation description
Output JSON:
{ 
  trigger: { type, service, event },
  steps: [{ step_number, action, service, inputs, outputs, notes }],
  n8n_workflow: { nodes[], connections[] } // simplified n8n-compatible structure
}

FRONTEND:
- Input: large textarea — "Describe your automation"
- Output tab 1: Visual node graph (React Flow library) — each node is a step, arrows show flow
- Output tab 2: Step-by-step guide in plain English
- Output tab 3: Raw JSON (download as .json for n8n import)

NODE VISUAL DESIGN:
- Trigger node: green
- Action nodes: blue  
- Condition nodes: amber
- End nodes: gray

AI SYSTEM PROMPT:
"You are an automation architect. Parse this workflow description into structured steps. Identify: the trigger, each action step (what service, what action), any conditions/branches. Output as JSON. For n8n_workflow, generate a realistic node structure matching n8n's actual format."

DESIGN:
- Dark bg, neon node colors (it's an automation tool — it should feel technical)
- Array font — grid/node energy

DEPLOY: Vercel.`
  },
  {
    day: 29,
    name: "AuditDrop",
    tagline: "Drop your website URL. Get a full UX, copy, and performance audit in 60 seconds.",
    category: "AI Tool",
    stack: "Next.js · Claude API · Playwright/Puppeteer · PageSpeed API",
    prompt: `Build a tool called AuditDrop.

CORE IDEA:
The user pastes their website URL. The app: (1) takes a screenshot, (2) fetches the page HTML, (3) pulls Google PageSpeed score, (4) sends all of this to Claude for a complete audit across UX, copy, and performance.

DATA PIPELINE:
- Screenshot: Puppeteer/Playwright headless screenshot of the homepage
- HTML: fetch the page HTML, extract main content (strip scripts/styles)
- PageSpeed: Google PageSpeed Insights API (free, just needs a key)
- Pass: screenshot (image) + extracted copy + PageSpeed scores to Claude Vision

AUDIT SECTIONS (Claude outputs):
1. First Impression (0–10 score + reason): What does a first-time visitor understand in 5 seconds?
2. Headline Analysis: Is the main headline clear? Does it communicate value?
3. Call-to-Action Audit: Is the CTA visible? Compelling? Specific?
4. Copy Quality (0–10): Too long? Too vague? Missing social proof?
5. Visual Hierarchy: Does the eye know where to go?
6. Performance: PageSpeed score interpretation + top 2 bottlenecks
7. Quick Wins: 3 specific changes that would improve conversion today

OUTPUT:
- Score cards for each section
- Detailed notes per section
- Quick wins highlighted in green
- Download as PDF

DESIGN:
- Professional/tool aesthetic — not playful
- General Sans + DM Mono
- Clean report layout

DEPLOY: Vercel. Screenshot API can use Puppeteer on a serverless function or a service like ScreenshotOne.`
  },
  {
    day: 30,
    name: "ShipOS",
    tagline: "Your personal operating system for shipping. Build log. Streak. Goals. All in one void.",
    category: "Productivity / SaaS",
    stack: "Next.js · Supabase · Tailwind · Claude API",
    prompt: `Build the final boss: ShipOS.

CORE IDEA:
A personal shipping command center. One dashboard that holds: your active projects, daily build log, streak tracker, ship goals, and an AI that gives you a daily build briefing every morning. This is your home base as a builder.

SECTIONS:

1. ACTIVE PROJECTS
- Name, description, status (Building / Shipped / Paused), stack tags
- Progress bar (manual 0–100%)
- Last updated timestamp

2. DAILY BUILD LOG
- One entry per day (today's entry is always pre-open)
- What did you build today? (textarea)
- How many hours?
- Blocker? (optional)
- Mood (emoji selector: 🔥😤😓🧠)

3. SHIP STREAK
- Consecutive days with a build log entry
- Longest streak (all-time record)
- Calendar heatmap (GitHub-style)
- Milestone badges: 7 days, 30 days, 100 days

4. SHIP GOALS
- Monthly goal: "Ship [X] products this month"
- Progress counter (manual)
- Year goal tracker

5. DAILY BRIEFING (AI)
- Runs every morning (or on demand)
- Claude reads your last 7 log entries + current projects
- Outputs: "Good morning. Here's what matters today: [focus]. Your biggest blocker is [blocker]. Suggested first task: [task]."

TECH:
- Next.js App Router + Supabase
- Supabase Auth (magic link)
- Claude API for daily briefing
- Charts: recharts for the heatmap

DESIGN:
- This is YOUR tool — make it feel like a control room
- Void background (#0A0908), purple accent (#4e24cf), warm bone text (#F5F1EB)
- Boska for the hero/header — BlindspotLab signature
- Satoshi for body copy
- JetBrains Mono for log entries
- Subtle noise texture on the background

DEPLOY: Vercel + Supabase. This one you keep forever.`
  }
];

const categories = ["All", ...new Set(builds.map(b => b.category))];

const categoryColors = {
  "AI Tool": "#7b54ff",
  "SaaS": "#34d399",
  "Web3": "#60a5fa",
  "NFT / AI": "#f472b6",
  "Web3 / AI": "#a78bfa",
  "Dev Tool": "#fb923c",
  "Web3 Tool": "#38bdf8",
  "Productivity": "#facc15",
  "Productivity / AI": "#fbbf24",
  "AI / SaaS": "#4ade80",
  "Social / AI": "#f43f5e",
  "AI Bot": "#c084fc",
  "NFT / AI": "#f472b6",
  "Automation / AI": "#22d3ee",
  "Productivity / SaaS": "#e879f9",
};

const getCategoryColor = (cat) => categoryColors[cat] || "#7b54ff";

export default function Vibeathon() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedDay, setExpandedDay] = useState(null);
  const [copied, setCopied] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = activeCategory === "All"
    ? builds
    : builds.filter(b => b.category === activeCategory);

  const copyPrompt = (day, text) => {
    navigator.clipboard.writeText(text);
    setCopied(day);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060608",
      color: "#F5F1EB",
      fontFamily: "'Satoshi', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fonts */}
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=boska@400,500,700,900&f[]=satoshi@300,400,500,700&f[]=clash-display@400,500,600,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060608; }
        ::-webkit-scrollbar-thumb { background: #4e24cf; border-radius: 2px; }

        .build-card {
          background: #0d0b12;
          border: 1px solid #1e1a2e;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .build-card:hover {
          border-color: #4e24cf;
          background: #110e1a;
          transform: translateY(-2px);
        }
        .build-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4e24cf, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .build-card:hover::before { opacity: 1; }
        
        .prompt-block {
          background: #08060e;
          border: 1px solid #1e1a2e;
          border-radius: 8px;
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          line-height: 1.8;
          color: #a89fc4;
          white-space: pre-wrap;
          word-break: break-word;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 16px;
        }

        .cat-pill {
          background: transparent;
          border: 1px solid #2a2040;
          border-radius: 100px;
          padding: 6px 16px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.15s;
          color: #8878aa;
        }
        .cat-pill:hover { border-color: #4e24cf; color: #c4b4f0; }
        .cat-pill.active { background: #4e24cf; border-color: #4e24cf; color: #fff; }
        
        .copy-btn {
          background: #1e1a2e;
          border: 1px solid #2a2040;
          border-radius: 6px;
          padding: 8px 16px;
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #8878aa;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.05em;
        }
        .copy-btn:hover { background: #4e24cf; border-color: #4e24cf; color: #fff; }
        .copy-btn.success { background: #16a34a; border-color: #16a34a; color: #fff; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }

        @keyframes glitch {
          0%, 100% { text-shadow: none; }
          20% { text-shadow: -2px 0 #4e24cf; }
          40% { text-shadow: 2px 0 #7b54ff; }
          60% { text-shadow: -1px 0 #4e24cf; }
          80% { text-shadow: 1px 0 #7b54ff; }
        }

        .noise-bg {
          position: fixed;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px;
          z-index: 0;
        }

        .glow-orb {
          position: fixed;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(78,36,207,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* Background effects */}
      <div className="noise-bg" />
      <div className="glow-orb" style={{ top: '-200px', right: '-200px' }} />
      <div className="glow-orb" style={{ bottom: '-200px', left: '-200px', background: 'radial-gradient(circle, rgba(123,84,255,0.08) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* HERO */}
        <div style={{ padding: '80px 0 60px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#4e24cf',
            textTransform: 'uppercase',
            marginBottom: '24px',
            padding: '6px 16px',
            border: '1px solid #2a1a6e',
            borderRadius: '100px',
          }}>
            BlindspotLab × 30 Days
          </div>

          <h1 style={{
            fontFamily: "'Boska', serif",
            fontSize: 'clamp(52px, 8vw, 96px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #F5F1EB 0%, #c4b4f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            30 Days of<br />Vibeathon
          </h1>

          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 300,
            fontSize: '18px',
            color: '#6b5e8c',
            maxWidth: '520px',
            margin: '0 auto 16px',
            lineHeight: 1.6,
          }}>
            30 build ideas. 30 master prompts. I didn't come up with a single one.
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: '#4e24cf',
            letterSpacing: '0.05em',
          }}>
            I just ship. Every. Single. Day.
          </p>

          {/* Stats row */}
          <div style={{
            display: 'flex',
            gap: '40px',
            justifyContent: 'center',
            marginTop: '48px',
            flexWrap: 'wrap',
          }}>
            {[
              { val: '30', label: 'builds' },
              { val: '30', label: 'prompts' },
              { val: '0', label: 'excuses' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#4e24cf',
                  lineHeight: 1,
                }}>{s.val}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#4a3a6a',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW TO USE */}
        <div style={{
          background: '#0d0b12',
          border: '1px solid #1e1a2e',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '48px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#4e24cf',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>How to run this</div>
            <p style={{ fontSize: '14px', color: '#8878aa', lineHeight: 1.7, fontWeight: 300 }}>
              Each day, open the card. Copy the master prompt. Drop it in Cursor, Claude, or whatever you ship with. Build the thing. Post about it with <span style={{ color: '#F5F1EB', fontFamily: 'JetBrains Mono', fontSize: '12px' }}>#30DaysVibeathon</span>. Repeat.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#4e24cf',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>The rules</div>
            <p style={{ fontSize: '14px', color: '#8878aa', lineHeight: 1.7, fontWeight: 300 }}>
              The idea is not yours. The build is. You can modify, simplify, or pivot the prompt — just ship something every day and talk about it publicly. That's it. No other rules.
            </p>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* COUNT */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#3a2e5a',
          letterSpacing: '0.1em',
          marginBottom: '20px',
        }}>
          {filtered.length} builds
        </div>

        {/* BUILD GRID */}
        <div style={{ display: 'grid', gap: '16px', marginBottom: '80px' }}>
          {filtered.map((build, i) => {
            const isOpen = expandedDay === build.day;
            const color = getCategoryColor(build.category);
            return (
              <div
                key={build.day}
                className="build-card fade-up"
                style={{ animationDelay: `${i * 0.03}s` }}
                onClick={() => setExpandedDay(isOpen ? null : build.day)}
              >
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  {/* Day number */}
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2a2040',
                    minWidth: '36px',
                    paddingTop: '3px',
                    letterSpacing: '0.05em',
                  }}>
                    D{String(build.day).padStart(2, '0')}
                  </div>

                  {/* Main content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <h3 style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#F5F1EB',
                        letterSpacing: '-0.01em',
                      }}>{build.name}</h3>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: color,
                        background: `${color}15`,
                        border: `1px solid ${color}30`,
                        padding: '3px 10px',
                        borderRadius: '100px',
                      }}>{build.category}</span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b5e8c',
                      fontWeight: 300,
                      lineHeight: 1.5,
                      marginBottom: '10px',
                    }}>{build.tagline}</p>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      color: '#3a2e5a',
                      letterSpacing: '0.05em',
                    }}>
                      {build.stack}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div style={{
                    color: isOpen ? '#4e24cf' : '#2a2040',
                    fontSize: '18px',
                    transition: 'transform 0.2s',
                    transform: isOpen ? 'rotate(45deg)' : 'none',
                    paddingTop: '2px',
                  }}>
                    +
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div onClick={e => e.stopPropagation()}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '20px',
                      paddingTop: '16px',
                      borderTop: '1px solid #1e1a2e',
                    }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#3a2e5a',
                      }}>
                        Master Prompt — Day {build.day}
                      </div>
                      <button
                        className={`copy-btn ${copied === build.day ? 'success' : ''}`}
                        onClick={() => copyPrompt(build.day, build.prompt)}
                      >
                        {copied === build.day ? '✓ Copied' : 'Copy Prompt'}
                      </button>
                    </div>
                    <div className="prompt-block">
                      {build.prompt}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div style={{
          borderTop: '1px solid #1e1a2e',
          paddingTop: '40px',
          paddingBottom: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{
              fontFamily: "'Boska', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#F5F1EB',
              marginBottom: '4px',
            }}>BlindspotLab</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#3a2e5a',
              letterSpacing: '0.1em',
            }}>You have the idea. We ship the product.</div>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#3a2e5a',
            letterSpacing: '0.08em',
          }}>
            #30DaysVibeathon · @mojeebeth
          </div>
        </div>
      </div>
    </div>
  );
}
