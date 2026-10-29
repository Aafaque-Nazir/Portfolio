/**
 * Automated High-Intent Engineering Blog Generator
 * Powered by Google Gemini 3.8 / Flash (Free Tier)
 * 
 * Features:
 * - High-intent search topic queue (Next.js, React 19, Supabase, Core Web Vitals, E-Commerce, etc.)
 * - Contextual injection: Automatically references Aafaque's real projects (Restaurant OS, Aura Estate, etc.)
 * - Rich JSON schema: Code snippets, AEO Quick Answer, FAQ accordion, Comparison tables
 * - Auto-updates src/data/blogs.js
 * - Auto-updates public/sitemap.xml
 * - Auto-updates public/llms-full.txt
 */

import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { blogs as currentBlogs } from "../src/data/blogs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Path references
const blogsFilePath = path.join(rootDir, "src", "data", "blogs.js");
const sitemapFilePath = path.join(rootDir, "public", "sitemap.xml");
const llmsFullFilePath = path.join(rootDir, "public", "llms-full.txt");

// 39 High-Intent Curated Web Dev Topics (35+ Days of Automated Queue)
// Targeted for Founders, CTOs, and Business Owners searching to build or hire in 2026.
// Every relatedProjectId is 100% verified against live deployed sites and real codebase features.
const TOPIC_QUEUE = [
  // Cluster 1: High-Performance Next.js & React 19 Architecture
  {
    topic: "Building Real-Time Kitchen Display Systems (KDS) with React 19 and WebSockets",
    category: "Real-Time & Full-Stack",
    targetKeywords: ["React 19 WebSockets", "restaurant kitchen display system kds", "real-time order management react"],
    relatedProjectId: 4, // Restaurant OS (Corner Cafe) - live table QR orders dispatching tickets to kitchen display screens
  },
  {
    topic: "How to Build a Fast E-Commerce Store with Next.js and Tailwind CSS",
    category: "E-Commerce",
    targetKeywords: ["headless ecommerce Next.js", "online store react tailwind", "fast online store under 1 second"],
    relatedProjectId: 2, // Shopease (Oud & Attar) - boutique perfume store with fast page loads & instant cart
  },
  {
    topic: "React 19 Server Actions vs Traditional API Routes: Production Migration & Best Practices",
    category: "Frameworks & Tools",
    targetKeywords: ["react 19 server actions vs api routes", "next js form mutations", "server actions security zod"],
    relatedProjectId: 17, // Al Raheeq Tourism - express UAE tourist visa applications & booking forms with Zod validation
  },
  {
    topic: "Partial Prerendering (PPR) in Next.js: Blending Static Speed with Dynamic Real-Time Data",
    category: "Frameworks & Tools",
    targetKeywords: ["next js partial prerendering ppr", "streaming dynamic components suspense", "nextjs performance optimization"],
    relatedProjectId: 1, // InvMaster OS - static godown console frame with dynamic streaming stock counts & dispatch feeds
  },
  {
    topic: "Why Lightweight React SPAs with Vite Beat Complex Meta-Frameworks for Local Business Apps",
    category: "Frameworks & Tools",
    targetKeywords: ["vite vs nextjs small business", "lightweight react web app", "fast mobile menu ordering"],
    relatedProjectId: 3, // Bread & Bite - lightweight Vite + React local food ordering web app with zero cold starts
  },
  {
    topic: "The React Compiler in Production: How Automatic Memoization Eliminates useMemo and useCallback",
    category: "Frontend Development",
    targetKeywords: ["react compiler production guide", "automatic memoization react 19", "eliminate useMemo useCallback"],
    relatedProjectId: 1, // InvMaster OS - eliminating render lags across complex wholesale stock tables with hundreds of SKUs
  },

  // Cluster 2: Performance & Web Vitals
  {
    topic: "Passing Interaction to Next Paint (INP): How to Break Up Long JavaScript Tasks with scheduler.yield()",
    category: "Web Performance",
    targetKeywords: ["how to fix inp core web vitals", "scheduler yield javascript", "lower interaction to next paint react"],
    relatedProjectId: 4, // Restaurant OS - fast table taps and live menu order additions
  },
  {
    topic: "Reducing JavaScript Bundle Size by 60% with Modern Tree-Shaking and Dynamic Imports",
    category: "Web Performance",
    targetKeywords: ["reduce react bundle size", "dynamic import optimization nextjs", "frontend performance code splitting"],
    relatedProjectId: 15, // Aura Estate - lazy loading property maps, calculators, and media sliders
  },
  {
    topic: "Fast Page Loads: Improving Largest Contentful Paint with HTTP 103 Early Hints and AVIF Images",
    category: "Web Performance",
    targetKeywords: ["fix lcp largest contentful paint", "http 103 early hints nextjs", "image optimization web vitals"],
    relatedProjectId: 17, // Al Raheeq Tourism - delivering flight and desert safari hero banners quickly
  },
  {
    topic: "Eliminating Cumulative Layout Shift (CLS): Modern Font Fallbacks and CSS Aspect-Ratio Strategies",
    category: "Web Performance",
    targetKeywords: ["fix cls cumulative layout shift", "zero layout shift web fonts", "core web vitals cls guide"],
    relatedProjectId: 8, // Dubai Tour - smooth tour package card reveals and responsive itinerary hero images
  },
  {
    topic: "The Speculation Rules API: Instant Multi-Page Navigation for Fast Web Apps",
    category: "Web Performance",
    targetKeywords: ["speculation rules api instant navigation", "prerender next page chrome", "fast page navigation"],
    relatedProjectId: 17, // Al Raheeq Tourism - instant prerendering between /services, /packages, and visa details
  },

  // Cluster 3: Full-Stack SaaS & Database Engineering (PostgreSQL / Supabase)
  {
    topic: "Building Multi-Tenant SaaS Dashboards with PostgreSQL Row-Level Security",
    category: "Backend & Database",
    targetKeywords: ["multi tenant SaaS postgresql", "row level security supabase", "scalable saas architecture"],
    relatedProjectId: 1, // InvMaster OS - multi-tenant godown inventory OS isolating distributor warehouses & storekeepers via RLS
  },
  {
    topic: "PostgreSQL vs MongoDB for Business Applications: Why Relational Data Wins for Order Management",
    category: "Backend & Database",
    targetKeywords: ["postgres vs mongodb 2026", "relational database vs nosql business apps", "acid transactions inventory"],
    relatedProjectId: 1, // InvMaster OS - maintaining strict ACID guarantees across multi-godown transfers and FEFO batch logs
  },
  {
    topic: "Real-Time WebSockets vs Server-Sent Events (SSE): Choosing the Right Protocol for Live Dashboards",
    category: "Real-Time & Full-Stack",
    targetKeywords: ["websockets vs server sent events", "sse vs websocket real time dashboard", "low latency web push"],
    relatedProjectId: 4, // Restaurant OS - bi-directional dining table orders vs unidirectional kitchen status notifications
  },
  {
    topic: "Database Connection Pooling at Scale: Configuring PgBouncer and Supabase Connection Pools",
    category: "Backend & Database",
    targetKeywords: ["postgresql connection pooling pgbouncer", "serverless database connections supabase", "prevent database timeout"],
    relatedProjectId: 15, // Aura Estate - handling spikes in luxury property searches without exhausting database server connections
  },
  {
    topic: "Offline-First Web Apps: Synchronizing Client IndexedDB with Cloud PostgreSQL Using Optimistic Updates",
    category: "Architecture & Frameworks",
    targetKeywords: ["offline first web app react", "indexeddb sync postgresql", "optimistic ui mutations"],
    relatedProjectId: 4, // Restaurant OS - allowing waitstaff to punch orders on the floor even during intermittent restaurant Wi-Fi dropouts
  },

  // Cluster 4: Client Acquisition, Pricing & Commercial Intent
  {
    topic: "Cost of Hiring a Freelance Full-Stack Web Developer in India (2026 Comprehensive Guide)",
    category: "Client Acquisition & Guide",
    targetKeywords: ["freelance web developer India cost", "hire React developer Mumbai", "custom web development rates"],
    relatedProjectId: 17, // Al Raheeq Tourism - real-world commercial conversion portal delivered for a UAE business
  },
  {
    topic: "Freelance Developer vs Web Agency: Which Option Delivers Higher ROI for Early-Stage Startups?",
    category: "Client Acquisition & Guide",
    targetKeywords: ["freelance developer vs agency", "hire freelance engineer vs agency cost", "startup mvp web development"],
    relatedProjectId: 1, // InvMaster OS - building an operational SaaS MVP in weeks rather than agency bureaucracy
  },
  {
    topic: "How Much Does a Custom Web Application MVP Cost to Build in 2026?",
    category: "Client Acquisition & Guide",
    targetKeywords: ["cost to build mvp web application", "custom web app development pricing", "saas prototype budget"],
    relatedProjectId: 4, // Restaurant OS - realistic pricing breakdown for an operational real-time booking and dispatch app
  },
  {
    topic: "How to Write a Scope of Work (SOW) When Hiring an Independent Full-Stack Developer",
    category: "Client Acquisition & Guide",
    targetKeywords: ["how to write web development sow", "software contractor agreement scope", "hiring freelance developer contract"],
    relatedProjectId: 15, // Aura Estate - defining explicit deliverables for search filters, valuation funnels, and CMS integration
  },
  {
    topic: "Why Slow Websites Kill Conversions: How a 500ms Speed Improvement Boosts Revenue by 20%",
    category: "Client Acquisition & Guide",
    targetKeywords: ["website speed impact on conversion rate", "ecommerce load time revenue loss", "performance audit roi"],
    relatedProjectId: 2, // Shopease - sub-second artisanal storefront proving that speed eliminates cart abandonment
  },

  // Cluster 5: Modern E-Commerce, Digital Stores & WhatsApp Automation
  {
    topic: "Zero-Commission Food Delivery: Building Direct WhatsApp Ordering for Restaurants with React",
    category: "E-Commerce Engineering",
    targetKeywords: ["whatsapp ordering web app", "restaurant online menu whatsapp api", "zero commission food delivery app"],
    relatedProjectId: 3, // Bread & Bite - real Taloja cloud kitchen bypassing 30% platform commissions with automated WhatsApp cart checkout
  },
  {
    topic: "Shopify vs Custom Next.js Storefront: When Should E-Commerce Brands Go Headless?",
    category: "E-Commerce Engineering",
    targetKeywords: ["shopify vs custom next js ecommerce", "headless commerce conversion comparison", "custom storefront benefits"],
    relatedProjectId: 2, // Shopease - why boutique fragrance brand Oud & Attar opted for custom Next.js over restrictive Shopify templates
  },
  {
    topic: "Automating GST Invoices and Retailer Notifications with WhatsApp Business API Integration",
    category: "Backend & Database",
    targetKeywords: ["automate gst invoicing whatsapp", "whatsapp business api invoice dispatch", "wholesale billing automation"],
    relatedProjectId: 1, // InvMaster OS - 1-click compliant GST tax invoice generation with HSN codes sent directly to retailer WhatsApp
  },
  {
    topic: "Building Sub-Second Multi-Faceted Product Filters with React and URL State Synchronization",
    category: "E-Commerce Engineering",
    targetKeywords: ["instant ecommerce filters react", "url search params state sync", "zero latency product search"],
    relatedProjectId: 2, // Shopease - multi-faceted perfume filtering by scent notes, concentration, and price with zero lag
  },
  {
    topic: "Automating Lead Generation with WhatsApp Business API Integration on High-Ticket Landing Pages",
    category: "Conversion Engineering",
    targetKeywords: ["whatsapp lead generation landing page", "direct whatsapp click to chat flow", "high conversion lead funnel"],
    relatedProjectId: 17, // Al Raheeq Tourism - pre-populating tourist visa types and travel dates into direct WhatsApp chat
  },

  // Cluster 6: Security & Zero-Trust Architecture
  {
    topic: "Full-Stack Authentication in 2026: Why Session Cookies Beat LocalStorage for Security",
    category: "Security & Architecture",
    targetKeywords: ["web app authentication security", "httpOnly session cookies React", "Supabase auth best practices"],
    relatedProjectId: 4, // Restaurant OS - securing the manager & staff kitchen portal with httpOnly cookies against XSS token leaks
  },
  {
    topic: "Defending Modern Single Page Applications Against Cross-Site Scripting (XSS) and CSRF Attacks",
    category: "Security & Architecture",
    targetKeywords: ["prevent xss in react", "csrf defense modern web applications", "secure web headers csp hsts"],
    relatedProjectId: 1, // InvMaster OS - input sanitization across wholesale inventory inwarding, supplier notes, and financial billing
  },
  {
    topic: "End-to-End Type Safety Across Frontend and Backend with TypeScript, Zod, and Server Actions",
    category: "Security & Architecture",
    targetKeywords: ["end to end type safety typescript", "zod validation server actions", "type safe full stack architecture"],
    relatedProjectId: 17, // Al Raheeq Tourism - end-to-end schema validation from visa application inputs to edge backend processing
  },
  {
    topic: "Implementing Rate Limiting and DDoS Defense on Edge Networks for Public Web APIs",
    category: "Security & Architecture",
    targetKeywords: ["api rate limiting edge workers", "prevent ddos next js api", "upstash redis rate limit react"],
    relatedProjectId: 15, // Aura Estate - rate limiting public valuation calculations and property inquiry submissions
  },

  // Cluster 7: UI/UX Excellence, 3D Web & Modern CSS
  {
    topic: "Mastering Tailwind CSS v4: The New Lightning-Fast Oxide Engine and CSS-First @theme Explained",
    category: "Frontend Development",
    targetKeywords: ["tailwind css v4 features", "tailwind oxide engine benchmark", "migrate tailwind v3 to v4"],
    relatedProjectId: 12, // Premium Burger Shop - retro-modern bespoke design system coded with custom @theme brand colors
  },
  {
    topic: "Building 60fps Micro-Animations in React Using Framer Motion Without Layout Thrashing",
    category: "UI/UX & Animation",
    targetKeywords: ["framer motion performance", "60fps react animations", "smooth layout animations"],
    relatedProjectId: 8, // Dubai Tour - interactive travel accordion itineraries and image transitions running at constant 60fps
  },
  {
    topic: "Integrating Three.js and GSAP ScrollTrigger in React for Immersive 3D Product Showcases",
    category: "UI/UX & Animation",
    targetKeywords: ["three js react scroll animation", "gsap scrolltrigger 3d web experience", "interactive 3d canvas performance"],
    relatedProjectId: 13, // 3D Burger Website - dynamic WebGL 3D burger model disassembling and rotating smoothly on scroll
  },
  {
    topic: "Smooth Scrolling with Lenis and Clean Transitions in React",
    category: "UI & Animation",
    targetKeywords: ["lenis smooth scroll react", "clean web design", "website interactions"],
    relatedProjectId: 10, // Yacht Rentals (Sea Cross) - Mumbai Gateway of India charter site with Lenis smooth scroll
  },
  {
    topic: "Designing Interactive Before-and-After Comparison Sliders and Medical Booking Flows in React",
    category: "UI & Animation",
    targetKeywords: ["before after image slider react", "dental clinic web design", "medical booking flow ui"],
    relatedProjectId: 11, // CarePulse (Aura Dental Studio) - the 50/50 split interactive transformation slider for smiles
  },
  {
    topic: "Multi-Step Booking: Designing Smooth Appointment Flows in React",
    category: "UI & Animation",
    targetKeywords: ["multi step booking form react", "salon spa appointment ui", "appointment flow react"],
    relatedProjectId: 14, // LA Salon & Spa (Lumina Aura) - multi-step appointment scheduler with service selection, stylist choice, and time slots
  },

  // Cluster 8: AI-Powered Web Applications & Search Engines
  {
    topic: "Integrating the Vercel AI SDK into React 19: Streaming AI Chat, Generative UI, and Tool Calling",
    category: "AI & Full-Stack",
    targetKeywords: ["vercel ai sdk react 19", "streaming llm chat ui react", "generative ui next js"],
    relatedProjectId: 1, // InvMaster OS - smart natural language stock prediction assistant: 'Which items are expiring this month?'
  },
  {
    topic: "How to Structure Web Apps with Schema Markup for Modern Search Engines",
    category: "SEO & Growth",
    targetKeywords: ["schema markup json ld rich snippets", "search engine optimization", "structured data web apps"],
    relatedProjectId: 17, // Al Raheeq Tourism - structured JSON-LD Schema markup for TravelAgency and FAQPage
  },
  {
    topic: "Building Lightweight Vector Search in PostgreSQL with pgvector for Real-Time Semantic Recommendations",
    category: "AI & Full-Stack",
    targetKeywords: ["pgvector postgresql vector search", "ai product recommendations supabase", "embeddings search react app"],
    relatedProjectId: 2, // Shopease (Oud & Attar) - similarity search matching customer scent preferences
  }
];

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY environment variable is missing.");
  console.log("👉 Get a free Gemini API key at: https://aistudio.google.com/");
  console.log("👉 Set it via: export GEMINI_API_KEY='your-key' or add it to GitHub Secrets.");
  process.exit(1);
}

