import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://taamulcredit.com";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = `${SITE_URL}/og-image.png`,
}: SEOProps) => {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_AE" />
      <meta property="og:locale:alternate" content="ar_AE" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TaamulCredit" />
    </Helmet>
  );
};

export default SEO;
