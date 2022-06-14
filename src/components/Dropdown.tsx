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
  const postionRight = position === "Right";

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }
    isOpenMenu && menuRef.current.focus();
  }, [isOpenMenu]);

  const renderSubList = ({ sub }: { sub: DropdownSubType[] }) => {
    return sub.map((item) => (
      <li key={item.name} className={cn(styles.item, { "text-blue-300": item.active })} onClick={item.action}>
        {item.name}
      </li>
    ));
  };

  const renderList = datas.map((menu) => {
    if (menu.subMenu) {
      return (
        <li className={styles.item} key={menu.name}>
          <div className="flex items-center justify-between w-full">
            <span>{menu.name}</span>
          </div>
          <ul className={cn(styles.submenu, postionRight ? styles.submenu_right : styles.submenu_left)}>
            {renderSubList({ sub: postionRight ? menu.data! : menu.data?.slice(0).reverse()! })}
          </ul>
        </li>
      );
    }
    return (
      <li className={styles.item} onClick={menu.action} key={menu.name}>
        {menu.name}
      </li>
    );
  });

  return (
    <button
      className={styles.container}
      onClick={() => setIsOpenMenu(!isOpenMenu)}
      ref={menuRef}
      onBlur={() => setIsOpenMenu(false)}
      tabIndex={0}
    >
      {children}
      <ul className={cn(styles.menu, "text-gray-400", postionRight ? styles.menu_right : styles.menu_left)} hidden={!isOpenMenu}>
        {renderList}
      </ul>
    </button>
  );
};

export default Dropdown;
