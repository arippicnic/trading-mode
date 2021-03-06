import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Tooltip, { isToltip } from "@components/Tooltip";

const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const toltipDatas = isToltip({ name: "Change Theme", loop: false });
  useEffect(() => setMounted(true), []);
  return (
    <>
      <button
        {...toltipDatas}
        aria-label="Toggle Dark Mode"
        type="button"
        onClick={() => setTheme(theme === "dark" || resolvedTheme === "dark" ? "light" : "dark")}
      >
        <svg id="Capa_1" viewBox="0 0 512 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          {mounted && (theme === "dark" || resolvedTheme === "dark") ? (
            <g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m256 360.099c-57.4 0-104.099-46.698-104.099-104.099s46.699-104.099 104.099-104.099 104.099 46.699 104.099 104.099-46.699 104.099-104.099 104.099zm0-178.198c-40.858 0-74.099 33.241-74.099 74.099s33.24 74.099 74.099 74.099 74.099-33.241 74.099-74.099-33.241-74.099-74.099-74.099z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m256 116.071c-8.284 0-15-6.716-15-15v-86.071c0-8.284 6.716-15 15-15s15 6.716 15 15v86.071c0 8.284-6.716 15-15 15z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m146.449 161.449c-3.839 0-7.678-1.464-10.606-4.393l-60.863-60.862c-5.858-5.858-5.858-15.355 0-21.213 5.857-5.858 15.355-5.858 21.213 0l60.862 60.861c5.858 5.858 5.858 15.355 0 21.213-2.928 2.929-6.767 4.394-10.606 4.394z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m101.071 271h-86.071c-8.284 0-15-6.716-15-15s6.716-15 15-15h86.071c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m85.587 441.413c-3.839 0-7.678-1.464-10.606-4.394-5.858-5.858-5.858-15.355 0-21.213l60.862-60.861c5.858-5.857 15.356-5.857 21.213 0 5.858 5.858 5.858 15.355 0 21.213l-60.863 60.862c-2.928 2.928-6.767 4.393-10.606 4.393z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m256 512c-8.284 0-15-6.716-15-15v-86.071c0-8.284 6.716-15 15-15s15 6.716 15 15v86.071c0 8.284-6.716 15-15 15z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m426.413 441.413c-3.839 0-7.678-1.464-10.606-4.393l-60.862-60.861c-5.858-5.858-5.858-15.355 0-21.213 5.857-5.858 15.355-5.858 21.213 0l60.862 60.861c5.858 5.858 5.858 15.355 0 21.213-2.929 2.928-6.768 4.393-10.607 4.393z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m497 271h-86.071c-8.284 0-15-6.716-15-15s6.716-15 15-15h86.071c8.284 0 15 6.716 15 15s-6.716 15-15 15z"
                ></path>
              </g>
              <g>
                <path
                  fill="#9CA3AF"
                  d="m365.551 161.449c-3.839 0-7.678-1.464-10.606-4.394-5.858-5.858-5.858-15.355 0-21.213l60.862-60.861c5.857-5.856 15.355-5.858 21.213 0s5.858 15.355 0 21.213l-60.862 60.861c-2.929 2.929-6.769 4.394-10.607 4.394z"
                ></path>
              </g>
            </g>
          ) : (
            <path
              fill="#9CA3AF"
              d="M367.924,8.521c70.94,127.548,25.05,288.445-102.49,359.385c-79.869,44.425-177.026,44.425-256.895,0 C79.572,495.352,240.478,541.08,367.924,470.047s173.174-231.939,102.141-359.385C446.174,67.788,410.798,32.42,367.924,8.521z"
            ></path>
          )}
        </svg>
      </button>
      <Tooltip id={toltipDatas["data-for"]} place="bottom" />
    </>
  );
};

export default ThemeSwitch;
