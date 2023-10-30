import { envConfig } from '@core/envconfig'
import { httpRequest } from '@core/utils'
import { create } from 'zustand'
import { AdminInterface, SuperAdminLandingInterface } from '../interface'
import { enqueueSnackbar } from 'notistack'
export const useSuperAdminLanding = create<SuperAdminLandingInterface>((set, get) => ({
  OrganisationList: [],
  ServiceList: [],
  fetching: false,
  errorOnFetching: false,

  addsave: false,
  editsave: false,
  deletefetch: false,

  createEditOrganisation: {
    organisationName: '',
    description: '',
    email_id:'',
    mapAdmin: [],
    mapServices: [],
    is_active: false,
    id: '',
  },

  seteditOrganisation: (payload: { key: string; value: string | number }) => {
    set((state) => ({ createEditOrganisation: { ...state.createEditOrganisation, [payload.key]: payload.value } }))
  },

  getOrganisationList: () => {
    set({ fetching: true, errorOnFetching: false })
    httpRequest('get', `${envConfig.api_url}/idm/organisation/list`, {}, true)
      .then((response) => {
        debugger
        const dataTable: any = []
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                organisationTitle: tableData.name,
                // is_active: tableData.is_active,
                description: tableData.description,
                // data: tableData,
                serviceMapped:tableData.no_of_service
              }),
            set({ OrganisationList: dataTable }),
          )
        } else {
          set({ OrganisationList: [] })
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true })
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
      })
      .finally(() => {
        set({ fetching: false })
      })
  },
  createOrganisation: () => {
    const { clearAll, createEditOrganisation, getOrganisationList } = get()

    set({ fetching: true, errorOnFetching: false })
    // const { RepositoryList } = useRepository();
      debugger;
    const payload = {
      name: createEditOrganisation.organisationName,
      emailId: createEditOrganisation.email_id,
      description: createEditOrganisation.description,
      services: createEditOrganisation.mapServices.map((x) => x?.id),
      admin: createEditOrganisation.mapAdmin.map((x) => x?.id)
    }

    httpRequest('post', `${envConfig.api_url}/idm/organisation/create`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisation added Succesfully!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
        set({ errorOnFetching: true })
      })
      .finally(() => {
        set({ fetching: false })
        getOrganisationList()
        clearAll()
      })
  },
  updateEditData: (data: any) => {
    set((state) => ({ createEditOrganisation: { ...data } }))
  },

  editOrganisation: () => {
    const { clearAll, getOrganisationList, createEditOrganisation } = get()
    set({ fetching: true, errorOnFetching: false })
    // const { RepositoryList } = useRepository();
    const payload = {
      // name: createEditOrganisation.organisationName,
      // email_id: createEditOrganisation.emailId,
      // mobile_no: createEditOrganisation.mobile,
      // address: createEditOrganisation.address,
      // domain_url: createEditOrganisation.domainUrl,
      // is_active: createEditOrganisation.is_active,
      // organisation_id: createEditOrganisation.id,
    }

    set({ fetching: true, errorOnFetching: false })
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisations edited Succesfully!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
        set({ errorOnFetching: true })
      })
      .finally(() => {
        set({ fetching: false })
        getOrganisationList()
        clearAll()
      })
  },
  getStatusList: (id: any, status: any) => {
    set({ fetching: true, errorOnFetching: false })
    const { getOrganisationList } = get()
    const payload = {
      organisation_id: id,
      is_active: status,
    }
    httpRequest('put', `${envConfig.api_url}/organisations`, payload, true)
      .then((response) => {
        enqueueSnackbar('Status changed succesfully!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
        set({ errorOnFetching: true })
      })
      .finally(() => {
        set({ fetching: false })
        getOrganisationList()
      })
  },

  deleteOrganisation: (id: string) => {
    const { getOrganisationList } = get()
    set({ fetching: true, errorOnFetching: false })
    // const { RepositoryList } = useRepository();
    const payload = {
      organisation_id: id,
    }
    set({ fetching: true, errorOnFetching: false })
    httpRequest('delete', `${envConfig.api_url}/organisations`, payload, true)
      .then((response) => {
        enqueueSnackbar('Organisations deleted Succesfully!', { variant: 'success' })
      })
      .catch((err) => {
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
        set({ errorOnFetching: true })
      })
      .finally(() => {
        set({ fetching: false })
        getOrganisationList()
      })
  },

  getServiceList: () => {
    set({ fetching: true, errorOnFetching: false })
    httpRequest('post', `${envConfig.api_url}/idm/service/get`, {}, true)
      .then((response) => {
        debugger
        const dataTable: any = []
        if (Array.isArray(response.data.data.rows) && response.data.data.rows.length > 0) {
          debugger
          response.data.data.rows.map(
            (tableData: any, i: any) =>
              dataTable.push({
                id: tableData.id,
                name: tableData.name,
              }),
            set({ ServiceList: dataTable }),
          )
        } else {
          set({ ServiceList: [] })
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true })
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' })
      })
      .finally(() => {
        set({ fetching: false })
      })
  },

  clearAll: () => {
    set({
      createEditOrganisation: {
        organisationName: '',
        description: '',
         email_id:'',
        mapAdmin: [],
        mapServices: [],
        is_active: false,
        id: '',
      },
    })
  },
}))
