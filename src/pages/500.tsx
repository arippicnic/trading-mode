import type { NextPage } from "next";
import Error from "@/components/Error";

const Four0Four: NextPage = () => {
  return <Error code={500} error="Internal Server Error." />;
};

export default Four0Four;
