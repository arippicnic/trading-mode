import Router from "next/router";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import Search from "@components/Search";
import Modal from "@components/Modal";
import Dropdown from "@components/Dropdown";

const Navigation: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const dataAction = [
    { name: "Search", subMenu: false, action: () => setShowModal(true) },
    { name: "Back To Home", subMenu: false, action: () => Router.push("/trade") },
  ];

  return (
    <>
      <Dropdown datas={dataAction} position={"Right"}>
        <FaBars className="text-xl" />
      </Dropdown>
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="py-3 lg:py-5">
            <Search />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navigation;
