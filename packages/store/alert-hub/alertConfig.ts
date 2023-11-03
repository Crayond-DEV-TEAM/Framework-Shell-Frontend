import { envConfig } from '@core/envconfig';
import { httpRequest } from '@core/utils';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';
import { AlertConfig } from '../interface';
import { giveMeAlertConfig } from '../utils';
import { useSlug } from '../common';

export const useAlertConfig = create<AlertConfig>((set, get) => ({
  addAlertConfig: giveMeAlertConfig(),
  getAlertConfigList: [],

  emailList: [],
  smsList: [],
  pushList: [],
  slackList: [],
  whatsappList: [],

  emailConfiguration: {
    id: '',
    identification_name: '',
    email_provider: 'MailChimp',
    smtp_host: '',
    smtp_port: '',
    smtp_username: '',
    smtp_password: '',
    mail_domain: '',
    from_mail: '',
    api_key: '',
    aws_access_id: '',
    aws_secret_key: '',
    aws_region: '',
    aws_pinpoint_project_id: '',
    isDefault: false,
  },

  smsConfiguration: {
    id: '',
    identifier: '',
    provider_name: '',
    provider_sid: '',
    provider_api_key: '',
    sender_id: '',
    isDefault: false,
  },

  pushConfiguration: {
    id: '',
    pushServerKey: '',
    projectId: '',
    clientEmail: '',
    privateKey: '',
  },

  slackConfiguration: {
    slack_bot_token: '',
    id: '',
    isDefault: false,
    identification_name: '',
  },

  whatsappConfiguration: {
    whatsapp_buisness_phone_number: '',
    access_token: '',
    api_version: '',
    identification_name: '',
    isDefault: false,
    id: '',
  },

  fetching: false,
  errorOnFetching: false,

  setEmailProvider: (value) =>
    set((state) => ({
      emailConfiguration: { ...state.emailConfiguration, email_provider: value },
    })),

  setDefault: (value, configType) => {
    if (configType === 'email') {
      set((state) => ({
        emailConfiguration: {
          ...state.emailConfiguration,
          isDefault: value,
        },
      }));
    } else if (configType === 'sms') {
      set((state) => ({
        smsConfiguration: {
          ...state.smsConfiguration,
          isDefault: value,
        },
      }));
    } else if (configType === 'slack') {
      set((state) => ({
        slackConfiguration: {
          ...state.slackConfiguration,
          isDefault: value,
        },
      }));
    } else if (configType === 'whatsapp') {
      set((state) => ({
        whatsappConfiguration: {
          ...state.whatsappConfiguration,
          isDefault: value,
        },
      }));
    }
  },

  updateConfig: (field, value, configType) => {
    if (configType === 'email') {
      set((state) => ({
        emailConfiguration: {
          ...state.emailConfiguration,
          [field]: value,
        },
      }));
    } else if (configType === 'sms') {
      set((state) => ({
        smsConfiguration: {
          ...state.smsConfiguration,
          [field]: value,
        },
      }));
    } else if (configType === 'push') {
      set((state) => ({
        pushConfiguration: {
          ...state.pushConfiguration,
          [field]: value,
        },
      }));
    } else if (configType === 'slack') {
      set((state) => ({
        slackConfiguration: {
          ...state.slackConfiguration,
          [field]: value,
        },
      }));
    } else if (configType === 'whatsapp') {
      set((state) => ({
        whatsappConfiguration: {
          ...state.whatsappConfiguration,
          [field]: value,
        },
      }));
    }
  },

  addEmailConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true });
    const { emailConfiguration, getEmailConfig, clearEmailState } = get();

    let payload;

    if (emailConfiguration?.email_provider === 'MailChimp') {
      payload = {
        identification_name: emailConfiguration?.identification_name,
        email_provider: emailConfiguration?.email_provider,
        smtp_host: emailConfiguration?.smtp_host,
        smtp_port: emailConfiguration?.smtp_port,
        smtp_username: emailConfiguration?.smtp_username,
        smtp_password: emailConfiguration?.smtp_password,
        mail_domain: emailConfiguration?.mail_domain,
        from_mail: emailConfiguration?.from_mail,
        isDefault: emailConfiguration?.isDefault,
      };
    } else if (emailConfiguration?.email_provider === 'SendGrid') {
      payload = {
        identification_name: emailConfiguration?.identification_name,
        email_provider: emailConfiguration?.email_provider,
        api_key: emailConfiguration?.api_key,
        mail_domain: emailConfiguration?.mail_domain,
        from_mail: emailConfiguration?.from_mail,
        isDefault: emailConfiguration?.isDefault,
      };
    } else if (emailConfiguration?.email_provider === 'Pinpoint') {
      payload = {
        identification_name: emailConfiguration?.identification_name,
        email_provider: emailConfiguration?.email_provider,
        aws_access_id: emailConfiguration.aws_access_id,
        aws_secret_key: emailConfiguration.aws_secret_key,
        aws_region: emailConfiguration.aws_region,
        aws_pinpoint_project_id: emailConfiguration.aws_pinpoint_project_id,
        from_mail: emailConfiguration?.from_mail,
        isDefault: emailConfiguration?.isDefault,
      };
    }

    if (emailConfiguration?.id !== '') {
      payload = {
        id: emailConfiguration?.id,
        ...payload,
      };
    }

    httpRequest('post', `${envConfig.api_url}/alertshub/config/mail/upsert`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then(() => {
        enqueueSnackbar('Email Config Successfully Added!', { variant: 'success' });
        getEmailConfig();
        clearEmailState();
      })
      .catch((err) => {
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
        clearEmailState();
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  addSmsConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true });
    const { smsConfiguration, getSmsConfig, clearSmsState } = get();

    let payload = {
      identifier: smsConfiguration?.identifier,
      provider_name: smsConfiguration?.provider_name,
      provider_sid: smsConfiguration?.provider_sid,
      provider_api_key: smsConfiguration?.provider_api_key,
      sender_id: smsConfiguration?.sender_id,
      isDefault: smsConfiguration?.isDefault,
    };

    if (smsConfiguration?.id !== '') {
      payload = {
        id: smsConfiguration?.id,
        ...payload,
      };
    }

    httpRequest('post', `${envConfig.api_url}/alertshub/config/sms/upsert`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Sms Config Successfully Added!', { variant: 'success' });
        getSmsConfig();
        clearSmsState();
      })
      .catch((err) => {
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
        clearSmsState();
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  addPushConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true });
    const { pushConfiguration, getPushConfig, clearPushState } = get();
    const payload = {
      projectId: pushConfiguration?.projectId,
      clientEmail: pushConfiguration?.clientEmail,
      pushServerKey: pushConfiguration?.pushServerKey,
      privateKey: pushConfiguration?.privateKey,
    };

    httpRequest('post', `${envConfig.api_url}/alertshub/config/push/upsert`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Push Config Successfully Added!', { variant: 'success' });
        getPushConfig();
        clearPushState();
      })
      .catch((err) => {
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
        clearPushState();
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  addSlackConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true });
    const { slackConfiguration, getSlackConfig, clearSlackState } = get();
    let payload = {
      slack_bot_token: slackConfiguration?.slack_bot_token,
      isDefault: slackConfiguration?.isDefault,
      identification_name: slackConfiguration?.identification_name,
    };

    if (slackConfiguration?.id !== '') {
      payload = {
        id: slackConfiguration?.id,
        ...payload,
      };
    }

    httpRequest('post', `${envConfig.api_url}/alertshub/config/slack/upsert`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Slack Config Successfully Added!', { variant: 'success' });
        getSlackConfig();
        clearSlackState();
      })
      .catch((err) => {
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
        clearSlackState();
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  addWhatsappConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true });
    const { whatsappConfiguration, getWhatsappConfig, clearWhatsappState } = get();
    let payload = {
      whatsapp_buisness_phone_number: whatsappConfiguration?.whatsapp_buisness_phone_number,
      access_token: whatsappConfiguration?.access_token,
      api_version: whatsappConfiguration?.api_version,
      identification_name: whatsappConfiguration?.identification_name,
      isDefault: whatsappConfiguration?.isDefault,
    };

    if (whatsappConfiguration?.id !== '') {
      payload = {
        id: whatsappConfiguration?.id,
        ...payload,
      };
    }

    httpRequest('post', `${envConfig.api_url}/alertshub/config/whatsapp/upsert`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Whatsapp Config Successfully Added!', { variant: 'success' });
        getWhatsappConfig();
        clearWhatsappState();
      })
      .catch((err) => {
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
        clearWhatsappState();
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  getEmailConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/alertshub/config/mail/getAll`, {}, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        const dataTable = response?.data?.data?.rows;

        if (Array.isArray(dataTable) && dataTable?.length > 0) {
          const emailConfigArray = dataTable?.map((row) => ({
            id: row?.id,
            identification_name: row?.identification_name || '-',
            email_provider: row?.email_provider || '-',
            smtp_host: row?.smtp_host || '-',
            smtp_port: row?.smtp_port || '-',
            smtp_username: row?.smtp_username || '-',
            smtp_password: row?.smtp_password || '-',
            mail_domain: row?.mail_domain || '-',
            from_mail: row?.from_mail || '-',
            api_key: row?.api_key || '-',
            aws_access_id: row?.aws_access_id || '-',
            aws_secret_key: row?.aws_secret_key || '-',
            aws_region: row?.aws_region || '-',
            aws_pinpoint_project_id: row?.aws_pinpoint_project_id || '-',
            isDefault: row?.isDefault,
          }));

          set({
            emailList: emailConfigArray,
          });
        } else {
          set({
            emailList: [],
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

  getSmsConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest('get', `${envConfig.api_url}/alertshub/config/sms/getAll`, {}, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        const dataTable = response?.data?.data;
        if (Array?.isArray(dataTable) && dataTable?.length > 0) {
          const smsConfigArray = dataTable?.map((row) => {
            return {
              id: row?.id,
              identifier: row?.identifier || '-',
              provider_name: row?.provider_name || '-',
              provider_sid: row?.provider_sid || '-',
              provider_api_key: row?.provider_api_key || '-',
              sender_id: row?.sender_id || '-',
              isDefault: row?.isDefault,
            };
          });
          set({
            smsList: smsConfigArray,
          });
        } else {
          set({
            smsList: [],
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

  getPushConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.api_url}/alertshub/config/push/get`,
      {
        profileId: '',
      },
      true,
      undefined,
      { headers: { slug: slugId } },
    )
      .then((response) => {
        const data = response?.data;

        if (Array.isArray(data)) {
          set({ pushList: data });
        } else if (typeof data === 'object' && Object?.keys(data)?.length) {
          set({
            pushList: [
              {
                id: data?.id || '-',
                pushServerKey: data?.pushServerKey || '-',
                projectId: data?.projectId || '-',
                clientEmail: data?.clientEmail || '-',
                privateKey: data?.privateKey || '-',
              },
            ],
          });
        } else {
          set({ pushList: [] });
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

  getSlackConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/alertshub/config/slack/get`, {}, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        const dataTable = response?.data;

        if (Array.isArray(dataTable) && dataTable.length > 0) {
          const slackConfigArray = dataTable.map((row) => ({
            id: row?.id,
            identification_name: row?.identification_name || '-',
            slack_bot_token: row?.slack_bot_token || '-',
            isDefault: row?.isDefault,
          }));

          set({
            slackList: slackConfigArray,
          });
        } else {
          set({
            slackList: [],
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

  getWhatsappConfig: () => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    httpRequest('post', `${envConfig.api_url}/alertshub/config/whatsapp/get`, {}, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        const dataTable = response?.data;

        if (Array.isArray(dataTable) && dataTable.length > 0) {
          const whatsappConfigArray = dataTable.map((row) => ({
            id: row?.id,
            identification_name: row?.identification_name || '-',
            whatsapp_buisness_phone_number: row?.whatsapp_buisness_phone_number || '-',
            access_token: row?.access_token || '-',
            api_version: row?.api_version || '-',
            isDefault: row?.isDefault,
          }));

          set({
            whatsappList: whatsappConfigArray,
          });
        } else {
          set({
            whatsappList: [],
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

  editEmailConfig: async (data: any) => {
    set({
      emailConfiguration: {
        id: data?.id,
        identification_name: data?.identification_name,
        email_provider: data?.email_provider,
        smtp_host: data?.smtp_host,
        smtp_port: data?.smtp_port,
        smtp_username: data?.smtp_username,
        smtp_password: data?.smtp_password,
        mail_domain: data?.mail_domain,
        from_mail: data?.from_mail,
        api_key: data?.api_key,
        aws_access_id: data?.aws_access_id,
        aws_secret_key: data?.aws_secret_key,
        aws_region: data?.aws_region,
        aws_pinpoint_project_id: data?.aws_pinpoint_project_id,
        isDefault: data?.isDefault,
      },
    });
  },

  editSmsConfig: async (data: any) => {
    set({
      smsConfiguration: {
        id: data?.id,
        identifier: data?.identifier,
        provider_name: data?.provider_name,
        provider_sid: data?.provider_sid,
        provider_api_key: data?.provider_api_key,
        sender_id: data?.sender_id,
        isDefault: data?.isDefault,
      },
    });
  },

  editPushConfig: async (data: any) => {
    set({
      pushConfiguration: {
        id: data?.id,
        pushServerKey: data?.pushServerKey,
        projectId: data?.projectId,
        clientEmail: data?.clientEmail,
        privateKey: data?.privateKey,
      },
    });
  },

  editSlackConfig: async (data: any) => {
    set({
      slackConfiguration: {
        slack_bot_token: data?.slack_bot_token,
        id: data?.id,
        isDefault: data?.isDefault,
        identification_name: data?.identification_name,
      },
    });
  },

  editWhatsappConfig: async (data: any) => {
    set({
      whatsappConfiguration: {
        whatsapp_buisness_phone_number: data?.whatsapp_buisness_phone_number,
        access_token: data?.access_token,
        api_version: data?.api_version,
        identification_name: data?.identification_name,
        isDefault: data?.isDefault,
        id: data?.id,
      },
    });
  },

  deleteEmailConfig: (data: any) => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    const { getEmailConfig } = get();
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/alertshub/config/mail`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getEmailConfig();
      });
  },

  deleteSmsConfig: (data: any) => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    const { getSmsConfig } = get();

    set({ fetching: true, errorOnFetching: false });
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/alertshub/config/sms`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
        // getSmsConfig();
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSmsConfig();
      });
  },

  deletePushConfig: (data: any) => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    const { getPushConfig } = get();
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/alertshub/config/push`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getPushConfig();
      });
  },

  deleteSlackConfig: (data: any) => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    const { getSlackConfig } = get();
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/alertshub/config/slack`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getSlackConfig();
      });
  },

  deleteWhatsappConfig: (data: any) => {
    const slugId = useSlug.getState().slugs.ALERTSHUB;

    set({ fetching: true, errorOnFetching: false });
    const { getWhatsappConfig } = get();
    const payload = {
      id: data?.id,
    };

    httpRequest('DELETE', `${envConfig.api_url}/alertshub/config/whatsapp`, payload, true, undefined, {
      headers: {
        slug: slugId,
      },
    })
      .then((response) => {
        enqueueSnackbar('Data Deleted Succesfully!', { variant: 'success' });
      })
      .catch((err) => {
        set({ errorOnFetching: true });
        enqueueSnackbar('Something Went Wrong!', { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
        getWhatsappConfig();
      });
  },

  clearEmailState: () => {
    set({
      emailConfiguration: {
        id: '',
        identification_name: '',
        email_provider: 'MailChimp',
        smtp_host: '',
        smtp_port: '',
        smtp_username: '',
        smtp_password: '',
        mail_domain: '',
        from_mail: '',
        api_key: '',
        aws_access_id: '',
        aws_secret_key: '',
        aws_region: '',
        aws_pinpoint_project_id: '',
        isDefault: false,
      },
    });
  },

  clearSmsState: () => {
    set({
      smsConfiguration: {
        id: '',
        identifier: '',
        provider_name: '',
        provider_sid: '',
        provider_api_key: '',
        sender_id: '',
        isDefault: false,
      },
    });
  },

  clearPushState: () => {
    set({
      pushConfiguration: {
        id: '',
        pushServerKey: '',
        projectId: '',
        clientEmail: '',
        privateKey: '',
      },
    });
  },

  clearSlackState: () => {
    set({
      slackConfiguration: {
        slack_bot_token: '',
        isDefault: false,
        identification_name: '',
      },
    });
  },

  clearWhatsappState: () => {
    set({
      whatsappConfiguration: {
        whatsapp_buisness_phone_number: '',
        access_token: '',
        api_version: '',
        identification_name: '',
        isDefault: false,
      },
    });
  },
}));
