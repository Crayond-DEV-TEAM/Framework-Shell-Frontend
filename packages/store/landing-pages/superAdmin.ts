import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import {  SuperAdminLandingInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useSuperAdminLanding = create<SuperAdminLandingInterface>((set, get) => ({
  OrganisationList: [],
  ServiceList: [],
  UserListMaster:[],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditOrganisation: {
    organisationName: '',
    description: '',
    email_id: '',
    mapAdmin: [],
    mapServices: [],
    is_active: true,
    id: '',
    adminDatas:[],
    serviceDatas:[]
  },

  seteditOrganisation: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditOrganisation: { ...state.createEditOrganisation, [payload.key]: payload.value } }));
  },

  getOrganisationList: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/idm/organisation/list`, {}, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                organisationTitle: tableData.name,
                is_active: tableData.is_active,
                description: tableData.description,
                // data: tableData,
                serviceMapped: tableData.no_of_service,
              }),
            set({ OrganisationList: dataTable }),
          );
        } else {
          set({ OrganisationList: [] });
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
  createOrganisation: () => {
    const { clearAll, createEditOrganisation, getOrganisationList } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      name: createEditOrganisation.organisationName,
      emailId: createEditOrganisation.email_id,
      description: createEditOrganisation.description,
      services: createEditOrganisation.mapServices.map((x) => x?.id),
      admin: createEditOrganisation.mapAdmin.map((x) => x?.id),
      is_active: createEditOrganisation.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/idm/organisation/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisation added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
        clearAll();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditOrganisation: { ...data } }));
  },

  editOrganisation: () => {
    const { clearAll, getOrganisationList, createEditOrganisation } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      name: createEditOrganisation.organisationName,
      description: createEditOrganisation.description,
      email_id: createEditOrganisation.email_id,
      is_active: createEditOrganisation.is_active,
      organisation_id: createEditOrganisation.id,
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/idm/organisation/update`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisations edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
        clearAll();
      });
  },

editGetDataOrganisation: (id: string) => {
  const { clearAll, getOrganisationList, createEditOrganisation } = get();
  set({ fetching: true, errorOnFetching: false });

  const payload = {
    organisation_id: id,
  };

  httpRequest('post', `${envConfig.api_url}/idm/organisation/get`, payload, true)
    .then((response) => {
      const responseData = response.data.data;
      const Servicemap: any = [];
      const Adminmap: any = [];

      if (Array.isArray(responseData.organisation_service_mappings) && responseData.organisation_service_mappings.length > 0) {
        responseData.organisation_service_mappings.forEach((tableData: any) => {
          Servicemap.push({
            id: tableData.service_id,
            name: tableData.service_name,
          });
        });
      }

      if (Array.isArray(responseData.organisation_user_mappings) && responseData.organisation_user_mappings.length > 0) {
        responseData.organisation_user_mappings.forEach((tableData: any) => {
          Adminmap.push({
            id: tableData.user_profile_id,
            name: tableData.name,
          });
        });
      }
      const Servicemaps = get()

      const Datalist = {
        organisationName: responseData.name,
        description: responseData.description,
        email_id: responseData.email_id,
        mapAdmin: Adminmap,
        mapServices: Servicemap,
        adminDatas: [...Adminmap],
        // serviceDatas:JSON.parse(JSON.stringify(Servicemap)),
         serviceDatas: [ ...Servicemap ],
        is_active: responseData.is_active,
        id: responseData.id,
      };

      set((state) => ({ createEditOrganisation: { ...Datalist } }));
    })
    .catch((err) => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' }); // Fixed typo in enqueueSnackbar
      set({ errorOnFetching: true });
    })
    .finally(() => {
      set({ fetching: false });
      // getOrganisationList();
      // clearAll();
    });
},

  createAdminmap: () => {
    const { clearAll, getOrganisationList, createEditOrganisation ,editGetDataOrganisation } = get();
    set({ fetching: true, errorOnFetching: false });
    const newList = createEditOrganisation.mapAdmin.filter(newObj => !createEditOrganisation.adminDatas.some(existingObj => existingObj.id === newObj.id));
     const orgId = createEditOrganisation.id
    const payload = {
       organisation_id:orgId,
       user_profile_id:newList.map((x:any)=>x?.id)
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/idm/organisation/admin/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New admin mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
        clearAll();
        editGetDataOrganisation(orgId)
      });
  },
  deleteAdminmap: () => {
    const { clearAll, getOrganisationList, createEditOrganisation ,editGetDataOrganisation } = get();
     set({ fetching: true, errorOnFetching: false });
        const missingList = createEditOrganisation.adminDatas.filter(existingObj => !createEditOrganisation.mapAdmin.some(newObj => newObj.id === existingObj.id));
        const orgId = createEditOrganisation.email_id
    // const { RepositoryList } = useRepository();
    const payload = {
       organisation_id:orgId,
       user_profile_id:missingList.map((x:any)=>x?.id)
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/organisation/admin`, payload, true)
      .then((response) => {
        enqueueSnackbar('Admin Unmapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
        clearAll();
        editGetDataOrganisation(orgId)
      });
  },
  createServicemap: () => {
    const { createEditOrganisation,editGetDataOrganisation } = get();
    set({ fetching: true, errorOnFetching: false });
    const newList = createEditOrganisation.mapServices.filter(newObj => !createEditOrganisation.serviceDatas.some(existingObj => existingObj.id === newObj.id));
     const orgId = createEditOrganisation.id
    const payload = {
       organisation_id:orgId,
       service_id:newList.map((x:any)=>x?.id)
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/idm/organisation/service/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Service mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false }); 
        editGetDataOrganisation(orgId);
        // clearAll();
      });
  },
  deleteServicemap: () => {
    const { clearAll, getOrganisationList, createEditOrganisation ,editGetDataOrganisation } = get();
    set({ fetching: true, errorOnFetching: false });
        const missingList = createEditOrganisation.serviceDatas.filter(existingObj => !createEditOrganisation.mapServices.some(newObj => newObj.id === existingObj.id));
        const orgId = createEditOrganisation.id
    // const { RepositoryList } = useRepository();
    const payload = {
       organisation_id:orgId,
       service_id:missingList.map((x:any)=>x?.id)
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/organisation/service`, payload, true)
      .then((response) => {
        enqueueSnackbar('Service unmapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        editGetDataOrganisation(orgId);
        // clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getOrganisationList } = get();
    const payload = {
      organisation_id: id,
      is_active: status,
    };
    httpRequest('post', `${envConfig.api_url}/idm/organisation/deactivate`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
      });
  },

  deleteOrganisation: (id: string) => {
    const { getOrganisationList } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/organisation/delete`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisations deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getOrganisationList();
      });
  },
    getAllUserList: () => {
    // const { OrganisationDetails } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
    //   organisation_id: OrganisationDetails.id,
    };
    httpRequest('get', `${envConfig.api_url}/idm/user-profile/list`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
              }),
            set({ UserListMaster: dataTable }),
          );
        } else {
          set({ UserListMaster: [] });
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

  getServiceList: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/idm/service/get`, {}, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
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

  clearAll: () => {
    set({
      createEditOrganisation: {
        organisationName: '',
        description: '',
        email_id: '',
        mapAdmin: [],
        mapServices: [],
        adminDatas:[],
        serviceDatas:[],
        is_active: true,
        id: '',
      },
    });
  },
}));
