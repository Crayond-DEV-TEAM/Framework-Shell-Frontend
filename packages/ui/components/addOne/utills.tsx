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
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Add-on',
    isSortable: true,
  },
  {
    id: 'attachedin',
    align: 'left',
    disablePadding: false,
    label: 'Attached in',
    isSortable: true,
  },
  {
    id: 'createdon',
    align: 'left',
    disablePadding: false,
    label: 'Created On',
    isSortable: true,
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
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'attachedin' },
  { type: ['TEXT'], name: 'createdon' },
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
    addon: 'Reports',
    attachedin: '3 Plans',
    createdon: '27/05/2023',
    id: '1',
    status: true,
  },
  {
    addon: 'Customized metrics',
    attachedin: '-',
    createdon: '08/05/2023',
    id: '1',
    status: true,
  },
];
