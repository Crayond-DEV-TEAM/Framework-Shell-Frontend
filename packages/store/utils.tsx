import { ValidateEmail } from '@core/utils';
import {
  AddAlertRule,
  AddEditMessageState,
  AddNewConfig,
  Environment,
  ForgotPasswordState,
  Menu,
  MessageDetails,
  MessageGroup,
  ResetPasswordState,
  SecretStashInterface,
  SecretStashSignInState,
  ServiceInterface,
  Services,
  SignInState,
  SignUpStateInterface,
  UserDataInterface,
  keys,
} from './interface';

import {
  Alert,
  AlertConfigIcon,
  AlertRuleIcon,
  ApiDocument,
  MessageHub,
  ReportIcon,
  SubMessageGroup,
  SubMessageLanguage,
} from '@atoms/icons';

import EmailIcon from '@core/ui/assets/emailIcon';
import NotificationIcon from '@core/ui/assets/notificationIcon';
import SmallMailIcon from '@core/ui/assets/smallMailIcon';
import SmallNotificationIcon from '@core/ui/assets/smallNotificationIcon';
import SmallSmsIcon from '@core/ui/assets/smallSmsIcon';
import SmsIcon from '@core/ui/assets/smsIcon';
import Settings from '@core/ui/assets/settings';

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

export const AllRoutes: { [key: number]: Menu } = {
  1: {
    id: 1,
    link: '/',
    name: 'Alert Hubs',
    baseUrl: '',
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
  2: {
    id: 2,
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
};

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
    value: 1,
    key: 'kdjf-jdhd-3fd',
    title: 'id-3409',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    description: 'Quam vitae velit',
    alert_type: {
      label: 'Push Notification',
      color: '#754218',
      bgColor: '#FAE2CF',
      icon: <SmallNotificationIcon />,
    },
    status: true,
  },
  {
    value: 2,
    key: 'pdfi-sdff-024',
    title: 'id-4985',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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
    value: 3,
    key: 'gdg-fsds-dd2',
    title: 'id-6832',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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
    value: 4,
    key: 'jduy-sdff-2s1',
    title: 'id-9231',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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
    value: 5,
    key: 'hdyt-hst-s5s',
    title: 'id-4875',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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
    value: 6,
    key: 1072,
    title: 'ID-201',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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
    value: 7,
    key: 1616,
    title: 'ID-244',
    hashtag: {
      label: '#hashtag',
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
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

export const dummyServicesData = [
  {
    id: '575b7055-480f-4aaf-bcbc-01ea9767eed3',
    name: 'kamesh',
    repository_url: 'squad',
    isActive: false,
  },
];

export const tabs = [
  {
    name: 'Staging',
    webhook_url: '',
    icon: <Settings />,
  },
  {
    name: 'UAT',
    webhook_url: '',
    icon: <Settings />,
  },
  {
    name: 'Production',
    webhook_url: '',
    icon: <Settings />,
  },
];

export const giveMeSSAuthLoginInitialState = (): {
  SecretStashSignInState: SecretStashSignInState;
} => {
  return {
    SecretStashSignInState: { user_name: '', password: '' },
  };
};

export const giveMeServicesInitialState = (): Services => {
  return {
    data: {
      id: '',
      name: '',
      repository_url: '',
      isActive: false,
    },
    offset: 0,
    limit: 0,
    slug: '',
  };
};

export const giveMeEnvironmentState = (): Environment => {
  return {
    name: '',
    webhook_url: '',
    isActive: false,
  };
};

export const giveMeKeyState = (): keys => {
  return {
    name: '',
    value: '',
    isActive: false,
    id: '',
    env: '',
  };
};
