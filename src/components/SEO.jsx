import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * Advanced SEO component — Optimized for CLIENT ACQUISITION, not developer ego.
 *
 * Keyword Strategy:
 * - Primary: "web developer Navi Mumbai", "hire web developer India"
 * - Secondary: "React developer", "Next.js developer", "website development services"
 * - Long-tail: "affordable web developer Mumbai", "SaaS development India"
 * - Intent-based: "need a website", "build my website", "website for my business"
 *
 * Schema Strategy:
 * - Person (for Knowledge Panel)
 * - WebSite (for sitelinks)
 * - WebPage (for rich snippets)
 * - ProfessionalService (for service section — local pack eligibility)
 * - BreadcrumbList (for navigation breadcrumbs in SERPs)
 * - FAQPage (for FAQ rich results — bonus SERP real estate)
 */
const SEO = ({ title, description, keywords, image, url, section }) => {
  const siteName = "Aafaque Nazir";
  const siteUrl = "https://aafaque.in";
  const defaultImage = `${siteUrl}/og-image.png`;

  const siteTitle = "Aafaque Nazir — Web Developer in Navi Mumbai | React & Next.js Expert";

  const defaultDescription =
    "Looking for a web developer in Navi Mumbai? Aafaque Nazir builds high-performance websites, SaaS platforms, and interactive web apps using React & Next.js. Websites starting from ₹14,999.";

  // ──────────────────────────────────────────────────
  // CLIENT-FOCUSED descriptions per section
  // ──────────────────────────────────────────────────
  const sectionDescriptions = {
    home: "Looking for a web developer in Navi Mumbai? Aafaque Nazir builds stunning, high-performance websites and web applications using React, Next.js, and modern technologies. Websites starting from ₹14,999.",
    about:
      "About Aafaque Nazir — a freelance web developer based in Navi Mumbai, India. Specializing in custom website development, SaaS platforms, and interactive web experiences with React & Next.js.",
    skills:
      "Technical expertise in React, Next.js, TypeScript, Node.js, Tailwind CSS, GSAP, Framer Motion, Supabase, PostgreSQL, and modern web development technologies.",
    projects:
      "Web development portfolio by Aafaque Nazir — showcasing SaaS dashboards, ecommerce platforms, business websites, and interactive web applications built for clients across India.",
    services:
      "Affordable web development services in Navi Mumbai — Full-Stack Web Apps from ₹24,999, Lead Generation Websites from ₹14,999, and Interactive 3D Websites from ₹29,999. Hire a professional web developer today.",
    contact:
      "Hire Aafaque Nazir — freelance web developer in Navi Mumbai. Get a free consultation for your website project. Available for businesses, startups, and agencies across India.",
  };

  // ──────────────────────────────────────────────────
  // CLIENT-INTENT keywords per section
  // Focus: What do CLIENTS search, not what developers search
  // ──────────────────────────────────────────────────
  const sectionKeywords = {
    home: "web developer Navi Mumbai, hire web developer India, freelance web developer Mumbai, website developer near me, React developer for hire, Next.js developer India, affordable website developer, best web developer Navi Mumbai, custom website design Mumbai, web app development India, startup web developer, build my website India",
    about:
      "about Aafaque Nazir, freelance web developer Mumbai, experienced React developer India, full stack developer Navi Mumbai, professional website builder, web development freelancer India",
    skills:
      "React developer, Next.js expert, TypeScript developer, Node.js developer, Tailwind CSS, GSAP animations, Framer Motion, Supabase developer, PostgreSQL, full stack technologies India",
    projects:
      "web development portfolio India, website projects Mumbai, SaaS dashboard development, ecommerce website examples, business website showcase, React project portfolio, client website examples",
    services:
      "web development services Navi Mumbai, website cost India, affordable website development, hire React developer India, business website price, SaaS development services, lead generation website developer, ecommerce website development Mumbai, 3D website development, website for small business India",
    contact:
      "hire web developer Navi Mumbai, contact web developer India, freelance web developer for hire, get a website quote, web development consultation free, web developer WhatsApp contact",
  };

  const resolvedTitle = title
    ? `${title} | ${siteName}`
    : section
      ? `${section.charAt(0).toUpperCase() + section.slice(1)} | ${siteName}`
      : siteTitle;

  const resolvedDescription =
    description ||
    (section && sectionDescriptions[section]) ||
    defaultDescription;

  const resolvedKeywords =
    keywords ||
    (section && sectionKeywords[section]) ||
    sectionKeywords.home;

  // Canonical ALWAYS points to root — this is a single-page app
  const resolvedUrl = siteUrl;
  const resolvedImage = image || defaultImage;

  // ──────────────────────────────────────────────────
  // JSON-LD: Person Schema — for Google Knowledge Panel
  // ──────────────────────────────────────────────────
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aafaque Nazir",
    url: siteUrl,
    image: defaultImage,
    jobTitle: "Web Developer & Software Engineer",
    description:
      "Freelance web developer in Navi Mumbai specializing in React, Next.js, and modern web technologies. Building high-performance websites and web applications for businesses across India.",
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
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "UI/UX Design",
      "Web Performance Optimization",
      "Three.js",
      "WebGL",
    ],
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: WebSite Schema — for sitelinks search
  // ──────────────────────────────────────────────────
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    author: { "@type": "Person", name: "Aafaque Nazir" },
    inLanguage: "en",
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: WebPage Schema — per-section context
  // ──────────────────────────────────────────────────
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: resolvedTitle,
    description: resolvedDescription,
    url: resolvedUrl,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    author: { "@type": "Person", name: "Aafaque Nazir" },
    inLanguage: "en",
    dateModified: "2026-06-05",
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: ProfessionalService — for local pack & Maps
  // ──────────────────────────────────────────────────
  const serviceSchema =
    section === "services"
      ? {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Aafaque Nazir — Web Development Services",
        url: siteUrl,
        description:
          "Professional web development services in Navi Mumbai — Full-Stack Web Apps, Lead Generation Websites, and Interactive 3D Websites. Affordable pricing for businesses and startups.",
        provider: {
          "@type": "Person",
          name: "Aafaque Nazir",
          url: siteUrl,
        },
        areaServed: [
          { "@type": "City", name: "Navi Mumbai" },
          { "@type": "City", name: "Mumbai" },
          { "@type": "State", name: "Maharashtra" },
          { "@type": "Country", name: "India" },
        ],
        priceRange: "₹14,999 - ₹29,999",
        telephone: "+91-93256-29256",
        email: "aafaquenazir@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Navi Mumbai",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Full-Stack Web Apps",
                description:
                  "Scalable SaaS platforms, admin dashboards, and custom web portals built with Next.js and secure backends. Starting from ₹24,999.",
              },
              price: "24999",
              priceCurrency: "INR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lead Generation Websites",
                description:
                  "Conversion-focused, premium animated websites with fast load times and mobile responsiveness. Starting from ₹14,999.",
              },
              price: "14999",
              priceCurrency: "INR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Interactive 3D Websites",
                description:
                  "Immersive WebGL and Three.js experiences with 3D environments for luxury and creative brands. Starting from ₹29,999.",
              },
              price: "29999",
              priceCurrency: "INR",
            },
          ],
        },
      }
      : null;

  // ──────────────────────────────────────────────────
  // JSON-LD: BreadcrumbList — for navigation breadcrumbs in SERPs
  // ──────────────────────────────────────────────────
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...(section && section !== "home"
        ? [
          {
            "@type": "ListItem",
            position: 2,
            name: section.charAt(0).toUpperCase() + section.slice(1),
            item: `${siteUrl}/#${section}`,
          },
        ]
        : []),
    ],
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: FAQPage — bonus SERP real estate on home section
  // These FAQs target common client search queries
  // ──────────────────────────────────────────────────
  const faqSchema =
    section === "home" || section === "services"
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does a website cost in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Website development starts from ₹14,999 for lead generation websites, ₹24,999 for full-stack web apps, and ₹29,999 for interactive 3D websites. Prices vary based on features and complexity.",
            },
          },
          {
            "@type": "Question",
            name: "How long does it take to build a website?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A lead generation website typically takes 1-2 weeks. Full-stack web apps take 3-6 weeks depending on complexity. Interactive 3D websites can take 4-8 weeks.",
            },
          },
          {
            "@type": "Question",
            name: "Do you build websites for businesses in Navi Mumbai?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! I'm a freelance web developer based in Navi Mumbai, Maharashtra. I build websites for businesses, startups, and agencies across Navi Mumbai, Mumbai, and all of India. Remote clients worldwide are also welcome.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies do you use for web development?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I specialize in React, Next.js, TypeScript, Tailwind CSS, Node.js, Supabase, PostgreSQL, and modern frontend technologies including GSAP and Framer Motion for animations, and Three.js for 3D web experiences.",
            },
          },
        ],
      }
      : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
      <meta name="author" content="Aafaque Nazir" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#000000" />

      {/* Geo-Location — Local SEO for "near me" searches */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Navi Mumbai" />
      <meta name="geo.position" content="19.1027;73.1092" />
      <meta name="ICBM" content="19.1027, 73.1092" />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Aafaque Nazir — Web Developer in Navi Mumbai" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content="Aafaque Nazir — Web Developer in Navi Mumbai" />

      {/* Canonical — ALWAYS the root URL for a single-page app */}
      <link rel="canonical" href={siteUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  section: PropTypes.string,
};

export default SEO;
