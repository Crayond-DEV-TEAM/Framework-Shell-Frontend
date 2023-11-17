export interface SignUpStateInterface {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobile: string;
  confirmPassword: string;
  error: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    emailId: string;
    mobile: string;
    confirmPassword: string;
  };
}

export interface SignInState {
  username: string;
  password: string;
}

export interface ForgotPasswordState {
  email_id: string;
}

export interface ResetPasswordState {
  password: string;
  confirmPassword: string;
}

export interface AuthStoreInterface {
  signUpState: SignUpStateInterface;
  setSignUpState: (payload: { key: string; value: string }) => void;

  signInState: SignInState;
  setSignInState: (payload: { key: string; value: string }) => void;

  forgotPasswordState: ForgotPasswordState;
  setForgotPasswordState: (payload: { key: string; value: string }) => void;

  resetPasswordState: ResetPasswordState;
  setRestPasswordState: (payload: { key: string; value: string }) => void;

  changePasswordState: ResetPasswordState;
  setChangePasswordState: (key: string, value: string) => void;

  signInLoading: boolean;
  signUpLoading: boolean;
  forgotPasswordLoading: boolean;
  resetPasswordLoading: boolean;

  signInMessage: string;
  signUpMessage: string;
  forgotPasswordMessage: string;
  resetPasswordMessage: string;

  signInError: boolean;
  signUpError: boolean;
  forgotPasswordError: boolean;
  resetPasswordError: boolean;

  resetSuccess: boolean;

  signIn: () => void;
  signUp: () => void;
  getUserProfileList: () => void;
  forgotPassword: () => void;
  resetPassword: (payload: { token: string | null }) => void;
  logOut: () => void;
  clearAll: () => void;
  changePassword: () => void;
}

export interface UserDataInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
}

export interface UserInterface {
  user?: null | UserDataInterface;
  setUser: (payload: { key: string; value: string }) => void;
}

export interface SelectBoxInterface {
  value: number | string;
  label: string;
  is_default?: boolean;
  id?: number | string;
  name?: number | string;
}

export interface LanguageConfigInterface {
  languages: SelectBoxInterface[];
  masterLanguages: SelectBoxInterface[];
  masterLanguageLoading: boolean;
  masterLanguageError: boolean;
  defaultLang: SelectBoxInterface | null;
  isSaved: boolean;
  saving: boolean;
  errorOnSaving: boolean;
  fetching: boolean;
  errorOnFetching: boolean;
  message: string;
  getSavedLanguage: () => boolean;
  getAllLanguages: () => boolean;
  addLanguage: (lang: SelectBoxInterface, index: number) => boolean;
  deleteLanguage: (lang: SelectBoxInterface | null, index: number | null) => boolean;
  updateDefaultLang: (lang: SelectBoxInterface, index: number) => boolean;
  saveLanguage: () => boolean;
}
export interface MessageGroup {
  id?: number | string;
  title: number | string;
  description: number | string;
  is_status: boolean;
  error: {
    title: number | string;
    description: number | string;
  }
}
export interface Menu {
  id: number;
  link: string;
  name: string;
  // baseUrl: string;
  // links?: string[];
  icon: (isSelectd: boolean) => JSX.Element;
  childrens?: Menu[];
}
export interface MenusProps {
  sideMenus?: [];
  onLinkClick: (data: Menu) => boolean;
  loading: boolean;
  error: boolean;
  getMenu: () => void;
  getSideMenusFromProject: (id: string) => void;
}

export interface SettingsProps {
  loading: boolean;
  error: boolean;
  saveWebhookUrlAPI: (id: string, url: string, service: string) => void;
}

export type ServiceName = 'IDM' | 'PASM' | 'ALERTSHUB' | 'MESSAGE-CATALOG';

export type SideMenuResponse = {
  [key: string]: any;
  service_name: ServiceName;
};

export type ServiceOptionList = {
  [key in ServiceName]: string;
};

export interface APIKeyProps {
  APIkey?: ServiceOptionList;
}

export interface WebHookUrlProps {
  WebHookUrl?: ServiceOptionList;
}

export interface SlugProps {
  getSlug: (id: ServiceName) => void;
  slugs?: ServiceOptionList;
  APIkey?: ServiceOptionList;
  WebHookUrl?: ServiceOptionList;

}
export interface MessageCreateInterface {
  title: number | string;
  description: number | string;
  is_status: boolean;
  id?: string;
}

