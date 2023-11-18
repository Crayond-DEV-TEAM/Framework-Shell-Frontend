import { envConfig } from '@core/envconfig';
import { httpRequest, imageUpload } from '@core/utils';
import { create } from 'zustand';
import { UserProfileLandingInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { useSlug } from '../common';
export const useProfileUserLanding = create<UserProfileLandingInterface>((set, get) => ({
  UserProfileList: [],
  MyProfileList: [],
  selectedFile: null,
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditUserProfile: {
    userProfileName: '',
    description: '',
    id: '',
  },
  editProfile: {
    name: '',
    mobileno: '',
  },

  seteditUserProfile: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditUserProfile: { ...state.createEditUserProfile, [payload.key]: payload.value } }));
  },

  seteditMyProfile: (key: string, value: string | number) => {
    set((state) => ({ editProfile: { ...state.editProfile, [key]: value } }));
  },
  setSelectedFile: (file) => {
    set((state) => ({ selectedFile: file }));
  },

  getUserProfileList: (id: string) => {
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
      // organisation_id: OrganisationDetails.id,
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

  getMyProfile: () => {
    // const { OrganisationDetails } = get();
    // const slugId = useSlug?.getState()?.slugs?.PASM;
    const slugId = '98a60c91-a068-43cb-989d-172cf3f90321';
    console.log(slugId, 'slugId');

    set({ fetching: true, errorOnFetching: false });
    const payload = {};

    httpRequest('get', `${envConfig.api_url}/idm/user-profile`, payload, true, undefined, { headers: { slug: slugId } })
      .then((response) => {
        const responseData = response.data.data;
        set({ MyProfileList: responseData });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  editProfileData: (data: any) => {
    const slugId = '98a60c91-a068-43cb-989d-172cf3f90321';

    set({ editsave: true, errorOnFetching: false });
    const { MyProfileList, clearAll, getMyProfile, editProfile } = get();

    const payload = {
      id: MyProfileList.id,
      isActive: true,
      fullName: editProfile.name,
      mobileNumber: editProfile.mobileno.slice(3, 13),
      mobileCode: editProfile.mobileno.slice(0, 3),
    };

    httpRequest('put', `${envConfig.api_url}/idm/user-profile`, payload, true, undefined, { headers: { slug: slugId } })
      .then((response) => {
        enqueueSnackbar('Profile Edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ editsave: false });
        // clearAll();
        getMyProfile();
      });
  },

  fileUpload: async (data: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { MyProfileList, getMyProfile } = get();
    try {
      let url: any[] | undefined = [];
      if (data?.length > 0) {
        url = await imageUpload(data);
      }

      await httpRequest(
        'put',
        `${envConfig.api_url}/idm/user-profile`,
        {
          id: MyProfileList.id,
          profilePic: url ?? '',
        },
        true,
      )
        .then((res) => {
          console.log(res, 'res');
          enqueueSnackbar('Profile picture uploaded Succesfully!', { variant: 'success' });
          getMyProfile();
        })
        .catch((err) => {
          set({ errorOnFetching: true });
          enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        });
    } finally {
      set({ fetching: false });
    }
  },

  clearAll: () => {
    set({
      createEditUserProfile: {
        userProfileName: '',
        description: '',
        id: '',
      },
      // MyProfileList:[]
    });
  },
}));
