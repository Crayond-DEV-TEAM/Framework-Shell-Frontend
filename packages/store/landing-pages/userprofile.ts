import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { UserProfileLandingInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
export const useProfileUserLanding = create<UserProfileLandingInterface>((set, get) => ({
  UserProfileList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditUserProfile: {
    userProfileName: '',
    description:'',
    id: '',
  },

  seteditUserProfile: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditUserProfile: { ...state.createEditUserProfile, [payload.key]: payload.value } }));
  },


  getUserProfileList: (id: string) => {
    // const { OrganisationDetails } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
    //   organisation_id: OrganisationDetails.id,
    };
    httpRequest('get', `${envConfig.api_url}/idm/user-profile/list`, payload, true)
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
            set({ UserProfileList: dataTable }),
          );
        } else {
          set({ UserProfileList: [] });
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
  createUserProfile: () => {
    const { clearAll, createEditUserProfile, getUserProfileList } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
    //   name: createEditUser.name,
    //   email_id: createEditUser.email,
    //   designation: createEditUser.designation,
    //   is_active: createEditUser.is_active,
    //   organisation_id: OrganisationDetails.id,
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
        getUserProfileList();
        clearAll();
      });
  },

  updateEditData: (data: any) => {
    set((state) => ({ createEditUserProfile: { ...data } }));
  },

  editUserProfile: () => {
    const { clearAll, getUserProfileList, createEditUserProfile } = get();
    set({ fetching: true, errorOnFetching: false });
    // const { RepositoryList } = useRepository();
    const payload = {
    //   name: createEditUser.name,
    //   email_id: createEditUser.email,
    //   designation: createEditUser.designation,
    //   is_active: createEditUser.is_active,
    //   organisation_id: OrganisationDetails.id,
    //   user_profile_id: createEditUser.id,
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
        getUserProfileList();
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getUserProfileList } = get();
    const payload = {
      user_profile_id: id,
      is_active: status,
    //   organisation_id: OrganisationDetails.id,
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
        getUserProfileList();
      });
  },

  deleteUserProfile: (id: string) => {
    const { getUserProfileList } = get();
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
        getUserProfileList();
      });
  },

  clearAll: () => {
    set({
        createEditUserProfile: {
    userProfileName: '',
    description:'',
    id: '',
  },
    });
  },
}));
