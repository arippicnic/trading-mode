import cn from "classnames";
import React, { useState, useRef, useEffect } from "react";

import styles from "@styles/components/_dropdown.module.scss";

export interface DropdownSubType {
  name: string;
  active: boolean;
  action: () => void;
}

export type DropPositionType = {
  position: "Left" | "Right";
};

interface DropdownMenuTye {
  name: string;
  subMenu: boolean;
  action?: () => void;
  data?: DropdownSubType[];
}

interface DropdownTye extends DropPositionType {
  datas: DropdownMenuTye[];
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownTye> = ({ datas, children, position }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }
    isOpenMenu && menuRef.current.focus();
  }, [isOpenMenu]);

  return (
    <button
      className={styles.container}
      onClick={() => setIsOpenMenu(!isOpenMenu)}
      ref={menuRef}
      onBlur={() => setIsOpenMenu(false)}
      tabIndex={0}
    >
      {children}
      <ul
        className={cn(styles.menu, "text-gray-400", position === "Right" ? styles.menu_right : styles.menu_left)}
        hidden={!isOpenMenu}
      >
        {datas.map((menu) => (
          <React.Fragment key={menu.name}>
            {menu.subMenu ? (
              <li className={styles.item}>
                <div className="flex items-center justify-between w-full">
                  <span>{menu.name}</span>
                </div>
                <ul className={cn(styles.submenu, position === "Right" ? styles.submenu_right : styles.submenu_left)}>
                  {menu.data?.map((sub) => (
                    <React.Fragment key={sub.name}>
                      <li className={cn(styles.item, { "text-blue-300": sub.active })} onClick={sub.action}>
                        {sub.name}
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </li>
            ) : (
              <li className={styles.item} onClick={menu.action}>
                {menu.name}
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </button>
  );
};

export default Dropdown;
