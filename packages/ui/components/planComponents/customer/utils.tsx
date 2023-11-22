import { DeleteIcon, EditIcon } from '@atoms/icons';

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
    align: 'center',
    disablePadding: false,
    label: 'Customer ID',
    // isSortable: true,
  },
  {
    id: 'companyName',
    align: 'center',
    disablePadding: false,
    label: 'Company name',
    // isSortable: true,
  },
  {
    id: 'customerName',
    align: 'center',
    disablePadding: false,
    label: 'Customer name',
    // isSortable: true,
  },
  {
    id: 'email',
    align: 'center',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'is_active',
    align: 'center',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (editHandel: (id: string, data: any, e: any) => void, deleteHandel: (id: string) => void) => [
  // { type: ['CHECKBOX'], name: 'checkbox' },
  { type: ['TEXT'], name: 'customerid' },
  { type: ['TEXT'], name: 'companyName' },
  { type: ['TEXT'], name: 'customerName' },
  { type: ['TEXT'], name: 'email' },
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
    customerid: 'id-3409',
    companyName: '123 neque',
    customerName: 'Brandon Sanders',
    email: 'george.barrett@mail.com',
    status: true,
  },
  {
    customerid: 'id-4985',
    companyName: 'Non nec aliquam',
    adminname: 'Carolyn Bailey',
    email: 'randy.miller@mail.com',
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
