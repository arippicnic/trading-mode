import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

import "@/styles/main.scss";
import siteMeta from "@/siteMetadata";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMeta.defaultTheme}>
      <SEO />
      <NextNProgress options={{ showSpinner: false }} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
