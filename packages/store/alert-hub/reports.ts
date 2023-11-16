import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { ReportInterface } from '../interface';
import { useSlug } from '../common';

export const useAlertReports = create<ReportInterface>((set, get) => ({
  reportCard: [],
  getTotalReports: [],
  reportDelivery: [],
  reportList: [],
  fetching: false,
  errorOnFetching: false,

  getReportCard: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', ``, {}, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
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
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `https://alertshub-api.crayond.com/api/v1/rules/get`,
      {
        // id using for now
        profileId: '27ad652f-9143-4c54-a5cd-85bcd470b967',
      },
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
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
  getReportDelivery: (index: any) => {
    const slugId = '4a1035df-8acd-42a9-9f28-78a971e3deba';

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      reportFrom: index === 0 ? 'TODAY' : index === 1 ? 'THIS_WEEK' : index === 2 ? 'THIS_MONTH' : 'TODAY',
      // dateRange: {
      //   startAt: '2023-11-15T05:26:45.151Z',
      //   endAt: '2023-11-15T05:26:45.151Z',
      // },
      additionalProp1: {},
    };
    httpRequest(
      'post',
      `https://dev-framework-api.crayond.com/api/v1/alertshub/reports/delivery-status`,
      payload,
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
    )
      .then((response) => {
        let res = response?.data?.data;

        console.log(res, 'res');

        set({
          reportDelivery: res,
        });
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

  getReportList: (index: any) => {
    const slugId = '4a1035df-8acd-42a9-9f28-78a971e3deba';

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      reportFrom: index === 0 ? 'TODAY' : index === 1 ? 'THIS_WEEK' : index === 2 ? 'THIS_MONTH' : 'TODAY',

    };
    httpRequest(
      'post',
      `https://dev-framework-api.crayond.com/api/v1/alertshub/reports/list`,
      payload,
      true,
      undefined,
      {
        headers: {
          slug: slugId,
        },
      },
    )
      .then((response) => {
        let responseData = response?.data?.data;
        set({
          reportList: responseData,
        });
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
