import { useRouter } from "next/router";
import cn from "classnames";

import Link from "@/components/Link";
import siteMetadata from "@/siteMetadata";

interface HeaderLinksTypes {
  mobileMode: boolean;
}

const HeaderLinks: React.FC<HeaderLinksTypes> = ({ mobileMode }) => {
  const pageCrypto = useRouter().pathname;

  const links = [
    { label: "Tradig Mode", path: "/", mobile: false },
    { label: "Trade", path: "/trade", mobile: true },
    { label: "Credit", path: "/credit", mobile: true },
    { label: "Open Source", path: siteMetadata.githubUrl, mobile: false },
  ];

  const linksDestop = links.map(({ label, path, mobile }: { label: string; path: string; mobile: boolean }) => {
    if (mobileMode || mobile) {
      return (
        <li
          key={path}
          className={cn(
            path === pageCrypto ? "text-black dark:text-white" : "text-gray-400",
            mobileMode ? "py-2" : "ml-8",
            "hover:text-black dark:hover:text-white"
          )}
        >
          <Link href={path}>{label}</Link>
        </li>
      );
    }
  });

  return (
    <ul
      className={cn(
        mobileMode ? "py-8 flex-col items-center tracking-widest text-fore-primary" : "items-center mt-1 text-lg",
        "flex font-semibold"
      )}
    >
      {linksDestop}
    </ul>
  );
};

export default HeaderLinks;
