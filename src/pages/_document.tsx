import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import siteMetadata from "@/siteMetadata";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang={siteMetadata.language} itemType="http://schema.org/WebPage">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="https://s3.tradingview.com/tv.js" defer></script>
        </body>
      </Html>
    );
  }
}
