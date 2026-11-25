/**
 * Static Pre-rendering Engine for Vite SPA
 * Generates static HTML shells with unique meta tags, canonicals, JSON-LD,
 * semantic headings, and internal links across all routes (including / and 404.html).
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
const TODAY = new Date().toISOString().split("T")[0];

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const HOME_FAQS = [
  {
    question: "Do you build websites from scratch or use templates?",
    answer:
      "I build websites from scratch using modern tools like React and Next.js. This ensures your website has clean code, loads quickly, and is tailored to your exact needs.",
  },
  {
    question: "How long does it usually take to complete a project?",
    answer:
      "A standard website typically takes about 1-2 weeks, while larger web applications with database features take 3-6 weeks depending on the scope.",
  },
  {
    question: "Do you provide support after the website goes live?",
    answer:
      "Yes, I provide post-launch support to make sure everything runs smoothly, fix any issues, and help with updates.",
  },
  {
    question: "Will my website be mobile-friendly and SEO ready?",
    answer:
      "Yes, every site is designed to look great on mobile phones, tablets, and desktops, with proper SEO meta tags included.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aafaque Nazir",
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  jobTitle: "Freelance Full-Stack Web Developer",
  email: "mailto:aafaquenazir@gmail.com",
  telephone: "+91-93256-29256",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/Aafaque-Nazir",
    "https://www.linkedin.com/in/aafaque-nazir/",
    "https://www.instagram.com/aafaque.75/",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aafaque Nazir",
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  sameAs: [
    "https://github.com/Aafaque-Nazir",
    "https://www.linkedin.com/in/aafaque-nazir/",
    "https://www.instagram.com/aafaque.75/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-93256-29256",
    contactType: "customer service",
    email: "aafaquenazir@gmail.com",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Aafaque Nazir",
  url: SITE_URL,
  inLanguage: "en",
  author: { "@type": "Person", name: "Aafaque Nazir" },
};

function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function getRelatedBlogs(currentBlog) {
  const currentTags = new Set((currentBlog.tags || []).map((t) => t.toLowerCase()));
  return blogs
    .filter((b) => b.slug !== currentBlog.slug)
    .map((b) => {
      let score = b.category === currentBlog.category ? 3 : 0;
      for (const tag of b.tags || []) {
        if (currentTags.has(tag.toLowerCase())) score += 2;
      }
      return { ...b, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function buildPageHtml({
  route,
  title,
  description,
  h1,
  subtitle = "",
  lead,
  extraContentHtml = "",
  schemas = [],
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noindex = false,
  omitCanonical = false,
  showBreadcrumb = true,
}) {
  const normalizedRoute = route === "/" ? "/" : route.endsWith("/") ? route : `${route}/`;
  const fullUrl = `${SITE_URL}${normalizedRoute}`;
  let html = masterTemplate;

  // 1. Title & Description
  html = html.replace(
    /<title[^>]*>.*?<\/title>/i,
    `<title data-rh="true">${escapeHtml(title)}</title>`
  );
  html = html.replace(
    /<meta data-rh="true" name="description" content=".*?" \/>/i,
    `<meta data-rh="true" name="description" content="${escapeHtml(description)}" />`
  );

  // 2. Robots
  const robotsValue = noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  html = html.replace(
    /<meta data-rh="true" name="robots" content=".*?" \/>/i,
    `<meta data-rh="true" name="robots" content="${robotsValue}" />`
  );

  // 3. Canonical
  if (omitCanonical) {
    html = html.replace(/<link data-rh="true" rel="canonical" href=".*?" \/>\s*/i, "");
  } else {
    html = html.replace(
      /<link data-rh="true" rel="canonical" href=".*?" \/>/i,
      `<link data-rh="true" rel="canonical" href="${fullUrl}" />`
    );
  }

  // 4. Open Graph & Twitter tags
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

  // 5. Inject structured data schemas cleanly
  const validSchemas = schemas.filter(Boolean);
  if (validSchemas.length > 0) {
    const schemaTags = validSchemas
      .map((s) => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`)
      .join("\n");
    html = html.replace(/<\/head>/i, `\n${schemaTags}\n</head>`);
  }

  // 6. Semantic Pre-render inside <div id="root">
  const rootStart = html.indexOf("<!-- APP_ROOT_START -->");
  const rootEnd = html.indexOf("<!-- APP_ROOT_END -->");
  if (rootStart !== -1 && rootEnd !== -1) {
    const endOffset = rootEnd + "<!-- APP_ROOT_END -->".length;
    const breadcrumbHtml = showBreadcrumb
      ? `<nav aria-label="Breadcrumb" style="margin-bottom:16px;font-size:0.85rem;color:#94a3b8;">
        <a href="/" style="color:#ffffff;text-decoration:none;">Home</a> &gt; <span style="color:#fff;">${escapeHtml(h1)}</span>
      </nav>`
      : "";
    const subtitleHtml = subtitle
      ? `<div style="font-size:clamp(0.85rem,2.2vw,1rem);color:#a1a1aa;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:16px;font-weight:600;">${escapeHtml(subtitle)}</div>`
      : "";

    const semanticRoot = `<!-- APP_ROOT_START -->
  <div id="root">
    <div style="min-height:92vh;background:#000;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:112px 20px 48px;max-width:1152px;margin:0 auto;box-sizing:border-box;font-family:'JetBrains Mono',monospace,sans-serif;">
      ${breadcrumbHtml}
      <div style="max-width:860px;">
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;margin:0 0 16px 0;color:#ffffff;">
          ${escapeHtml(h1)}
        </h1>
        ${subtitleHtml}
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
    route: "/",
    title: "Aafaque Nazir — Web Developer in Navi Mumbai",
    description:
      "Aafaque Nazir is a freelance web developer in Navi Mumbai, India. Building fast websites, custom web apps, and e-commerce stores with React & Next.js.",
    h1: "AAFAQUE NAZIR",
    subtitle: "Freelance Web Developer in Navi Mumbai, India",
    lead: "I build fast, responsive websites, custom e-commerce stores, and full-stack web applications with React, Next.js, and Supabase for clients in Navi Mumbai, Mumbai, India, and worldwide.",
    showBreadcrumb: false,
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">Featured Projects</h2>
        <ul style="list-style:none;padding:0;margin-bottom:24px;">
          ${projectsData
            .slice(0, 3)
            .map(
              (p) =>
                `<li style="margin-bottom:8px;"><a href="/projects/${p.id}/" style="color:#ffffff;text-decoration:none;font-weight:600;">→ ${escapeHtml(p.title)}</a> — ${escapeHtml(p.description)}</li>`
            )
            .join("")}
        </ul>
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">Latest Engineering Guides</h2>
        <ul style="list-style:none;padding:0;margin-bottom:24px;">
          ${blogs
            .slice(0, 3)
            .map(
              (b) =>
                `<li style="margin-bottom:8px;"><a href="/blog/${b.slug}/" style="color:#ffffff;text-decoration:none;font-weight:600;">→ ${escapeHtml(b.title)}</a></li>`
            )
            .join("")}
        </ul>
        <nav aria-label="Primary Navigation">
          <a href="/about/" style="color:#ffffff;margin-right:16px;">About</a>
          <a href="/services/" style="color:#ffffff;margin-right:16px;">Services</a>
          <a href="/projects/" style="color:#ffffff;margin-right:16px;">All Projects</a>
          <a href="/blog/" style="color:#ffffff;margin-right:16px;">Articles &amp; Guides</a>
          <a href="/contact/" style="color:#ffffff;">Get in Touch</a>
        </nav>
      </div>
    `,
    schemas: [
      personSchema,
      organizationSchema,
      websiteSchema,
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Aafaque Nazir — Web Developer in Navi Mumbai",
        url: `${SITE_URL}/`,
        inLanguage: "en",
        dateModified: TODAY,
      },
      buildBreadcrumbSchema([{ name: "Home", url: `${SITE_URL}/` }]),
      buildFaqSchema(HOME_FAQS),
    ],
  },
  {
    route: "/about/",
    title: "About Aafaque Nazir — Web Developer Navi Mumbai",
    description:
      "About Aafaque Nazir, web developer in Navi Mumbai, India. Crafting fast, responsive web apps and business websites with React, Next.js, and Supabase.",
    h1: "About Aafaque Nazir",
    subtitle: "Freelance Web Developer in Navi Mumbai, India",
    lead: "Independent web developer in Navi Mumbai building fast, scalable websites, e-commerce stores, and SaaS applications with React, Next.js, and Supabase for clients in Mumbai, India, and worldwide.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">Approach &amp; Quality</h2>
        <p style="margin-bottom:16px;">I build software with high standards: fast page loads, accessible UI, and reliable setups that help businesses grow.</p>
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">Core Tech Stack</h2>
        <p style="margin-bottom:16px;">React 19, Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Supabase, Node.js, and modern edge deployments.</p>
        <a href="/contact/" style="display:inline-block;padding:10px 20px;background:#ffffff;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-top:12px;">Get In Touch</a>
      </div>
    `,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About Aafaque Nazir",
        url: `${SITE_URL}/about/`,
        mainEntity: personSchema,
      },
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "About", url: `${SITE_URL}/about/` },
      ]),
      buildFaqSchema(HOME_FAQS),
    ],
  },
  {
    route: "/services/",
    title: "Web Development Services — Navi Mumbai & India",
    description:
      "Web development services in Navi Mumbai & Mumbai: fast business websites, e-commerce stores, and custom React & Next.js web applications.",
    h1: "Web Development Services",
    subtitle: "Navi Mumbai, Mumbai & Remote Worldwide",
    lead: "Custom websites, e-commerce stores, and full-stack web applications built for fast loading, clean design, and reliable growth across Navi Mumbai, Mumbai, India, and remote teams.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">1. Websites</h2>
        <p style="margin-bottom:16px;">Fast, clean, and responsive websites built with Next.js and Tailwind CSS to showcase your brand effectively.</p>
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">2. Custom Online Stores</h2>
        <p style="margin-bottom:16px;">Direct checkout and WhatsApp-integrated ordering portals for brands and local businesses looking to maximize sales without high app commissions.</p>
        <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">3. Custom Web Applications</h2>
        <p style="margin-bottom:16px;">Real-time inventory systems, booking portals, kitchen displays, and internal administrative dashboards with PostgreSQL and Supabase.</p>
        <a href="/contact/" style="display:inline-block;padding:10px 20px;background:#ffffff;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-top:12px;">Request a Quote</a>
      </div>
    `,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Aafaque Nazir — Freelance Web Development Services",
        url: `${SITE_URL}/services/`,
        image: DEFAULT_IMAGE,
        priceRange: "$$",
        description:
          "Professional web development services including custom websites, online e-commerce stores, and full-stack web applications.",
        provider: {
          "@type": "Person",
          name: "Aafaque Nazir",
          url: SITE_URL,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Navi Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "AdministrativeArea", name: "Maharashtra" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "City", name: "Navi Mumbai" },
        ],
      },
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Services", url: `${SITE_URL}/services/` },
      ]),
    ],
  },
  {
    route: "/projects/",
    title: "Projects & Work Portfolio — Aafaque Nazir",
    description:
      "Explore custom web applications, e-commerce stores, and responsive websites built by Aafaque Nazir for clients in Navi Mumbai, India, and worldwide.",
    h1: "Featured Work & Projects",
    lead: "A collection of web applications, client projects, and online stores I have built.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <ul style="list-style:none;padding:0;">
          ${projectsData
            .map(
              (p) => `
            <li style="margin-bottom:14px;border-bottom:1px solid #1e293b;padding-bottom:12px;">
              <a href="/projects/${p.id}/" style="color:#ffffff;text-decoration:none;font-weight:700;font-size:1.1rem;">→ ${escapeHtml(
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
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects & Work Portfolio — Aafaque Nazir",
        url: `${SITE_URL}/projects/`,
        author: { "@type": "Person", name: "Aafaque Nazir", url: SITE_URL },
      },
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Projects", url: `${SITE_URL}/projects/` },
      ]),
    ],
  },
  {
    route: "/contact/",
    title: "Hire Aafaque Nazir — Web Developer Navi Mumbai",
    description:
      "Contact Aafaque Nazir, freelance web developer in Navi Mumbai, India. Available for custom website projects, e-commerce stores, and web app consultations.",
    h1: "Get in Touch",
    subtitle: "Navi Mumbai, India · Available for Freelance Projects",
    lead: "Have a project in mind or looking for a dedicated full-stack developer? Let's discuss your timeline, tech requirements, and deliverables.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <p style="margin-bottom:12px;">Email: <a href="mailto:aafaquenazir@gmail.com" style="color:#ffffff;">aafaquenazir@gmail.com</a></p>
        <p style="margin-bottom:12px;">WhatsApp: <a href="https://api.whatsapp.com/send?phone=919325629256" style="color:#ffffff;">+91 93256 29256</a></p>
        <p style="margin-bottom:12px;">GitHub: <a href="https://github.com/Aafaque-Nazir" style="color:#ffffff;">github.com/Aafaque-Nazir</a></p>
        <p style="margin-bottom:24px;">LinkedIn: <a href="https://www.linkedin.com/in/aafaque-nazir/" style="color:#ffffff;">linkedin.com/in/aafaque-nazir</a></p>
        <a href="https://api.whatsapp.com/send?phone=919325629256&text=Hi%20Aafaque,%20I'd%20like%20to%20discuss%20a%20project" style="display:inline-block;padding:10px 20px;background:#ffffff;color:#000;font-weight:700;text-decoration:none;border-radius:4px;">Message on WhatsApp</a>
      </div>
    `,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Aafaque Nazir",
        url: `${SITE_URL}/contact/`,
        mainEntity: personSchema,
      },
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Contact", url: `${SITE_URL}/contact/` },
      ]),
    ],
  },
  {
    route: "/blog/",
    title: "Web Development Blog — Aafaque Nazir",
    description:
      "Web development blog by Aafaque Nazir: practical guides on React 19, Next.js performance, databases, Core Web Vitals, and modern software design.",
    h1: "Articles & Guides",
    lead: "Practical guides and insights on modern web development, React, Next.js, databases, and performance.",
    extraContentHtml: `
      <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
        <ul style="list-style:none;padding:0;">
          ${blogs
            .map(
              (b) => `
            <li style="margin-bottom:16px;border-bottom:1px solid #1e293b;padding-bottom:14px;">
              <a href="/blog/${b.slug}/" style="color:#ffffff;text-decoration:none;font-weight:700;font-size:1.15rem;">→ ${escapeHtml(
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
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Web Development Blog — Aafaque Nazir",
        url: `${SITE_URL}/blog/`,
        author: { "@type": "Person", name: "Aafaque Nazir", url: SITE_URL },
      },
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Blog", url: `${SITE_URL}/blog/` },
      ]),
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXECUTE PRE-RENDERING
// ─────────────────────────────────────────────────────────────────────────────
let count = 0;
console.log("🚀 Starting static pre-rendering for SEO...");

// 1. Static Pages (including /)
for (const page of staticRoutes) {
  const pageHtml = buildPageHtml(page);
  if (page.route === "/") {
    fs.writeFileSync(path.join(distDir, "index.html"), pageHtml, "utf-8");
  } else {
    const cleanRoute = page.route.replace(/^\/|\/$/g, "");
    const targetDir = path.join(distDir, cleanRoute);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  }
  count++;
}

// 2. Project Detail Pages
for (const project of projectsData) {
  const route = `/projects/${project.id}/`;
  let title = `${project.title} — Case Study | Aafaque`;
  if (title.length > 58) {
    title = `${title.slice(0, 55).trim()}...`;
  }
  const description = project.description;
  const h1 = project.title;
  const lead = project.description;

  const extraContentHtml = `
    <div style="color:#cbd5e1;line-height:1.8;margin-top:24px;">
      <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">The Problem</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.problem)}</p>
      <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">The Solution</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.solution)}</p>
      <h2 style="font-size:1.3rem;color:#ffffff;margin-bottom:8px;">Technologies Used</h2>
      <p style="margin-bottom:16px;">${escapeHtml(project.techStack.join(" • "))}</p>
      <p style="margin-top:16px;">
        ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:10px 20px;background:#ffffff;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-right:12px;">Visit Live Project</a>` : ""}
        <a href="/projects/" style="color:#ffffff;text-decoration:none;">← Back to all projects</a>
      </p>
    </div>
  `;

  const projectSchema =
    project.category === "Web Applications"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.title,
          applicationCategory: "WebApplication",
          operatingSystem: "All Web Browsers",
          url: `${SITE_URL}${route}`,
          image: `${SITE_URL}${project.image}`,
          description: project.description,
          keywords: project.techStack.join(", "),
          author: { "@type": "Person", name: "Aafaque Nazir", url: SITE_URL },
        }
      : {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          genre: project.category,
          url: `${SITE_URL}${route}`,
          image: `${SITE_URL}${project.image}`,
          description: project.description,
          keywords: project.techStack.join(", "),
          author: { "@type": "Person", name: "Aafaque Nazir", url: SITE_URL },
        };

  const pageHtml = buildPageHtml({
    route,
    title,
    description,
    h1,
    subtitle: project.category,
    lead,
    extraContentHtml,
    schemas: [
      projectSchema,
      buildBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Projects", url: `${SITE_URL}/projects/` },
        { name: project.title, url: `${SITE_URL}${route}` },
      ]),
    ],
    ogImage: `${SITE_URL}${project.image}`,
  });

  const targetDir = path.join(distDir, "projects", String(project.id));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  count++;
}

// 3. Blog Post Pages
for (const blog of blogs) {
  const route = `/blog/${blog.slug}/`;
  let title = blog.seoTitle || blog.title;
  if (title.length <= 42) {
    title = `${title} — Aafaque Nazir`;
  }
  if (title.length > 58) {
    title = `${title.slice(0, 55).trim()}...`;
  }
  const description =
    blog.description && blog.description.length > 155
      ? `${blog.description.slice(0, 151)}...`
      : blog.description;
  const h1 = blog.title;
  const lead = blog.description;

  const faqsHtml =
    blog.faqs && blog.faqs.length
      ? `
      <div style="margin-top:32px;border-top:1px solid #1e293b;padding-top:24px;">
        <h2 style="font-size:1.4rem;color:#ffffff;margin-bottom:16px;">Frequently Asked Questions</h2>
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

  const relatedBlogs = getRelatedBlogs(blog);
  const relatedHtml = relatedBlogs.length
    ? `
      <div style="margin-top:32px;border-top:1px solid #1e293b;padding-top:20px;">
        <h2 style="font-size:1.2rem;color:#ffffff;margin-bottom:12px;">Related Guides</h2>
        <ul style="list-style:none;padding:0;margin:0;">
          ${relatedBlogs
            .map(
              (rel) =>
                `<li style="margin-bottom:8px;"><a href="/blog/${rel.slug}/" style="color:#ffffff;text-decoration:none;">→ ${escapeHtml(rel.title)}</a></li>`
            )
            .join("")}
        </ul>
      </div>
    `
    : "";

  const sectionsHtml =
    blog.sections && blog.sections.length
      ? blog.sections
          .map((s) => {
            if (s.type === "heading") {
              const level = s.level || s.heading || 2;
              const tag = level === 3 ? "h3" : "h2";
              const color = level === 3 ? "#e2e8f0" : "#ffffff";
              return `<${tag} style="font-size:${level === 3 ? "1.15rem" : "1.35rem"};color:${color};margin:28px 0 10px 0;">${escapeHtml(
                s.title
              )}</${tag}>`;
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
            if (s.type === "stats") {
              const items = s.items || [];
              return `
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;margin:20px 0;">
                ${items
                  .map(
                    (item) => `
                  <div style="background:#090a0f;border:1px solid #1e293b;padding:14px;border-radius:8px;">
                    <div style="font-size:0.75rem;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">${escapeHtml(item.label)}</div>
                    <div style="font-size:1.4rem;font-weight:900;color:#ffffff;margin:4px 0;font-family:monospace;">${escapeHtml(item.value)}</div>
                    ${item.desc ? `<div style="font-size:0.8rem;color:#cbd5e1;">${escapeHtml(item.desc)}</div>` : ""}
                  </div>
                `
                  )
                  .join("")}
              </div>
            `;
            }
            if (s.type === "diagram") {
              const nodes = s.nodes || [];
              return `
              <div style="background:#090a0f;border:1px solid #1e293b;padding:18px;border-radius:8px;margin:20px 0;">
                <div style="font-size:0.85rem;font-weight:700;color:#ffffff;margin-bottom:12px;font-family:monospace;">${escapeHtml(s.title || "Architecture Flow")}</div>
                <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
                  ${nodes
                    .map(
                      (n, ni) => `
                    <div style="background:#0f172a;border:1px solid #334155;padding:8px 12px;border-radius:6px;font-size:0.8rem;">
                      <strong style="color:#fff;">${escapeHtml(n.label)}</strong>
                      ${n.sub ? `<span style="display:block;font-size:0.7rem;color:#94a3b8;">${escapeHtml(n.sub)}</span>` : ""}
                    </div>
                    ${ni < nodes.length - 1 ? `<span style="color:#ffffff;font-weight:bold;">&rarr;</span>` : ""}
                  `
                    )
                    .join("")}
                </div>
                ${s.caption ? `<div style="margin-top:10px;font-size:0.75rem;color:#94a3b8;font-family:monospace;">• ${escapeHtml(s.caption)}</div>` : ""}
              </div>
            `;
            }
            if (s.type === "steps") {
              const items = s.items || [];
              return `
              <div style="margin:20px 0;">
                ${s.title ? `<div style="font-size:1.1rem;font-weight:700;color:#ffffff;margin-bottom:12px;">${escapeHtml(s.title)}</div>` : ""}
                ${items
                  .map(
                    (st) => `
                  <div style="background:#090a0f;border:1px solid #1e293b;padding:14px;border-radius:8px;margin-bottom:10px;">
                    <div style="font-weight:700;color:#fff;font-size:0.95rem;margin-bottom:4px;">${escapeHtml(st.step || "")} - ${escapeHtml(st.title)}</div>
                    <div style="color:#cbd5e1;font-size:0.85rem;line-height:1.6;">${escapeHtml(st.desc)}</div>
                    ${st.code ? `<pre style="background:#000;color:#ffffff;padding:10px;border-radius:4px;font-size:0.8rem;margin-top:8px;overflow-x:auto;"><code>${escapeHtml(st.code)}</code></pre>` : ""}
                  </div>
                `
                  )
                  .join("")}
              </div>
            `;
            }
            if (s.type === "callout") {
              return `
              <div style="background:#0f172a;border-left:3px solid #ffffff;padding:14px 18px;margin:18px 0;border-radius:0 6px 6px 0;">
                <div style="color:#ffffff;font-weight:700;font-size:0.85rem;margin-bottom:4px;text-transform:uppercase;font-family:monospace;">${escapeHtml(s.title)}</div>
                <div style="color:#cbd5e1;font-size:0.85rem;line-height:1.6;">${escapeHtml(s.text)}</div>
              </div>
            `;
            }
            if (s.type === "comparison") {
              const headers = s.headers || [];
              const rows = s.rows || [];
              return `
              <div style="overflow-x:auto;margin:20px 0;">
                <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                  <thead>
                    <tr style="background:#0f172a;border-bottom:1px solid #334155;">
                      ${headers.map((h) => `<th style="padding:10px;text-align:left;color:#ffffff;">${escapeHtml(h)}</th>`).join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${rows
                      .map(
                        (r) => `
                      <tr style="border-bottom:1px solid #1e293b;">
                        ${(r || []).map((c) => `<td style="padding:10px;color:#cbd5e1;">${escapeHtml(c)}</td>`).join("")}
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            `;
            }
            if (s.type === "list") {
              const items = s.items || [];
              return `
              <ul style="margin:16px 0;padding-left:20px;color:#cbd5e1;">
                ${items.map((it) => `<li style="margin-bottom:8px;line-height:1.6;">${escapeHtml(it)}</li>`).join("")}
              </ul>
            `;
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
      ${blog.quickAnswer ? `<div style="background:#0f172a;border-left:3px solid #ffffff;padding:16px;margin-bottom:24px;border-radius:0 6px 6px 0;"><strong style="color:#ffffff;">Quick Answer:</strong> <span style="color:#e2e8f0;">${escapeHtml(blog.quickAnswer)}</span></div>` : ""}
      ${sectionsHtml}
      ${faqsHtml}
      ${relatedHtml}
      <div style="margin-top:32px;border-top:1px solid #1e293b;padding-top:16px;">
        <a href="/blog/" style="color:#ffffff;text-decoration:none;">← Back to all articles</a>
      </div>
    </div>
  `;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline:
      blog.title && blog.title.length > 105 ? `${blog.title.slice(0, 102)}...` : blog.title,
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

  const schemas = [
    blogPostingSchema,
    buildBreadcrumbSchema([
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Blog", url: `${SITE_URL}/blog/` },
      { name: blog.title, url: `${SITE_URL}${route}` },
    ]),
  ];
  if (blog.faqs && blog.faqs.length > 0) {
    schemas.push(buildFaqSchema(blog.faqs));
  }

  const pageHtml = buildPageHtml({
    route,
    title,
    description,
    h1,
    lead,
    extraContentHtml,
    schemas,
    ogType: "article",
  });

  const targetDir = path.join(distDir, "blog", blog.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf-8");
  count++;
}

// 4. Static 404.html (prevents Soft 404 on unknown routes)
const notFoundHtml = buildPageHtml({
  route: "/404.html",
  title: "404: Page Not Found — Aafaque Nazir",
  description:
    "The page you are looking for does not exist. Explore portfolio projects, web development services, or engineering guides by Aafaque Nazir.",
  h1: "404 — Page Not Found",
  lead: "The link you followed may be broken, out of date, or moved to a new route.",
  noindex: true,
  omitCanonical: true,
  showBreadcrumb: false,
  extraContentHtml: `
    <div style="margin-top:24px;">
      <a href="/" style="display:inline-block;padding:10px 18px;background:#ffffff;color:#000;font-weight:700;text-decoration:none;border-radius:4px;margin-right:12px;">Back to Home</a>
      <a href="/projects/" style="color:#ffffff;margin-right:14px;">Projects</a>
      <a href="/blog/" style="color:#ffffff;margin-right:14px;">Blog</a>
      <a href="/contact/" style="color:#ffffff;">Contact</a>
    </div>
  `,
});
fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
count++;

console.log(
  `✅ Pre-rendered ${count} static HTML routes (including / and 404.html) with unique titles, meta descriptions, canonicals, JSON-LD, and semantic H1s!`
);
