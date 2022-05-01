import type { NextPage, NextApiRequest, NextApiResponse } from "next";

import PageIndex from "@/components/PageIndexComponents";
import { CurrencyApiType } from "@/types";
import Search from "@/components/Search";
import siteMeta from "@/siteMetadata";

const Home: NextPage<{ currenys: CurrencyApiType[] }> = ({ currenys }) => {
  return (
    <div className="main-content">
      <Search />
      <PageIndex currenys={currenys} />
    </div>
  );
};

export const getServerSideProps = async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=5");
  const result = await (await fetch(`${siteMeta.siteUrl}/api/crypto/cryptos`)).json();
  return {
    props: {
      currenys: result,
    },
  };
};

export default Home;
