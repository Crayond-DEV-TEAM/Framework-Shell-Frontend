export const envConfig = {
  auth_url: `${import.meta.env.VITE_AUTH_API_PROTOCAL}${import.meta.env.VITE_AUTH_API_HOST}${
    import.meta.env.VITE_AUTH_API_BASE_URL
  }`,
  api_url: `${import.meta.env.VITE_AUTH_API_PROTOCAL}${import.meta.env.VITE_REST_API_HOST}${
    import.meta.env.VITE_REST_API_BASE_URL
  }`,
};
