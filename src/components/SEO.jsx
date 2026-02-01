import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Aafaque Nazir - Full Stack Developer";
  const defaultDescription =
    "Portfolio of Aafaque Nazir, a Full Stack Developer specializing in React, Next.js, and modern web technologies.";
  const siteUrl = "https://aafaque.in";
  const defaultImage = "/og-image.png"; // Make sure to add an og-image.png to public folder later

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title ? `${title} | Aafaque Nazir` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta
        name="keywords"
        content={
          keywords ||
          "Full Stack Developer, React Developer, Web Developer, Portfolio, Aafaque Nazir"
        }
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta
        property="og:image"
        content={image || `${siteUrl}${defaultImage}`}
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || siteUrl} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta
        name="twitter:image"
        content={image || `${siteUrl}${defaultImage}`}
      />

      {/* Canonical */}
      <link rel="canonical" href={url || siteUrl} />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string, // Comma separated string
  image: PropTypes.string,
  url: PropTypes.string,
};

export default SEO;
