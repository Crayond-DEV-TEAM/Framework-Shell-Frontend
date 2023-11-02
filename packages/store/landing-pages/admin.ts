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
  userInviteEdit: {
    userName: '',
    email: '',
    userNameStatus: 0,
    emailStatus: 0,
  },
  OrganisationDetails: {
    id: '',
    name: '',
    rolename: '',
  },

  seteditAdmin: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditAdmin: { ...state.createEditAdmin, [payload.key]: payload.value } }));
  },
  seteditUserInviteDetails: (payload: { key: string; value: string | number }) => {
    set((state) => ({ userInviteEdit: { ...state.userInviteEdit, [payload.key]: payload.value } }));
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
      services: Array.isArray(createEditAdmin.mapServices) ? createEditAdmin.mapServices?.map((x: any) => x?.id) : [],
      users: Array.isArray(createEditAdmin.mapAdmin)
        ? createEditAdmin.mapAdmin?.map((x: any) => ({
            user_profile_id: x?.id,
            access: x?.access,
          }))
        : [],
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
          if (dataTable.length > 0) {
            const zerothObject = dataTable[0];
            set({
              OrganisationDetails: {
                id: zerothObject.id,
                name: zerothObject.name,
                rolename: zerothObject.rolename,
              },
            });
          }
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

  addUserInvite: () => {
    set({ fetching: true, errorOnFetching: false });
    const { OrganisationDetails, userInviteEdit } = get();
    const payload = {
      organisation_id: OrganisationDetails.id,
      username: userInviteEdit.userName,
      email_id: userInviteEdit.email,
    };
    httpRequest('post', `${envConfig.api_url}/idm/project/invite-user`, payload, true)
      .then((response) => {
        enqueueSnackbar('User Invited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  emailChecker: () => {
    debugger;
    set({ fetching: true, errorOnFetching: false });
    const { userInviteEdit, seteditUserInviteDetails } = get();

    const payload = {
      email: userInviteEdit.email,
    };
    //  debugger;
    httpRequest('post', `${envConfig.api_url}/framework_shell_auth/check/email`, payload, false)
      .then((response) => {
        debugger;
        if (response.data) {
          const key = 'emailStatus';
          const value = response.status;
          seteditUserInviteDetails({ key, value });
        }
        enqueueSnackbar('User Email Verified!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  userNameChecker: () => {
    debugger;
    set({ fetching: true, errorOnFetching: false });
    const { userInviteEdit, seteditUserInviteDetails } = get();
    const payload = {
      username: userInviteEdit.userName,
    };
    //  debugger;
    httpRequest('post', `${envConfig.api_url}/framework_shell_auth/check/username`, payload, false)
      .then((response) => {
        if (response.data) {
          const key = 'userNameStatus';
          const value = response.status;
          seteditUserInviteDetails({ key, value });
        }
        enqueueSnackbar('Username Availble', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(err.response.data.message, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
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
