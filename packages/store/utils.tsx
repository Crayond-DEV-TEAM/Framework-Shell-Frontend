import { ValidateEmail } from '@core/utils';
import {
  AddAlertRule,
  AddEditMessageState,
  AddNewConfig,
  ForgotPasswordState,
  Menu,
  MessageDetails,
  MessageGroup,
  ResetPasswordState,
  SignInState,
  SignUpStateInterface,
  UserDataInterface,
} from './interface';

import {
  Alert,
  AlertConfigIcon,
  AlertRuleIcon,
  ApiIcon,
  ArrowDown,
  ArrowRight,
  MessageHub,
  ReportIcon,
  SubMessageGroup,
  SubMessageLanguage,
  ApiDocument,
} from '@atoms/icons';

import SingleTickGreen from '@core/ui/assets/sgTickGreen';
import SmallMailIcon from '@core/ui/assets/smallMailIcon';
import SmallNotificationIcon from '@core/ui/assets/smallNotificationIcon';
import SmallSmsIcon from '@core/ui/assets/smallSmsIcon';
import SmsIcon from '@core/ui/assets/smsIcon';
import DoubleTickBlue from '@core/ui/assets/dbTickBlue';
import DoubleTickGreen from '@core/ui/assets/dbTickGreen';
import DeleteIcon from '@core/ui/assets/deleteIcon';
import EditIcon from '@core/ui/assets/editIcon';
import EmailIcon from '@core/ui/assets/emailIcon';
import NotificationIcon from '@core/ui/assets/notificationIcon';

export const giveMeAuthInitialState = (): {
  signUpState: SignUpStateInterface;
  signInState: SignInState;
  forgotPasswordState: ForgotPasswordState;
  resetPasswordState: ResetPasswordState;
} => {
  return {
    signUpState: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      emailId: '',
      mobile: '',
      confirmPassword: '',
      error: { username: '', password: '', firstName: '', lastName: '', emailId: '', mobile: '', confirmPassword: '' },
    },
    signInState: { username: '', password: '' },
    forgotPasswordState: { email_id: '' },
    resetPasswordState: { password: '', confirmPassword: '' },
  };
};

export const giveMeUserIntialState = (): UserDataInterface => ({
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  image: '',
  token: '',
});

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const validateSignUpData = (values: SignUpStateInterface) => {
  let isValid = true;
  const error = values.error;

  //  Checking username
  if (values.username.length === 0) {
    isValid = false;
    error.username = 'Enter a valid username';
  } else {
    error.username = '';
  }

  // Checking password
  if (values.password.length === 0) {
    isValid = false;
    error.password = 'Enter the password';
  } else if (passwordRegex.test(values.password) === false) {
    isValid = false;
    error.password =
      'Password must have 8 digit and contain a uppercase, lowercase and a special character. (E.g Test@123)';
  } else {
    error.password = '';
  }

  // Checking Confirm Password
  if (values.confirmPassword.length === 0) {
    isValid = false;
    error.confirmPassword = 'Enter the Confirm Password';
  } else {
    error.confirmPassword = '';
  }

  // Checking password and confirm password are same
  if (values.confirmPassword.length > 0 && values.confirmPassword !== values.password) {
    isValid = false;
    error.confirmPassword = 'Password and confirm password is not matching';
  }

  // checking FirstName
  if (values.firstName.length === 0) {
    isValid = false;
    error.firstName = 'Enter a valid firstName';
  } else {
    error.firstName = '';
  }
  // checking LastName
  if (values.lastName.length === 0) {
    isValid = false;
    error.lastName = 'Enter a valid lastName';
  } else {
    error.lastName = '';
  }

  //Checking email
  if (values.emailId.length === 0) {
    isValid = false;
    error.emailId = 'Email is required';
  }

  //validate email
  if (values.emailId.length > 0 && !ValidateEmail(values.emailId)) {
    isValid = false;
    error.emailId = 'Invalid email';
  }

  //validate mobile
  if (values.mobile?.length === 0) {
    isValid = false;
    error.mobile = 'Enter a mobile number';
  } else if (values.mobile?.length < 10) {
    isValid = false;
    error.mobile = 'Enter a valid 10 digit mobile number';
  } else if (values.mobile?.length > 10) {
    isValid = false;
    error.mobile = 'Mobile number must be less than 10 digits';
  } else {
    error.mobile = '';
  }

  return { isValid, error };
};

export const validateResetPasswordData = (values: ResetPasswordState) => {
  let isValid = true;
  let message = '';

  // Checking password
  if (values.password.length === 0 && values.confirmPassword.length === 0) {
    isValid = false;
    message = 'Enter the password and confirm password';
  } else if (values.password.length === 0) {
    isValid = false;
    message = 'Enter the password';
  } else if (!passwordRegex.test(values.password)) {
    isValid = false;
    message = 'Password must have 8 digit and contain a uppercase, lowercase and a special character. (E.g Test@123)';
  } else if (values.confirmPassword !== values.password) {
    isValid = false;
    message = 'Password and confirm password is not matching';
  }

  return { isValid, message };
};

