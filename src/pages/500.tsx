import type { NextPage } from "next";
import Error from "@/components/Error";

const Four0Four: NextPage = () => {
  return <Error code={500} error="Internal server error" />;
};

export default Four0Four;
