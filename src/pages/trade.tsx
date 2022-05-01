import type { NextPage, NextApiRequest, NextApiResponse } from "next";

import FearGreadIndex, { FearType } from "@/components/PageTradeComponents/FearGreadIndex";
import PageTrade from "@/components/PageTradeComponents";
import Search from "@/components/Search";
import siteMeta from "@/siteMetadata";

const Trade: NextPage<{ contentFear: FearType }> = ({ contentFear }) => {
  return (
    <div className="main-content">
      <Search />
      <PageTrade />
      <FearGreadIndex fication={contentFear.fication} value={contentFear.value} />
    </div>
  );
};

export const getServerSideProps = async ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const fear = await (await fetch(`${siteMeta.siteUrl}/api/crypto/fear_gread`)).json();
  return {
    props: {
      title: "Fear Gred Index",
      contentFear: { value: fear.value, fication: fear.classification },
    },
  };
};

export default Trade;
