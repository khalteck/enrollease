import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  // eslint-disable-next-line no-unused-vars
  const [loader, setLoader] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        loader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