// 1. Read existing blogs to avoid duplicate topics
const blogsFileContent = fs.readFileSync(blogsFilePath, "utf8");

console.log(`📚 Found ${currentBlogs.length} existing blogs in repository.`);

function isTopicCovered(topicObj, blogsList) {
  const stopWords = ['with', 'from', 'your', 'this', 'into', 'without', 'when', 'using'];
  const keywords = topicObj.topic.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !stopWords.includes(w));
  return blogsList.some(b => {
    const bTitle = (b.title || "").toLowerCase();
    const bSlug = (b.slug || "").toLowerCase();
    const matches = keywords.filter(w => bTitle.includes(w) || bSlug.includes(w));
    return matches.length >= Math.min(3, keywords.length);
  });
}

// 2. Select the next unwritten topic from the queue
const chosenTopic = TOPIC_QUEUE.find((t) => !isTopicCovered(t, currentBlogs)) ||
  TOPIC_QUEUE[Math.floor(Math.random() * TOPIC_QUEUE.length)];

console.log(`🎯 Generating high-intent blog for topic: "${chosenTopic.topic}"...`);

const prompt = `
You are the senior technical lead and AI co-author for Aafaque Nazir, an independent freelance full-stack web developer based in Navi Mumbai, India (website: https://aafaque.in, phone/whatsapp: +91 93256 29256).

Task: Write an in-depth, authoritative, production-grade engineering blog post on the topic:
"${chosenTopic.topic}"
Category: "${chosenTopic.category}"
Target Keywords: ${chosenTopic.targetKeywords.join(", ")}
Related Portfolio Project ID: ${chosenTopic.relatedProjectId}

Strict Requirements:
1. STRICT NO FANCY JARGON POLICY (MANDATORY):
   - Never use corporate buzzwords, pretentious vocabulary, or marketing hype.
   - FORBIDDEN WORDS & PHRASES:
     "bespoke", "synergy", "synergistic", "paradigm", "sub-second", "frictionless", "seamless", "seamlessly",
     "cutting-edge", "state-of-the-art", "game-changing", "transformative", "revolutionary", "architecting",
     "leveraging", "moat", "moats", "high-converting", "testament", "delve", "elevate", "hyper-scale",
     "unparalleled", "unrivaled", "holistic", "turnkey", "robust", "spearheading".
   - Tone: Direct, honest, pragmatic, and clear. Write like a real senior software engineer explaining practical solutions to a client or peer developer.
   - Use simple, human language:
     * Instead of "bespoke", use "custom".
     * Instead of "sub-second", use "fast" or "under 1 second".
     * Instead of "frictionless" or "seamless", use "smooth", "clean", or "reliable".
     * Instead of "architecting" or "leveraging", use "building", "designing", or "using".
     * Instead of "high-converting", use "effective", "fast", or "high-performing".
2. In-text contextual backlinks to Aafaque's projects and pages. Use ONLY the correct project ID and real project name from this verified directory:
   - ID 1: [Inventory Management / InvMaster OS](/projects/1) -> Wholesale & Godown Inventory OS with multi-godown routing, FEFO batch & expiry tracking, mobile camera barcode scanner, and 1-click WhatsApp GST invoice dispatch.
   - ID 2: [Shopease / Oud & Attar](/projects/2) -> Fragrance e-commerce store with fast client-side filtering, instant slide-out cart, and URL search param state sync.
   - ID 3: [Bread & Bite](/projects/3) -> Zero-commission cloud kitchen in Navi Mumbai with lightweight React digital menu, client-side cart, and direct WhatsApp business order dispatch.
   - ID 4: [Restaurant OS / Corner Cafe](/projects/4) -> Contactless restaurant operating system with table QR-code scanning, real-time Kitchen Display System (KDS), and waiter/staff management portal.
   - ID 8: [Dubai Tour / TourWeb](/projects/8) -> Dubai tour packages with interactive itinerary accordions, image carousels, and instant hotel pickup.
   - ID 10: [Yacht Rentals / Sea Cross](/projects/10) -> Luxury yacht charter in Mumbai Gateway of India with Lenis smooth scrolling and direct VIP inquiry booking.
   - ID 11: [CarePulse / Aura Dental Studio](/projects/11) -> Dental & smile studio with interactive 50/50 Before & After comparison slider, 3D scan showcase, and online consultation booking.
   - ID 12: [Premium Burger Shop / H5 Texes Burger](/projects/12) -> Gourmet burger brand with custom design tokens, menu showcase, and multi-outlet inquiry system.
   - ID 13: [3D Burger Website / Smoked & Seared](/projects/13) -> 3D WebGL burger model that rotates and disassembles dynamically on scroll via GSAP ScrollTrigger.
   - ID 14: [LA Salon & Spa / Lumina Aura](/projects/14) -> Salon & spa website with smooth multi-step appointment booking.
   - ID 15: [Aura Estate](/projects/15) -> Real estate web portal with property search, valuation calculator, and Supabase PostgreSQL.
   - ID 17: [Al Raheeq Tourism](/projects/17) -> Deira Dubai licensed travel agency with express UAE tourist visa selector, worldwide flight ticketing, Netlify Edge delivery, and rich Schema.org structured data.
   - Freelance Services: [Full-Stack Web Development Services](/services)
   - Contact / Hire: [Get in touch with Aafaque](/contact)
3. Include real, clean, modern code snippets (TypeScript, React 19, or SQL).
4. Include an AEO Quick Answer (1-2 sentences direct answer for Perplexity and SearchGPT without buzzwords).
5. Include 3 structured FAQs for Google FAQ schema.
6. Strict SEO Character Lengths (to prevent Ahrefs & Google SERP warnings):
   - "seoTitle": Strictly between 45 and 55 characters (maximum 58 characters). Concise, punchy, high-CTR for Google <title>.
   - "description": Strictly between 130 and 150 characters (MUST NEVER exceed 155 characters). Clear, keyword-rich summary without buzzwords.
7. Return ONLY valid JSON adhering precisely to this structure:

{
  "id": "url-friendly-slug",
  "slug": "url-friendly-slug",
  "title": "Authoritative, High-Intent Engineering Headline",
  "seoTitle": "Punchy SERP Title (45-55 chars max)",
  "description": "Crisp 130-150 chars meta description without fluff",
  "publishedAt": "${new Date().toISOString().split("T")[0]}",
  "updatedAt": "${new Date().toISOString().split("T")[0]}",
  "readTime": "7 min read",
  "category": "${chosenTopic.category}",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "author": {
    "name": "Aafaque Nazir",
    "role": "Freelance Full-Stack Developer",
    "bio": "Independent web engineer building high-performance websites, e-commerce stores, and SaaS web applications for clients across India & worldwide.",
    "avatar": "/og-image.png"
  },
  "quickAnswer": "Direct concise answer for search engines...",
  "relatedProjectId": ${chosenTopic.relatedProjectId},
  "faqs": [
    {
      "question": "Question 1?",
      "answer": "Answer 1"
    },
    {
      "question": "Question 2?",
      "answer": "Answer 2"
    },
    {
      "question": "Question 3?",
      "answer": "Answer 3"
    }
  ],
  "sections": [
    {
      "type": "heading",
      "level": 2,
      "title": "First Major Technical Section"
    },
    {
      "type": "paragraph",
      "text": "Detailed architectural explanation with relevant internal links."
    },
    {
      "type": "code",
      "language": "tsx",
      "caption": "Code title or caption",
      "code": "// Clean code snippet"
    },
    {
      "type": "callout",
      "title": "Key Engineering Takeaway",
      "text": "Important insight or benchmark note."
    },
    {
      "type": "heading",
      "level": 2,
      "title": "Second Technical Section"
    },
    {
      "type": "paragraph",
      "text": "Further deep dive."
    },
    {
      "type": "list",
      "items": [
        "First key actionable item",
        "Second key actionable item"
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "title": "Need Help Implementing This in Your Product?"
    },
    {
      "type": "paragraph",
      "text": "As an independent web developer, I build fast, production-ready web applications. [Hire Aafaque Nazir](/services) or [get in touch for a consultation](/contact)."
    }
  ]
}

DO NOT wrap with markdown backticks if possible, return raw valid JSON.
`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getCandidateModels(apiKey) {
  const preferred = process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : [];

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (res.ok) {
      const data = await res.json();
      const available = (data.models || [])
        .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m) => m.name.replace(/^models\//, ""))
        .filter((name) => !name.includes("embedding") && !name.includes("aqa") && !name.includes("imagen"));

      if (available.length > 0) {
        // Prioritize preferred, then gemini-3.8-flash, then other flash models, then pro
        available.sort((a, b) => {
          if (a === "gemini-3.8-flash") return -1;
          if (b === "gemini-3.8-flash") return 1;
          if (a.includes("3.8") && !b.includes("3.8")) return -1;
          if (!a.includes("3.8") && b.includes("3.8")) return 1;
          if (a.includes("flash") && !b.includes("flash")) return -1;
          if (!a.includes("flash") && b.includes("flash")) return 1;
          return 0;
        });
        return [...new Set([...preferred, ...available])];
      }
    }
  } catch (err) {
    console.warn("Could not query dynamic models list:", err.message);
  }

  return [...new Set([...preferred, "gemini-3.8-flash", "gemini-2.0-flash", "gemini-2.0-flash-exp"])];
}

