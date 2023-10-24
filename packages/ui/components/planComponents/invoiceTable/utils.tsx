import { DeleteIcon, DownloadPlanIcon, EditIcon, MorePlanIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'invoicenumber',
    align: 'left',
    disablePadding: false,
    label: 'Invoice number',
    isSortable: true,
  },
  {
    id: 'invoicedate',
    align: 'left',
    disablePadding: false,
    label: 'Invoice date',
    isSortable: true,
  },
  {
    id: 'invoiceamount',
    align: 'left',
    disablePadding: false,
    label: 'Invoice amount',
    isSortable: true,
  },
  {
    id: 'invoicestatus',
    align: 'left',
    disablePadding: false,
    label: 'Invoice status',
    isSortable: false,
  },
  {
    id: 'linked',
    align: 'left',
    disablePadding: false,
    label: '',
    isSortable: false,
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: '',
    isSortable: false,
  },
];

export const tableData = (linkhandel: (id: string) => void, downloadhandel: (id: string) => void) => [
  { type: ['TEXT'], name: 'invoicenumber' },
  { type: ['TEXT'], name: 'invoicedate' },
  { type: ['TEXT'], name: 'invoiceamount' },

  { type: ['LABEL'], name: 'invoicestatus' },
  {
    type: ['LINK'],
    name: 'linked',
    label: 'View Invoice',
    viewHandel: linkhandel,
  },
  {
    type: ['ACTION'],
    name: 'action',
    variant: [
      {
        icon: <DownloadPlanIcon rootStyle={{ width: '14px', height: '14px' }} />,
        method: downloadhandel,
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
