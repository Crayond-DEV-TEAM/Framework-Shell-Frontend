import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'organisationTitle',
    align: 'left',
    disablePadding: false,
    label: 'Organisation Title',
    isSortable: true,
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
    isSortable: true,
  },
  {
    id: 'serviceMapped',
    align: 'left',
    disablePadding: false,
    label: 'Service Mapped',
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
  deleteHandel: (id: string, data: any, e: any) => void,
) => [
  { type: ['TEXT'], name: 'organisationTitle' },
  { type: ['TEXT'], name: 'description' },
  { type: ['TEXT'], name: 'serviceMapped' },
  // {
  //   type: ['SWITCH'],
  //   name: 'is_active',
  //   switchText: [{ label_1: 'In Active', label_2: 'Active' }],
  // },
  {
    type: ['CUSTOM'],
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
    organisationTitle: 'property',
    description: 'description',
    adminMapped: '02',
    serviceMapped: '04',
    id: '1',
    status: true,
  },
  {
    organisationTitle: 'Client',
    description: 'client description',
    adminMapped: '04',
    serviceMapped: '07',
    status: true,
    id: '2',
  },
  {
    organisationTitle: 'Broker',
    description: 'Management',
    adminMapped: '03',
    serviceMapped: '10',
    status: true,
    id: '3',
  },
  {
    organisationTitle: 'Easy',
    description: 'client description',
    adminMapped: '02',
    serviceMapped: '04',
    status: true,
    id: '4',
  },
  {
    organisationTitle: 'Admin',
    description: 'Management',
    adminMapped: '01',
    serviceMapped: '02',
    status: true,
    id: '5',
  },
];
