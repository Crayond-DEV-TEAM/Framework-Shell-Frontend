import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'value',
    align: 'left',
    disablePadding: false,
    label: 'Value',
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (editHandel: (id: string) => void, deleteHandel: (id: string) => void) => [
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'value' },
  {
    type: ['ACTION'],
    name: 'action',
    variant: 'EDIT_WITH_DELETE',
    editHandel,
    deleteHandel,
    editIcon: <EditIcon />,
    deleteIcon: <DeleteIcon />,
  },
];
