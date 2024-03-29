import { DeleteIcon, EditIcon, MoreIcon } from '@atoms/icons';

export const Header = [
  // {
  //   id: 'checkbox',
  //   align: 'left',
  //   disablePadding: false,
  //   variant: 'CHECKBOX',
  //   isSortable: false,
  // },
  {
    id: 'customerid',
    align: 'left',
    disablePadding: false,
    label: 'Customer ID',
    // isSortable: true,
  },
  {
    id: 'companyName',
    align: 'left',
    disablePadding: false,
    label: 'Company name',
    // isSortable: true,
  },
  {
    id: 'adminname',
    align: 'left',
    disablePadding: false,
    label: 'Admin name',
    // isSortable: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'currentplan',
    align: 'left',
    disablePadding: false,
    label: 'Current plan',
    isSortable: false,
  },
  {
    id: 'revenue',
    align: 'left',
    disablePadding: false,
    label: 'Revenue',
    isSortable: false,
  },
  {
    id: 'is_active',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'left',
    align: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (
  editHandel: (id: string, data: any, e: any) => void,
  deleteHandel: (id: string) => void,
  detailHandel: (id: string, data: any, e: any) => void,
) => [
  // { type: ['CHECKBOX'], name: 'checkbox' },
  { type: ['TEXT'], name: 'customerid' },
  { type: ['TEXT'], name: 'companyName' },
  { type: ['TEXT'], name: 'adminname' },
  { type: ['TEXT'], name: 'email' },

  { type: ['LABEL'], name: 'currentplan' },

  { type: ['TEXT'], name: 'revenue' },

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
      {
        icon: <MoreIcon rootStyle={{ width: '16px', height: '14px', color: '#0e1824' }} />,
        method: detailHandel,
      },
    ],
  },
];

export const tableJson = [
  {
    customerid: 'id-3409',
    companyName: '123 neque',
    adminname: 'Brandon Sanders',
    email: 'george.barrett@mail.com',
    revenue: '$120 (NRR)',
    currentplan: [
      {
        label: 'Basic plan',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '1',
    status: true,
  },
  {
    customerid: 'id-4985',
    companyName: 'Non nec aliquam',
    adminname: 'Carolyn Bailey',
    email: 'randy.miller@mail.com',
    revenue: '$120 (NRR)',
    currentplan: [
      {
        label: `Platinum plan`,
        color: '#82851C',
        bgColor: '#F1F3B9',
      },
    ],
    id: '2',
    status: true,
  },
  {
    customerid: 'id-3409',
    companyName: 'Urna neque',
    adminname: 'Brandon Sanders',
    email: 'george.barrett@mail.com',
    revenue: '$321 (One-Time)',
    currentplan: [
      {
        label: `Basic plan`,
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '3',
    status: true,
  },
  {
    customerid: 'id-4985',
    companyName: 'Non nec aliquam',
    adminname: 'Carolyn Bailey',
    email: 'randy.miller@mail.com',
    revenue: '$120 (NRR)',
    currentplan: [
      {
        label: `Platinum plan`,
        color: '#82851C',
        bgColor: '#F1F3B9',
      },
    ],
    id: '4',
    status: true,
  },
  {
    customerid: 'id-3409',
    companyName: 'Urna neque',
    adminname: 'Brandon Sanders',
    email: 'george.barrett@mail.com',
    revenue: '$321 (One-Time)',
    currentplan: [
      {
        label: `Basic plan`,
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '5',
    status: true,
  },
];
