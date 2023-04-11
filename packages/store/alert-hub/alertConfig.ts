import { create } from 'zustand';
import { AlertConfig } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';
import { giveMeAlertConfig } from '../utils';
import { RepeatOnSharp } from '@mui/icons-material';
export const useAlertConfig = create<AlertConfig>((set, get) => ({
  addAlertConfig: giveMeAlertConfig(),
  getAlertConfigList: [],
  fetching: false,
  errorOnFetching: false,

  setaddAlertConfig: (payload: { key: string; value: string }) => {
    set((state) => ({ addAlertConfig: { ...state.addAlertConfig, [payload.key]: payload.value } }));
  },

  addAlertConfigRule: () => {
    set({ fetching: true });
    const { addAlertConfig } = get();
    const payload = {
      Provider: addAlertConfig?.Provider,
      API_Key: addAlertConfig?.API_Key,
      isActive: addAlertConfig?.isActive,
    };
    httpRequest('post', `${envConfig.alert_hub}/`, payload, true)
      .then((response) => {
        enqueueSnackbar('New Alert Rule  successfully Added!', { variant: 'success' });
      })
      .catch((err) => {
        // set({ addMessageError: true });
        enqueueSnackbar(`Oops! Something went wrong, Try Again Later`, { variant: 'error' });
      })
      .finally(() => {
        set({ fetching: false });
      });
    return false;
  },

  getAlertConfig: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'post',
      `${envConfig.alert_hub}/`,
      {
        // id using for now
      },
      true,
    )
      .then((response) => {
        const dataTable: any = [];
        if (Array.isArray(response?.data) && response?.data?.length > 0) {
          response?.data?.map(
            (tableData: any, i: any) =>
              dataTable.push({
                Provider: tableData?.Provider ? tableData?.Provider : '-',
                API_Key: tableData?.API_Key ? tableData?.API_Key : '-',
                isActive: tableData?.isActive ? tableData?.isActive : '-',
              }),
            set({ getAlertConfigList: dataTable }),
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
