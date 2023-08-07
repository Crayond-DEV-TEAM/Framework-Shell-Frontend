import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { JSONInterface } from '../interface';

export const useJSON = create<JSONInterface>((set, get) => ({
  addedjson: '',
  anotherJSON: '',
  setAddedjson: (x: string) => {
    set(() => ({ addedjson: x }));
  },
}));
