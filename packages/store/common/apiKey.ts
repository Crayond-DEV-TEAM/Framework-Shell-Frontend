import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes, messageRoutes } from '@core/routes';
import { httpRequest, routeTo } from '@core/utils';
import { useRouting } from '../common';
import { create } from 'zustand';
import { WebhookUrl, SlugProps } from '../interface';
import { AllRoutes } from '../utils';
import { enqueueSnackbar } from 'notistack';

export const useAPIKey = create<SlugProps>((set, get) => ({
    APIkey: {
        IDM: '',
        PASM: '',
        ALERTSHUB: '',
        'MESSAGE-CATALOG': '',
    },

    getSlug: (key) => {
        const { APIKey } = get();
        return APIKey?.[key] ?? '';
    },
}));

export const useWebHookUrl = create<WebhookUrl>((set, get) => ({

    saveWebhookUrlAPI: async () => {
        try {
        //   set({ loading: true, error: false });
          const { data } = await httpRequest(
            'post',
            `https://dev-framework-api.crayond.com/api/v1/idm/update-webhookurl`,
            {},
            true,
          );
          if (data.status === 200) {
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
        //   set({ error: false });
          log('error', err);
        } finally {
        //   set({ loading: false });
        }
      },

}))
