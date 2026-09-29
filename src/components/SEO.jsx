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
const SEO = ({ title, description, keywords, image, url, section, project }) => {
  const siteName = "Aafaque Nazir";
  const siteUrl = "https://aafaque.in";
  const defaultImage = `${siteUrl}/og-image.png`;
  const currentDate = "2026-09-29";

  const defaultSiteTitle = "Aafaque Nazir — Freelance Web Developer India | React & Next.js Expert";
  const defaultDescription =
    "Looking to hire a freelance web developer in India? Aafaque Nazir builds fast, modern, and responsive websites, e-commerce stores, and full-stack web applications using React & Next.js.";

  // Section-specific metadata
  const sectionMeta = {
    home: {
      title: "Aafaque Nazir — Freelance Web Developer India | React & Next.js Expert",
      description:
        "Looking to hire a freelance web developer in India? Aafaque Nazir builds fast, modern websites, custom e-commerce stores, and scalable SaaS web applications with React & Next.js.",
      keywords:
        "freelance web developer India, hire web developer India, React developer for hire, Next.js developer India, full stack web developer portfolio, custom website developer, web application developer Mumbai, frontend developer React, website development services India, hire freelance developer Mumbai",
    },
    about: {
      title: "About Aafaque Nazir — Full-Stack Web Developer & Engineer",
      description:
        "Learn about Aafaque Nazir, an independent freelance web developer specializing in clean code, React, Next.js, and high-performance full-stack web applications.",
      keywords:
        "about Aafaque Nazir, freelance web developer background, full stack developer India, React developer portfolio, web engineer Mumbai, freelance frontend developer",
    },
    skills: {
      title: "Skills & Modern Tech Stack — Aafaque Nazir | Web Developer",
      description:
        "Explore the technical skills and tooling of Aafaque Nazir: React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, and REST APIs.",
      keywords:
        "React developer skills, Next.js developer tech stack, frontend skills portfolio, Node.js developer India, TypeScript developer portfolio, Supabase PostgreSQL developer",
    },
    projects: {
      title: "Projects & Work Portfolio — Aafaque Nazir | Web Applications",
      description:
        "Explore custom web applications, online stores, and responsive websites built by Aafaque Nazir using React, Next.js, and modern backends.",
      keywords:
        "web development portfolio, React web app examples, Next.js portfolio projects, e-commerce website showcase, SaaS application examples, freelance web developer projects",
    },
    services: {
      title: "Web Development Services — Custom Websites & Web Apps | Aafaque Nazir",
      description:
        "Professional web development services: responsive websites, custom e-commerce stores, and scalable full-stack web applications tailored for your business.",
      keywords:
        "web development services India, hire freelance web developer, custom website development, e-commerce store developer, web application development, website developer Mumbai",
    },
    contact: {
      title: "Hire Aafaque Nazir — Contact for Web Development Projects",
      description:
        "Ready to start a website or web application project? Get in touch with Aafaque Nazir for freelance web development, project quotes, or collaborations.",
      keywords:
        "hire web developer India, contact web developer, get website quote, freelance developer contact, hire React developer, web development consultation India",
    },
  };

  // Determine dynamic values based on props or project
  let resolvedTitle = defaultSiteTitle;
  let resolvedDescription = defaultDescription;
  let resolvedKeywords = sectionMeta.home.keywords;
  let resolvedUrl = siteUrl;
  let resolvedImage = defaultImage;

  if (project) {
    resolvedTitle = `${project.title} — ${project.category} Project | Aafaque Nazir`;
    resolvedDescription = `${project.description} Built with ${project.techStack.join(", ")} by full-stack developer Aafaque Nazir.`;
    resolvedKeywords = `${project.title}, ${project.category}, ${project.techStack.join(", ")}, web application case study, React project portfolio, Aafaque Nazir`;
    resolvedUrl = `${siteUrl}/projects/${project.id}`;
    resolvedImage = project.image ? (project.image.startsWith("http") ? project.image : `${siteUrl}${project.image}`) : defaultImage;
  } else if (section && sectionMeta[section]) {
    resolvedTitle = sectionMeta[section].title;
    resolvedDescription = sectionMeta[section].description;
    resolvedKeywords = sectionMeta[section].keywords;
    resolvedUrl = section !== "home" ? `${siteUrl}/${section}` : `${siteUrl}/`;
  } else if (title) {
    resolvedTitle = `${title} | ${siteName}`;
    if (description) resolvedDescription = description;
    if (keywords) resolvedKeywords = keywords;
    if (url) resolvedUrl = url;
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
      description: project.description,
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
      item: siteUrl,
    },
  ];

  if (project) {
    breadcrumbItems.push(
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteUrl}/projects/${project.id}`,
      }
    );
  } else if (section && section !== "home") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: section.charAt(0).toUpperCase() + section.slice(1),
      item: `${siteUrl}/${section}`,
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
    section === "home" || section === "services"
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
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#000000" />

      {/* Geo-Location Tags for Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Navi Mumbai" />
      <meta name="geo.position" content="19.1027;73.1092" />
      <meta name="ICBM" content="19.1027, 73.1092" />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={project ? "article" : "website"} />
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
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
};

export default SEO;
