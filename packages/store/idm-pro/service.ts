import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { ServiceInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
export const useService = create<ServiceInterface>((set, get) => ({
  ServiceList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditService: {
    serviceName: '',
    description: '',
    gitUrl: '',
    id: '',
    is_active: false,
  },
  OrganisationDetails: {
    id: '',
    name: '',
  },

  seteditService: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditService: { ...state.createEditService, [payload.key]: payload.value } }));
  },
  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => {
    set((state) => ({ OrganisationDetails: { ...state.OrganisationDetails, [payload.key]: payload.value } }));
  },

  getServiceList: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: id,
    };
    httpRequest('post', `${envConfig.api_url}/services/get`, payload, true)
      .then((response) => {
        debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                serviceName: tableData.name,
                is_active: tableData.is_active,
                description: tableData.description,
                data: tableData,
                organisationId: tableData.organisation_service_mappings.organisation_id,
                organisation: [
                  {
                    label: tableData.organisation_service_mappings.organisation_name,
                    color: 'primary.main',
                    bgColor: '#bcf0eb',
                  },
                ],
                giturl: tableData.git_url,
              }),
            set({ ServiceList: dataTable }),
          );
        } else {
          set({ ServiceList: [] });
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  createService: () => {
    const { clearAll, createEditService, getServiceList, OrganisationDetails } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: OrganisationDetails.id,
      name: createEditService.serviceName,
      description: createEditService.description,
      git_group_url: createEditService.gitUrl,
      is_active: createEditService.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/services`, payload, true)
      .then((response) => {
        enqueueSnackbar('Service added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getServiceList(OrganisationDetails.id);
        clearAll();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditService: { ...data } }));
  },

  editService: () => {
    const { clearAll, getServiceList, createEditService, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: OrganisationDetails.id,
      name: createEditService.serviceName,
      description: createEditService.description,
      git_group_url: createEditService.gitUrl,
      is_active: createEditService.is_active,
      service_id: createEditService.id,
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/services`, payload, true)
      .then((response) => {
        enqueueSnackbar('Services edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getServiceList(OrganisationDetails.id);
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getServiceList, OrganisationDetails } = get();
    const payload = {
      service_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/services`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getServiceList(OrganisationDetails.id);
      });
  },
  updateEditOrganisationData: (data: any) => {
    set((state) => ({ OrganisationDetails: { ...data } }));
  },

  deleteService: (id: string) => {
    const { getServiceList, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      service_id: id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/services`, payload, true)
      .then((response) => {
        enqueueSnackbar('Services deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getServiceList(OrganisationDetails.id);
      });
  },

  clearAll: () => {
    set({
      createEditService: {
        serviceName: '',
        description: '',
        gitUrl: '',
        id: '',
        is_active: false,
      },
    });
  },
}));
