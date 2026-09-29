import { Helmet } from "react-helmet-async";

type SeoHeadProps = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  jsonLd?: unknown;
};

const SeoHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  ogImageWidth,
  ogImageHeight,
  jsonLd,
}: SeoHeadProps) => (
  <>
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogImageWidth ? (
        <meta property="og:image:width" content={String(ogImageWidth)} />
      ) : null}
      {ogImageHeight ? (
        <meta property="og:image:height" content={String(ogImageHeight)} />
      ) : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
    {jsonLd ? (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    ) : null}
  </>
);

export default SeoHead;
