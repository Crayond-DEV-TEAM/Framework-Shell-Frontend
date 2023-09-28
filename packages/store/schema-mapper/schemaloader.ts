import { envConfig } from '@core/envconfig';
import { getKeys, httpRequest } from '@core/utils';
import { create } from 'zustand';
import { SchemaLoaderInterface, Schema, API } from '../interface';
import { enqueueSnackbar } from 'notistack';

export const useSchemaLoader = create<SchemaLoaderInterface>((set, get) => ({
  fetching: false,
  errorOnFetch: false,

  vendorSchema: [],
  destinatinSchema: [],
  setVendorSchema: (x: Schema[]) => set(() => ({ vendorSchema: x })),
  setDestinationSchema: (x: Schema[]) => set(() => ({ destinatinSchema: x })),

  vendorAPI: {},
  destinationAPI: {},
  setVendorAPI: (x: API) => set(() => ({ vendorAPI: x })),
  setDestinationAPI: (x: API) => set(() => ({ destinationAPI: x })),

  vendorJSON: '',
  destinationJSON: '',
  setVendorJSON: (x: any) => set(() => ({ vendorJSON: x })),
  setDestinationJSON: (x: any) => set(() => ({ destinationJSON: x })),

  vendorId: '',
  destinationId: '',
  setVendorId: (id: any) => set(() => ({ vendorId: id })),
  setDestinationId: (id: any) => set(() => ({ destinationId: id })),

  updateAPI: (schema_for: string, type: string, callback: any) => {
    const {
      errorOnFetch,
      vendorAPI,
      destinationAPI,
      vendorJSON,
      destinationJSON,
      setVendorSchema,
      setDestinationSchema,
      setVendorId,
      setDestinationId,
    } = get();
    set({ fetching: true, errorOnFetch: false });
    const payload: any = {
      schema_for,
      type,
    };

    if (type === 'JSON') {
      payload.json = schema_for === 'source' ? JSON.parse(vendorJSON) : JSON.parse(destinationJSON);
    } else {
      payload.api_method = schema_for === 'source' ? vendorAPI?.method?.value : destinationAPI?.method?.value;
      payload.api = schema_for === 'source' ? vendorAPI?.url : destinationAPI?.url;
      payload.header =
        schema_for === 'source'
          ? vendorAPI?.header
            ? JSON.parse(vendorAPI?.header.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"'))
            : {}
          : destinationAPI?.header
          ? JSON.parse(destinationAPI?.header.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"'))
          : {};
      payload.body =
        schema_for === 'source'
          ? vendorAPI?.body
            ? JSON.parse(vendorAPI?.body.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"'))
            : {}
          : destinationAPI?.body
          ? JSON.parse(destinationAPI?.body.replace(/^(A-Z,a-z,0-9])$/g, '"\\$&"'))
          : {};
    }

    httpRequest('POST', `${envConfig.schema_mapper}/SchemaData/create`, payload, true)
      .then((response) => {
        // const { setVendorSchema, setDestinationSchema } = get();
        schema_for === 'source' ? setVendorId(response?.data?.data?.id) : setDestinationId(response?.data?.data?.id);
        const keys = getKeys(response?.data?.data?.json);
        const schema = keys.map((x, index) => ({ id: x, title: x, isEnabled: true }));
        schema_for === 'source'
          ? setVendorSchema && setVendorSchema(schema)
          : setDestinationSchema && setDestinationSchema(schema);
        callback();
      })
      .catch((err) => {
        set({ errorOnFetch: true });
        console.log(err);
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        // if (!errorOnFetch) {
        // }
      });
  },

  updateMappedSchema: (x: any) => {
    const { vendorId, destinationId } = get();
    const payload = {
      source: vendorId,
      destination: destinationId,
      mapped_json: x,
    };
    httpRequest('POST', `${envConfig.schema_mapper}/MappedSchema/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Schema Mapped Successfully', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetch: true });
        console.log(err);
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
}));
