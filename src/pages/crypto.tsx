import type { NextPage } from "next";
import { useRouter } from "next/router";

import PageCrypto from "@components/Crypto";
import Navigation from "@components/Crypto/Navigation";
import { useCryptoContext } from "@contexts/CryptoContext";

const Crypto: NextPage = () => {
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
          <Navigation />
        </div>
        <PageCrypto data={crypto} />
      </main>
    );
  };

  return <RenderContent />;
};

export default Crypto;
