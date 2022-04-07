import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

import "@/styles/main.scss";
import siteMeta from "@/siteMetadata";
import Layout from "@/components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMeta.defaultTheme}>
      <Head>
        <title>{siteMeta.name}</title>
        <link rel="icon" href="/vicon.ico" />
        <meta name="keywords" content={siteMeta.description}></meta>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextNProgress options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
