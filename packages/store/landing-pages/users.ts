import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserLandingInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { useAdminLanding } from './admin';

export const useUserLanding = create<UserLandingInterface>((set, get) => ({
  fetching: false,
  errorOnFetching: false,
  UserList: [],
  createEditUserRoleList: { mapAdmin: [] , searchName: '' },
  UserListMasterBySearch: [],
  UserEditRoleData: { name: '', role: '', id: '', is_active: false },

  OrganisationListMaster: [],

  seteditUserList: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditUserRoleList: { ...state.createEditUserRoleList, [payload.key]: payload.value } }));
  },

  seteditRole: (payload: { key: string; value: string | number }) => {
    set((state) => ({ UserEditRoleData: { ...state.UserEditRoleData, [payload.key]: payload.value } }));
  },

  // getUserProjectList: (id: string) => {
  //   set({ fetching: true, errorOnFetching: false });
  //   const payload = {
  //     organisation_id: id,
  //   };

  //   httpRequest('post', `${envConfig.idm_api_url}/projects/get`, payload, true)
  //     .then((response) => {
  //       const dataTable: any = [];
  //       debugger;
  //       if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
  //         response.data.data.rows.map(
  //           (tableData: any, i: any) =>
  //             dataTable.push({
  //               id: tableData.id,
  //               projectTitle: tableData.name,
  //               is_active: false,
  //               // serviceMapped: tableData.project_user_mappings.length + ' ' + 'services',
  //               description: tableData.description,
  //               data: tableData,
  //             }),
  //           set({ ProjectList: dataTable }),
  //         );
  //       } else {
  //         set({ ProjectList: [] });
  //       }
  //     })
  //     .catch((err) => {
  //       set({ errorOnFetching: true });
  //       enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
  //     })
  //     .finally(() => {
  //       set({ fetching: false });
  //     });
  // },
  getAllUserProfileList: (id: string) => {
    debugger;
    const organisationId = useAdminLanding.getState()?.OrganisationDetails.id;
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: organisationId,
    };

    httpRequest('post', `${envConfig.api_url}/idm/organisation/list-member`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          debugger;
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
                is_active: tableData.is_active,
                data: tableData,
                role: tableData.role_name,
              }),
            set({ UserList: dataTable }),
          );
        } else {
          set({ UserList: [] });
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
  deleteUserlist: (id: string) => {
    debugger;
    const { getAllUserProfileList } = get();
    const organisationId = useAdminLanding.getState()?.OrganisationDetails.id;
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      user_profile_id: id,
      organisation_id: organisationId,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/organisation/member`, payload, true)
      .then((response) => {
        enqueueSnackbar('User deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAllUserProfileList();
        // getAdminList();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ UserEditRoleData: { ...data } }));
  },
  editUserList: () => {
    const { UserEditRoleData, getAllUserProfileList } = get();
    const organisationId = useAdminLanding.getState()?.OrganisationDetails.id;

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: organisationId,
      user_profile_id: UserEditRoleData.id,
      role_id: UserEditRoleData.role.id,
    };
    // debugger;
    httpRequest('put', `${envConfig.api_url}/idm/organisation/member`, payload, true)
      .then((response) => {
        enqueueSnackbar('User role map edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAllUserProfileList();
      });
  },
  createUserList: () => {
    //  const { clearAll, createEditAdmin, getAdminList, OrganisationDetails } = get();
    const { createEditUserRoleList, getAllUserProfileList } = get();
    const organisationId = useAdminLanding.getState()?.OrganisationDetails.id;

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: organisationId,
      members: createEditUserRoleList.mapAdmin.map((x: any) => {
        return {
          user_profile_id: x?.id,
          role_id: x?.access?.id,
        };
      }),
    };
    // debugger;
    httpRequest('post', `${envConfig.api_url}/idm/organisation/members/add`, payload, true)
      .then((response) => {
        enqueueSnackbar('User role mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAllUserProfileList();
        // getAdminList();
        // clearAll();
      });
  },
  // /idm/user-profile/search
  getSearchOptionList: (id: string) => {
    const { createEditUserRoleList } = get();
    debugger;
    set({ fetching: true, errorOnFetching: false });

    const payload = {
      organisation_id: id,
      searchStr: createEditUserRoleList.searchName,
      limit: 50,
      offset: 0,
    };
    debugger;
    httpRequest('post', `${envConfig.api_url}/idm/user-profile/search`, payload, true)
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
            set({ UserListMasterBySearch: dataTable }),
          );
        } else {
          set({ UserListMasterBySearch: [] });
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
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const organisationId = useAdminLanding.getState()?.OrganisationDetails.id;
    const { getAllUserProfileList } = get();
    const payload = {
      organisation_id: organisationId,
      user_profile_id: id,
      is_active: status,
    };
    httpRequest('post', `${envConfig.api_url}/idm/organisation/member-status`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAllUserProfileList();
      });
  },

  clearAll: () => {
    set({
      createEditUserRoleList: { mapAdmin: [] , searchName: '' },
    });
  },
}));
