import { webRoutes } from '@core/routes';
import { localStorageKeys, loginRoutes } from '@core/utils/constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem(localStorageKeys?.authToken);

    //Not logged in

    if (!authToken && !loginRoutes.some((route) => route === location?.pathname)) {
      navigate(webRoutes.login);
    }

    //Already logged in
    if (authToken && loginRoutes.some((route) => route === location?.pathname)) {
      //navigate(webRoutes.home);
    }
    setShowComponent(true);
  }, [location]);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
