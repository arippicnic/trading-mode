import React from "react";
import Head from "next/head";
import { siteMeta } from "@siteMeta";
import { useRouter } from "next/router";
import { capitaliz } from "@services/general";

const { description, name, themeColor, author, authorUrl, siteUrl } = siteMeta;

const RenderArticel = ({ title }: { title: string }) => (
  <Head>
    <title>{title}</title>
    <meta content={title} property="og:title" />
    <meta content={title} property="twitter:title" />
    <meta content={description} name="description" />
    <meta content={description} property="og:description" />
    <meta content={description} property="twitter:description" />
    <meta content={"image/jpeg"} property="og:image:type" />
    <meta content="summary_large_image" name="twitter:card" />
    <meta content="website" property="og:type" />
    <meta content={name} property="og:site_name" />
    <meta content={siteUrl + useRouter().pathname} property="og:url" />
    <meta name="content_author" content={author} />
    <meta name="content_author_site" content={authorUrl} />

    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
    <link rel="manifest" href="/icons/site.webmanifest" />
    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
    <meta name="apple-mobile-web-app-title" content={name} />
    <meta name="application-name" content={name} />
    <meta name="msapplication-TileColor" content={themeColor} />
    <meta name="theme-color" content={themeColor} />
  </Head>
);

const SEO: React.FC = () => {
  const url = useRouter().pathname.replace("/", "");
  const title = `${url ? capitaliz(url) + " | " : ""}${description} - ${name}`;
  return (
    <>
      <RenderArticel title={title} />
    </>
  );
};

export default SEO;
