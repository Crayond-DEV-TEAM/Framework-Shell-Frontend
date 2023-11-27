import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { AdminInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { useSuperAdminLanding } from './superAdmin';
import { useUserLanding } from './users';
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
    mapAdmin: [],
    is_active: true,
    adminDatas:[],
    Servicedatas:[],
    id: '',
  },
  userInviteEdit: {
    userName: '',
    email: '',
    userNameStatus: 0,
    emailStatus: 0,
    role: {},
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
    debugger;
    // const { RepositoryList } = useRepository();
    const payload = {
      organisation_id: OrganisationDetails.id,
      name: createEditAdmin.projectTitle,
      description: createEditAdmin.description,
      services: createEditAdmin.mapServices?.map((x: any) => x?.id),
      users: createEditAdmin.mapAdmin?.map((x: any) => ({
        user_profile_id: x?.id,
        access: x?.access?.name,
      })),
      is_active: createEditAdmin?.is_active,
    };
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
        getAdminList();
        clearAll();
      });
  },

  editAdmin: () => {
    const { clearAll, getAdminList, OrganisationDetails, createEditAdmin } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      organisation_id: OrganisationDetails.id,
      name: createEditAdmin.projectTitle,
      description: createEditAdmin.description,
      is_active: createEditAdmin.is_active,
      project_id: createEditAdmin.id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/idm/project/deactivate`, payload, true)
      .then((response) => {
        enqueueSnackbar('Project edited Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
        clearAll();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    // const {}= useUserLanding()
    const { getAdminList, OrganisationDetails } = get();
    const payload = {
      project_id: id,
      is_active: status,
    };
    httpRequest('post', `${envConfig.api_url}/idm/project/deactivate`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
      });
  },
  getOrganisationMaster: () => {
    const { getAdminList, OrganisationDetails } = get();
    debugger;
    set({ fetching: true, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/idm/user-profile/list/organisation?limit=100&offset=0`, {}, true)
      .then((response) => {
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
          if (
            OrganisationDetails.id === ''
          ) {
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
           
          // set({ OrganisationListMaster: [] });
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        // const { getAllUserProfileList } = useUserLanding();
        getAdminList();
        // getAllUserProfileList(OrganisationDetails.id);
        set({ fetching: false });
      });
  },
  getServiceMasterByOrganisation: () => {
    set({ fetching: true, errorOnFetching: false });
    const { OrganisationDetails } = get();
    const payload = {
      organisation_id: OrganisationDetails.id,
      limit: 10,
      offset: 0,
    };
    httpRequest('post', `${envConfig.api_url}/idm/organisation/service`, payload, true)
      .then((response) => {
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
    const { OrganisationDetails } = get();
    set({ fetching: true, errorOnFetching: false });

    const payload = {
      organisation_id: OrganisationDetails.id,
    };
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
  getAllProjectsEditData: (id: string) => {
    debugger
    set({ fetching: true, errorOnFetching: false });

    const payload = {
      project_id: id,
    };
    httpRequest('post', `${envConfig.api_url}/idm/project/get/id`, payload, true)
      .then((response) => {
        const responseData = response.data.data;
        const Servicemap: any = [];
        const Usermap: any = [];

        if (Array.isArray(responseData.project_service_mappings) && responseData.project_service_mappings.length > 0) {
          responseData.project_service_mappings.forEach((tableData: any) => {
            Servicemap.push({
              id: tableData.service_id,
              name: tableData.service_name,
            });
          });
        }

        if (Array.isArray(responseData.project_user_mappings) && responseData.project_user_mappings.length > 0) {
          responseData.project_user_mappings.forEach((tableData: any) => {
            Usermap.push({
              id: tableData.id,
              name: tableData.name,
              access:{
                 id:tableData.access === 'Full Access' ? '2' : '1' , name: tableData.access 
              }
            });
          });
        }
        const editData = {
          projectTitle: responseData.name,
          description: responseData.description,
          mapServices: Servicemap,
          mapAdmin: Usermap,
          is_active: responseData.is_active,
          id: responseData.id,
          Servicedatas:[...Servicemap],
          adminDatas:[...Usermap]
        };
        set((state) => ({ createEditAdmin: { ...editData } }));
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  createServiceMap: () => {
    const { OrganisationDetails , getAllProjectsEditData ,createEditAdmin } = get();
    set({ fetching: true, errorOnFetching: false });
    const newList = createEditAdmin.mapServices.filter(newObj => !createEditAdmin.Servicedatas.some(existingObj => existingObj.id === newObj.id));

    const payload = {
    project_id: createEditAdmin.id,
    service_id: newList.map((x:any)=>x?.id)
}
    httpRequest('post', `${envConfig.api_url}/idm/project/service/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Service mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAllProjectsEditData(createEditAdmin.id)
      });
  },
  editServiceMap: () => {
    const { OrganisationDetails,createEditAdmin,getAllProjectsEditData } = get();
    set({ fetching: true, errorOnFetching: false });
   const missingList = createEditAdmin.Servicedatas.filter(existingObj => !createEditAdmin.mapServices.some(newObj => newObj.id === existingObj.id));
    const payload = {
    project_id: createEditAdmin.id,
    service_id: missingList.map((x:any)=>x?.id)
}
    httpRequest('delete', `${envConfig.api_url}/idm/project/service`, payload, true)
      .then((response) => {
      enqueueSnackbar('Service unmapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAllProjectsEditData(createEditAdmin.id)
      });
  },
  createUserMap: () => {
    const { OrganisationDetails , getAllProjectsEditData , createEditAdmin } = get();
    set({ fetching: true, errorOnFetching: false });
    const newList = createEditAdmin.mapAdmin.filter(newObj => !createEditAdmin.adminDatas.some(existingObj => existingObj.id === newObj.id));
    const payload = {
      project_id: createEditAdmin.id,
      user_profile_id: newList.map((x:any)=>x?.id)
    };
    httpRequest('post', `${envConfig.api_url}/idm/project/user/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New user mapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAllProjectsEditData(createEditAdmin.id)
      });
  },
  editUserMap: () => {
      const { OrganisationDetails,createEditAdmin,getAllProjectsEditData } = get();
    set({ fetching: true, errorOnFetching: false });
   const missingList = createEditAdmin.adminDatas.filter(existingObj => !createEditAdmin.mapAdmin.some(newObj => newObj.id === existingObj.id));
    const payload = {
    project_id: createEditAdmin.id,
    user_profile_id: missingList.map((x:any)=>x?.id)
}
    httpRequest('delete', `${envConfig.api_url}/idm/project/user`, payload, true)
      .then((response) => {
      enqueueSnackbar('User unmapped Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAllProjectsEditData(createEditAdmin.id)
      });
  },

  deleteAdmin: (id: string) => {
    const { getAdminList } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      project_id: id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/idm/projects/delete`, payload, true)
      .then((response) => {
        enqueueSnackbar('Project deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getAdminList();
      });
  },

  addUserInvite: (callback = () => false) => {
    debugger
    // const { getAllUserList } = useSuperAdminLanding();
    set({ fetching: true, errorOnFetching: false });
    const { OrganisationDetails, userInviteEdit, getUserMasterByOrganisation } = get();
    const payload = {
      organisation_id: OrganisationDetails.id,
      username: userInviteEdit.userName,
      email_id: userInviteEdit.email,
      role_id:userInviteEdit.role.id,
    };
    httpRequest('post', `${envConfig.api_url}/idm/user-profile/invite`, payload, true)
      .then((response) => {
        enqueueSnackbar('User Invited Succesfully!', { variant: 'success' });
        callback();
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        // debugger

        set({ fetching: false });
        // if(OrganisationDetails.id){
        // getUserMasterByOrganisation();
        // }else{
        //   getAllUserList();
        // }
        //  getAllUserList();
      });
  },

  emailChecker: () => {
    set({ fetching: true, errorOnFetching: false });
    const { userInviteEdit, seteditUserInviteDetails } = get();

    const payload = {
      email: userInviteEdit.email,
    };
    httpRequest('post', `${envConfig.api_url}/framework_shell_auth/check/email`, payload, false)
      .then((response) => {
        if (response.data) {
          const key = 'emailStatus';
          const value = response.status;
          seteditUserInviteDetails({ key, value });
        }
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
    set({ fetching: true, errorOnFetching: false });
    const { userInviteEdit, seteditUserInviteDetails } = get();
    const payload = {
      username: userInviteEdit.userName,
    };
    httpRequest('post', `${envConfig.api_url}/framework_shell_auth/check/username`, payload, false)
      .then((response) => {
        if (response.data) {
          const key = 'userNameStatus';
          const value = response.status;
          seteditUserInviteDetails({ key, value });
        }
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
    is_active: true,
    adminDatas:[],
    Servicedatas:[],
    id: '',
  },
    });
  },
}));
