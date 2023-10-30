import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { AdminInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useAdminLanding = create<AdminInterface>((set, get) => ({
  adminList: [],
  OrganisationListMaster: [],
  ServiceListMaster: [],
  UserListMaster: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditAdmin: {
    projectTitle: '',
    description: '',
    mapServices: [],
    mapAdmin: {
      id: '',
      name: '',
      access: '',
    },
    is_active: false,
    id: '',
  },
  OrganisationDetails: {
    id: '62e1fcec-83df-41f8-8743-75720cdd2b0a',
    name: 'Test',
    rolename: 'TOOLKIT-ADMIN',
  },

  seteditAdmin: (payload: { key: string; value: string | number }) => {
    //     if(payload.key==='mapAdmin'){
    //       const MappedUserState = {
    //         id:payload.value.id,
    //         name:payload.value.name,
    //         access:payload.value.access
    //       }
    // set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: MappedUserState } }));
    //     }else{
    //     set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: payload.value } }));
    //     }
    set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: payload.value } }));
  },

  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => {
    set((state) => ({ OrganisationDetails: { ...state.OrganisationDetails, [payload.key]: payload.value } }));
  },

  getAdminList: () => {
    set({ fetching: true, errorOnFetching: false });
    const { OrganisationDetails } = get();
    const payload = {
      organisation_id: OrganisationDetails.id,
      limit: 20,
      offset: 0,
    };

    httpRequest('post', `${envConfig.api_url}/idm/projects/get`, payload, true)
      .then((response) => {
        debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                projectTitle: tableData.name,
                is_active: tableData.is_active,
                serviceMapped: tableData.no_of_service,
                description: tableData.description,
                // data: tableData,
              }),
            set({ adminList: dataTable }),
          );
        } else {
          set({ adminList: [] });
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

  updateEditData: (data: any) => {
    set((state) => ({ createEditAdmin: { ...data } }));
  },
  createAdmin: () => {
    const { clearAll, createEditAdmin, getAdminList, OrganisationDetails } = get();

    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      organisation_id: OrganisationDetails.id,
      name: createEditAdmin.projectTitle,
      description: createEditAdmin.description,
      services: createEditAdmin.mapServices.map((x: any) => x?.id),
      users: createEditAdmin.mapAdmin.map((x: any) => ({
        user_profile_id: x?.id,
        access: x?.access,
      })),
      // is_active: true,
    };
    // debugger;
    httpRequest('post', `${envConfig.api_url}/idm/projects/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Project created Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList(OrganisationDetails.id);
        clearAll();
      });
  },

  editAdmin: () => {
    const { clearAll, getAdminList, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      // permission_id: getAdminList.id,
      // // data: { data },
      // name: getAdminList.name,
      // description: addPermissionList.description,
      // is_active: addPermissionList.is_active,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList(OrganisationDetails.id);
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    // const {}= useUserLanding()
    const { getAdminList, OrganisationDetails } = get();
    const payload = {
      role_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList(OrganisationDetails.id);
      });
  },
  getOrganisationMaster: () => {
    debugger;
    set({ fetching: true, errorOnFetching: false });
    //  debugger;
    httpRequest('get', `${envConfig.api_url}/idm/user-profile/list/organisation?limit=20&offset=0`, {}, true)
      .then((response) => {
        debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.organisation_id,
                name: tableData.organisation_name,
                rolename: tableData.role_name,
              }),
            set({ OrganisationListMaster: dataTable }),
          );
        } else {
          set({ OrganisationListMaster: [] });
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
  getServiceMasterByOrganisation: () => {
    debugger;
    set({ fetching: true, errorOnFetching: false });
    const { OrganisationDetails } = get();
    const payload = {
      organisation_id: OrganisationDetails.id,
      limit: 10,
      offset: 0,
    };
    //  debugger;
    httpRequest('post', `${envConfig.api_url}/idm/organisation/service`, payload, true)
      .then((response) => {
        debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
              }),
            set({ ServiceListMaster: dataTable }),
          );
        } else {
          set({ ServiceListMaster: [] });
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
  getUserMasterByOrganisation: () => {
    debugger;
    const { OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });

    const payload = {
      organisation_id: OrganisationDetails.id,
    };
    //  debugger;
    httpRequest('post', `${envConfig.api_url}/idm/organisation/users`, payload, true)
      .then((response) => {
        debugger;
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

  deleteAdmin: (x: any) => {
    const { getAdminList, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: x.id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/permissions`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList(OrganisationDetails.id);
      });
  },

  clearAll: () => {
    set({
      createEditAdmin: {
        projectTitle: '',
        description: '',
        mapServices: [],
        mapAdmin: [],
        is_active: false,
        id: '',
      },
    });
  },
}));
