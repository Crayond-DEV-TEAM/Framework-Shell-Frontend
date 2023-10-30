import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes, messageRoutes } from '@core/routes';
import { httpRequest, routeTo } from '@core/utils';
import { useRouting } from '../common';
import { create } from 'zustand';
import { Menu, MenusProps } from '../interface';
import { AllRoutes } from '../utils';
import { enqueueSnackbar } from 'notistack';

export const useMenu = create<MenusProps>((set, get) => ({
  sideMenus: [],
  loading: false,
  error: false,

  getMenu: async () => {
    try {
      set({ loading: true, error: false });
      const { data } = await httpRequest(
        'get',
        `https://dev-framework-api.crayond.com/api/v1/auth/access_tools`,
        {},
        true,
      );
      if (data.status === 200) {
        debugger;
        // const sideMenus: Menu[] = [];
        data.data?.tools_details?.forEach(
          (tool: {
            id: string;
            tool: {
              id: string;
              tool_name: string;
              baseUrl: string; // assuming the property is actually baseUrl
            };
            tool_id: number;
          }) => {
            // sideMenus.push({ ...AllRoutes[tool.tool_id], baseUrl: tool.tool.baseUrl });
          },
        );
        // set({ sideMenus: sideMenus });
      }

      return data;
    } catch (err: any) {
      set({ error: false });
      log('error', err);
    } finally {
      set({ loading: false });
    }
  },

  getSideMenusFromProject: (id: string) => {
    set({ loading: true, error: false });
    const payload = {
      project_id: id,
    };
    httpRequest('post', `${envConfig.api_url}/idm/project/list-services`, payload, true)
      .then((response) => {
        const sideMenus: any = [];
        // debugger;

        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          const matchedServiceIds = response.data.data.rows.map((apiItem: any) => apiItem.service_id);

          const matchedRoutes = AllRoutes.filter((route) => matchedServiceIds.includes(route.service_id));

          console.log(matchedRoutes, 'matchedRoutesmatchedRoutes');

          set({ sideMenus: matchedRoutes });
        } else {
          // set({ sideMenus: [] });
        }
      })
      .catch((err) => {
        set({ error: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ loading: false });
      });
  },

  onLinkClick: (data: Menu) => {
    // debugger;
    if (
      data.baseUrl === window.location.protocol + '//' + window.location.host ||
      window.location.hostname === 'localhost'
    ) {
      routeTo(useRouting, data.link);
    } else {
      window.location.replace(data.baseUrl + data.link);
    }
    return false;
  },
}));
