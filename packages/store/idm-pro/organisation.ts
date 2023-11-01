import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { create } from 'zustand';
import { OrganisationInterface } from '../interface';
<<<<<<< HEAD
=======
import { permission } from '../../ui/components/addpermission/utils';
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
import { enqueueSnackbar } from 'notistack';
// import { findObjectByIndex, modifyObjectByIndexWithKey } from './commonFunction';
export const useOrganisation = create<OrganisationInterface>((set, get) => ({
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
<<<<<<< HEAD
    httpRequest('get', `${envConfig.idm_api_url}/organisations`, {}, true)
=======
    httpRequest('get', `${envConfig.api_url}/organisations`, {}, true)
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                organisationName: tableData.name,
                is_active: tableData.is_active,
                description: tableData.description,
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
      description: createEditOrganisation.description,
    };

<<<<<<< HEAD
    httpRequest('post', `${envConfig.idm_api_url}/organisations`, payload, true)
=======
    httpRequest('post', `${envConfig.api_url}/organisations`, payload, true)
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
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
      description: createEditOrganisation.description,
    };

    set({ fetching: true, errorOnFetching: false });
<<<<<<< HEAD
    httpRequest('put', `${envConfig.idm_api_url}/organisations`, payload, true)
=======
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
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
<<<<<<< HEAD
    httpRequest('put', `${envConfig.idm_api_url}/organisations`, payload, true)
=======
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
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
<<<<<<< HEAD
    httpRequest('delete', `${envConfig.idm_api_url}/organisations`, payload, true)
=======
    httpRequest('delete', `${envConfig.api_url}/organisations`, payload, true)
>>>>>>> 5fcbcbda15cbe3df07bdceae596b58ee5c478d16
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
