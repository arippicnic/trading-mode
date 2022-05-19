import cn from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

import Modal from "@components/Modal";
import HeaderLinks from "./HeaderLinks";
import Logo from "@styles/image/logo.svg";
import ThemeSwitch from "./ThemeSwitch";
import Link from "@components/Link";
import { siteMeta } from "@siteMeta";
import Tooltip, { isToltip } from "@components/Tooltip";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageCrypto = useRouter().pathname;
  const toltipData = isToltip({ name: "Open Source", loop: false });

  return (
    <>
      <header className="flex items-center justify-between py-6 px-2">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <div className="mr-3">
                <Image alt={siteMeta.author} src={Logo} />
              </div>
              <div
                className={cn(
                  "/" === pageCrypto ? "text-black dark:text-white" : "text-gray-400",
                  "hidden h-6 text-xl font-semibold sm:block hover:text-black dark:hover:text-white"
                )}
              >
                {siteMeta.name}
              </div>
            </div>
          </Link>
          <div className="hidden sm:block">
            <HeaderLinks mobileMode={false} />
          </div>
        </div>
        <div className="flex items-center">
          <ThemeSwitch />
          <div className="sm:hidden flex items-center mt-1 ml-8">
            <button type="button" onClick={() => setShowModal(true)}>
              <FaBars className="text-xl text-gray-400" />
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <HeaderLinks mobileMode={true} />
            </Modal>
          </div>
          <div>
            <Link href={siteMeta.githubUrl} className="hidden sm:block ml-8">
              <BsGithub {...toltipData} className="text-2xl text-gray-400" />
            </Link>
            <Tooltip id={toltipData["data-for"]} place="bottom" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
