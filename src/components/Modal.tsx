import cn from "classnames";
import { useEffect, useRef } from "react";
import { BsXLg } from "react-icons/bs";

import { useOutside } from "@hooks/useOutside";
import styles from "@styles/Main.module.scss";

interface ModalType {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalType> = ({ children, setShowModal, showModal }) => {
  const wrapperRef = useRef<HTMLInputElement | null>(null);

  useOutside({ ref: wrapperRef, status: setShowModal });
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);
  const RenderContentent = () => {
    if (showModal) {
      return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none md:h-full">
            <div ref={wrapperRef} className="relative px-6 w-full max-w-2xl">
              <div className={cn(styles.card, "p-3 border-0 rounded-md relative flex flex-col w-full bg-white")}>
                <button className="align-top self-end pt-1">
                  <BsXLg onClick={() => setShowModal(false)} className="text-sm sm:text-sm md:text-md lg:text-lg text-red-800" />
                </button>
                {children}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black dark:bg-white"></div>
        </>
      );
    }
    return null;
  };
  return <RenderContentent />;
};

export default Modal;
