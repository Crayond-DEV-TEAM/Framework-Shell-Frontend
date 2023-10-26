import { webRoutes } from '@core/routes';
import { localStorageKeys } from '@core/utils/constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    if (searchParams.get('task') === 'logout') {
      localStorage.removeItem(localStorageKeys.authToken);
    }
    // If auth token is not present in local storage, navigate to login.
    const authToken = localStorage.getItem(localStorageKeys?.authToken);
    if (!authToken) {
      // debugger;
      navigate(webRoutes.login);
      return;
    }
    // else show the protected route component
    setShowComponent(true);
  }, [location]);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
