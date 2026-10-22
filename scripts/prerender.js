/**
 * Static Pre-rendering Engine for Vite SPA
 * Eliminates "Duplicate Title", "Missing H1", "Duplicate Meta Description",
 * and "Canonical Mismatch" errors across all 35+ routes for Semrush & Ahrefs.
 */

import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { projectsData } from "../src/data/projects-data.js";
import { blogs } from "../src/data/blogs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

if (!fs.existsSync(distDir)) {
  console.error("❌ Error: dist/ directory not found. Please run 'vite build' first.");
  process.exit(1);
}

const templatePath = path.join(distDir, "index.html");
const masterTemplate = fs.readFileSync(templatePath, "utf-8");

const SITE_URL = "https://aafaque.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

// Helper: Escape HTML attributes
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Helper: generate full HTML with customized head and initial semantic content
function buildPageHtml({
  route,
  title,
  description,
  h1,
  lead,
  extraContentHtml = "",
  schemaJson = null,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
}) {
  const fullUrl = `${SITE_URL}${route === "/" ? "" : route}`;
  let html = masterTemplate;

  // 1. Replace Title
  html = html.replace(
    /<title[^>]*>.*?<\/title>/i,
    `<title data-rh="true">${escapeHtml(title)}</title>`
  );

  // 2. Replace Meta Description
  html = html.replace(
    /<meta data-rh="true" name="description" content=".*?" \/>/i,
    `<meta data-rh="true" name="description" content="${escapeHtml(description)}" />`
  );

  // 3. Replace Canonical Link
  html = html.replace(
    /<link data-rh="true" rel="canonical" href=".*?" \/>/i,
    `<link data-rh="true" rel="canonical" href="${fullUrl}" />`
  );

  // 4. Replace Open Graph tags
  html = html.replace(
    /<meta data-rh="true" property="og:type" content=".*?" \/>/i,
    `<meta data-rh="true" property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:url" content=".*?" \/>/i,
    `<meta data-rh="true" property="og:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:title" content=".*?" \/>/i,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:description" content=".*?" \/>/i,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:image" content=".*?" \/>/i,
    `<meta data-rh="true" property="og:image" content="${ogImage}" />`
  );

  // 5. Replace Twitter tags
  html = html.replace(
    /<meta data-rh="true" name="twitter:url" content=".*?" \/>/i,
    `<meta data-rh="true" name="twitter:url" content="${fullUrl}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:title" content=".*?" \/>/i,
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:description" content=".*?" \/>/i,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(description)}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:image" content=".*?" \/>/i,
    `<meta data-rh="true" name="twitter:image" content="${ogImage}" />`
  );

  // 6. Inject Schema if provided
  if (schemaJson) {
    const schemaTag = `\n  <script type="application/ld+json">\n${JSON.stringify(
      schemaJson,
      null,
      2
    )}\n  </script>\n</head>`;
    html = html.replace(/<\/head>/i, schemaTag);
  }

  // 7. Inject Semantic Pre-render into <div id="root">
  const rootStart = html.indexOf("<!-- APP_ROOT_START -->");
  const rootEnd = html.indexOf("<!-- APP_ROOT_END -->");
  if (rootStart !== -1 && rootEnd !== -1) {
    const endOffset = rootEnd + "<!-- APP_ROOT_END -->".length;
    const semanticRoot = `<!-- APP_ROOT_START -->
  <div id="root">
    <div style="min-height:92vh;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:112px 20px 48px;max-width:1152px;margin:0 auto;box-sizing:border-box;font-family:'JetBrains Mono',monospace,sans-serif;">
      <nav aria-label="Breadcrumb" style="margin-bottom:16px;font-size:0.85rem;color:#94a3b8;">
        <a href="/" style="color:#22d3ee;text-decoration:none;">Home</a> &gt; <span style="color:#fff;">${escapeHtml(
          h1
        )}</span>
      </nav>
      <div style="max-width:860px;">
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;margin:0 0 16px 0;color:#ffffff;">
          ${escapeHtml(h1)}
        </h1>
        <p style="font-size:clamp(0.95rem,2vw,1.15rem);color:#94a3b8;line-height:1.6;margin:0 0 24px 0;font-weight:300;">
          ${escapeHtml(lead || description)}
        </p>
        ${extraContentHtml}
      </div>
    </div>
  </div>
  <!-- APP_ROOT_END -->`;
    html = html.slice(0, rootStart) + semanticRoot + html.slice(endOffset);
  }

  return html;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
const staticRoutes = [
  {
    route: "/about",
    title: "About Aafaque Nazir — Full-Stack Web Developer",
    description:
      "About Aafaque Nazir: freelance full-stack developer specializing in clean code, React, Next.js, and high-performance web applications across India.",
    h1: "About Aafaque Nazir — Full-Stack Web Developer",
    lead: "Independent web engineer building fast, scalable websites, e-commerce platforms, and SaaS applications with React, Next.js, and Supabase.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Approach & Quality</h2>
        <p style="margin-bottom:16px;">I build software with high standards: fast page loads, accessible UI, and reliable setups that help businesses grow.</p>
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Core Tech Stack</h2>
        <p style="margin-bottom:16px;">React 19, Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Supabase, Node.js, and modern edge deployments.</p>
        <a href="/contact" style="display:inline-block;padding:10px 20px;background:#22d3ee;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-top:12px;">Get In Touch</a>
      </div>
    `,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Aafaque Nazir",
      url: "https://aafaque.in/about",
      mainEntity: {
        "@type": "Person",
        name: "Aafaque Nazir",
        jobTitle: "Freelance Full-Stack Web Developer",
        url: "https://aafaque.in",
        sameAs: [
          "https://github.com/Aafaque-Nazir",
          "https://www.linkedin.com/in/aafaque-nazir/",
        ],
      },
    },
  },
  {
    route: "/skills",
    title: "Skills & Modern Tech Stack — Aafaque Nazir",
    description:
      "Explore technical skills of Aafaque Nazir: React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, and modern web architectures.",
    h1: "Technical Skills & Tech Stack",
    lead: "Building fast, secure, and responsive web applications with modern frontend and backend tools.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Frontend Architecture</h2>
        <p style="margin-bottom:16px;">React 19, Next.js (App Router, Server Components), TypeScript, Tailwind CSS, Framer Motion, Lenis Smooth Scroll, Vite.</p>
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Backend & Databases</h2>
        <p style="margin-bottom:16px;">Node.js, Express, PostgreSQL, Supabase, Prisma, MongoDB, REST & WebSockets.</p>
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Performance & SEO</h2>
        <p style="margin-bottom:16px;">Core Web Vitals optimization (sub-200ms INP, LCP &lt; 1.5s), Schema.org JSON-LD, programmatic SEO, and edge caching.</p>
      </div>
    `,
  },
  {
    route: "/services",
    title: "Web Development Services — Aafaque Nazir",
    description:
      "Professional web development services: responsive websites, custom e-commerce stores, and scalable full-stack web applications tailored for your brand.",
    h1: "Professional Web Development Services",
    lead: "Custom web development services designed for fast performance, clear navigation, and great user experiences.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">1. Modern Websites & Landing Pages</h2>
        <p style="margin-bottom:16px;">Fast, clean, and responsive websites built with Next.js and Tailwind CSS to showcase your brand effectively.</p>
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">2. E-Commerce Stores & WhatsApp Ordering</h2>
        <p style="margin-bottom:16px;">Direct checkout and WhatsApp-integrated ordering portals for brands and local businesses looking to maximize sales without high app commissions.</p>
        <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">3. Custom Full-Stack Web Applications & SaaS</h2>
        <p style="margin-bottom:16px;">Real-time inventory systems, booking portals, kitchen displays, and internal administrative dashboards with PostgreSQL and Supabase.</p>
        <a href="/contact" style="display:inline-block;padding:10px 20px;background:#22d3ee;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-top:12px;">Request a Quote</a>
      </div>
    `,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Web Development Services",
      provider: {
        "@type": "Person",
        name: "Aafaque Nazir",
        url: "https://aafaque.in",
      },
      areaServed: ["India", "Worldwide Remote"],
    },
  },
  {
    route: "/projects",
    title: "Projects & Work Portfolio — Aafaque Nazir",
    description:
      "Explore custom web applications, e-commerce stores, and responsive websites built by Aafaque Nazir using React, Next.js, and modern backends.",
    h1: "Featured Work & Projects",
    lead: "A collection of web applications, client projects, and online stores I have built.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <ul style="list-style:none;padding:0;">
          ${projectsData
            .map(
              (p) => `
            <li style="margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:12px;">
              <a href="/projects/${p.id}" style="color:#22d3ee;text-decoration:none;font-weight:700;font-size:1.1rem;">→ ${escapeHtml(
                p.title
              )}</a>
              <span style="color:#64748b;font-size:0.85rem;margin-left:8px;">(${escapeHtml(
                p.category
              )})</span>
              <p style="margin:4px 0 0 0;font-size:0.9rem;color:#94a3b8;">${escapeHtml(
                p.description
              )}</p>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `,
  },
  {
    route: "/contact",
    title: "Hire Aafaque Nazir — Web Developer India",
    description:
      "Ready to start your web project? Contact freelance developer Aafaque Nazir for website development, project quotes, or engineering consultations.",
    h1: "Start Your Web Project — Contact Aafaque Nazir",
    lead: "Have a project in mind or looking for a dedicated full-stack developer? Let's discuss your timeline, tech requirements, and deliverables.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <p style="margin-bottom:12px;">Email: <a href="mailto:aafaquenazir@gmail.com" style="color:#22d3ee;">aafaquenazir@gmail.com</a></p>
        <p style="margin-bottom:12px;">WhatsApp: <a href="https://wa.me/919325629256" style="color:#22d3ee;">+91 93256 29256</a></p>
        <p style="margin-bottom:12px;">GitHub: <a href="https://github.com/Aafaque-Nazir" style="color:#22d3ee;">github.com/Aafaque-Nazir</a></p>
        <p style="margin-bottom:24px;">LinkedIn: <a href="https://www.linkedin.com/in/aafaque-nazir/" style="color:#22d3ee;">linkedin.com/in/aafaque-nazir</a></p>
        <a href="https://wa.me/919325629256?text=Hi%20Aafaque,%20I'd%20like%20to%20discuss%20a%20project" style="display:inline-block;padding:10px 20px;background:#22d3ee;color:#000;font-weight:700;text-decoration:none;border-radius:4px;">Message on WhatsApp</a>
      </div>
    `,
  },
  {
    route: "/blog",
    title: "Web Development Blog — Aafaque Nazir",
    description:
      "Web development blog by Aafaque Nazir: React 19, Next.js performance guides, database design, Core Web Vitals, and real-world tips.",
    h1: "Articles & Guides",
    lead: "Practical guides and tips on React, Next.js, databases, and web performance.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <ul style="list-style:none;padding:0;">
          ${blogs
            .map(
              (b) => `
            <li style="margin-bottom:16px;border-bottom:1px solid #1e293b;padding-bottom:14px;">
              <a href="/blog/${b.slug}" style="color:#22d3ee;text-decoration:none;font-weight:700;font-size:1.15rem;">→ ${escapeHtml(
                b.title
              )}</a>
              <div style="font-size:0.8rem;color:#64748b;margin:4px 0;">${escapeHtml(
                b.category || "Engineering"
              )} • ${escapeHtml(b.readTime || "5 min read")}</div>
              <p style="margin:4px 0 0 0;font-size:0.9rem;color:#94a3b8;">${escapeHtml(
                b.description
              )}</p>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTE PRE-RENDERING
// ─────────────────────────────────────────────────────────────────────────────
let count = 0;

console.log("🚀 Starting static pre-rendering for SEO...");

// 1. Static Pages
for (const page of staticRoutes) {
  const pageHtml = buildPageHtml(page);
  const targetDir = path.join(distDir, page.route.slice(1));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  count++;
}

// 2. Project Detail Pages
for (const project of projectsData) {
  const route = `/projects/${project.id}`;
  let title = `${project.title} — Case Study`;
  if (title.length <= 42) {
    title = `${title} | Aafaque`;
  }
  if (title.length > 58) {
    title = `${title.slice(0, 55).trim()}...`;
  }
  const description = project.description;
  const h1 = `${project.title} — Web App Case Study`;
  const lead = project.description;

  const extraContentHtml = `
    <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
      <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">The Problem</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.problem)}</p>
      <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">The Engineering Solution</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.solution)}</p>
      <h2 style="font-size:1.3rem;color:#22d3ee;margin-bottom:8px;">Technologies Used</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.techStack.join(" • "))}</p>
      <p style="margin-top:16px;">
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 20px;background:#22d3ee;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-right:12px;">Visit Live Project</a>` : ""}
        <a href="/projects" style="color:#22d3ee;text-decoration:none;">← Back to all projects</a>
      </p>
    </div>
  `;

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    applicationCategory: "WebApplication",
    operatingSystem: "All Web Browsers",
    url: `${SITE_URL}${route}`,
    image: `${SITE_URL}${project.image}`,
    author: {
      "@type": "Person",
      name: "Aafaque Nazir",
      url: SITE_URL,
    },
    description: project.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      ratingCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const pageHtml = buildPageHtml({
    route,
    title,
    description,
    h1,
    lead,
    extraContentHtml,
    schemaJson,
    ogImage: `${SITE_URL}${project.image}`,
  });

  const targetDir = path.join(distDir, "projects", String(project.id));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  count++;
}

// 3. Blog Post Pages
for (const blog of blogs) {
  const route = `/blog/${blog.slug}`;
  let title = blog.seoTitle || blog.title;
  if (title.length <= 42) {
    title = `${title} — Aafaque Nazir`;
  }
  if (title.length > 58) {
    title = `${title.slice(0, 55).trim()}...`;
  }
  const description = blog.description && blog.description.length > 155
    ? `${blog.description.slice(0, 151)}...`
    : blog.description;
  const h1 = blog.title;
  const lead = blog.description;

  const faqsHtml = blog.faqs && blog.faqs.length
    ? `
      <div style="margin-top:32px;border-top:1px solid #1e293b;padding-top:24px;">
        <h2 style="font-size:1.4rem;color:#22d3ee;margin-bottom:16px;">Frequently Asked Questions</h2>
        ${blog.faqs
          .map(
            (faq) => `
          <div style="margin-bottom:16px;">
            <h3 style="font-size:1.1rem;color:#fff;margin-bottom:6px;">${escapeHtml(
              faq.question
            )}</h3>
            <p style="color:#94a3b8;margin:0;">${escapeHtml(faq.answer)}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `
    : "";

  const sectionsHtml = blog.sections && blog.sections.length
    ? blog.sections
        .map((s) => {
          if (s.type === "heading") {
            return `<h2 style="font-size:1.35rem;color:#22d3ee;margin:28px 0 10px 0;">${escapeHtml(
              s.title
            )}</h2>`;
          }
          if (s.type === "paragraph") {
            return `<p style="margin-bottom:14px;color:#cbd5e1;line-height:1.75;">${escapeHtml(
              s.text
            )}</p>`;
          }
          if (s.type === "code") {
            return `<pre style="background:#0f172a;padding:16px;border-radius:6px;overflow-x:auto;font-family:monospace;color:#38bdf8;margin:16px 0;"><code>${escapeHtml(
              s.code
            )}</code></pre>`;
          }
          return "";
        })
        .join("")
    : "";

  const extraContentHtml = `
    <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
      <div style="font-size:0.85rem;color:#64748b;margin-bottom:20px;">
        Published by <strong>Aafaque Nazir</strong> on ${escapeHtml(
          blog.publishedAt || "2026-10-22"
        )} • ${escapeHtml(blog.readTime || "6 min read")}
      </div>
      ${blog.quickAnswer ? `<div style="background:#0f172a;border-left:3px solid #22d3ee;padding:16px;margin-bottom:24px;border-radius:0 6px 6px 0;"><strong style="color:#22d3ee;">Quick Answer:</strong> <span style="color:#e2e8f0;">${escapeHtml(blog.quickAnswer)}</span></div>` : ""}
      ${sectionsHtml}
      ${faqsHtml}
      <div style="margin-top:32px;border-top:1px solid #1e293b;padding-top:16px;">
        <a href="/blog" style="color:#22d3ee;text-decoration:none;">← Back to all articles</a>
      </div>
    </div>
  `;

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title && blog.title.length > 105 ? `${blog.title.slice(0, 102)}...` : blog.title,
    description: description,
    image: [DEFAULT_IMAGE],
    author: {
      "@type": "Person",
      name: "Aafaque Nazir",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Aafaque Nazir",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_IMAGE,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${route}`,
    },
    datePublished: blog.publishedAt || "2026-10-22",
    dateModified: blog.updatedAt || blog.publishedAt || "2026-10-22",
    url: `${SITE_URL}${route}`,
  };

  const pageHtml = buildPageHtml({
    route,
    title,
    description,
    h1,
    lead,
    extraContentHtml,
    schemaJson,
    ogType: "article",
  });

  const targetDir = path.join(distDir, "blog", blog.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  count++;
}

console.log(`✅ Pre-rendered ${count} static HTML routes with unique titles, meta descriptions, canonical URLs, and semantic H1s!`);
