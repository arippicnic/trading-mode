const siteMetadata = {
  name: "Trading Mode",
  description: "Tradingview Price Tracker",
  author: "PicnicLab",
  siteUrl: process.env.NEXT_PUBLIC_HOST,
  siteMode: process.env.NEXT_PUBLIC_NODE_ENV,
  authorUrl: "https://github.com/arippicnic",
  githubUrl: "https://github.com/arippicnic/trading-mode",
  language: "id-ID",
  defaultTheme: "light",
  themeColor: "#4f46e5",
  localStorage: {
    appInfo: "appInfo",
    userInfo: "userInfo",
  },
};

module.exports = siteMetadata;
