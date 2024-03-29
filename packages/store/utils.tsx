import { ValidateEmail } from '@core/utils';
import {
  AddAlertRule,
  AddEditMessageState,
  AddNewConfig,
  ApiBodyInterface,
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
  AddOns,
  CustomerSvg,
  Charges,
  Plans,
  Subscripiton,
  SettingsSvg,
  FeatureGroups,
  FeatureSvg,
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
import { webRoutes } from '@core/routes';

export const giveMeAuthInitialState = (): {
  signUpState: SignUpStateInterface;
  signInState: SignInState;
  forgotPasswordState: ForgotPasswordState;
  resetPasswordState: ResetPasswordState;
  changePasswordState: ResetPasswordState;
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
    changePasswordState: { password: '', confirmPassword: '' },
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
        link: webRoutes.reports,
        name: 'Reports',
        baseUrl: '',
        icon: (isSelected: boolean) => <ReportIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: webRoutes.alertRule,
        name: 'Alert Rule',
        baseUrl: '',
        icon: (isSelected: boolean) => <AlertRuleIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 3,
        link: webRoutes.apiDocumentation,
        name: 'API Tester',
        baseUrl: '',
        icon: (isSelected: boolean) => <ApiDocument sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 4,
        link: webRoutes.alertConfig,
        name: 'Alert Configuration',
        baseUrl: '',
        icon: (isSelected: boolean) => <AlertConfigIcon sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 5,
        link: webRoutes.alertshubSettings,
        name: 'Settings',
        baseUrl: '',
        icon: (isSelected: boolean) => <SettingsSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
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
        link: webRoutes.languageConfig,
        name: 'Language Config',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageLanguage sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: webRoutes.messagegroup,
        name: 'Message Group',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageGroup sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 3,
        link: webRoutes.messageCatalogSettings,
        name: 'Settings',
        baseUrl: '',
        icon: (isSelected: boolean) => <SettingsSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
    ],
  },
  {
    service_id: '3ef02e4b-b862-47b0-a48c-939b2e9d16d9',
    link: '/',
    name: 'User Management',
    baseUrl: '',
    links: ['/userManagment'],
    icon: (isSelected: boolean) => (
      <MessageHub sx={{ fontSize: '22px', color: isSelected ? 'primary.main' : 'action' }} />
    ),
    childrens: [
      {
        id: 1,
        link: webRoutes.userManagment,
        name: 'Configurations',
        baseUrl: '',
        icon: (isSelected: boolean) => <SubMessageLanguage sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: webRoutes.configSettings,
        name: 'Settings',
        baseUrl: '',
        icon: (isSelected: boolean) => <SettingsSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
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
        link: webRoutes.customer,
        name: 'Customer',
        baseUrl: '',
        icon: (isSelected: boolean) => <CustomerSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 2,
        link: webRoutes.plan,
        name: 'Plans',
        baseUrl: '',
        icon: (isSelected: boolean) => <Plans sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 3,
        link: webRoutes.subscription,
        name: 'Subscription',
        baseUrl: '',
        icon: (isSelected: boolean) => <Subscripiton sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 4,
        link: webRoutes.addOns,
        name: 'AddOns',
        baseUrl: '',
        icon: (isSelected: boolean) => <AddOns sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 5,
        link: webRoutes.charges,
        name: 'Charges',
        baseUrl: '',
        icon: (isSelected: boolean) => <Charges sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 6,
        link: webRoutes.featureGroups,
        name: 'FeatureGroup',
        baseUrl: '',
        icon: (isSelected: boolean) => <FeatureGroups sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 7,
        link: webRoutes.features,
        name: 'Feature',
        baseUrl: '',
        icon: (isSelected: boolean) => <FeatureSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
      },
      {
        id: 8,
        link: webRoutes.planSubscriptionSettings,
        name: 'Settings',
        baseUrl: '',
        icon: (isSelected: boolean) => <SettingsSvg sx={{ color: isSelected ? 'primary.main' : 'action' }} />,
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

export const giveMeApiBody = (): ApiBodyInterface => {
  return {
    reference_id: '',
    alert_rule_code: '',
    push_receivers: [],
    push_title: [],
    push_body: [],
    push_data: {},
    push_click_action: '',
    push_icon: '',
    push_image: '',
    push_actions: [
      {
        title: '',
        action: ''
      }
    ],
    whatsapp_body: [],
    whatsapp_template_name: '',
    inapp_title: [],
    inapp_body: [],
    inapp_image: '',
    inapp_action1: '',
    inapp_action2: '',
    inapp_type: '',
    inapp_eventReferenceId: '',
    inapp_clientIds: [],
    inapp_icon: '',
    is_send_push_notification: true,
    is_send_inapp_notification: true,
    is_user_specific_notification: false,
    to_mobiles: [],
    sms_body: [],
    URL: '',
    to_emails: [],
    email_CC: [],
    email_BCC: [],
    from_mail: '',
    email_subject: [],
    email_body: [],
    email_attachments: [
      {
        content: '',
        filename: '',
        type: '',
        disposition: '',
      },
    ],
    notification_type :[],
mail_provider_id :'',
sms_provider_id:'',
whatsapp_to :[],
whatsapp_provider_name:'',
slack_to :[],
slack_body :[],
slack_provider_name:'',
push_receiver_clientIds :[],
    
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
    parameter: 'reference_id',
    type: 'string',
    description: 'Unique Representation of a alert',
  },
  {
    id: 2,
    parameter: 'push_receivers',
    type: 'array',
    description: 'List of push notification receivers',
  },
  {
    id: 3,
    parameter: 'push_title',
    type: 'array',
    description: 'List of data parameters for push title',
  },
  {
    id: 4,
    parameter: 'push_body',
    type: 'object',
    description: 'List of data parameters for push body',
  },
  {
    id: 5,
    parameter: 'push_click_action',
    type: 'string',
    description: 'URL to open site when clicking a received push notification',
  },
  {
    id: 6,
    parameter: 'push_icon',
    type: 'string',
    description: 'Pass an image URL to set as an icon to the push notification',
  },
  {
    id: 7,
    parameter: 'push_image',
    type: 'string',
    description: 'Pass an image URL to display the image in the push notification',
  },
  {
    id: 8,
    parameter: 'push_actions',
    type: 'array',
    description: 'List of actions to display the action button',
  },
  {
    id: 9,
    parameter: 'push_receiver_clientIds',
    type: 'array of string',
    description: `List of push notification receivers's Id`,
  },
  {
    id: 10,
    parameter: 'inapp_title',
    type: 'array',
    description: 'List of data parameters for In-App title',
  },
  {
    id: 11,
    parameter: 'inapp_body',
    type: 'array',
    description: 'List of data parameters for In-App body',
  },
  {
    id: 12,
    parameter: 'inapp_image',
    type: 'string',
    description: 'Pass an image URL to display the image in In-App notificaiton',
  },
  {
    id: 13,
    parameter: 'inapp_action1',
    type: 'string',
    description: 'Set the action title for In-App.e.g : Share',
  },
  {
    id: 14,
    parameter: 'inapp_action2',
    type: 'string',
    description: 'Set the another action title for In-App. e.g: Participate',
  },
  {
    id: 15,
    parameter: 'inapp_type',
    type: 'string',
    description: 'Pass the type of the notification.It helps to redirect the page. e.g : Teams',
  },
  {
    id: 16,
    parameter: 'inapp_clientIds',
    type: 'array of string',
    description: `List of In-App notification receivers's Id`,
  },
  {
    id: 17,
    parameter: 'inapp_eventReferenceId',
    type: 'string',
    description: 'Pass the reference eventId to In-App notificaiton. e.g: 11',
  },
  {
    id: 18,
    parameter: 'is_send_push_notification',
    type: 'boolean',
    description: `In default it's true.If it's false then does not send any notification`,
  },
  {
    id: 19,
    parameter: 'is_send_inapp_notification',
    type: 'boolean',
    description: `In Default it's true.If it's false then does not send any notification`,
  },
  		

  {
    id: 20,
    parameter: 'is_user_specific_notification',
    type: 'boolean',
    description: `In default it's false. Set true - Send the Push and In-App notification for only one user.`,
  },
  {
    id: 21,
    parameter: 'to_mobiles',
    type: 'array',
    description: `List of mobile numbers to send SMS`,
  },
  {
    id: 22,
    parameter: 'sms_body',
    type: 'array',
    description: `List of data parameters for sms body`,
  },
  {
    id: 23,
    parameter: 'URL',
    type: 'string',
    description: `URL Shortener. Use {URL} de-limiter in the alert rule SMS body content`,
  },
  {
    id: 24,
    parameter: 'sms_body',
    type: 'array',
    description: `List of data parameters for sms body`,
  },
  {
    id: 25,
    parameter: 'URL',
    type: 'string',
    description: `URL Shortener. Use {URL} de-limiter in the alert rule SMS body content`,
  },
  {
    id: 26,
    parameter: 'to_emails',
    type: 'array',
    description: `List of emails to send Mail`,
  },
  {
    id: 27,
    parameter: 'email_CC',
    type: 'array',
    description: `List of data parameters for email CC`,
  },
  {
    id: 28,
    parameter: 'email_BCC',
    type: 'array',
    description: `List of data parameters for email BCC`,
  },
  {
    id: 29,
    parameter: 'from_mail',
    type: 'string',
    description: `Sender E-mail ID`,
  },
  {
    id: 30,
    parameter: 'email_subject',
    type: 'array',
    description: `List of data parameters for email subject`,
  },
  {
    id: 31,
    parameter: 'email_body',
    type: 'array',
    description: `List of data parameters for email body`,
  },
  {
    id: 32,
    parameter: 'email_attachments',
    type: 'array',
    description: `List of attachments for email`,
  },
  {
    id: 33,
    parameter: 'notification_type',
    type: 'array',
    description: `list the notification types [push,sms,mail]`,
  },
  {
    id: 34,
    parameter: 'sms_provider_id',
    type: 'string',
    description: `To specify the sms provider name`,
  },
  {
    id: 35,
    parameter: 'mail_provider_id',
    type: 'string',
    description: `to specify the mail provider name ex:pinpoint`,
  },
  {
    id: 36,
    parameter: 'whatsapp_to',
    type: 'string',
    description: `List of whatsapp numbers to send`,
  },
  {
    id: 37,
    parameter: 'whatsapp_provider_name',
    type: 'string',
    description: `To specify the whatsapp provider name`,
  },
  {
    id: 38,
    parameter: 'slack_to',
    type: 'array',
    description: `List of  of slack ids to send notification`,
  },
  {
    id: 39,
    parameter: 'slack_body',
    type: 'array',
    description: `List of data parameters for slack body`,
  },
  {
    id: 40,
    parameter: 'slack_provider_name',
    type: 'string',
    description: `to specify the slack provider name`,
  },
  {
    id: 41,
    parameter: 'push_receiver_clientIds',
    type: 'array',
    description: `List of ids to send push notification`,
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
    {
      icon: <SmsIcon />,
      header: 'WhatsApp',
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
      header: 'InApp',
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
      header: 'Slack',
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
    {
      icon: <EmailIcon />,
      header: 'InApp',
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
      header: 'Slack',
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
      header: 'WhatsApp',
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
    {
      icon: <NotificationIcon />,
      header: 'Slack',
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
      header: 'WhatsApp',
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
      header: 'InApp',
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
  return {
    title: '',
    description: '',
    is_status: true,
    error: {
      title: '',
      description: ''
    }
  };
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
    status: true,
    messages: null,
    error: {
      title: '',
      description: '',
      severity: ''
    },
  };
};
