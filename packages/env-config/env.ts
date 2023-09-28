export const envConfig = {
  auth_url: import.meta.env.VITE_AUTH_API_BASE_URL,
  api_url: import.meta.env.VITE_REST_API_BASE_URL,
  frame_work_shell_ui: import.meta.env.VITE_FRAMEWORK_SHELL_URL,
  message_catalog_root: import.meta.env.VITE_MESSAGE_CATALOGUE_URL,
  alert_hub: import.meta.env.VITE_ALERTHUB_URL,
  schema_mapper: import.meta.env.VITE_SCHEMA_MAPPER_REST_API_BASE_URL,
};
