import Image from "next/image";

import Logo from "@/styles/logo.svg";
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from "@/siteMetadata";
import Link from "@/components/Link";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/">
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Image src={Logo} />
          </div>
          {typeof siteMetadata.name === "string" ? (
            <div className="hidden h-6 text-xl font-semibold sm:block">{siteMetadata.name}</div>
          ) : (
            siteMetadata.name
          )}
        </div>
      </Link>
      <ThemeSwitch />
    </header>
  );
};

export default Header;
