import { createContext, useContext, useEffect, useState } from 'react';
import LandingRouter from 'src/lib/landing/LandingRouter';
import ManageRouter from 'src/lib/management/router';

const RouterContext = createContext();

export const routers = {
  landing: {
    name: 'landing',
    router: <LandingRouter />,
  },
  management: {
    name: 'management',
    router: <ManageRouter />,
  },
};

export const LS_ROUTER_KEY = 'currentRouter';

export const RouterProvider = ({ children }) => {
  const localStorageRouterName = localStorage.getItem(LS_ROUTER_KEY);
  const [currentRouter, setCurrentRouter] = useState(routers[localStorageRouterName] ?? routers.landing);

  useEffect(() => {
    localStorage.setItem(LS_ROUTER_KEY, currentRouter.name);
  }, [currentRouter]);

  return <RouterContext.Provider value={{ currentRouter, setCurrentRouter }}>{children}</RouterContext.Provider>;
};

export const useRouter = () => {
  return useContext(RouterContext);
};
