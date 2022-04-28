import type { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

import "@/styles/main.scss";
import siteMeta from "@/siteMetadata";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

interface AppInfoType {
  price: number;
}
const App = ({ Component, pageProps, appInfo }: AppProps & { appInfo: AppInfoType }) => {
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

App.getInitialProps = async (context: AppContext) => {
  const appInfo = await (await fetch(`${siteMeta.siteUrl}/api/user`)).json();

  const pageProps = context.Component.getInitialProps ? await context.Component.getInitialProps(context.ctx) : {};
  return { pageProps, appInfo };
};

export default App;
