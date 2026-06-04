import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * Advanced SEO component with JSON-LD Structured Data, enhanced OG/Twitter cards,
 * geo-location meta, and comprehensive crawl directives.
 */
const SEO = ({ title, description, keywords, image, url, section }) => {
  const siteTitle = "Aafaque Nazir — Frontend Engineer & Creative Developer";
  const siteName = "Aafaque Nazir";
  const siteUrl = "https://aafaque.in";
  const defaultImage = `${siteUrl}/og-image.png`;

  const defaultDescription = "Portfolio of Aafaque Nazir — Frontend Engineer & Creative Developer from Navi Mumbai. Specializing in high-performance React & Next.js architectures.";

  const sectionDescriptions = {
    home: "Aafaque Nazir — Frontend Engineer & Creative Developer. I engineer highly interactive, visually polished web experiences with React, Next.js, GSAP, and Framer Motion.",
    about:
      "About Aafaque Nazir — a precision-driven Creative Developer with an obsessive focus on performance, design fidelity, and zero-genericism UI engineering.",
    skills:
      "Skills of Aafaque Nazir — React, Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, Node.js, Supabase, PostgreSQL, and modern AI tools.",
    projects:
      "Selected Works by Aafaque Nazir — a curated collection of highly interactive web experiences, SaaS dashboards, and creative front-end builds.",
    services:
      "Web Development Services by Aafaque Nazir — Full-Stack Web Apps, Lead Generation Websites, and Interactive 3D Websites starting from ₹14,999.",
    contact:
      "Contact Aafaque Nazir — hire a Frontend Engineer & Creative Developer for your next project. Based in Navi Mumbai, India.",
  };

  const sectionKeywords = {
    home: "Aafaque Nazir, Frontend Developer, Creative Developer, React Developer, Next.js Developer, Web Developer Portfolio, UI/UX Engineer, Motion Developer, Navi Mumbai Developer",
    about:
      "About Aafaque Nazir, Frontend Engineer India, Creative Developer Navi Mumbai, React Expert, Performance Engineer, Pixel-Perfect Developer",
    skills:
      "React, Next.js, TypeScript, JavaScript, Tailwind CSS, GSAP, Framer Motion, Node.js, Supabase, PostgreSQL, Firebase, MongoDB, Redux, Git, Vercel",
    projects:
      "Web Development Projects, React Projects, Next.js Portfolio, SaaS Dashboard, Interactive Websites, Frontend Projects India",
    services:
      "Web Development Services India, Hire React Developer, Hire Frontend Developer, Lead Generation Website Developer, Full Stack Developer Navi Mumbai, Web App Development",
    contact:
      "Hire Aafaque Nazir, Contact Frontend Developer, Freelance React Developer India, Web Developer for Hire Navi Mumbai",
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

  const resolvedUrl = url || (section ? `${siteUrl}/#${section}` : siteUrl);
  const resolvedImage = image || defaultImage;

  // JSON-LD: Person Schema — for Google Knowledge Panel
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aafaque Nazir",
    url: siteUrl,
    image: defaultImage,
    jobTitle: "Frontend Engineer & Creative Developer",
    description: defaultDescription,
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
    ],
  };

  // JSON-LD: WebSite Schema — for sitelinks search in Google
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    author: { "@type": "Person", name: "Aafaque Nazir" },
    inLanguage: "en-US",
  };

  // JSON-LD: WebPage Schema — per-page context
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: resolvedTitle,
    description: resolvedDescription,
    url: resolvedUrl,
    isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    author: { "@type": "Person", name: "Aafaque Nazir" },
    inLanguage: "en-US",
    dateModified: "2026-05-31",
  };

  // JSON-LD: ProfessionalService Schema — for services section
  const serviceSchema =
    section === "services"
      ? {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Aafaque Nazir — Web Development Services",
          url: `${siteUrl}/#services`,
          description:
            "Full-Stack Web Apps, Lead Generation Websites, and Interactive 3D Websites by Aafaque Nazir.",
          provider: { "@type": "Person", name: "Aafaque Nazir" },
          areaServed: {
            "@type": "Country",
            name: "India",
          },
          priceRange: "₹14,999 - ₹29,999",
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
                    "Scalable SaaS platforms, admin dashboards, and custom portals built with Next.js and secure backends.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Lead Generation Websites",
                  description:
                    "Conversion-focused, highly animated lead generation websites with premium UI/UX.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Interactive 3D Websites",
                  description:
                    "Mind-blowing WebGL and Three.js experiences with immersive 3D environments.",
                },
              },
            ],
          },
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

      {/* Geo-Location — Local SEO */}
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
      <meta property="og:image:alt" content="Aafaque Nazir — Frontend Engineer & Creative Developer Portfolio" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={resolvedUrl} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content="Aafaque Nazir — Frontend Engineer & Creative Developer Portfolio" />

      {/* Canonical */}
      <link rel="canonical" href={section ? siteUrl : resolvedUrl} />

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
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
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