export interface MessageConfigInterface {
  messageGroup: MessageGroup[];
  deleteMessage: MessageGroup[];

  editMessage: MessageGroup;
  seteditMessage: (payload: { key: string; value: string }) => void;

  addMessage: MessageGroup;
  setaddMessage: (payload: { key: string; value: string }) => void;

  editMessageList: MessageGroup;

  setselctedMessage: (payload: { key: MessageCreateInterface; value: string }) => void;
  fetching: boolean;
  errorOnFetching: boolean;

  editMessageLoading: boolean;
  editMessageError: boolean;

  addMessageLoading: boolean;
  addMessageError: boolean;

  deleteMessageLoading: boolean;
  deleteMessageError: boolean;

  getMessageGroups: () => boolean;
  editMessageGroups: () => boolean;
  deleteMessageGroups: (payload: any) => void;
  addMessageGroups: () => boolean;
  editMessageListGroups: (payload: any) => void;
  clearAll: () => void;
}

export interface messageListbox {
  id: string;
}

export interface MessageDetails {
  id?: number | string;
  title?: number | string;
  description?: number | string;
  is_status?: boolean;
  severity_id?: number;
  configuration_id?: string;
  message?: string;
  msg_grp_id?: string;
  msg_grp_msgs_infos?: string;
}
export interface FilterDetails {
  created_date_from?: string;
  created_date_end?: string;
  updated_date_from?: string;
  updated_date_end?: string;
  id?: number | string;
  is_status?: boolean;
  severity_id?: number;
  msg_grp_id?: string;
}

// export interface FilterSetContent {
//   name: string;
//   children: [
//     {
//       component: any;
//       label: string;
//       id: number;
//       value: boolean;
//     },
//   ];
// }

export interface CheckboxItem {
  component: 'checkbox';
  label: string;
  id: number;
  value: boolean;
}

export interface DateCheckboxItem {
  component: 'dateCheckbox';
  label: string;
  value: boolean;
}

export interface DateInputItem {
  component: 'dateInput';
  label: string;
  value: string;
}

export interface FilterGroup {
  name: string;
  children: (CheckboxItem | DateCheckboxItem | DateInputItem)[];
}

export interface FilterSetContent {
  filterContent: FilterGroup[];
}

export interface filtertech {
  filterContent: [
    severity: {
      high: boolean;
      low: boolean;
      medium: boolean;
    },
    status: {
      active: boolean;
      inActive: boolean;
    },
    date: {
      clickedOnStartdate: string;
      clickedOnEnddate: string;
      sendOnDate: string;
      SendOnEndDate: string;
      deliveredOnDate: string;
      deliverdOnEndDate: string;
    },
  ];
}

export interface MessageGroupsDetails {
  idList: string;
  setList: (value: string) => void;

  FilterList: any;
  setfilter: (payload: { key: string; value: string }) => void;

  MessagesList: messageListbox[];
  MessagesListStatus: messageListbox[];

  addMessageList: MessageDetails;
  setaddMessage: (payload: { key: string; value: string }) => void;

  editMessageList: MessageDetails;
  seteditMessage: (payload: { key: string; value: string }) => void;

  StatusList: MessageDetails;
  SevorityList: MessageDetails[];
  MessageArray: MessageDetails[];
  // filterContentState: FilterSetContent[];
  filterContent: any;

  filterLoading: boolean;
  errorOnFilter: boolean;

  fetching: boolean;
  errorOnFetching: boolean;

  statusLoading: boolean;
  erronOnStatus: boolean;

  severityLoading: boolean;
  errorOnsevority: boolean;

  deleteLoading: boolean;
  errorOnDelete: boolean;

  errorOnAddMesage: boolean;
  addMessageLoading: boolean;

  editMessageLoading: boolean;
  errorOnEditMesage: boolean;

  errorOnFilterMesage: boolean;
  filterMessageLoading: boolean;

