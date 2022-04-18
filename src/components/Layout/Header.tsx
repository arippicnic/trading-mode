import Image from "next/image";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import cn from "classnames";

import Logo from "@/styles/logo.svg";
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from "@/siteMetadata";
import Link from "@/components/Link";
import Button from "@/components/Button";
import { MobileNav } from "./MobileNav";

const Header: React.FC = () => {
  const pageCrypto = useRouter().pathname;

  const links = [
    { label: "Trade", path: "/trade" },
    { label: "Credit", path: "/credit" },
  ].map(({ label, path }: { label: string; path: string }) => {
    return (
      <li
        key={path}
        className={cn(
          path === pageCrypto ? "text-black dark:text-white" : "text-gray-400",
          "hidden sm:block ml-8 hover:text-black dark:hover:text-white"
        )}
      >
        <Link href={path}>{label}</Link>
      </li>
    );
  });

  return (
    <>
      <MobileNav />
      <header className="flex items-center justify-between py-6 px-2">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <div className="mr-3">
                <Image src={Logo} />
              </div>
              <div
                className={cn(
                  "/" === pageCrypto ? "text-black dark:text-white" : "text-gray-400",
                  "hidden h-6 text-xl font-semibold sm:block hover:text-black dark:hover:text-white"
                )}
              >
                {siteMetadata.name}
              </div>
            </div>
          </Link>
          <ul className="flex items-center mt-1 text-lg font-semibold">{links}</ul>
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
          <Link href="https://github.com/arippicnic/trading-mode" className="hidden sm:block ml-8">
            <Button className="flex items-center text-sm">
              <BsGithub className="text-sm sm:text-sm md:text-md lg:text-xl mr-2" />
              <span>Open Source</span>
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
