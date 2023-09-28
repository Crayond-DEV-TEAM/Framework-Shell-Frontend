import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserProfileInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
export const useProfileUser = create<UserProfileInterface>((set, get) => ({
  UserList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditUser: {
    name: '',
    email: '',
    designation: '',
    is_active: false,
    organisationId: '',
    id: '',
    userprofileMap_id: '',
    userprofileMap_Rolename: '',
    userprofileMap_Roleid: '',
  },
  OrganisationDetails: {
    id: '',
    name: '',
  },

  seteditUser: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditUser: { ...state.createEditUser, [payload.key]: payload.value } }));
  },
  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => {
    set((state) => ({ OrganisationDetails: { ...state.OrganisationDetails, [payload.key]: payload.value } }));
  },

  getUserList: (id: string) => {
    const { OrganisationDetails } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: OrganisationDetails.id,
    };
    httpRequest('post', `${envConfig.api_url}/user-profiles/get`, payload, true)
      .then((response) => {
        // debugger;
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                userName: tableData.name,
                is_active: tableData.is_active,
                designation: tableData.designation,
                data: tableData,
                emailId: tableData.email_id,
                organisationId: tableData.user_organisation_mappings.organisation_id,
                organisation: [
                  {
                    label: tableData.user_organisation_mappings.organisation_name,
                    color: '#b6a82c',
                    bgColor: '#fff599',
                  },
                ],
                role: [
                  {
                    label: tableData.user_role_mappings.role_name,
                    color: 'primary.main',
                    bgColor: '#bcf0eb',
                  },
                ],
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
  createUser: () => {
    const { clearAll, createEditUser, getUserList, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      name: createEditUser.name,
      email_id: createEditUser.email,
      designation: createEditUser.designation,
      is_active: createEditUser.is_active,
      organisation_id: OrganisationDetails.id,
    };

    httpRequest('post', `${envConfig.api_url}/user-profiles`, payload, true)
      .then((response) => {
        enqueueSnackbar('User added Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
        clearAll();
      });
  },
  createUserRollMap: () => {
    const { clearAll, createEditUser, getUserList } = get();

    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      user_profile_id: createEditUser.id,
      role_id: createEditUser.userprofileMap_Roleid,
    };

    httpRequest('post', `${envConfig.api_url}/user-role-mapping`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles Mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
        clearAll();
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditUser: { ...data } }));
  },
  updateEditOrganisationData: (data: any) => {
    set((state) => ({ OrganisationDetails: { ...data } }));
  },

  editUser: () => {
    const { clearAll, getUserList, createEditUser, OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      name: createEditUser.name,
      email_id: createEditUser.email,
      designation: createEditUser.designation,
      is_active: createEditUser.is_active,
      organisation_id: OrganisationDetails.id,
      user_profile_id: createEditUser.id,
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/user-profiles`, payload, true)
      .then((response) => {
        enqueueSnackbar('Users edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
        clearAll();
      });
  },
  editUserRollMap: () => {
    const { clearAll, getUserList, createEditUser } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      user_profile_id: createEditUser.id,
      role_id: createEditUser.userprofileMap_Roleid,
      user_role_mapping_id: createEditUser.userprofileMap_id,
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/user-role-mapping`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles Changed Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getUserList, OrganisationDetails } = get();
    const payload = {
      user_profile_id: id,
      is_active: status,
      organisation_id: OrganisationDetails.id,
    };
    httpRequest('put', `${envConfig.api_url}/user-profiles`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
      });
  },

  deleteUser: (id: string) => {
    const { getUserList } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      user_profile_id: id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/user-profiles`, payload, true)
      .then((response) => {
        enqueueSnackbar('Users deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
      });
  },
  deleteUserRollMap: () => {
    const { getUserList, createEditUser } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
      user_role_mapping_id: createEditUser.userprofileMap_id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/user-role-mapping`, payload, true)
      .then((response) => {
        enqueueSnackbar('RoleMapping deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getUserList();
      });
  },

  clearAll: () => {
    set({
      createEditUser: {
        name: '',
        email: '',
        designation: '',
        is_active: false,
        organisationId: '',
        id: '',
        userprofileMap_id: '',
        userprofileMap_Rolename: '',
        userprofileMap_Roleid: '',
      },
    });
  },
}));
