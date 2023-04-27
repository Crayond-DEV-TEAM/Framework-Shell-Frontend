import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes, messageRoutes } from '@core/routes';
import { httpRequest, routeTo } from '@core/utils';
import { useRouting } from '../common';
import { create } from 'zustand';
import { Menu, MenusProps } from '../interface';
import { AllRoutes } from '../utils';

export const useMenu = create<MenusProps>((set, get) => ({
  sideMenus: [],
  loading: false,
  error: false,

  getMenu: async () => {
    try {
      set({ loading: true, error: false });
      const { data } = await httpRequest('get', `${envConfig.auth_url}/access_tools`, {}, true);
      if (data.status === 200) {
        const sideMenus: Menu[] = [];
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
            sideMenus.push({ ...AllRoutes[tool.tool_id], baseUrl: tool.tool.baseUrl });
          },
        );
        set({ sideMenus: sideMenus });
      }

      return data;
    } catch (err: any) {
      set({ error: false });
      log('error', err);
    } finally {
      set({ loading: false });
    }
  },

  onLinkClick: (data: Menu) => {
    if (window.location.hostname === 'localhost') {
      routeTo(useRouting, data.link);
    } else {
      window.location.replace(data.baseUrl + data.link);
    }
    return false;
  },
}));
