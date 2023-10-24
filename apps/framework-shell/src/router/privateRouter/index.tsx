import { envConfig } from '@core/envconfig';
import { webRoutes } from '@core/routes';
import { useRouting } from '@core/store';
import { routeTo } from '@core/utils';
import { localStorageKeys, loginRoutes } from '@core/utils/constants';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [showComponent, setShowComponent] = useState(false);

  const appendToken = (url: string, token: string) => {
    return `${url}`;
  };

  useEffect(() => {
    if (searchParams.get('task') === 'logout') {
      localStorage.removeItem(localStorageKeys.authToken);
    }

    const authToken = localStorage.getItem(localStorageKeys?.authToken);

    if (authToken) {
      //   debugger;
      //   routeTo(useRouting, webRoutes.languageConfig);
      //   const redirectPath = searchParams.get('redirect_url');
      //window.location.replace(appendToken(redirectPath ? redirectPath : envConfig.frame_work_shell_ui, authToken));
      //   window.location.replace(appendToken( authToken));
      //   console.log(envConfig.message_catalog_root, authToken);
      // return d;
    } else {
      setShowComponent(true);
    }
  }, [location]);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
