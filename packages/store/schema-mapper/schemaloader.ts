import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { SchemaLoaderInterface, Schema, API } from '../interface';

export const useSchemaLoader = create<SchemaLoaderInterface>((set, get) => ({
  vendorSchema: [],
  destinatinSchema: [],
  setVendorSchema: (x: Schema[]) => set(() => ({ vendorSchema: x })),
  setDestinationSchema: (x: Schema[]) => set(() => ({ destinatinSchema: x })),

  vendorAPI: {},
  destinationAPI: {},
  setVendorAPI: (x: API) => set(() => ({ vendorAPI: x })),
  setDestinationAPI: (x: API) => set(() => ({ destinationAPI: x })),
}));