export const AllRoutes = [
  {
    service_id: 'e42ed99b-3f07-40e3-a337-c9163230ead8',
    link: '/',
    name: 'Alert Hubs',
    // baseUrl: '',
    links: ['/alertConfig', '/apiDocumentation', '/reports', '/alertrule'],
    icon: (isSelected: boolean) => <Alert sx={{ fontSize: '22px', color: isSelected ? '#357968' : 'action' }} />,
    childrens: [
      {
        id: 1,
        link: '/reports',
        name: 'Reports',
        baseUrl: '',
        icon: (isSelected: boolean) => <ReportIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: '/alertrule',
        name: 'Alert Rule',
        baseUrl: '',
        icon: (isSelected: boolean) => <AlertRuleIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 3,
        link: '/apidocumentation',
        name: 'API Documentation',
        baseUrl: '',
        icon: (isSelected: boolean) => <ApiDocument sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 4,
        link: '/alertconfig',
        name: 'Alert Configuration',
        baseUrl: '',
        icon: (isSelected: boolean) => <AlertConfigIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
    ],
  },
  {
    service_id: '3d85ad51-c2b2-4c1a-a466-16bc26d5e23c',
    link: '/',
    name: 'Message Catlog',
    baseUrl: '',
    links: ['/languageConfig', '/messagegroup'],
    icon: (isSelected: boolean) => (
      <MessageHub sx={{ fontSize: '22px', color: isSelected ? 'primary.main' : 'action' }} />
    ),
    childrens: [
      {
        id: 1,
        link: '/languageconfig',
        name: 'Language Config',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageLanguage sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: '/messagegroup',
        name: 'Message Group',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
    ],
  },
  {
    service_id: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9',
    link: '/',
    name: 'User Managment',
    baseUrl: '',
    links: ['/userManagment'],
    icon: (isSelected: boolean) => (
      <MessageHub sx={{ fontSize: '22px', color: isSelected ? 'primary.main' : 'action' }} />
    ),
    childrens: [
      {
        id: 1,
        link: '/userManagment',
        name: 'User Managment',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageLanguage sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
    ],
  },
  {
    service_id: '665b521a-b2a0-42cf-9b04-b60c988d8bf4',
    link: '/',
    name: 'Plan And Subscription',
    baseUrl: '',
    links: [
      '/customer',
      '/plan',
      '/createplan',
      '/createcustomer',
      '/customerdetail',
      '/subscriptiondetail',
      '/subscription',
      '/addons',
      '/charges',
      '/featureGroups',
      '/features',
    ],
    icon: (isSelected: boolean) => (
      <MessageHub sx={{ fontSize: '22px', color: isSelected ? 'primary.main' : 'action' }} />
    ),
    childrens: [
      {
        id: 1,
        link: '/customer',
        name: 'Customer',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageLanguage sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: '/plan',
        name: 'Plans',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 3,
        link: '/subscription',
        name: 'Subscription',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 4,
        link: '/addons',
        name: 'AddOns',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 5,
        link: '/charges',
        name: 'Charges',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 6,
        link: '/featureGroups',
        name: 'FeatureGroup',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 7,
        link: '/feature',
        name: 'Feature',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
    ],
  },
];

export const giveMeAlertRule = (): AddAlertRule => {
  return {
    alert_code: '',
    reference_id: '',
    description: '',
    hashtags: '',
    push_title: '',
    push_body: '',
    email_subject: '',
    email_body: '',
    SMS_body: '',
    is_email: true,
    is_push: false,
    is_sms: false,
    is_status: false,
    alert_rule_code: '',
    hashtag: '',
    isActive: false,
  };
};

export const giveMeAlertConfig = (): AddNewConfig => {
  return {
    Provider: '',
    API_Key: '',
    isActive: false,
  };
};

export const dummyTableData = [
  {
    id: 1,
    alert_rule_code: 'kdjf-jdhd-3fd',
    reference_id: 'id-3409',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Quam vitae velit',
    alert_type: {
      label: 'Push Notification',
      color: '#754218',
      bgColor: '#FAE2CF',
      icon: <SmallNotificationIcon />,
    },
    status: false,
  },
  {
    id: 2,
    alert_rule_code: 'pdfi-sdff-024',
    reference_id: 'id-4985',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Malesuada elit',
    alert_type: {
      label: 'Email',
      color: '#77277F',
      bgColor: '#F7CFFA',
      icon: <SmallMailIcon />,
    },
    status: false,
  },
  {
    id: 3,
    alert_rule_code: 'gdg-fsds-dd2',
    reference_id: 'id-6832',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Quam dictum',
    alert_type: {
      label: 'SMS',
      color: '#185C75',
      bgColor: '#CFEFFA',
      icon: <SmallSmsIcon />,
    },
    status: true,
  },
  {
    id: 4,
    alert_rule_code: 'jduy-sdff-2s1',
    reference_id: 'id-9231',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Enim nisl dapibus',
    alert_type: {
      label: 'Email',
      color: '#77277F',
      bgColor: '#F7CFFA',
      icon: <SmallMailIcon />,
    },
    status: false,
  },
  {
    id: 5,
    alert_rule_code: 'hdyt-hst-s5s',
    reference_id: 'id-4875',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Interdum est pulvinar',
    alert_type: {
      label: 'SMS',
      color: '#185C75',
      bgColor: '#CFEFFA',
      icon: <SmallSmsIcon />,
    },
    status: true,
  },
  {
    id: 6,
    alert_rule_code: 1072,
    reference_id: 'ID-201',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Quam vitae velit',
    alert_type: {
      label: 'Push Notification',
      color: '#754218',
      bgColor: '#FAE2CF',
      icon: <SmallNotificationIcon />,
    },
    status: false,
  },
  {
    id: 7,
    alert_rule_code: 1616,
    reference_id: 'ID-244',
    hashtag: [
      {
        label: '#hashtag',
        color: '#305AAE',
        bgColor: '#E2EAFA',
      },
    ],
    description: 'Malesuada elit',
    alert_type: {
      label: 'Email',
      color: '#77277F',
      bgColor: '#F7CFFA',
      icon: <SmallMailIcon />,
    },
    status: false,
  },
];

export const dummyAlert = [
  {
    id: 1,
    parameter: 'push',
    type: 'string',
    description: 'Enim nisl dapibus',
  },
  {
    id: 2,
    parameter: 'push',
    type: 'string',
    description: 'Enim nisl dapibus',
  },
  {
    id: 3,
    parameter: 'push',
    type: 'string',
    description: 'Enim nisl dapibus',
  },
];

export const tabsCard = {
  today: [
    {
      icon: <SmsIcon />,
      header: 'SMS',
      cardDetails: [
        {
          number: '250',
          value: 'Sent',
        },
        {
          number: '243',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '165',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <EmailIcon />,
      header: 'Email',
      cardDetails: [
        {
          number: '825',
          value: 'Sent',
        },
        {
          number: '675',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '243',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <NotificationIcon />,
      header: 'Push Notification',
      cardDetails: [
        {
          number: '064',
          value: 'Sent',
        },
        {
          number: '056',
          value: 'Delivered',
        },
        {
          number: '012',
          value: 'Not Delivered',
        },
        {
          number: '042',
          value: 'Clicked',
        },
      ],
    },
  ],
  thisWeek: [
    {
      icon: <EmailIcon />,
      header: 'Email',
      cardDetails: [
        {
          number: '250',
          value: 'Sent',
        },
        {
          number: '243',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '165',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <NotificationIcon />,
      header: 'Push Notification',
      cardDetails: [
        {
          number: '825',
          value: 'Sent',
        },
        {
          number: '675',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '243',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <SmsIcon />,
      header: 'SMS',
      cardDetails: [
        {
          number: '064',
          value: 'Sent',
        },
        {
          number: '056',
          value: 'Delivered',
        },
        {
          number: '012',
          value: 'Not Delivered',
        },
        {
          number: '042',
          value: 'Clicked',
        },
      ],
    },
  ],
  thisMonth: [
    {
      icon: <NotificationIcon />,
      header: 'Push Notification',
      cardDetails: [
        {
          number: '250',
          value: 'Sent',
        },
        {
          number: '243',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '165',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <SmsIcon />,
      header: 'SMS',
      cardDetails: [
        {
          number: '825',
          value: 'Sent',
        },
        {
          number: '675',
          value: 'Delivered',
        },
        {
          number: '356',
          value: 'Not Delivered',
        },
        {
          number: '243',
          value: 'Clicked',
        },
      ],
    },
    {
      icon: <EmailIcon />,
      header: 'Email',
      cardDetails: [
        {
          number: '064',
          value: 'Sent',
        },
        {
          number: '056',
          value: 'Delivered',
        },
        {
          number: '012',
          value: 'Not Delivered',
        },
        {
          number: '042',
          value: 'Clicked',
        },
      ],
    },
  ],
};

export const giveMeMessageGroupInitialState = (): MessageGroup => {
  return { title: '', description: '', is_status: false };
};

export const giveMestatusGroupState = (): MessageDetails => {
  return {
    id: '',
    title: '',
    description: '',
    is_status: false,
    severity_id: 0,
    configuration_id: '',
    message: '',
    msg_grp_id: '',
    msg_grp_msgs_infos: '',
  };
};

export const giveMeStateOfid = (): MessageDetails => {
  return {
    id: '',
  };
};

export const giveMeAddEditMessageInitialState = (): AddEditMessageState => {
  return {
    id: '',
    title: '',
    description: '',
    severity: null,
    status: false,
    messages: null,
    error: {
      title: '',
      description: '',
    },
  };
};