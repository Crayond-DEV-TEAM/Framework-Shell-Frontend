import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    isSortable: true,
  },
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
    id: 'env',
    align: 'left',
    disablePadding: false,
    label: 'Env',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (editHandel: (id: string) => void, deleteHandel: (id: string) => void) => [
  { type: ['TEXT'], name: 'id' },
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'value' },
  { type: ['TEXT'], name: 'env' },
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
