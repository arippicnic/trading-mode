import type { NextPage } from "next";
import type { NextApiRequest, NextApiResponse } from "next";

import FearGreadIndex, { FearType } from "@/components/FearGreadIndex";
import LoadIndex from "@/components/LoadIndex";
import { isApiError } from "@/services/general";

const Home: NextPage<{ contentFear: FearType }> = ({ contentFear }) => {
  return (
    <div className="main-content">
      <LoadIndex />
      <FearGreadIndex fication={contentFear.fication} value={contentFear.value} />
    </div>
  );
};

export async function getServerSideProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  try {
    const { HOST } = process.env;
    const fear = await (await fetch(`${HOST}api/fear`)).json();
    return {
      props: {
        title: "Fear Gred Index",
        contentFear: { value: fear.val, fication: fear.value_classification },
      },
    };
  } catch (err) {
    if (isApiError(err)) {
      console.log(err.code);
      return {
        props: {
          error: err.code,
        },
      };
    }
  }
}

export default Home;
