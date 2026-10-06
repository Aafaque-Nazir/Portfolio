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
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Path references
const blogsFilePath = path.join(rootDir, "src", "data", "blogs.js");
const sitemapFilePath = path.join(rootDir, "public", "sitemap.xml");
const llmsFullFilePath = path.join(rootDir, "public", "llms-full.txt");

// 50+ High-Intent Curated Web Dev Topics
const TOPIC_QUEUE = [
  {
    topic: "Building Real-Time Web Applications with React 19 and WebSockets",
    category: "Real-Time & Full-Stack",
    targetKeywords: ["React 19 WebSockets", "real-time web app architecture", "Supabase realtime React"],
    relatedProjectId: 4, // Restaurant OS
  },
  {
    topic: "How to Build a High-Converting Headless E-Commerce Store with Next.js and Tailwind CSS",
    category: "E-Commerce Engineering",
    targetKeywords: ["headless ecommerce Next.js", "custom ecommerce web developer", "fast online store React"],
    relatedProjectId: 2, // Shopease
  },
  {
    topic: "Reducing JavaScript Bundle Size by 60% with Modern Tree-Shaking and Dynamic Imports",
    category: "Performance Engineering",
    targetKeywords: ["reduce react bundle size", "vite dynamic import optimization", "frontend performance tips"],
    relatedProjectId: 15, // Aura Estate
  },
  {
    topic: "Full-Stack Authentication in 2026: Why Session Cookies Beat LocalStorage for Security",
    category: "Security & Architecture",
    targetKeywords: ["web app authentication security", "httpOnly session cookies React", "Supabase auth best practices"],
    relatedProjectId: 15,
  },
  {
    topic: "Vite 6 vs Webpack: Why Modern Frontend Teams No Longer Need Complex Bundlers",
    category: "Architecture & Frameworks",
    targetKeywords: ["Vite vs Webpack 2026", "fast react build tool", "frontend tooling benchmark"],
    relatedProjectId: 17,
  },
  {
    topic: "How to Implement 60fps Micro-Animations in React Using Framer Motion Without Layout Thrashing",
    category: "UI/UX & Animation",
    targetKeywords: ["framer motion performance", "60fps react animations", "smooth layout animations"],
    relatedProjectId: 13, // 3D Burger
  },
  {
    topic: "Cost of Hiring a Freelance Full-Stack Web Developer in India (2026 Comprehensive Guide)",
    category: "Client Acquisition & Guide",
    targetKeywords: ["freelance web developer India cost", "hire React developer Mumbai", "custom web development rates"],
    relatedProjectId: 17,
  },
  {
    topic: "Building Multi-Tenant SaaS Dashboards with PostgreSQL Row-Level Security",
    category: "Backend & Database",
    targetKeywords: ["multi tenant SaaS postgresql", "row level security supabase", "scalable saas architecture"],
    relatedProjectId: 15,
  },
  {
    topic: "Mastering Tailwind CSS v4: The New Lightning-Fast Engine Explained",
    category: "Frontend Development",
    targetKeywords: ["tailwind css v4 features", "tailwind vite plugin", "modern css architecture"],
    relatedProjectId: 2, // Shopease E-Commerce
  },
  {
    topic: "Optimizing Web Fonts to Eliminate Cumulative Layout Shift (CLS) in React",
    category: "Performance Engineering",
    targetKeywords: ["fix cls web fonts", "font-display swap Next.js", "core web vitals cls guide"],
    relatedProjectId: 17,
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

// Simple regex to extract existing slugs
const existingSlugs = [];
const slugRegex = /slug:\s*["']([^"']+)["']/g;
let match;
while ((match = slugRegex.exec(blogsFileContent)) !== null) {
  existingSlugs.push(match[1]);
}

console.log(`📚 Found ${existingSlugs.length} existing blogs in repository.`);

// 2. Select the next unwritten topic from the queue
const chosenTopic = TOPIC_QUEUE.find(
  (t) => !existingSlugs.some((s) => s.includes(t.topic.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 20)))
) || TOPIC_QUEUE[Math.floor(Math.random() * TOPIC_QUEUE.length)];

console.log(`🎯 Generating high-intent blog for topic: "${chosenTopic.topic}"...`);

const prompt = `
You are the senior technical lead and AI co-author for Aafaque Nazir, an independent freelance full-stack web developer based in Navi Mumbai, India (website: https://aafaque.in, phone/whatsapp: +91 93256 29256).

Task: Write an in-depth, authoritative, production-grade engineering blog post on the topic:
"${chosenTopic.topic}"
Category: "${chosenTopic.category}"
Target Keywords: ${chosenTopic.targetKeywords.join(", ")}
Related Portfolio Project ID: ${chosenTopic.relatedProjectId}

Strict Requirements:
1. High-intent, problem-solving, architectural tone. Avoid generic fluff, hype words, or basic introductions.
2. In-text contextual backlinks to Aafaque's projects and pages where natural:
   - If talking about real-time, link to [Restaurant OS](/projects/11).
   - If talking about SaaS/DB, link to [Aura Estate](/projects/15).
   - If talking about travel/visa/conversion, link to [Al Raheeq Tourism](/projects/17).
   - Link to [Services](/services) and [Contact](/contact) for hiring Aafaque.
3. Include real, clean, modern code snippets (TypeScript, React 19, or SQL).
4. Include an AEO Quick Answer (1-2 sentences direct answer for Perplexity and SearchGPT).
5. Include 3 structured FAQs for Google FAQ schema.
6. Return ONLY valid JSON adhering precisely to this structure:

{
  "id": "url-friendly-slug",
  "slug": "url-friendly-slug",
  "title": "Compelling, High-CTR Engineering Title",
  "description": "150-160 characters search-optimized meta description",
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
      "text": "Detailed architectural explanation with [internal links](/projects/11) where relevant."
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

  return [...new Set([...preferred, "gemini-3.8-flash", "gemini-2.5-pro", "gemini-2.0-flash"])];
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

  console.log(`✅ Successfully generated: "${blogObj.title}" (slug: ${blogObj.slug})`);

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
