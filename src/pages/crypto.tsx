import type { NextPage } from "next";
import { RiHomeLine } from "react-icons/ri";
import { useRouter } from "next/router";

import PageCrypto from "@/components/PageCryptoComponents";
import Link from "@/components/Link";
import { useCryptoContext } from "@/contexts/CryptoContext";
import Tooltip, { isToltip } from "@/components/Tooltip";

const Crypto: NextPage = () => {
  const toltipData = isToltip({ name: "Back to home", loop: false });
  const router = useRouter();
  const { state } = useCryptoContext();
  const { crypto, loading } = state;

  const RenderContent = () => {
    if (loading) {
      return <p className="text-center mt-5">Loading...</p>;
    }
    if (crypto.length === 0) {
      router.push("/");
      return <main></main>;
    }
    return (
      <main>
        <div className="absolute z-20 top-5 left-3">
          <Link href="/trade">
            <button {...toltipData} className="text-white border border-wa-500 bg-black rounded-full p-1">
              <RiHomeLine className="text-sm" />
              <Tooltip id={toltipData["data-for"]} />
            </button>
          </Link>
        </div>
        <PageCrypto data={crypto} />
      </main>
    );
  };

  return <RenderContent />;
};

export default Crypto;