  getMessageList: (group_id: string) => boolean;
  getServerity: () => boolean;
  deleteMessage: () => boolean;
  addMessageTable: () => boolean;
  editMessageTable: () => boolean;
  onApply: (messageGroupId: string) => void;
  filterMessage: (serverityFilter: string | number, createdOn: any, updateOn: any, messageGroupId: string) => void;
  getStatus: (id: string, is_status: boolean) => void;
  editDisplayMessageTable: (id: any) => void;
  clearAll: () => void;
  clearfilter: () => void;
}

export interface AddEditMessageState {
  id?: string;
  title: string;
  description: string;
  severity: number | null;
  status: boolean;
  messages?: {
    [key: string]: {
      configuration_id?: string;
      language_id?: number | null;
      message: string;
    };
  } | null;
  error: {
    title: string;
    description: string;
    severity: string
  };
}
export interface MessageStoreInterface {
  open: boolean;
  setOpen: (open: boolean) => void;

  MessagesList: messageListbox[];
  MessagesListStatus: messageListbox[];
  MessageArray: MessageDetails[];

  messages: MessageDetails[];
  fetching: boolean;
  errorOnFetching: boolean;

  addEditMessageState: AddEditMessageState;
  handleAddEditStateChange: (key: string, value: string | number | boolean) => void;
  handleAddEditMessageChange: (configuration_id: string, message: string) => void;
  validateCallBack: (isValid: boolean, error: object, state: object) => boolean;

  onEditClicked: (id: string) => void;
  editDataLoading: boolean;
  errorOnEditData: boolean;

  addMessage: (group_id: string) => void;
  adding: boolean;
  errorOnAdding: boolean;

  editMessage: (group_id: string) => void;
  editing: boolean;
  errorOnEditing: boolean;

  deleteMessage: (deleteId: string, groupId: string) => void;
  deleting: boolean;
  errorOnDeleting: boolean;

  getAllMessages: (id: string) => void;
  clearAll: () => void;
  clearAllMessage: () => void;
}
export interface AddAlertRule {
  id?: number | string;
  alert_code: number | string;
  reference_id: number | string;
  hashtags: number | string;
  description: number | string;
  is_email: boolean;
  is_push: boolean;
  is_sms: boolean;
  is_whatsApp: boolean;
  is_slack: boolean;
  is_inApp: boolean;
  push_title: number | string;
  push_body: number | string;
  email_subject: number | string;
  email_body: number | string;
  SMS_body: number | string;
  whatsApp_template_name: string;
  whatsApp_body: string;
  slack_body: string;
  in_app_title: string;
  inApp_body: string;
  alert_rule_code?: number | string;
  is_active: boolean;
}

export interface HashTagsInterface {
  component: string;
  id: number;
  value: boolean;
  label: string;
}

export interface AlertTypesInterface {
  component: string;
  id: number;
  value: boolean;
  label: string;
}

export interface FilterStatusInterface {
  component: string;
  id: number;
  value: boolean;
  label: string;
}

export interface DateSectionInterface {
  component: string;
  value: boolean | string;
  label: string;
}

export interface AlertRuleInterface {
  addAlert: AddAlertRule[];
  alertsList: AddAlertRule[];
  addAlertRules: AddAlertRule;
  addAlertRuleLoading: boolean;
  hashtagFilter: HashTagsInterface[];
  alertTypeFilter: AlertTypesInterface[];
  statusFilter: FilterStatusInterface[];
  dateFilter: DateSectionInterface[];

  handleChipDelete: (chip: string, index: number, parentIndex: number, category: string) => void;
  setfilter: (
    filterName: 'hashtagFilter' | 'alertTypeFilter' | 'statusFilter' | 'dateFilter',
    id: number,
    value: any,
  ) => void;
  setaddAlertRule: (payload: { key: string; value: string }) => void;
  addAlertRule: (newAlertRuleCode: string) => void;
  getAlertTable: () => void;
  getHashtagData: () => void;
  editAlertRule: (data: AddAlertRule) => void;
  deleteAlertRule: (data: any) => void;
  onApply: () => void;
  clearState: () => void;
  clearfilter: () => void;
  clearSelectedFilterByKey: (key: string | undefined) => void;

