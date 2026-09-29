export const SITE_URL = "https://arenaldiscovery.com";
export const ORGANIZATION_ID = SITE_URL;

export const HOME_SEO = {
  title: "Arenal Discovery | Private Transportation & Adventure Tours in La Fortuna",
  description:
    "Premium private transportation in Costa Rica and expert-led tours in La Fortuna. Book your Arenal Volcano adventures and reliable airport shuttles today.",
  canonical: `${SITE_URL}/`,
  ogImage: `${SITE_URL}/android-chrome-192x192.png`,
  ogImageWidth: 192,
  ogImageHeight: 192,
} as const;

export const TRANSPORT_SEO = {
  title: "Private Transfers from La Fortuna | Airports and Costa Rica | Arenal Discovery",
  description:
    "Private door-to-door van transfers from La Fortuna to SJO, LIR, Monteverde and Costa Rica destinations. Professional drivers, up to 15 passengers.",
  canonical: `${SITE_URL}/transport`,
  ogImage: `${SITE_URL}/og-transport.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
} as const;

export type TransferRoute = {
  id: string;
  route: string;
  prices: Record<string, number>;
  type: string;
  distance?: string;
  time?: string;
  image?: string;
};

const priceBounds = (prices: Record<string, number>) => {
  const values = Object.values(prices);
  return {
    lowPrice: Math.min(...values),
    highPrice: Math.max(...values),
    offerCount: values.length,
  };
};

export function buildTransportJsonLd(transfers: TransferRoute[]) {
  const pageUrl = TRANSPORT_SEO.canonical;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TRANSPORT_SEO.title,
        description: TRANSPORT_SEO.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#servicelist` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: TRANSPORT_SEO.ogImage,
          width: 1200,
          height: 630,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Private Transportation",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "TaxiService",
        "@id": `${pageUrl}#taxiservice`,
        name: "Arenal Discovery Private Transportation",
        url: pageUrl,
        image: TRANSPORT_SEO.ogImage,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: [
          { "@type": "City", name: "La Fortuna" },
          { "@type": "Country", name: "Costa Rica" },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#servicelist`,
        name: "Private transfers from La Fortuna",
        numberOfItems: transfers.length,
        itemListElement: transfers.map((item, index) => {
          const offers = priceBounds(item.prices);
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              "@id": `${pageUrl}#${item.id}`,
              name: item.route,
              provider: { "@id": ORGANIZATION_ID },
              areaServed: ["La Fortuna", "Costa Rica"],
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: offers.lowPrice,
                highPrice: offers.highPrice,
                offerCount: offers.offerCount,
                url: pageUrl,
              },
            },
          };
        }),
      },
    ],
  };
}
