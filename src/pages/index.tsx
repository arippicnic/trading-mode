import type { NextPage } from "next";

import PageIndex from "@/components/PageIndexComponents";
import Search from "@/components/Search";

const Home: NextPage = () => {
  return (
    <div className="main-content">
      <Search />
      <PageIndex />
    </div>
  );
};

export default Home;