  editFetching: boolean;
  fetching: boolean;
  errorOnFetching: boolean;
  [key: string]: any;
}
export interface ApiBodyInterface {
  reference_id: string,
  alert_rule_code: string,
  push_receivers: [],
  push_title: [],
  push_body: [],
  push_data: {},
  push_click_action: string,
  push_icon: string,
  push_image: string,
  push_actions: [
    {
      title: string,
      action: string
    }
  ],
  whatsapp_body: [],
  whatsapp_template_name: string,
  inapp_title: [],
  inapp_body: [],
  inapp_image: string,
  inapp_action1: string,
  inapp_action2: string,
  inapp_type: string,
  inapp_eventReferenceId: string,
  inapp_clientIds: [],
  inapp_icon: string,
  is_send_push_notification: boolean,
  is_send_inapp_notification: boolean,
  is_user_specific_notification: boolean,
  to_mobiles: [],
  sms_body: [],
  URL: string,
  to_emails: [],
  email_CC: [],
  email_BCC: [],
  from_mail: string,
  email_subject: [],
  email_body: [],
  email_attachments: [
    {
      content: string,
      filename: string,
      type: string,
      disposition: string,
    },
  ],
}

export interface ChannelData {
  sent: number;
  delivered: number;
  notDelivered: number;
}
export interface ApiDocumentationInterface {
  apiBody: ApiBodyInterface
  apiBodyMessage: string,
  handleChangeCallback: (key: string, value: string, apiBody: any) => void,
  requestBodyAPI: () => void,
  apiBodyError: boolean,

}

export interface ReportInterface {
  reportCard: [];
  reportDelivery: [];
  reportList: [];
  fetching: boolean;
  errorOnFetching: boolean;
  getTotalReports: [];
  getReportCard: () => void;
  getReportTable: () => void;
  getReportDelivery: () => void;
  getReportList: () => void;
}
export interface AddNewConfig {
  Provider: number | string;
  API_Key: number | string;
  isActive: boolean;
}

export interface EmailConfigInterface {
  id: string;
  identification_name: string;
  email_provider: string;
  smtp_host: string;
  smtp_port: string;
  smtp_username: string;
  smtp_password: string;
  mail_domain: string;
  from_mail: string;
  api_key: string;
  aws_access_id: string;
  aws_secret_key: string;
  aws_region: string;
  aws_pinpoint_project_id: string;
  isDefault: boolean;
}

export interface SmsConfigInterface {
  id: string | undefined;
  identifier: string;
  provider_name: string;
  provider_sid: string;
  provider_api_key: string;
  sender_id: string;
  isDefault: boolean;
}

export interface PushConfigInterface {
  id: string;
  pushServerKey: string;
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

export interface SlackConfigInterface {
  slack_bot_token: string;
  id?: string | undefined;
  isDefault: boolean;
  identification_name: string;
}

export interface WhatsappConfigInterface {
  whatsapp_buisness_phone_number: string;
  access_token: string;
  api_version: string;
  identification_name: string;
  isDefault: boolean;
  id?: string | undefined;
}

export interface AlertConfig {
  addAlertConfig: AddNewConfig;
  getAlertConfigList: AddNewConfig[];
  errorOnFetching: boolean;
  fetching: boolean;

  emailList: EmailConfigInterface[];
  smsList: SmsConfigInterface[];
  pushList: PushConfigInterface[];
  slackList: SlackConfigInterface[];
  whatsappList: WhatsappConfigInterface[];

  emailConfiguration: EmailConfigInterface;
  smsConfiguration: SmsConfigInterface;
  pushConfiguration: PushConfigInterface;
  slackConfiguration: SlackConfigInterface;
  whatsappConfiguration: WhatsappConfigInterface;

  addEmailConfig: () => void;
  addSmsConfig: () => void;
  addPushConfig: () => void;
  addSlackConfig: () => void;
  addWhatsappConfig: () => void;

  getEmailConfig: () => void;
  getSmsConfig: () => void;
  getPushConfig: () => void;
  getSlackConfig: () => void;
  getWhatsappConfig: () => void;

  editEmailConfig: (data: any) => void;
  editSmsConfig: (data: any) => void;
  editPushConfig: (data: any) => void;
  editSlackConfig: (data: any) => void;
  editWhatsappConfig: (data: any) => void;

  deleteEmailConfig: (data: any) => void;
  deleteSmsConfig: (data: any) => void;
  deletePushConfig: (data: any) => void;
  deleteSlackConfig: (data: any) => void;
  deleteWhatsappConfig: (data: any) => void;

