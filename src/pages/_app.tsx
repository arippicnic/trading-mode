import type { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";

import "@/styles/main.scss";
import { siteMeta } from "@/siteMeta";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { AppProvider, ContextPropsApp } from "@/contexts/AppContext";

const App = ({ Component, pageProps, appInfo }: AppProps & { appInfo: ContextPropsApp }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMeta.defaultTheme}>
      <SEO />
      <NextNProgress options={{ showSpinner: false }} />
      <AppProvider appInfo={appInfo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async (context: AppContext) => {
  const appInfo = await (await fetch(`${siteMeta.siteUrl}/api/user`)).json();
  const pageProps = context.Component.getInitialProps ? await context.Component.getInitialProps(context.ctx) : {};
  return { pageProps, appInfo };
};

export default App;
