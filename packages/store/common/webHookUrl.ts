
import { create } from 'zustand';
import { SettingsProps, WebHookUrlProps } from '../interface';
import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { useSlug } from './slug';

export const useWebHookURL = create<WebHookUrlProps>((set, get) => ({
  WebHookUrl: {
    IDM: '',
    PASM: '',
    ALERTSHUB: '',
    'MESSAGE-CATALOG': '',
  },
}));


export const useSettings = create<SettingsProps>((set, get) => ({
  loading: false,
  error: false,

  saveWebhookUrlAPI: (serviceId: string, url: string, service: string) => {
    const slugId = useSlug.getState().slugs[service];
    set({ loading: true, error: false });
    const payload = {
      id: slugId,
      url: url
    };
    httpRequest('PUT', `${envConfig.api_url}/idm/update-webhookurl`, payload, true, undefined,
      {
        headers: {
          slug: slugId,
        }
      }).then((res) => {
        enqueueSnackbar(res?.data?.message, { variant: 'success' });
      }).catch((err) => {
        set({ error: false });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      }).finally(() => {
        set({ loading: false });
      })

  }
}));
