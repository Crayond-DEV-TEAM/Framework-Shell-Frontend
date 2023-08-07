import { envConfig } from '@core/envconfig';
import { messageRoutes } from '@core/routes';
import { localStorageKeys, loginRoutes } from '@core/utils/constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem(localStorageKeys?.authToken);
    //Not logged in
    // if (authToken) {
    setShowComponent(true);
    // } else if (searchParams.get('token')) {
    //   const newAuthToken = searchParams.get('token');
    //   localStorage.setItem(localStorageKeys.authToken, newAuthToken as string);
    //   setSearchParams({});
    //   setShowComponent(true);
    // } else {
    //   window.location.replace(envConfig.frame_work_shell_ui + '/?redirect_url=' + window.location.href);
    // }
  }, [location]);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
