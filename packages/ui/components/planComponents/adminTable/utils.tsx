import { DeleteIcon, EditIcon, MorePlanIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'adminname',
    align: 'left',
    disablePadding: false,
    label: 'Admin name',
    isSortable: true,
  },
  {
    id: 'contactnumber',
    align: 'left',
    disablePadding: false,
    label: 'Contact number',
    isSortable: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
    isSortable: true,
  },
  {
    id: 'invitestatus',
    align: 'left',
    disablePadding: false,
    label: 'Current plan',
    isSortable: false,
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

export const tableData = (
  editHandel: (id: string, data: any, e: any) => void,
  deleteHandel: (id: string) => void,
  moreHandel: (id: string) => void,
) => [
  { type: ['TEXT'], name: 'adminname' },
  { type: ['TEXT'], name: 'contactnumber' },
  { type: ['TEXT'], name: 'email' },

  { type: ['LABEL'], name: 'invitestatus' },
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
        icon: <MorePlanIcon rootStyle={{ width: '13px', height: '3px', mb: '5px' }} />,
        method: moreHandel,
      },
    ],
  },
];

export const tableJson = [
  {
    adminname: 'Adam Wade',
    contactnumber: '(977)609-9301',
    email: 'george.barrett@mail.com',
    invitestatus: [
      {
        label: 'Accepted',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '1',
    status: true,
  },
  {
    adminname: 'Elizabeth Vargas',
    contactnumber: '(977)609-9301',
    email: 'george.barrett@mail.com',
    invitestatus: [
      {
        label: 'Accepted',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '1',
    status: true,
  },
  {
    adminname: 'Dan Andrews',
    contactnumber: '(287)835-3209',
    email: 'george.barrett@mail.com',
    invitestatus: [
      {
        label: 'Accepted',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    id: '1',
    status: true,
  },
];
