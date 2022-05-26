import React, { useEffect, RefObject } from "react";

type ContextProps = {
  ref: RefObject<HTMLInputElement>;
  status: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useOutside = function ({ status, ref }: ContextProps) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        status(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, status]);
};
