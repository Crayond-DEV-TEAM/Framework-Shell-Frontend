import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { RolesInterface } from '../interface';
import { tableJson } from '../../ui/components/roles/utils';
import { enqueueSnackbar } from 'notistack';
export const useRoles = create<RolesInterface>((set, get) => ({
  RolesList: [],
  StatusList: [],
  addRole: {
    id: '',
    permission: '',
    name: '',
    description: '',
    is_active: false,
  },
  editRole: [],
  deleteRole: [],

  addLoading: false,
  errorOnadding: false,

  editLoading: false,
  errorOnediting: false,

  deleteLoading: false,
  errorOndelete: false,

  fetching: false,
  errorOnFetching: false,

  setaddMessage: (payload: { key: string; value: string }) => {
    set((state) => ({ addRole: { ...state.addRole, [payload.key]: payload.value } }));
  },

  getRolesList: () => {
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      offset: 0,
      limit: 10,
    };
    httpRequest('post', `${envConfig.api_url}/roles`, payload, true)
      .then((response) => {
        const dataTable: any = [];
        // const dataTableStatus: any = [];
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          // response.data.data
          //   ?.filter((x: any) => Boolean(x.role.is_active))
          //   .map(({ id }: any) => dataTableStatus.push(id));
          response.data.data.map(
            (tableData: any, i: any) =>
              dataTable.push({
                name: tableData.role.name,
                description: tableData.role.description,
                is_active: tableData.role.is_active,
                permission: {
                  label: tableData.permission.name,
                  color: '#305AAE',
                  bgColor: '#E2EAFA',
                },
                id: tableData.role.id,
              }),
            set({ RolesList: dataTable }),
            // set({ StatusList: dataTableStatus }),
          );
        }
      })

      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },
  updateEditData: (data: any) => {
    set((state) => ({ addRole: { ...data } }));
  },
  // addRolesList: () => {
  //   const { RolesList, addRole } = get();

  //   const update = {
  //     id: `${RolesList.length + 1}`,
  //     permission: addRole.permission,
  //     name: addRole.name,
  //     description: addRole.description,
  //     is_active: addRole.is_active,
  //   };

  //   RolesList.push(update);
  //   set({ RolesList: RolesList });

  //   // set({ fetching: true, errorOnFetching: false, RolesList: tableJson });

  //   httpRequest('post', `${envConfig.api_url}/api`, {}, true)
  //     .then((response) => {
  //       // set({ RepositoryList: tableData });
  //     })
  //     .catch((err) => {
  //       set({ errorOnFetching: true });
  //     })
  //     .finally(() => {
  //       set({ fetching: false });
  //     });
  // },
  addRolesList: () => {
    const { addRole, getRolesList } = get();
    debugger;
    const payload = {
      name: addRole.name,
      permissions: addRole.permission?.[0].id,
      description: addRole.description,
      is_active: addRole.is_active,
    };
    httpRequest('post', `${envConfig.api_url}/roles/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles created succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
      });
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getRolesList } = get();
    const payload = {
      role_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/roles/update`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
      });
  },
  editRoleList: () => {
    const { addRole } = get();
    debugger;
    const payload = {
      id: addRole.id,
      name: addRole.name,
      permissions: [addRole.permission.id],
      description: addRole.description,
      is_active: addRole.is_active,
    };

    set({ fetching: true, errorOnFetching: false });

    httpRequest('post', `${envConfig.api_url}/roles/update`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles edited succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
      });
  },

  deleteRoleList: (id: string) => {
    const { getRolesList } = get();
    set({ fetching: true, errorOnFetching: false });
    const payload = {
      role_id: id,
    };

    httpRequest('delete', `${envConfig.api_url}/roles`, payload, true)
      .then((response) => {
        enqueueSnackbar('Roles deleted succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
      })
      .finally(() => {
        set({ fetching: false });
        getRolesList();
      });
  },

  clearAll: () => {
    set({
      addRole: {
        id: '',
        permission: '',
        name: '',
        description: '',
        is_active: false,
      },
    });
  },
}));
