import { useState, useEffect } from "react";
import Link from "@/components/Link";
import { useRouter } from "next/router";
import classNames from "classnames";
import siteMetadata from "@/siteMetadata";

const routes = [
  {
    path: "/",
    label: siteMetadata.name,
    exact: true,
  },
  { label: "Trade", path: "/trade" },
  { label: "Credit", path: "/credit" },
  { label: "Open Source", path: "https://github.com/arippicnic/trading-mode" },
];

export function MobileNav() {
  const [navShow, setNavShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const body = document.body;
    if (typeof body !== "undefined") {
      if (navShow) {
        body.style.setProperty("overflow", "hidden");
      } else {
        body.style.removeProperty("overflow");
      }
    }
  }, [navShow]);
  console.log(navShow);
  return (
    <div className="sm:hidden" aria-hidden={!navShow}>
      <button
        type="button"
        className="absolute right-0 z-50 mr-16 mt-9 md:hidden text-gray-400"
        onClick={() => {
          setNavShow(!navShow);
        }}
      >
        {navShow ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        )}
      </button>
      {navShow && (
        <div className="relative z-10">
          <div className="fixed w-full h-screen dark:bg-[#222427] bg-[#f7f7f7]">
            <button
              type="button"
              className="fixed w-full h-screen cursor-auto"
              onClick={(e) => {
                setNavShow(!navShow);
              }}
            ></button>
            <nav className="fixed flex flex-col items-center w-full h-screen px-6 py-48 mt-auto text-gray-400 font-semibold tracking-widest text-fore-primary">
              {routes.map((route) => (
                <div className="flex-grow" key={route.path}>
                  <Link href={route.path}>
                    <span
                      className={classNames({
                        "dark:text-white text-black":
                          !!route.exact === true ? route.path === router.asPath : router.asPath.startsWith(route.path),
                      })}
                      onClick={() => setNavShow(false)}
                    >
                      {route.label}
                    </span>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
