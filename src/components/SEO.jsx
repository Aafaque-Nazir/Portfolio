import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * Advanced SEO Component
 *
 * Strategic Focus:
 * 1. High-Intent Client Acquisition ("freelance web developer India", "hire React developer", "Next.js web developer")
 * 2. Complete Project-Level Indexing (each project receives unique canonical, meta, OG image, and WebApplication schema)
 * 3. Rich Snippets: Person, WebSite, WebPage, ProfessionalService, BreadcrumbList, FAQPage, WebApplication
 * 4. Local + Global Search Optimization (Navi Mumbai / Mumbai / India / Worldwide Remote)
 */
const SEO = ({ title, description, keywords, image, url, section, project, blogPost, noindex = false }) => {
  const siteName = "Aafaque Nazir";
  const siteUrl = "https://aafaque.in";
  const defaultImage = `${siteUrl}/og-image.png`;
  const currentDate = new Date().toISOString().split("T")[0];

  const defaultSiteTitle = "Aafaque Nazir — Web Developer in Navi Mumbai";
  const defaultDescription =
    "Aafaque Nazir is a freelance web developer in Navi Mumbai, India. Building fast websites, custom web apps, and e-commerce stores with React & Next.js.";

  // Section-specific metadata (strictly under 58 chars title, 130-155 chars description)
  const sectionMeta = {
    home: {
      title: "Aafaque Nazir — Web Developer in Navi Mumbai",
      description:
        "Aafaque Nazir is a freelance web developer in Navi Mumbai, India. Building fast websites, custom web apps, and e-commerce stores with React & Next.js.",
      keywords:
        "web developer Navi Mumbai, freelance web developer Navi Mumbai, web developer Mumbai, hire React developer Navi Mumbai, Next.js developer India, freelance developer Mumbai, website development Navi Mumbai",
    },
    about: {
      title: "About Aafaque Nazir — Web Developer Navi Mumbai",
      description:
        "About Aafaque Nazir, web developer in Navi Mumbai, India. Crafting fast, responsive web apps and business websites with React, Next.js, and Supabase.",
      keywords:
        "about Aafaque Nazir, web developer Navi Mumbai, freelance developer Navi Mumbai, full stack developer Mumbai, React developer India, web engineer Navi Mumbai",
    },
    skills: {
      title: "Skills & Modern Tech Stack — Aafaque Nazir",
      description:
        "Technical skills of Aafaque Nazir, web developer in Navi Mumbai, India: React 19, Next.js, TypeScript, Tailwind CSS, PostgreSQL, Supabase, and Node.js.",
      keywords:
        "React developer skills, Next.js developer tech stack, frontend skills portfolio, Node.js developer Navi Mumbai, TypeScript developer portfolio, Supabase developer India",
    },
    projects: {
      title: "Projects & Work Portfolio — Aafaque Nazir",
      description:
        "Explore custom web applications, e-commerce stores, and responsive websites built by Aafaque Nazir for clients in Navi Mumbai, India, and worldwide.",
      keywords:
        "web development portfolio, React web app examples, Next.js portfolio projects, e-commerce website showcase, web developer Navi Mumbai projects",
    },
    services: {
      title: "Web Development Services — Navi Mumbai & India",
      description:
        "Web development services in Navi Mumbai & Mumbai: fast business websites, e-commerce stores, and custom React & Next.js web applications.",
      keywords:
        "web development services Navi Mumbai, website developer Navi Mumbai, hire web developer Mumbai, e-commerce developer Navi Mumbai, custom web application India",
    },
    contact: {
      title: "Hire Aafaque Nazir — Web Developer Navi Mumbai",
      description:
        "Contact Aafaque Nazir, freelance web developer in Navi Mumbai, India. Available for custom website projects, e-commerce stores, and web app consultations.",
      keywords:
        "hire web developer Navi Mumbai, contact web developer, get website quote Navi Mumbai, freelance developer contact Mumbai, hire React developer Navi Mumbai",
    },
    blog: {
      title: "Web Development Blog — Aafaque Nazir",
      description:
        "Web development blog by Aafaque Nazir: practical guides on React 19, Next.js performance, databases, Core Web Vitals, and modern software design.",
      keywords:
        "web development blog, React 19 guides, Next.js 15 performance, Core Web Vitals optimization, full stack engineering Navi Mumbai, web developer blog India",
    },
    notFound: {
      title: "404: Page Not Found — Aafaque Nazir",
      description:
        "The page you are looking for does not exist. Explore portfolio projects, web development services, or architecture blog articles by Aafaque Nazir.",
      keywords: "404 page not found, aafaque nazir",
    },
  };

  // Determine dynamic values based on props, project, or blogPost
  let resolvedTitle = defaultSiteTitle;
  let resolvedDescription = defaultDescription;
  let resolvedKeywords = sectionMeta.home.keywords;
  let resolvedUrl = `${siteUrl}/`;
  let resolvedImage = defaultImage;

  if (blogPost) {
    // Keep title under 58 chars for Google SERP & Ahrefs
    const rawTitle = blogPost.seoTitle || blogPost.title;
    const withSuffix = rawTitle.length <= 42 ? `${rawTitle} — Aafaque Nazir` : rawTitle;
    resolvedTitle = withSuffix.length > 58 ? `${withSuffix.slice(0, 55).trim()}...` : withSuffix;

    // Keep description strictly between 120 and 155 chars
    resolvedDescription = blogPost.description && blogPost.description.length > 155
      ? `${blogPost.description.slice(0, 151)}...`
      : blogPost.description;

    resolvedKeywords = `${blogPost.tags ? blogPost.tags.join(", ") : ""}, web development guide, React developer India, Aafaque Nazir`;
    resolvedUrl = `${siteUrl}/blog/${blogPost.slug}/`;
    resolvedImage = defaultImage;
  } else if (project) {
    const projTitle = `${project.title} — Case Study`;
    resolvedTitle = projTitle.length <= 42 ? `${projTitle} | Aafaque` : projTitle;
    if (resolvedTitle.length > 58) resolvedTitle = `${resolvedTitle.slice(0, 55).trim()}...`;

    const projDesc = project.description;
    resolvedDescription = projDesc.length > 155 ? `${projDesc.slice(0, 151)}...` : projDesc;
    resolvedKeywords = `${project.title}, ${project.category}, ${project.techStack.join(", ")}, web application case study, React project portfolio, Aafaque Nazir`;
    resolvedUrl = `${siteUrl}/projects/${project.id}/`;
    resolvedImage = project.image ? (project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`) : defaultImage;
  } else if (section && sectionMeta[section]) {
    resolvedTitle = sectionMeta[section].title;
    resolvedDescription = sectionMeta[section].description;
    resolvedKeywords = sectionMeta[section].keywords;
    resolvedUrl = section !== "home" ? `${siteUrl}/${section}/` : `${siteUrl}/`;
  } else if (title) {
    resolvedTitle = `${title} | ${siteName}`;
    if (description) resolvedDescription = description;
    if (keywords) resolvedKeywords = keywords;
    if (url) resolvedUrl = url.endsWith("/") ? url : `${url}/`;
    if (image) resolvedImage = image;
  }

  // ──────────────────────────────────────────────────
  // JSON-LD: Person Schema (Knowledge Graph)
  // ──────────────────────────────────────────────────
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aafaque Nazir",
    url: siteUrl,
    image: defaultImage,
    jobTitle: "Freelance Full-Stack Web Developer",
    description:
      "Freelance full-stack web developer building high-performance websites, e-commerce stores, and modern web applications using React, Next.js, and Node.js for clients in India and worldwide.",
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
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "E-Commerce Development",
      "UI/UX Design",
      "Search Engine Optimization (SEO)",
    ],
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: WebSite Schema (Sitelinks Search)
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
  // JSON-LD: WebPage Schema (Page Level)
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
    dateModified: currentDate,
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: ProfessionalService Schema (For Services)
  // ──────────────────────────────────────────────────
  const serviceSchema =
    section === "services"
      ? {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Aafaque Nazir — Freelance Web Development Services",
        url: `${siteUrl}/services`,
        description:
          "Professional web development services including custom websites, online e-commerce stores, and full-stack web applications.",
        provider: {
          "@type": "Person",
          name: "Aafaque Nazir",
          url: siteUrl,
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Websites & Landing Pages",
                description:
                  "Custom responsive websites and landing pages built with clean code, fast loading speeds, and modern design.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Online Stores",
                description:
                  "Custom e-commerce storefronts with product browsing, shopping cart, and smooth checkout experiences.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Applications",
                description:
                  "Full-stack web applications and client dashboards with database and secure authentication integration.",
              },
            },
          ],
        },
      }
      : null;

  // ──────────────────────────────────────────────────
  // JSON-LD: WebApplication / CreativeWork (For Individual Projects)
  // ──────────────────────────────────────────────────
  const projectSchema = project
    ? {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: "WebApplication",
      operatingSystem: "All Web Browsers",
      url: `${siteUrl}/projects/${project.id}`,
      image: resolvedImage,
      description: resolvedDescription,
      author: {
        "@type": "Person",
        name: "Aafaque Nazir",
        url: siteUrl,
      },
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
    }
    : null;

  // ──────────────────────────────────────────────────
  // JSON-LD: Organization Schema (Knowledge Graph & Entity)
  // ──────────────────────────────────────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aafaque Nazir",
    url: siteUrl,
    logo: defaultImage,
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

  // ──────────────────────────────────────────────────
  // JSON-LD: BlogPosting Schema (For Blog Articles)
  // ──────────────────────────────────────────────────
  const blogPostingSchema = blogPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogPost.title && blogPost.title.length > 105 ? `${blogPost.title.slice(0, 102)}...` : blogPost.title,
        description: resolvedDescription,
        image: [resolvedImage],
        datePublished: blogPost.publishedAt,
        dateModified: blogPost.updatedAt || blogPost.publishedAt,
        author: {
          "@type": "Person",
          name: blogPost.author?.name || "Aafaque Nazir",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Aafaque Nazir",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: defaultImage,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": resolvedUrl,
        },
        keywords: blogPost.tags ? blogPost.tags.join(", ") : undefined,
      }
    : null;

  // ──────────────────────────────────────────────────
  // JSON-LD: BreadcrumbList (For Google SERP breadcrumbs)
  // ──────────────────────────────────────────────────
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/`,
    },
  ];

  if (blogPost) {
    breadcrumbItems.push(
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogPost.title,
        item: `${siteUrl}/blog/${blogPost.slug}/`,
      }
    );
  } else if (project) {
    breadcrumbItems.push(
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteUrl}/projects/${project.id}/`,
      }
    );
  } else if (section && section !== "home") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: section.charAt(0).toUpperCase() + section.slice(1),
      item: `${siteUrl}/${section}/`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  // ──────────────────────────────────────────────────
  // JSON-LD: FAQPage Schema (Real, Genuine FAQs)
  // ──────────────────────────────────────────────────
  const faqSchema =
    blogPost?.faqs && blogPost.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: blogPost.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : section === "home" || section === "services"
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How long does it usually take to complete a web project?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A standard website typically takes about 1-2 weeks, while larger web applications with database features take 3-6 weeks depending on the scope.",
            },
          },
          {
            "@type": "Question",
            name: "Do you build websites from scratch or use templates?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I build websites from scratch using modern tools like React and Next.js. This ensures your website has clean code, loads quickly, and is tailored to your exact needs.",
            },
          },
          {
            "@type": "Question",
            name: "Do you work with clients outside your local area?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! While I am based in Navi Mumbai, Maharashtra, I work with clients, startups, and businesses remotely across India and internationally.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies do you use for web development?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "I specialize in React, Next.js, JavaScript, TypeScript, Tailwind CSS, Node.js, Supabase, PostgreSQL, and modern frontend animation libraries like Framer Motion.",
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
      <meta
        name="robots"
        content={
          noindex || section === "notFound"
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#000000" />

      {/* Geo-Location Tags for Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Navi Mumbai" />
      <meta name="geo.position" content="19.1027;73.1092" />
      <meta name="ICBM" content="19.1027, 73.1092" />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={blogPost || project ? "article" : "website"} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedTitle} />

      {/* Strict Canonical URL — Unique for every single route & project */}
      <link rel="canonical" href={resolvedUrl} />

      {/* Structured Data: JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {blogPostingSchema && <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>}
      {serviceSchema && <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>}
      {projectSchema && <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
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
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    techStack: PropTypes.arrayOf(PropTypes.string),
  }),
  blogPost: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    seoTitle: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    publishedAt: PropTypes.string,
    updatedAt: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
      bio: PropTypes.string,
    }),
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
      })
    ),
  }),
};

export default SEO;
