export const envConfig = {
  client_environment: import.meta.env.VITE_CLIENT_ENVIRONMENT,
  api_url: import.meta.env.VITE_API_BASE_URL,
  frame_work_shell_ui: import.meta.env.VITE_FRAMEWORK_SHELL_URL,
  message_catalog_root: import.meta.env.VITE_MESSAGE_CATALOGUE_URL,
  alert_hub: import.meta.env.VITE_ALERTHUB_URL,

  // TODO: Remove these env
  auth_url: import.meta.env.VITE_AUTH_API_BASE_URL,
  idm_api_url: import.meta.env.VITE_IDM_API_BASE_URL,
  message_api_url: import.meta.env.VITE_MESSAGE_API_BASE_URL,
  admin_hub: import.meta.env.VITE_IDM_URL,
};
