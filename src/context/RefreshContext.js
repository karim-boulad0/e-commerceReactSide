import { createContext, useState } from "react";

export const MenuTwo = createContext("");

export default function MenuTwoContext({ children }) {
  const [isOpenTwo, setIsOpenTwo] = useState(true);
  return (
    <MenuTwo.Provider value={{ isOpenTwo, setIsOpenTwo }}>
      {children}
    </MenuTwo.Provider>
  );
}
