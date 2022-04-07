import type { NextPage } from "next";
import Error from "@/components/Error";

const Four0Four: NextPage = () => {
  return <Error code={404} error="I couldn't find the requested page" />;
};

export default Four0Four;
