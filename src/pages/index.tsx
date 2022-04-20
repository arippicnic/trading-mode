import type { NextPage, NextApiRequest, NextApiResponse } from "next";

import PageIndex from "@/components/PageIndexComponents";
import { CurrencyApiType } from "@/types";
import Search from "@/components/Search";
import { isApiError } from "@/services/general";

const Home: NextPage<{ currenys: CurrencyApiType[] }> = ({ currenys }) => {
  return (
    <div className="main-content">
      <Search />
      <PageIndex currenys={currenys} />
    </div>
  );
};

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=5");
  try {
    const fethData = await (await fetch(`https://api.coincap.io/v2/assets?limit=300`)).json();
    const result = fethData.data
      .sort((a: CurrencyApiType, b: CurrencyApiType) => b.changePercent24Hr - a.changePercent24Hr)
      .slice(0, 20);
    return {
      props: {
        currenys: result,
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

export default Home;
