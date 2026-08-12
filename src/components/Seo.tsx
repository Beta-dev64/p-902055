// Style: SEO infrastructure is invisible but intentional — every public route gets a stable FuseLabs identity and share preview.
import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://fuselabsio.lovable.app").replace(/\/$/, "");

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const Seo = ({
  title,
  description,
  path,
  type = "website",
  image = `${SITE_URL}/og-image-update.png`,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="FuseLabs" />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@fuselabsio" />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
