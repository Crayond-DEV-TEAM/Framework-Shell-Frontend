import { create } from 'zustand';
import { AddAlertRule, AlertRuleInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMeAlertRule } from '../utils';
export const useAlertRules = create<AlertRuleInterface>((set, get) => ({
  addAlert: [],
  alertsList: [],
  fetching: false,
  errorOnFetching: false,
  addAlertRules: giveMeAlertRule(),
  addAlertRuleLoading: false,
  addAlertRuleError: false,

  setaddAlertRule: (payload: { key: string; value: string }) => {
    set((state) => ({ addAlertRules: { ...state.addAlertRules, [payload.key]: payload.value } }));
  },

  addAlertRule: () => {
    set({ addAlertRuleLoading: true });
    const { addAlertRules } = get();
    const payload = {
      profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967',
      alert_rule_code: addAlertRules?.alert_code,
      reference_id: addAlertRules?.reference_id,
      hashtag: addAlertRules?.hashtags,
      description: addAlertRules?.description,
      is_email: addAlertRules?.is_email,
      is_sms: addAlertRules?.is_sms,
      is_push: addAlertRules?.is_push,
      email_subject: addAlertRules?.email_subject,
      email_body: addAlertRules?.email_body,
      sms_body: addAlertRules?.SMS_body,
      push_title: addAlertRules?.push_title,
      push_body: addAlertRules?.push_body,
      isActive: addAlertRules?.is_status,
    };
    httpRequest('post', `https://alertshub-api.crayond.com/api/v1/rules/upsert`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Alert Rule  successfully Added!', { variant: 'success' });
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

  getAlertTable: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `https://alertshub-api.crayond.com/api/v1/rules/get`,
      { profileId: '980ce267-f881-4cbf-a0f6-3da04a20d880', offset: 0, limit: 10, searchStr: null },
      true,
    )
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response?.data) && response?.data?.length > 0) {
          response?.data?.map(
            (tableData: any, i: any) =>
              dataTable.push({
                profileId: tableData?.profileId,
                addRuleCode: tableData?.alert_rule_code ? tableData?.alert_rule_code : '-',
                referenceId: tableData?.reference_id ? tableData?.reference_id : '-',
                hashtags: tableData?.hashtag ? tableData?.hashtag : '-',
                description: tableData?.description ? tableData?.description : '-',
                email_subject: tableData?.email_subject ? tableData?.email_subject : '-',
                email_body: tableData?.email_body ? tableData?.email_body : '-',
                push_body: tableData?.push_body ? tableData?.push_body : '-',
                SMS_body: tableData?.sms_body ? tableData?.sms_body : '-',
                push_title: tableData?.push_title ? tableData?.push_title : '-',
                isActive: tableData?.isActive ? tableData?.isActive : '-',
              }),
            set({ alertsList: dataTable }),
            // dataTable.push(obj)
          );
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

  editAlertRule: (data: any) => {
    const { addAlertRules } = get();
    set({
      addAlertRules: {
        ...addAlertRules,
        alert_code: data?.alert_rule_code,
        reference_id: data?.reference_id,
        hashtags: data?.hashtag,
        description: data?.description,
        is_status: data?.isActive,
        is_email: data?.is_email,
        is_push: data?.is_push,
        is_sms: data?.is_sms,
        email_subject: data?.email_subject,
        email_body: data?.email_body,
        push_body: data?.push_body,
        SMS_body: data?.SMS_body,
        push_title: data?.push_title,
      },
    });
  },
}));
