import { create } from 'zustand';
import { MessageConfigInterface, SelectBoxInterface } from '../interface';
import { enqueueSnackbar } from 'notistack';
import { httpRequest } from '@core/utils';
import { envConfig } from '@core/envconfig';

export const useMessageConfiguration = create<MessageConfigInterface>((set, get) => ({
  messageGroup: [],
  fetching: false,
  errorOnFetching: false,
  messageGroupError: false,
  editmessage: [],
  editMessageLoading: false,
  editMessageError: false,
  addMessage: [],
  addMessaageLoading: false,
  addMessageError: false,
  deleteMessage: [],
  deleteMessageLoading: false,
  deleteMessageError: false,
  getMessageGroups: () => {
    set({ fetching: true, errorOnFetching: false });
    httpRequest(
      'get',
      `${envConfig.api_url}/message_groups/display_message_group`,
      {
        offset: 0,
        limit: 50,
      },
      true,
    )
      .then((response) => {
        set({ messageGroup: response.data.data?.sort((a: any, b: any) => b.label - a.label) });
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
