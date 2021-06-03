import Navbar from "components/Navbar";
import { useSession } from "next-auth/client";
import { createContext, useContext } from "react";

const LayoutContext = createContext<any>(undefined);

const LayoutProvider = ({ children, useLayout = true }) => {
  const [session] = useSession();
  return (
    <LayoutContext.Provider value={session}>
      {useLayout && <Navbar session={session} />}
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used in LayoutProvider");
  }

  return context;
};

export default LayoutProvider;
