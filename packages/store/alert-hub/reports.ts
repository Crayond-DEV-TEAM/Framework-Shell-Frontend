import { create } from 'zustand';
import { ReportInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMeAlertRule } from '../utils';
import { RepeatOnSharp } from '@mui/icons-material';
export const useAlertReports = create<ReportInterface>((set, get) => ({
  reportCard: [],
  getTotalReports: [],
  fetching: false,
  errorOnFetching: false,

  getReportCard: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', ``, {}, true)
      .then((response) => {
        set({
          reportCard: response?.data,
        });
        enqueueSnackbar('New Alert Rule  successfully Added!', { variant: 'success' });
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

  getReportTable: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `https://alertshub-api.crayond.com/api/v1/rules/get`,
      {
        // id using for now
        profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967',
      },
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
            set({ getTotalReports: dataTable }),
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
}));
