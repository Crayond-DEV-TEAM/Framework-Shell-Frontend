import { DeleteIcon, EditIcon, MoreIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'projectTitle',
    align: 'left',
    disablePadding: false,
    label: 'Project Title',
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

export const tableData = (detailHandel: (id: string, data: any, e: any) => void) => [
  { type: ['TEXT'], name: 'projectTitle' },
  { type: ['TEXT'], name: 'description' },
  { type: ['TEXT'], name: 'serviceMapped' },
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
        icon: <MoreIcon />,
        method: detailHandel,
      },
    ],
  },
];

export const tableJson = [
  {
    projectTitle: 'property',
    description: 'description',
    serviceMapped: '04',
    id: '1',
    status: true,
  },
  {
    projectTitle: 'Client',
    description: 'client description',
    serviceMapped: '07',
    status: true,
    id: '2',
  },
  {
    projectTitle: 'Broker',
    description: 'Management',
    serviceMapped: '10',
    status: true,
    id: '3',
  },
  {
    projectTitle: 'Easy',
    description: 'client description',
    serviceMapped: '04',
    status: true,
    id: '4',
  },
  {
    projectTitle: 'Admin',
    description: 'Management',
    serviceMapped: '02',
    status: true,
    id: '5',
  },
];
