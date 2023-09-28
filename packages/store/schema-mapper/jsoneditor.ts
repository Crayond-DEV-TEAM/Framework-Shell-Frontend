import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { JSONInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';

export const useJSON = create<JSONInterface>((set, get) => ({
  addedjson: '',
  anotherJSON: '',
  fetching: false,
  errorOnFetch: false,
  setAddedjson: (x: string) => {
    set(() => ({ addedjson: x }));
  },

  createJSON: (schema_for: string, type: string) => {
    const { addedjson } = get();
    set({ fetching: true, errorOnFetch: false });
    const payload = { schema_for, type, json: JSON.parse(addedjson) };
    httpRequest('POST', `${envConfig.schema_mapper}/SchemaData/create`, payload, true, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then()
      .catch((err) => {
        set({ errorOnFetch: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
}));