  updateConfig: (field: any, value: any, configType: string) => void;
  setEmailProvider: (value: any) => void;
  setDefault: (value: boolean, configType: string) => void;

  clearEmailState: () => void;
  clearSmsState: () => void;
  clearPushState: () => void;
  clearSlackState: () => void;
  clearWhatsappState: () => void;
}

export interface APIConfig {
  apiCallsList: string;
  requestAPI: [];
  getPushBody: [];
  getResquestBody: [];
  errorOnFetching: boolean;
  fetching: boolean;
  getRequest: () => void;
  getPushTableList: () => void;
  getResquestBodyData: () => void;
}

export interface RolesInterfaceField {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  permission: any;
}

export interface Repository {
  name: string;
}

export interface AddPermissionInterface {
  name: string;
  description: string;
  is_active: boolean;
  id?: any;
}

export interface Repolist {
  data: object;
}

export interface RoleMap {
  username: {
    label: string;
  };
  contactnumber: string;
  email: string;
  lastlogin: string;
  rolename: {
    label: string;
    color: string;
    bgColor: string;
  };
  status: boolean;
}
export interface UserManagementInterface {
  RepositoryList: any;
  editRepositoryList: any;
  RepositoryId: any;

  fetching: boolean;
  errorOnFetching: boolean;

  onEditLoading: boolean;
  erroronEdit: boolean;

  seteditRepository: (value: any) => void;

  getAllRepository: () => void;
  editRepository: () => void;
  createRepository: () => void;

  apiToken: string;
  setApiToken: (apiToken: string) => void;
}

export interface PermissionInterface {
  RepositoryList: AddPermissionInterface[];
  PermissionList: Repolist[];
  addPermissionList: AddPermissionInterface;
  indexUpdateList: any;
  permissionId: string;
  setaddPermission: (payload: { key: string; value: string }) => void;
  setRepository: (type: string, value: string, data: any) => void;
  setRepositoryList: (data: any, id: any, key: any) => void;
  editPermissionList: AddPermissionInterface;

  fetching: boolean;
  errorOnFetching: boolean;

  fetchingPermission: boolean;
  errorOnPermission: boolean;

  getPermissionList: () => void;
  addPermission: (data: any) => void;
  deletePermission: (x: any) => void;
  updateRopsitory: () => void;
  // editPermision: (data: any) => void;
  // getFaciltyRepository: () => void;
  updateEditData: (data: any) => void;
  clearAll: () => void;

  apiToken: string;
  setApiToken: (apiToken: string) => void;
}

export interface RolesInterface {
  RolesList: any;
  setaddMessage: (payload: { key: string; value: string }) => void;
  StatusList: RolesInterfaceField[];
  addRole: RolesInterfaceField;
  editRole: RolesInterfaceField[];
  deleteRole: RolesInterfaceField[];

  fetching: boolean;
  errorOnFetching: boolean;

  addLoading: boolean;
  errorOnadding: boolean;

  editLoading: boolean;
  errorOnediting: boolean;

  deleteLoading: boolean;
  errorOndelete: boolean;

  getRolesList: () => void;
  getStatusList: (id: any, status: any) => Promise<void>;
  addRolesList: () => Promise<unknown>;
  editRoleList: () => Promise<void>;
  deleteRoleList: (id: string) => Promise<void>;
  clearAll: () => void;
  updateEditData: (data: any) => void;

  apiToken: string;
  setApiToken: (apiToken: string) => void;
}

export interface RolesMappingInterface {
  RolesMappingList: RoleMap[];
  StatusList: RoleMap[];

  fetching: boolean;
  errorOnFetching: boolean;

