import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsGithub } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import cn from "classnames";

import Logo from "@/styles/logo.svg";
import ThemeSwitch from "./ThemeSwitch";
import siteMetadata from "@/siteMetadata";
import Link from "@/components/Link";
import Tooltip, { isToltip } from "@/components/Tooltip";
import Modal from "@/components/Modal";
import HeaderLinks from "./HeaderLinks";

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
            <Link href={siteMetadata.githubUrl} className="hidden sm:block ml-8">
              <BsGithub {...toltipData} className="text-md md:text-xl lg:text-2xl mr-2 text-gray-400" />
            </Link>
            <Tooltip id={toltipData["data-for"]} place="bottom" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
