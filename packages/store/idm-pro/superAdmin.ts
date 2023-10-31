import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { SuperAdminInterface } from '../interface';
import { permission } from '../../ui/components/addpermission/utils';
import { enqueueSnackbar } from 'notistack';
// import { findObjectByIndex, modifyObjectByIndexWithKey } from './commonFunction';
export const useSuperAdmin = create<SuperAdminInterface>((set, get) => ({
  OrganisationList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditOrganisation: {
    organisationName: '',
    description: '',
    emailId: '',
    mobile: 0,
    address: '',
    domainUrl: '',
    mappedAdmin: [''],
    mappedUser: [''],
    is_active: false,
    access: false,
    id: '',
  },

  seteditOrganisation: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditOrganisation: { ...state.createEditOrganisation, [payload.key]: payload.value } }));
  },

  getOrganisationList: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/organisations`, {}, true)
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                organisationName: tableData.name,
                is_active: tableData.is_active,
                description: 'tableData.description',
                data: tableData,
                email: tableData.email_id,
                domain: tableData.domain_url,
                mobileNumber: tableData.mobile_no,
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
    // const { RepositoryList } = useRepository();
    const payload = {
      name: createEditOrganisation.organisationName,
      email_id: createEditOrganisation.emailId,
      mobile_no: createEditOrganisation.mobile,
      address: createEditOrganisation.address,
      domain_url: createEditOrganisation.domainUrl,
      is_active: createEditOrganisation.is_active,
    };

    httpRequest('post', `${envConfig.api_url}/organisations`, payload, true)
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
    // const { RepositoryList } = useRepository();
    const payload = {
      name: createEditOrganisation.organisationName,
      email_id: createEditOrganisation.emailId,
      mobile_no: createEditOrganisation.mobile,
      address: createEditOrganisation.address,
      domain_url: createEditOrganisation.domainUrl,
      is_active: createEditOrganisation.is_active,
      organisation_id: createEditOrganisation.id,
    };

    set({ fetching: true, errorOnFetching: false });
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
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
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getOrganisationList } = get();
    const payload = {
      organisation_id: id,
      is_active: status,
    };
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
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
    // const { RepositoryList } = useRepository();
    const payload = {
      organisation_id: id,
    };
    set({ fetching: true, errorOnFetching: false });
    httpRequest('delete', `${envConfig.api_url}/organisations`, payload, true)
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

  clearAll: () => {
    set({
      createEditOrganisation: {
        organisationName: '',
        description: '',
        emailId: '',
        mobile: 0,
        address: '',
        domainUrl: '',
        mappedAdmin: [''],
        mappedUser: [''],
        is_active: false,
        access: false,
        id: '',
      },
    });
  },
}));