  getRolesMappingList: () => void;
  getStatusList: () => void;
}

export interface Plans {
  plan: string;
  billing: string;
  public: string;
  activesubscriptions: number;
  lastmodified: string;
  status: boolean;
  id: string;
  plan_data: any;
}

interface Charge {
  id: string;
  name?: string;
  plan_charge_mapping_id?: string;
  price: number;
}

export interface Feature {
  id: string;
  name?: string;
  user_value?: string;
  limit_count: number | string;
  plan_feature_mapping_id?: string;
}

export interface GroupFeature {
  id: string;
  name?: string;
  plan_feature_mapping_id?: string;
  feature: Feature[];
}

export interface AddOns {
  id: string;
  name?: string;
  price: {
    monthly: number;
    yearly: number;
  };
  plan_add_on_mapping_id?: string;
  limit_count: number;
}

interface IObjectKeys {
  [key: string]: string | number | boolean | any;
}

export interface AddEditPlans extends IObjectKeys {
  plan_id?: string;
  name: string;
  description: string;
  is_plan_public: boolean;
  is_recomended: boolean;
  is_metered_billing: boolean;
  is_active: boolean;
  billing_period: string[];
  price: {
    monthly: number;
    yearly: number;
  };
  is_per_user: boolean;
  is_flat_fee: boolean;
  billing_cycles: string;
  feature: any[];
  add_on: any[];
  charge: any[];
}

export interface PlansInterface {
  PlanList: Plans[];
  addEditPlan: AddEditPlans;
  planFeature: GroupFeature[];
  planUngroupedFeature: Feature[];
  planAddOn: AddOns[];
  planCharge: Charge[];
  deleteAddOn: any[];
  deleteCharge: any[];
  deleteFeature: any[];
  deleteGroupFeature: any[];
  fetching: boolean;
  errorOnFetch: boolean;

  featureList: any[];
  ungroupedFeatureList: any[];
  addons: any[];
  charges: any[];
  optionsfeatureList: any[];
  optionsungroupedFeatureList: any[];
  optionsaddons: any[];
  optionscharges: any[];

  getPayload: () => void;
  setPlanList: (key: any, value: any, array_key?: string) => void;
  setPlanFeature: (group: any, value: any) => void;
  setBulkPlanList: (obj: any) => void;
  setAddOn: (value: any) => void;
  setCharge: (value: any) => void;
  setExplicitPlanFeature: (group: any) => void;
  setUngroupedFeature: (value: any) => void;
  getPlansList: (x: any) => void;
  addPlan: () => void;
  editPlan: () => void;
  deletePlan: (x: any) => void;
  editPlanStatus: (id: any, status: any) => void;
  clearAll: () => void;
  setDeleteAddon: (id: string) => void;
  setDeleteCharges: (id: string) => void;
  setDeleteFeatures: (id: string) => void;
  setDeleteGroupFeature: (id: string) => void;

  setFeatureList: (x: any) => void;
  setUnGroupedFeatureList: (x: any) => void;
  setAddOns: (x: any) => void;
  setCharges: (x: any) => void;
  setOptionsFeatureList: (x: any) => void;
  setOptionsUngroupedFeatureList: (x: any) => void;
  setOptionsAddons: (x: any) => void;
  setOptionsCharges: (x: any) => void;
}
export interface FeatureKey {
  name: string;
  is_active: boolean;
  id?: string | undefined;
}

export interface FeatureInterface {
  FeatureList: FeatureKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditFeature: FeatureKey;

  setFeatureList: (key: string, value: boolean | string) => void;

  updateEditData: (data: any) => void;

  getFeatureList: (data?: any) => void;
  createFeature: () => void;
  editFeature: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteFeature: (id: string) => void;
  clearAll: () => void;
}

export interface FeatureGroupKey {
  name: string;
  is_active: boolean;
  id?: string | undefined;
  features: string[];
  description?: string;
  deletedFeature: [];
  addedFeature: [];
  featureDetails?: any;
}

export interface FeatureGroupInterface {
  FeatureGroupList: FeatureGroupKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditFeatureGroup: FeatureGroupKey;

  setFeatureGroupList: (key: string, value: boolean | string) => void;

  updateEditData: (data: any) => void;

  getFeatureGroupList: (data?: any) => void;
  createFeatureGroup: () => void;
  editFeatureGroup: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteFeatureGroup: (id: string) => void;
  clearAll: () => void;
}

export interface AddOnsKey {
  name: string;
  is_active: boolean;
  id?: string | undefined;
  features: object;
  description?: string;
  featuregroup: object;
}

export interface AddOnsInterface {
  AddOnsList: AddOnsKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditAddOns: AddOnsKey;

  setAddOnsList: (key: string, value: boolean | string) => void;

  updateEditData: (data: any) => void;

