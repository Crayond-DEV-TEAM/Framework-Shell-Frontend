
export const Header = [
  {
    id: 'username',
    align: 'left',
    disablePadding: false,
    label: 'User Name',
    isSortable: true,
  },
  {
    id: 'contactnumber',
    align: 'left',
    disablePadding: false,
    label: 'Contact Number',
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
    id: 'lastlogin',
    align: 'left',
    disablePadding: false,
    label: 'Last Login',
  },
  {
    id: 'rolename',
    align: 'left',
    disablePadding: false,
    label: 'Role Name',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  //   {
  //     id: 'action',
  //     align: 'left',
  //     disablePadding: false,
  //     label: 'Action',
  //   },
];

export const tableData = [
  { type: ['IMAGE_WITH_LABEL'], name: 'username' },
  { type: ['TEXT'], name: 'contactnumber' },
  { type: ['TEXT'], name: 'email' },
  { type: ['TEXT'], name: 'lastlogin' },
  { type: ['LABEL'], name: 'rolename' },
  {
    type: ['SWITCH'],
    name: 'status',
    switchText: [{ label_1: 'In Active', label_2: 'Active' }],
  },
  //   {
  //     type: ['ACTION'],
  //     name: 'action',
  //     variant: 'EDIT_WITH_DELETE',
  //     // editHandel,
  //     // deleteHandel,
  //     editIcon: <EditIcon />,
  //     deleteIcon: <DeleteIcon />,
  //   },
];

export const tableJson = [
  {
    username: { label: 'property Manager' },
    contactnumber: '+91 8972984838',
    email: 'dsp123@gmail.com',
    lastlogin: '23rd Jan, 03:00 PM IST',
    rolename: {
      label: `Role Facility`,
      color: 'primary.contrastText',
      bgColor: '#357968',
    },
    id:'1',
    status: true ,
  },
  {
    username: { label: 'property Manager' },
    contactnumber: '+91 8972984838',
    email: 'dsp123@gmail.com',
    lastlogin: '23rd Jan, 03:00 PM IST',
    rolename: {
      label: `Role Facility`,
      color: 'primary.contrastText',
      bgColor: '#357968',
    },
    id:'2',
    status: true,
  },
  {
    username: { label: 'property Manager' },
    contactnumber: '+91 8972984838',
    email: 'dsp123@gmail.com',
    lastlogin: '23rd Jan, 03:00 PM IST',
    rolename: {
      label: `Role Facility`,
      color: 'primary.contrastText',
      bgColor: '#357968',
    },
    id:'3',
    status: true,
  },
  {
    username: { label: 'property Manager' },
    contactnumber: '+91 8972984838',
    email: 'dsp123@gmail.com',
    lastlogin: '23rd Jan, 03:00 PM IST',
    rolename: {
      label: `Role Facility`,
      color: 'primary.contrastText',
      bgColor: '#357968',
    },
    id:'4',
    status: true,
  },
  {
    username: { label: 'property Manager' },
    contactnumber: '+91 8972984838',
    email: 'dsp123@gmail.com',
    lastlogin: '23rd Jan, 03:00 PM IST',
    rolename: {
      label: `Role Facility`,
      color: 'primary.contrastText',
      bgColor: '#357968',
    },
    id:'5',
    status: true,
  },
];
