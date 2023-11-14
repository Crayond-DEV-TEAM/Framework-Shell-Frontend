import { create } from 'zustand';
import { APIKeyProps } from '../interface';

export const useAPIKey = create<APIKeyProps>((set, get) => ({
  APIkey: {
    IDM: '',
    PASM: '',
    ALERTSHUB: '',
    'MESSAGE-CATALOG': '',
  },
}));
