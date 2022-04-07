import { useRouter } from "next/router";

import { ToastContextProvider } from "@/contexts/ToastContext";
import { CryptoWrapper } from "@/contexts/CryptoContext";

import NoScript from "./NoSript";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pageCrypto = useRouter().pathname === "/crypto";
  const RenderContent = () => {
    if (pageCrypto) {
      return (
        <div className="mx-auto">
          <NoScript />
          <div className="flex h-screen flex-col justify-between">{children}</div>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex flex-col justify-between h-screen">
          <div>
            <NoScript />
            <Header />
            <main>{children}</main>
          </div>
          <Footer />
        </div>
      </div>
    );
  };
  return (
    <CryptoWrapper>
      <ToastContextProvider>
        <RenderContent />
      </ToastContextProvider>
    </CryptoWrapper>
  );
};

export default Layout;
