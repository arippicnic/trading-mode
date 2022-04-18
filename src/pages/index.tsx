import type { NextPage } from "next";
import Error from "@/components/Error";

const Home: NextPage = () => {
  return <Error code={404} error="Coming soon home page" />;
};

export default Home;
