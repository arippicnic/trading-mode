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
    const { HOST } = process.env;
    const result = await (await fetch(`${HOST}api/crypto/cryptos`)).json();
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
