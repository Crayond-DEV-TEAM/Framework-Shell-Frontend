import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: false,
    variant: 'CHECKBOX',
    isSortable: false,
  },
  {
    id: 'plan',
    align: 'left',
    disablePadding: false,
    label: 'Billing',
    isSortable: true,
  },
  {
    id: 'billing',
    align: 'left',
    disablePadding: false,
    label: 'Billing',
    isSortable: true,
  },
  {
    id: 'public',
    align: 'left',
    disablePadding: false,
    label: 'Public',
    isSortable: true,
  },
  {
    id: 'activesubscription',
    align: 'left',
    disablePadding: false,
    label: 'Active Subscription',
    isSortable: true,
  },
  {
    id: 'lastmodified',
    align: 'left',
    disablePadding: false,
    label: 'Last Modified',
  },
  {
    id: 'is_active',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (editHandel: (id: string, data: any, e: any) => void, deleteHandel: (id: string) => void) => [
  { type: ['CHECKBOX'], name: 'checkbox' },
  { type: ['TEXT'], name: 'plan' },
  { type: ['TEXT'], name: 'billing' },
  { type: ['TEXT'], name: 'public' },
  { type: ['TEXT'], name: 'activesubscription' },
  { type: ['TEXT'], name: 'lastmodified' },

  {
    type: ['SWITCH'],
    name: 'is_active',
    switchText: [{ label_1: 'In Active', label_2: 'Active' }],
  },
  {
    type: ['ACTION'],
    name: 'action',
    variant: [
      {
        icon: <EditIcon />,
        method: editHandel,
      },
      {
        icon: <DeleteIcon />,
        method: deleteHandel,
      },
    ],
  },
];

export const tableJson = [
  {
    plan: 'Silver',
    billing: 'Monthly, Yearly',
    public: 'Yes',
    activesubscription: '28',
    lastmodified: '27/05/2023',
    id: '1',
    status: true,
  },
  {
    plan: 'Bronze',
    billing: 'Monthly',
    public: 'No',
    activesubscription: '-',
    lastmodified: '7/07/2023',
    id: '1',
    status: true,
  },
  {
    plan: 'Gold',
    billing: 'Monthly, Yearly',
    public: 'Yes',
    activesubscription: '8',
    lastmodified: '17/05/20233',
    id: '1',
    status: true,
  },
  {
    plan: 'Diamond',
    billing: 'Monthly, Yearly',
    public: 'Yes',
    activesubscription: '48',
    lastmodified: '07/05/2023',
    id: '1',
    status: true,
  },
  {
    plan: 'Platinum',
    billing: 'Monthly, Yearly',
    public: 'Yes',
    activesubscription: '88',
    lastmodified: '27/05/2023',
    id: '1',
    status: true,
  },
];