  getAddOnsList: (data?: any) => void;
  createAddOns: () => void;
  editAddOns: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteAddOns: (id: string) => void;
  clearAll: () => void;
}

export interface ChargesKey {
  name: string;
  is_active: boolean;
  id?: string | undefined;
  description?: string;
}

export interface ChargesInterface {
  ChargesList: ChargesKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditCharges: ChargesKey;

  setChargesList: (key: string, value: boolean | string) => void;

  updateEditData: (data: any) => void;

  getChargesList: (data?: any) => void;
  createCharges: () => void;
  editCharges: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteCharges: (id: string) => void;
  clearAll: () => void;
}

export interface SubscriptionKey {
  customer_id: string;
  plan_id: string;
  is_active: boolean;
  add_on?: any;
  billing_type: string;
  actual_price: number;
  price_paid: number;
  id?: string;
  old_addon?: any;
  new_addon?: any;
  is_plan_effective: boolean;
}

export interface SubscriptionInterface {
  SubscriptionList: SubscriptionKey[];
  OldSubscription: [];
  TicketSubscription: [];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditSubscription: SubscriptionKey;

  setTicketSubscription: (data: any) => void;

  setSubscriptionList: (key: string, value: boolean | string) => void;

  updateEditData: (data: any) => void;

  getSubscriptionList: () => void;
  createSubscription: () => void;
  editSubscription: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteSubscription: (id: string) => void;
  fetchSubscription: (id: string) => void;
  clearAll: () => void;
}

export interface CustomerKey {
  name: string;
  email_id: string;
  contact_number: string;
  company_name: string;
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  id?: string;
  is_active?: boolean;
  address_id?: string;
}

export interface CustomerInterface {
  CustomerList: CustomerKey[];
  isEdit: boolean;
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditCustomer: CustomerKey;

  setCustomerList: (key: string, value: boolean | string) => void;
  seteditadd: (value: boolean) => void;

  updateEditData: (data: any) => void;

  getCustomerList: () => void;
  createCustomer: () => void;
  editCustomer: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteCustomer: (id: string) => void;
  clearAll: () => void;
}

export interface PlanKey<T> {
  data: T[];
}

export interface PlanInterface<T> {
  PlanList: PlanKey<T>[];
  getPlanList: () => void;
}

export interface AdminKey {
  projectTitle: string;
  description: string;
  mapServices: any;
  mapAdmin: any;
  is_active?: boolean;
  id?: string;
}

export interface InviteUserKey {
  userName: string;
  email: string;
  userNameStatus: number;
  emailStatus: number;
}

export interface AdminInterface {
  adminList: AdminKey[];
  fetching: boolean;
  OrganisationDetails: OrganisationDetailKey;
  OrganisationListMaster: [];
  ServiceListMaster: [];
  UserListMaster: [];
  userInviteEdit: InviteUserKey;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditAdmin: AdminKey;
  seteditAdmin: (payload: { key: string; value: string | number }) => void;
  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => void;
  seteditUserInviteDetails: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;

  getAdminList: () => void;
  getOrganisationMaster: () => void;
  getServiceMasterByOrganisation: () => void;
  getUserMasterByOrganisation: () => void;
  getAllProjectsEditData: (id: string) => void;

  createAdmin: () => void;
  editAdmin: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteAdmin: (id: string) => void;
  addUserInvite: () => void;
  emailChecker: () => void;
  userNameChecker: () => void;
  createServiceMap: () => void;
  editServiceMap: () => void;
  createUserMap: () => void;
  editUserMap: () => void;

  clearAll: () => void;
}

export interface OrganisationKey {
  organisationName: string;
  description: string;
  emailId?: string;
  mobile?: number;
  address?: string;
  domainUrl?: string;
  mappedAdmin?: string[];
  mappedUser?: string[];
  is_active?: boolean;
  access?: boolean;
  id?: string;
}

export interface OrganisationInterface {
  OrganisationList: OrganisationKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditOrganisation: OrganisationKey;
  seteditOrganisation: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;