async function generateWithModel(model, prompt, apiKey, maxRetries = 3) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        }),
      });

      if (response.ok) {
        return await response.json();
      }

      const status = response.status;
      const errorText = await response.text();

      // If 404 (model deprecated / not found), fail fast to next model
      if (status === 404) {
        console.warn(`⚠️ Model "${model}" returned HTTP 404 (not found).`);
        return null;
      }

      // If 503 (Overloaded / Service Unavailable) or 429 (Rate Limit) or 5xx: retry with backoff
      if (status === 503 || status === 429 || status >= 500) {
        if (attempt < maxRetries) {
          const delayMs = attempt * 3000 + Math.floor(Math.random() * 1500);
          console.warn(`⚠️ Model "${model}" returned HTTP ${status} (overloaded). Retrying in ${(delayMs / 1000).toFixed(1)}s (attempt ${attempt}/${maxRetries})...`);
          await sleep(delayMs);
          continue;
        }
      }

      console.warn(`⚠️ Model "${model}" failed with HTTP ${status}: ${errorText}`);
      return null;
    } catch (err) {
      if (attempt < maxRetries) {
        const delayMs = attempt * 2500;
        console.warn(`⚠️ Network glitch on "${model}": ${err.message}. Retrying in ${(delayMs / 1000).toFixed(1)}s...`);
        await sleep(delayMs);
      } else {
        console.warn(`⚠️ Network error on model "${model}":`, err.message);
        return null;
      }
    }
  }

  return null;
}

