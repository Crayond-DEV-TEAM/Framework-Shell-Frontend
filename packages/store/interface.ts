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
  forgotPassword: () => void;
  resetPassword: (payload: { token: string | null }) => void;
  logOut: () => void;
  clearAll: () => void;
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
  deleteLanguage: (lang: SelectBoxInterface, index: number) => boolean;
  updateDefaultLang: (lang: SelectBoxInterface, index: number) => boolean;
  saveLanguage: () => boolean;
}
export interface MessageGroup {
  id?: number | string;
  title: number | string;
  description: number | string;
  is_status: boolean;
}
export interface Menu {
  id: number;
  link: string;
  name: string;
  baseUrl: string;
  links?: string[];
  icon: (isSelectd: boolean) => JSX.Element;
  childrens?: Menu[];
}
export interface MenusProps {
  sideMenus?: Menu[];
  onLinkClick: (data: Menu) => boolean;
  loading: boolean;
  error: boolean;
  getMenu: () => void;
}
export interface MessageCreateInterface {
  title: number | string;
  description: number | string;
  is_status: boolean;
}

export interface MessageConfigInterface {
  messageGroup: MessageGroup[];
  deleteMessage: MessageGroup[];

  editMessage: MessageGroup;
  seteditMessage: (payload: { key: string; value: string }) => void;

  addMessage: MessageGroup;
  setaddMessage: (payload: { key: string; value: string }) => void;

  editMessageList: MessageGroup;

  setselctedMessage: (payload: { key: string; value: string }) => void;
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
  idList: messageListbox[];
  setList: (id: { key: string; value: string }) => void;

  FilterList: FilterDetails[];
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
  filterContentState: filtertech[];
  // filterContent: filtertech[];

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

  getMessageList: () => boolean;
  getServerity: () => boolean;
  deleteMessage: () => boolean;
  addMessageTable: () => boolean;
  editMessageTable: () => boolean;
  onApply: () => void;
  filterMessage: (serverityFilter: string | number, createdOn: any, updateOn: any) => void;
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
  };
}
export interface MessageStoreInterface {
  open: boolean;
  setOpen: (open: boolean) => void;

  messages: MessageDetails[];
  fetching: boolean;
  errorOnFetching: boolean;

  addEditMessageState: AddEditMessageState;
  handleAddEditStateChange: (key: string, value: string | number | boolean) => void;
  handleAddEditMessageChange: (configuration_id: string, message: string) => void;

  onEditClicked: (id: string) => void;
  editDataLoading: boolean;
  errorOnEditData: boolean;

  addMessage: (group_id: string) => void;
  adding: boolean;
  errorOnAdding: boolean;

  editMessage: (group_id: string) => void;
  editing: boolean;
  errorOnEditing: boolean;

  deleteMessage: (id: string) => void;
  deleting: boolean;
  errorOnDeleting: boolean;

  getAllMessages: (id: string) => void;
  clearAll: () => void;
}
export interface AddAlertRule {
  id?: number | string;
  alert_code: number | string;
  reference_id: number | string;
  hashtags: number | string;
  description: number | string;
  push_title: number | string;
  push_body: number | string;
  email_subject: number | string;
  email_body: number | string;
  SMS_body: number | string;
  is_email: boolean;
  is_push: boolean;
  is_sms: boolean;
  is_status: boolean;
  alert_rule_code: number | string;
  hashtag: number | string;
  isActive: boolean;
}
export interface AlertRuleInterface {
  addAlert: AddAlertRule[];
  alertsList: AddAlertRule[];
  addAlertRules: AddAlertRule;
  addAlertRuleLoading: boolean;
  setaddAlertRule: (payload: { key: string; value: string }) => void;
  addAlertRule: () => boolean;
  getAlertTable: () => boolean;
  editAlertRule: (data: any) => void;
  fetching: boolean;
  errorOnFetching: boolean;
}

export interface ReportInterface {
  reportCard: [];
  fetching: boolean;
  errorOnFetching: boolean;
  getTotalReports: [];
  getReportCard: () => void;
  getReportTable: () => void;
}
export interface AddNewConfig {
  Provider: number | string;
  API_Key: number | string;
  isActive: boolean;
}
export interface AlertConfig {
  addAlertConfig: AddNewConfig;
  getAlertConfigList: AddNewConfig[];
  errorOnFetching: boolean;
  fetching: boolean;
  addAlertConfigRule: () => void;
  setaddAlertConfig: (payload: { key: string; value: string }) => void;
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
  getStatusList: (id: any, status: any) => void;
  addRolesList: () => void;
  editRoleList: () => void;
  deleteRoleList: (id: string) => void;
  clearAll: () => void;
  updateEditData: (data: any) => void;
}

export interface RolesMappingInterface {
  RolesMappingList: RoleMap[];
  StatusList: RoleMap[];

  fetching: boolean;
  errorOnFetching: boolean;

  getRolesMappingList: () => void;
  getStatusList: () => void;
}

export interface CustomerInterface {
  CustomerList: any;
  fetching: boolean;
  errorOnFetching: boolean;

  getCustomerList: () => void;
}
