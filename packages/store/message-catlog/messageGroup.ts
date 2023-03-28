import { envConfig } from '@core/envconfig';
import { log } from '@core/logger';
import { webRoutes } from '@core/routes';
import { httpRequest, parseJwt, routeTo, ValidateEmail } from '@core/utils';
import { filterContent, localStorageKeys } from '@core/utils/constants';
import { enqueueSnackbar } from 'notistack';
import { create } from 'zustand';

import { useRouting } from '../common';

export interface groupStateProps {
  filterContent: any;
}

export interface MessageGroupProps {
  groupState: groupStateProps;
  loading: boolean;
  handleGroupChange: (key: string, value: any, parent: any, parentIndex: any, childrenIndex: any) => void;
  handleChipDelete: (label: string, index: number, parentIndex: number) => void;
}

export const useMessageGroup = create<MessageGroupProps>((set, get) => ({
  groupState: {
    filterContent: [
      {
        name: 'Severity',
        children: [
          {
            component: 'checkbox',
            label: 'high',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'medium',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'low',
            value: false,
          },
        ],
      },
      {
        name: 'Status',
        children: [
          {
            component: 'checkbox',
            label: 'high',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'medium',
            value: false,
          },
          {
            component: 'checkbox',
            label: 'low',
            value: false,
          },
          {
            componentName: 'switch',
            value: false,
          },
        ],
      },
      {
        name: 'Date',
        children: [
          {
            component: 'dateCheckbox',
            label: 'Sent on',
            value: false,
          },
          {
            component: 'dateCheckbox',
            label: 'Delivered on',
            value: false,
          },
          {
            component: 'dateCheckbox',
            label: 'Clicked on',
            value: false,
          },
          {
            component: 'dateInput',
            label: 'Select Date From',
            value: '23rd Jan, 22',
          },
          {
            component: 'dateInput',
            label: 'Select Date To',
            value: '25th Jan, 22',
          },
        ],
      },
    ],
    severityValue: '',
  },
  loading: false,

  // handle Group Change
  handleGroupChange: (key: string, value: any, parent: any, parentIndex: any, childrenIndex: any) => {
    const { groupState } = get();
    groupState.filterContent[parentIndex].children[childrenIndex]['value'] = value;
    set({
      groupState: {
        ...groupState,
        [key]: value,
      },
    });
  },

  // handle  Chip Delete
  handleChipDelete: (label: string, index: number, parentIndex: number) => {
    const { groupState } = get();
    groupState.filterContent[parentIndex].children[index].value = false;
    set({
      groupState: {
        ...groupState,
      },
    });
  },
}));