async function generate() {
  const candidateModels = await getCandidateModels(apiKey);
  console.log(`📋 Candidate models: ${candidateModels.slice(0, 5).join(", ")}`);

  let data = null;

  for (const model of candidateModels) {
    console.log(`🤖 Requesting generation from: ${model}...`);
    data = await generateWithModel(model, prompt, apiKey, 3);
    if (data) {
      console.log(`✅ Successfully generated response using model: ${model}`);
      break;
    }
    console.warn(`⏭️ Falling back to next candidate model...`);
  }

  if (!data) {
    throw new Error("Failed to generate blog content across all Gemini models. Server capacity may be temporarily exhausted; please retry shortly.");
  }

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("No text response from Gemini API.");
  }

  // Parse JSON
  let blogObj;
  try {
    const cleanedText = rawText.trim().replace(/^```json/, "").replace(/```$/, "").trim();
    blogObj = JSON.parse(cleanedText);
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", rawText);
    throw err;
  }

  // Automatic Jargon Sanitizer: ensures fancy buzzwords never make it into the site
  function cleanJargon(val) {
    if (typeof val === "string") {
      return val
        .replace(/\bbespoke\b/gi, "custom")
        .replace(/\bsub-second\b/gi, "fast")
        .replace(/\bfrictionless\b/gi, "smooth")
        .replace(/\bseamlessly\b/gi, "smoothly")
        .replace(/\bseamless\b/gi, "smooth")
        .replace(/\barchitecting\b/gi, "building")
        .replace(/\bleveraging\b/gi, "using")
        .replace(/\bleverage\b/gi, "use")
        .replace(/\bparadigm shift\b/gi, "major shift")
        .replace(/\bparadigm\b/gi, "pattern")
        .replace(/\bcutting-edge\b/gi, "modern")
        .replace(/\bstate-of-the-art\b/gi, "modern")
        .replace(/\bgame-changing\b/gi, "practical")
        .replace(/\bhigh-converting\b/gi, "high-performing")
        .replace(/\binstantaneous\b/gi, "instant")
        .replace(/\bhyper-scale\b/gi, "large scale")
        .replace(/\bultra-performant\b/gi, "high-performance")
        .replace(/\bdelve into\b/gi, "explore")
        .replace(/\bdelve\b/gi, "look into")
        .replace(/\btestament to\b/gi, "proof of")
        .replace(/\btestament\b/gi, "example");
    }
    if (Array.isArray(val)) {
      return val.map(cleanJargon);
    }
    if (val && typeof val === "object") {
      const sanitized = {};
      for (const [k, v] of Object.entries(val)) {
        sanitized[k] = cleanJargon(v);
      }
      return sanitized;
    }
    return val;
  }

  blogObj = cleanJargon(blogObj);

  console.log(`✅ Successfully generated & sanitized: "${blogObj.title}" (slug: ${blogObj.slug})`);

  // Programmatic SEO Guardrails for Ahrefs & Google SERP Compliance
  if (!blogObj.seoTitle) {
    blogObj.seoTitle = blogObj.title.length <= 55
      ? blogObj.title
      : blogObj.title.slice(0, 52).replace(/\s+\S*$/, "") + "...";
  } else if (blogObj.seoTitle.length > 55) {
    blogObj.seoTitle = blogObj.seoTitle.slice(0, 52).replace(/\s+\S*$/, "") + "...";
  }

  // Ensure description is strictly <= 150 chars (never triggers 'Meta description too long')
  if (!blogObj.description || blogObj.description.length > 150) {
    console.log(`⚠️ Sanitizing description length from ${blogObj.description?.length || 0} to <= 150 chars`);
    blogObj.description = blogObj.description
      ? blogObj.description.slice(0, 147).replace(/\s+\S*$/, "") + "..."
      : "High-performance web architecture guide by freelance full-stack developer Aafaque Nazir.";
  }

  console.log(`🎯 SEO Title (${blogObj.seoTitle.length} chars): "${blogObj.seoTitle}"`);
  console.log(`🎯 Description (${blogObj.description.length} chars): "${blogObj.description}"`);

  // 3. Inject blog into src/data/blogs.js
  // Insert at the beginning of the blogs array
  const blogsMarker = "export const blogs = [";
  const insertIndex = blogsFileContent.indexOf(blogsMarker);

  if (insertIndex === -1) {
    throw new Error("Could not find 'export const blogs = [' in src/data/blogs.js");
  }

  const blogCodeString = "\n  " + JSON.stringify(blogObj, null, 2).replace(/\n/g, "\n  ") + ",";
  const updatedBlogsContent =
    blogsFileContent.slice(0, insertIndex + blogsMarker.length) +
    blogCodeString +
    blogsFileContent.slice(insertIndex + blogsMarker.length);

  fs.writeFileSync(blogsFilePath, updatedBlogsContent, "utf8");
  console.log(`📝 Appended new post to src/data/blogs.js`);

  // 4. Update public/sitemap.xml
  const sitemapContent = fs.readFileSync(sitemapFilePath, "utf8");
  const sitemapInsertMarker = "  <!-- Project Detail Pages";
  const newSitemapEntry = `  <url>
    <loc>https://aafaque.in/blog/${blogObj.slug}</loc>
    <lastmod>${blogObj.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n\n`;

  if (sitemapContent.includes(sitemapInsertMarker) && !sitemapContent.includes(blogObj.slug)) {
    const updatedSitemap = sitemapContent.replace(
      sitemapInsertMarker,
      newSitemapEntry + sitemapInsertMarker
    );
    fs.writeFileSync(sitemapFilePath, updatedSitemap, "utf8");
    console.log(`🗺️ Added new URL to public/sitemap.xml`);
  }

  // 5. Update public/llms-full.txt
  const llmsContent = fs.readFileSync(llmsFullFilePath, "utf8");
  const llmsMarker = "## Engineering Articles & Architectural Guides (Blog)\n\n- **Blog Index:** https://aafaque.in/blog";
  const newLlmsEntry = `\n- **${blogObj.title}**\n  URL: https://aafaque.in/blog/${blogObj.slug}\n  Summary: ${blogObj.description}`;

  if (llmsContent.includes(llmsMarker) && !llmsContent.includes(blogObj.slug)) {
    const updatedLlms = llmsContent.replace(llmsMarker, llmsMarker + newLlmsEntry);
    fs.writeFileSync(llmsFullFilePath, updatedLlms, "utf8");
    console.log(`🤖 Added new article summary to public/llms-full.txt for AI engines`);
  }

  console.log(`🎉 Automated blog generation complete! Post is ready to deploy.`);
}

generate().catch((err) => {
  console.error("❌ Generation error:", err.message);
  process.exit(1);
});
