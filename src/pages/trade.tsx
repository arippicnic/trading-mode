import type { NextPage, NextApiRequest, NextApiResponse } from "next";

import FearGreadIndex, { FearType } from "@/components/PageTradeComponents/FearGreadIndex";
import PageTrade from "@/components/PageTradeComponents";
import Search from "@/components/Search";
import { isApiError } from "@/services/general";

const Trade: NextPage<{ contentFear: FearType }> = ({ contentFear }) => {
  return (
    <div className="main-content">
      <Search />
      <PageTrade />
      <FearGreadIndex fication={contentFear.fication} value={contentFear.value} />
    </div>
  );
};

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  try {
    const { HOST } = process.env;
    const fear = await (await fetch(`${HOST}api/v2/crypto/fear_gread`)).json();
    return {
      props: {
        title: "Fear Gred Index",
        contentFear: { value: fear.value, fication: fear.classification },
      },
    };
  } catch (err) {
    if (isApiError(err)) {
      console.log(err.code);
      return {
        notFound: true,
      };
    }
  }
}

export default Trade;
