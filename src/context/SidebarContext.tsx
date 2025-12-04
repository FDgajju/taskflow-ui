import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

export const sidebarContext = createContext({
  fullSidebar: true,
  toggleSidebar: () => {},
});

const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [fullSidebar, setFullSidebar] = useState(true);

  const toggleSidebar = () => {
    setFullSidebar(!fullSidebar);
  };

  return (
    <sidebarContext.Provider value={{ fullSidebar, toggleSidebar }}>
      {children}
    </sidebarContext.Provider>
  );
};

export default SidebarProvider;
