import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { AdminInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useAdmins = create<AdminInterface>((set, get) => ({
  adminList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditAdmin: {
    projectTitle: '',
    description: '',
    services: [],
    mappedUser: [],
    is_active: false,
    access: '',
    id: '',
    gitUrl: '',
  },
  OrganisationDetails: {
    id: '',
    name: '',
  },

  seteditAdmin: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: payload.value } }));
  },

  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => {
    set((state) => ({ OrganisationDetails: { ...state.OrganisationDetails, [payload.key]: payload.value } }));
  },

  getAdminList: (id: string) => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: id,
    };

    httpRequest('post', `${envConfig.idm_api_url}/projects/get`, payload, true)
      .then((response) => {
        // debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.project.id,
                projectTitle: tableData.project.name,
                is_active: tableData.project.is_active,
                // serviceMapped: tableData.project_service_mappings.length + ' ' + 'services',
                description: tableData.project.description,
                data: tableData,
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
      git_group_url: createEditAdmin.gitUrl,
      access: createEditAdmin.access,
      services: createEditAdmin.mappedUser.map((x: any) => x?.id),
      users: createEditAdmin.services.map((x: any) => x?.id),
      is_active: true,
    };
    // debugger;
    httpRequest('post', `${envConfig.idm_api_url}/projects`, payload, true)
      .then((response) => {
        enqueueSnackbar('Permission added Succesfully!', { variant: 'success' });
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
    httpRequest('put', `${envConfig.idm_api_url}/projects`, payload, true)
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
    httpRequest('put', `${envConfig.idm_api_url}/projects`, payload, true)
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

  deleteAdmin: (x: any) => {
    const { getAdminList, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      permission_id: x.id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.idm_api_url}/permissions`, payload, true)
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
        services: [],
        mappedUser: [],
        is_active: false,
        access: '',
        id: '',
        gitUrl: '',
      },
    });
  },
}));
