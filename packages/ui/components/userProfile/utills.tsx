import { Button } from '@atoms/button';
import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'userName',
    align: 'left',
    disablePadding: false,
    label: 'User Name',
    isSortable: true,
  },
  {
    id: 'emailId',
    align: 'left',
    disablePadding: false,
    label: 'Email Id',
    isSortable: true,
  },
  {
    id: 'designation',
    align: 'left',
    disablePadding: false,
    label: 'Designation',
  },
  {
    id: 'role',
    align: 'left',
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'organisation',
    align: 'left',
    disablePadding: false,
    label: 'Organisation',
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
  roleHandel: (id: string, data: any, e: any) => void,
) => [
  { type: ['TEXT'], name: 'userName' },
  { type: ['TEXT'], name: 'emailId' },
  { type: ['TEXT'], name: 'designation' },
  { type: ['LABEL'], name: 'role' },
  { type: ['LABEL'], name: 'organisation' },

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
        icon: (
          <Button sx={{ textTransform: 'capitalize', fontSize: '10px', borderRaidus: '4px', padding: '4px' }}>
            Map Role
          </Button>
        ),
        method: roleHandel,
      },
    ],
  },
];
