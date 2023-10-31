import ReportmailIcon from '@assets/reportMailIcon';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { AlertRuleInterface } from '../interface';
import { envConfig } from '@core/envconfig';

// getRandomColor function
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const useAlertRules = create<AlertRuleInterface>((set, get) => ({
  addAlert: [],
  alertsList: [],
  editFetching: false,
  fetching: false,
  errorOnFetching: false,
  addAlertRules: {
    id: '',
    alert_code: '',
    reference_id: '',
    hashtags: '',
    description: '',
    is_email: false,
    is_push: true,
    is_sms: false,
    is_whatsApp: false,
    is_slack: false,
    is_inApp: false,
    push_title: '',
    push_body: '',
    email_subject: '',
    email_body: '',
    SMS_body: '',
    whatsApp_template_name: '',
    whatsApp_body: '',
    slack_body: '',
    in_app_title: '',
    inApp_body: '',
    alert_rule_code: '',
    is_active: false,
  },

  hashtagFilter: [],
  alertTypeFilter: [
    {
      component: 'checkbox',
      id: 1,
      label: 'In_app',
      value: false,
    },
    {
      component: 'checkbox',
      id: 2,
      label: 'Email',
      value: false,
    },
    {
      component: 'checkbox',
      id: 1,
      label: 'Push',
      value: false,
    },
    {
      component: 'checkbox',
      id: 2,
      label: 'Slack',
      value: false,
    },
    {
      component: 'checkbox',
      id: 1,
      label: 'Sms',
      value: false,
    },
    {
      component: 'checkbox',
      id: 2,
      label: 'Whatsapp',
      value: false,
    },
  ],
  statusFilter: [
    {
      component: 'checkbox',
      id: 1,
      label: 'Active',
      value: false,
    },
    {
      component: 'checkbox',
      id: 2,
      label: 'Inactive',
      value: false,
    },
  ],
  dateFilter: [
    {
      component: 'dateCheckbox',
      label: 'Sent On',
      value: false,
    },
    {
      component: 'dateCheckbox',
      label: 'Delivered On',
      value: false,
    },
    {
      component: 'dateCheckbox',
      label: 'Clicked On',
      value: false,
    },
    {
      component: 'dateInput',
      label: 'Select Date From',
      value: '',
    },
    {
      component: 'dateInput',
      label: 'Select Date To',
      value: '',
    },
  ],

  addAlertRuleLoading: false,
  addAlertRuleError: false,

  handleChipDelete: (chip, index, parentIndex, category) => {
    set((state) => {
      if (category === 'Hashtags') {
        const updatedHashtags = [...state.hashtagFilter];
        updatedHashtags.splice(index, 1);
        return { hashtagFilter: updatedHashtags };
      } else if (category === 'Alert Types') {
        const updatedAlertTypes = [...state.alertTypeFilter];
        updatedAlertTypes.splice(index, 1);
        return { alertTypeFilter: updatedAlertTypes };
      } else if (category === 'Status') {
        const updatedFilterStatus = [...state.statusFilter];
        updatedFilterStatus.splice(index, 1);
        return { statusFilter: updatedFilterStatus };
      }
      return state;
    });
  },

  setfilter: (filterName: string, id: number, value: any) => {
    set((state) => {
      state[filterName][id].value = value;
      return { [filterName]: [...state[filterName]] };
    });
  },

  setaddAlertRule: (payload: { key: string; value: string }) => {
    set((state) => ({ addAlertRules: { ...state.addAlertRules, [payload.key]: payload.value } }));
  },

  addAlertRule: (newAlertRuleCode: string) => {
    set({ addAlertRuleLoading: true });
    const { addAlertRules, getAlertTable } = get();
    const payload = {
      profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967',
      alert_rule_code: newAlertRuleCode ? newAlertRuleCode : addAlertRules?.alert_code,
      reference_id: addAlertRules?.reference_id,
      hashtag: addAlertRules?.hashtags,
      description: addAlertRules?.description,
      is_email: addAlertRules?.is_email,
      is_sms: addAlertRules?.is_sms,
      is_push: addAlertRules?.is_push,
      is_slack: addAlertRules?.is_slack,
      is_whatsapp: addAlertRules?.is_whatsApp,
      is_inapp: addAlertRules?.is_inApp,
      whatsapp_body: addAlertRules?.whatsApp_body,
      whatsapp_template_name: addAlertRules?.whatsApp_template_name,
      inapp_body: addAlertRules?.inApp_body,
      inapp_title: addAlertRules?.in_app_title,
      slack_body: addAlertRules?.slack_body,
      email_subject: addAlertRules?.email_subject,
      email_body: addAlertRules?.email_body,
      sms_body: addAlertRules?.SMS_body,
      push_title: addAlertRules?.push_title,
      push_body: addAlertRules?.push_body,
      isActive: addAlertRules?.is_active,
    };
    httpRequest('post', `${envConfig.api_url}/rules/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Alert Rule successfully Added!', { variant: 'success' });
        getAlertTable();
      })
      .catch((err) => {
        // set({ addMessageError: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ addAlertRuleLoading: false });
      });
    return false;
  },

  onApply: () => {
    set({ addAlertRuleLoading: true });

    const bgColor = getRandomColor();

    const { hashtagFilter, alertTypeFilter, statusFilter, dateFilter } = get();

    const hashtagValue = hashtagFilter?.filter((val) => val?.value).map((val) => val?.label);
    const filterValue = statusFilter
      ?.filter((val) => val?.value)
      .map((val) => val?.label)
      .join(',');

    const payload = {
      start: 0,
      hashtag: hashtagValue,
      alertType: {
        is_inapp: alertTypeFilter[0]?.value,
        is_email: alertTypeFilter[1]?.value,
        is_push: alertTypeFilter[2]?.value,
        is_slack: alertTypeFilter[3]?.value,
        is_sms: alertTypeFilter[4]?.value,
        is_whatsapp: alertTypeFilter[5]?.value,
      },
      status: filterValue,
      dateRange: {
        startDate: dateFilter[3].value,
        endDate: dateFilter[4].value,
      },
    };

    httpRequest('post', `${envConfig.api_url}/rules/get`, payload, true)
      .then((response) => {
        const filterData: any = [];

        if (Array.isArray(response?.data?.data) && response?.data?.data?.length > 0) {
          response?.data?.data?.map((tableData: any, i: any) => {
            filterData?.push({
              id: tableData?.id,
              profileId: tableData?.profileId,
              alert_rule_code: tableData?.alert_rule_code ? tableData?.alert_rule_code : '-',
              referenceId: tableData?.reference_id ? tableData?.reference_id : '-',
              alertType: {
                label: tableData?.reference_id ? tableData?.reference_id : '-',
                color: '#FFFFFF',
                bgColor: bgColor,
                icon: ReportmailIcon({}),
              },
              hashtags: [
                {
                  label: `#${tableData?.hashtag ? tableData?.hashtag : '-'}`,
                  color: '#305AAE',
                  bgColor: '#E2EAFA',
                },
              ],
              description: tableData?.description ? tableData?.description : '-',
              email_subject: tableData?.email_subject ? tableData?.email_subject : '-',
              email_body: tableData?.email_body ? tableData?.email_body : '-',
              push_body: tableData?.push_body ? tableData?.push_body : '-',
              SMS_body: tableData?.sms_body ? tableData?.sms_body : '-',
              push_title: tableData?.push_title ? tableData?.push_title : '-',
              is_active: tableData?.isActive ? tableData?.isActive : false,
            });
          });
          set({
            alertsList: filterData,
          });
        }
      })
      .catch((err) => {
        // set({ addMessageError: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ addAlertRuleLoading: false });
      });
    return false;
  },

  editAlertRule: async (data: any) => {
    set({ editFetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/rules/get`, { alert_rule_code: data?.alert_rule_code }, true)
      .then((response) => {
        const updateData: any = [];
        if (Array.isArray(response?.data?.data) && response?.data?.data?.length > 0) {
          response?.data?.data?.map((tableData: any, i: any) =>
            updateData.push({
              id: tableData?.id,
              alert_code: tableData?.alert_rule_code,
              reference_id: tableData?.reference_id,
              hashtags: tableData?.hashtag,
              description: tableData?.description,
              is_push: tableData?.is_push,
              is_email: tableData?.is_email,
              is_sms: tableData?.is_sms,
              is_whatsApp: tableData?.is_whatsapp,
              is_slack: tableData?.is_slack,
              is_inApp: tableData?.is_inapp,
              push_title: tableData?.push_title,
              push_body: tableData?.push_body,
              email_subject: tableData?.email_subject,
              email_body: tableData?.email_body,
              SMS_body: tableData?.sms_body,
              whatsApp_template_name: tableData?.whatsapp_template_name,
              whatsApp_body: tableData?.whatsapp_body,
              slack_body: tableData?.slack_body,
              in_app_title: tableData?.inapp_title,
              inApp_body: tableData?.inapp_body,
              is_active: tableData?.isActive,
            }),
          );
          console.log('updateData', updateData);

          set((state) => ({ ...state, addAlertRules: updateData?.[0] }));
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ editFetching: false });
      });
    return false;
  },

  getAlertTable: async () => {
    set({ fetching: true, errorOnFetching: false });

    const bgColor = getRandomColor();

    httpRequest(
      'post',
      `${envConfig.api_url}/rules/get`,
      { profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967', offset: 0, limit: 10, searchStr: null },
      true,
    )
      .then((response) => {
        const dataTable: any = [];

        if (Array.isArray(response?.data?.data) && response?.data?.data?.length > 0) {
          response?.data?.data?.map((tableData: any, i: any) => {
            dataTable?.push({
              id: tableData?.id,
              profileId: tableData?.profileId,
              alert_rule_code: tableData?.alert_rule_code ? tableData?.alert_rule_code : '-',
              referenceId: tableData?.reference_id ? tableData?.reference_id : '-',
              alertType: {
                label: tableData?.reference_id ? tableData?.reference_id : '-',
                color: '#FFFFFF',
                bgColor: bgColor,
                icon: ReportmailIcon({}),
              },
              hashtags: [
                {
                  label: `#${tableData?.hashtag ? tableData?.hashtag : '-'}`,
                  color: '#305AAE',
                  bgColor: '#E2EAFA',
                },
              ],
              description: tableData?.description ? tableData?.description : '-',
              email_subject: tableData?.email_subject ? tableData?.email_subject : '-',
              email_body: tableData?.email_body ? tableData?.email_body : '-',
              push_body: tableData?.push_body ? tableData?.push_body : '-',
              SMS_body: tableData?.sms_body ? tableData?.sms_body : '-',
              push_title: tableData?.push_title ? tableData?.push_title : '-',
              is_active: tableData?.isActive,
            });
          });
          set({
            alertsList: dataTable,
          });
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  getHashtagData: async () => {
    set({ fetching: true, errorOnFetching: false });

    httpRequest('GET', `${envConfig.api_url}/rules/hashtag`, {}, true)
      .then((response) => {
        const hashtagData: any = [];

        if (Array.isArray(response?.data?.hashtag) && response?.data?.hashtag?.length > 0) {
          response?.data?.hashtag?.map((hashtagValue: any, i: any) => {
            hashtagData?.push({
              component: 'checkbox',
              label: hashtagValue,
              id: i,
              value: false,
            });
          });
          set({
            hashtagFilter: hashtagData,
          });
        }
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  deleteAlertRule: (data: any) => {
    set({ fetching: true, errorOnFetching: false });
    const { getAlertTable } = get();
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/rules`, payload, true)
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getAlertTable();
      });
  },

  clearState: () => {
    set((state) => ({
      addAlertRules: {
        id: '',
        alert_code: '',
        reference_id: '',
        hashtags: '',
        description: '',
        is_email: false,
        is_push: true,
        is_sms: false,
        is_whatsApp: false,
        is_slack: false,
        is_inApp: false,
        push_title: '',
        push_body: '',
        email_subject: '',
        email_body: '',
        SMS_body: '',
        whatsApp_template_name: '',
        whatsApp_body: '',
        slack_body: '',
        in_app_title: '',
        inApp_body: '',
        alert_rule_code: '',
        is_active: false,
      },
    }));
  },

  clearfilter: () => {
    set((state) => {
      // Clear the hashtagFilter state
      const clearedHashtags = state?.hashtagFilter?.map((item) => {
        return {
          ...item,
          value: false,
        };
      });

      // Clear the alertTypeFilter state
      const clearedAlertTypes = state?.alertTypeFilter?.map((item) => {
        return {
          ...item,
          value: false,
        };
      });

      // Clear the statusFilter state
      const clearedStatus = state?.statusFilter?.map((item) => {
        return {
          ...item,
          value: false,
        };
      });

      // Clear the dateFilter state
      const clearedDateFilter = state?.dateFilter?.map((item) => {
        if (item?.component === 'dateCheckbox') {
          return {
            ...item,
            value: false,
          };
        } else if (item?.component === 'dateInput') {
          return {
            ...item,
            value: '',
          };
        }
        return item;
      });

      return {
        hashtagFilter: clearedHashtags,
        alertTypeFilter: clearedAlertTypes,
        statusFilter: clearedStatus,
        dateFilter: clearedDateFilter,
      };
    });
  },

  clearSelectedFilterByKey: (key) => {
    set((state) => {
      if (key === 'Hashtags') {
        const x = state.hashtagFilter.map((item) => {
          return {
            ...item,
            value: false,
          };
        });

        return { hashtags: [...x] };
      }
    });
  },
}));
