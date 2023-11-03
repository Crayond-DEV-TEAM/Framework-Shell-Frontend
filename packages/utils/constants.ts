export const localStorageKeys = {
  authToken: 'authToken',
  deviceToken: 'deviceToken',
  authTempKey: 'authTempKey',
  messageTable: 'messageTable',
  projectId:'projectId',
};

export const loginRoutes = ['/createaccount', '/login', '/forgotpassword'];

export const filterContent = [
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
];