  getOrganisationList: () => void;
  createOrganisation: () => void;
  editOrganisation: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteOrganisation: (id: string) => void;
  clearAll: () => void;
}

export interface ServiceKey {
  serviceName: string;
  description: string;
  gitUrl?: string;
  organisationId?: string;
  id?: string;
  is_active: boolean;
}

export interface ServiceInterface {
  ServiceList: ServiceKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  OrganisationDetails: OrganisationDetailKey;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditService: ServiceKey;
  seteditService: (payload: { key: string; value: string | number }) => void;
  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;
  updateEditOrganisationData: (data: any) => void;

  getServiceList: (id: string) => void;
  createService: () => void;
  editService: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteService: (id: string) => void;
  clearAll: () => void;
}

export interface UserKey {
  name: string;
  email: string;
  designation: string;
  is_active: boolean;
  organisationId: string;
  userprofileMap_id: string;
  userprofileMap_Rolename: string;
  userprofileMap_Roleid: string;
  id: string;
}

export interface OrganisationDetailKey {
  id: string;
  name: string;
  rolename: string;
}

export interface UserProfileInterface {
  UserList: UserKey[];
  fetching: boolean;
  errorOnFetching: boolean;
  OrganisationDetails: OrganisationDetailKey;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditUser: UserKey;
  seteditUser: (payload: { key: string; value: string | number }) => void;
  seteditOrganisationDetails: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;
  updateEditOrganisationData: (data: any) => void;

  getUserList: (id: string) => void;
  createUser: () => void;
  createUserRollMap: () => void;
  editUser: () => void;
  editUserRollMap: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteUser: (id: string) => void;
  deleteUserRollMap: () => void;
  clearAll: () => void;
}

export interface SuperAdminKey {
  organisationName: string;
  description: string;
  mapAdmin: string[];
  mapUsers: string[];
  is_active: boolean;
  id?: string;
}

export interface SuperAdminInterface {
  OrganisationList: SuperAdminKey[];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditOrganisation: SuperAdminKey;
  seteditOrganisation: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;

  getOrganisationList: () => void;
  createOrganisation: () => void;
  editOrganisation: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteOrganisation: (id: string) => void;
  clearAll: () => void;
}
export interface UserLandingInterface {
  OrganisationList: OrganisationDetailKey;
  fetching: boolean;
  errorOnFetching: boolean;
  ProjectList: [];

  getUserProjectList: (id: string) => void;
}

export interface SuperAdminLandingKey {
  organisationName: string;
  description: string;
  email_id: string;
  mapAdmin: [];
  mapServices: [];
  adminDatas: [],
  serviceDatas: []
  is_active: boolean;
  id?: string;
}

export interface SuperAdminLandingInterface {
  OrganisationList: SuperAdminLandingKey[];
  ServiceList: [];
  UserListMaster: [];
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditOrganisation: SuperAdminLandingKey;
  seteditOrganisation: (payload: { key: string; value: string | number }) => void;
  // seteditService: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;

  getOrganisationList: () => void;
  getAllUserList: () => void;
  createOrganisation: () => void;
  editOrganisation: () => void;
  editGetDataOrganisation: (id: string) => void;
  createServicemap: () => void;
  deleteServicemap: () => void;
  createAdminmap: () => void;
  deleteAdminmap: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteOrganisation: (id: string) => void;
  getServiceList: () => void;
  clearAll: () => void;
}
export interface UserProfileLandingKey {
  userProfileName: string;
  description: string;
  id?: string;
}

export interface UserProfileLandingKey {
  userProfileName: string;
  description: string;
  id?: string;
}

export interface UserEditProfileKey {
  name: '';
  mobileno: '';
}
export interface UserProfileLandingInterface {
  UserProfileList: UserProfileLandingKey[];
  MyProfileList: any;
  fetching: boolean;
  errorOnFetching: boolean;

  addsave: boolean;
  editsave: boolean;
  deletefetch: boolean;

  createEditUserProfile: UserProfileLandingKey;
  editProfile: UserEditProfileKey;
  seteditUserProfile: (payload: { key: string; value: string | number }) => void;

  updateEditData: (data: any) => void;
  getUserProfileList: (id: string) => void;
  createUserProfile: () => void;
  editUserProfile: () => void;
  getStatusList: (id: any, status: any) => void;
  deleteUserProfile: (id: string) => void;
  clearAll: () => void;
  getMyProfile: (data: any) => void;
  editProfileData: (data: any) => void;
  seteditMyProfile: (key: string, value: string | number) => void;
}
