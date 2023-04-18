// vite.config.ts
import CoreAlias from "file:///D:/framework/Framework-Shell-Frontend/packages/alias/index.js";
import react from "file:///D:/framework/Framework-Shell-Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { visualizer } from "file:///D:/framework/Framework-Shell-Frontend/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///D:/framework/Framework-Shell-Frontend/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "D:\\framework\\Framework-Shell-Frontend\\apps\\secret-stash";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      react(),
      // // For Sentry Config
      // sentryVitePlugin({
      //   org: '',
      //   project: '',
      //   // Specify the directory containing build artifacts
      //   include: './dist',
      //   // Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
      //   // and needs the `project:releases` and `org:read` scopes
      //   authToken: env.VITE_SENTRY_AUTH_TOKEN,
      //   // Optionally uncomment the line below to override automatic release name detection
      //   // release: env.RELEASE,
      // }),
      visualizer({})
    ],
    server: {
      port: 3002
    },
    preview: {
      port: 4e3
    },
    resolve: {
      alias: [
        ...CoreAlias,
        {
          find: "@router",
          replacement: path.join(__vite_injected_original_dirname, "./src/router")
        },
        {
          find: "@pages",
          replacement: path.join(__vite_injected_original_dirname, "./src/pages")
        },
        {
          find: "@styles",
          replacement: path.join(__vite_injected_original_dirname, "./src/styles")
        }
      ]
    },
    build: {
      // // For Sentry Config
      // sourcemap: true,
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxmcmFtZXdvcmtcXFxcRnJhbWV3b3JrLVNoZWxsLUZyb250ZW5kXFxcXGFwcHNcXFxcc2VjcmV0LXN0YXNoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxmcmFtZXdvcmtcXFxcRnJhbWV3b3JrLVNoZWxsLUZyb250ZW5kXFxcXGFwcHNcXFxcc2VjcmV0LXN0YXNoXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9mcmFtZXdvcmsvRnJhbWV3b3JrLVNoZWxsLUZyb250ZW5kL2FwcHMvc2VjcmV0LXN0YXNoL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IENvcmVBbGlhcyBmcm9tICdAY29yZS9hbGlhcyc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcclxuXHJcbi8vIC8vRm9yIFNlbnRyeSBDb25maWdcclxuLy8gaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gJ0BzZW50cnkvdml0ZS1wbHVnaW4nO1xyXG4vLyBpbXBvcnQgeyBsb2FkRW52ICB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcclxuICAvLyAvL0ZvciBTZW50cnkgQ29uZmlnXHJcbiAgLy8gY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XHJcbiAgLy8gLy9HZXQgdGhlIG1vZGUgZnJvbSB0aGUgYWJvdmUgY2FsbGJhY2sgZnVuY3Rpb24gbGlrZSAoe21vZGV9KT0+XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIC8vIC8vIEZvciBTZW50cnkgQ29uZmlnXHJcbiAgICAgIC8vIHNlbnRyeVZpdGVQbHVnaW4oe1xyXG4gICAgICAvLyAgIG9yZzogJycsXHJcbiAgICAgIC8vICAgcHJvamVjdDogJycsXHJcblxyXG4gICAgICAvLyAgIC8vIFNwZWNpZnkgdGhlIGRpcmVjdG9yeSBjb250YWluaW5nIGJ1aWxkIGFydGlmYWN0c1xyXG4gICAgICAvLyAgIGluY2x1ZGU6ICcuL2Rpc3QnLFxyXG5cclxuICAgICAgLy8gICAvLyBBdXRoIHRva2VucyBjYW4gYmUgb2J0YWluZWQgZnJvbSBodHRwczovL3NlbnRyeS5pby9zZXR0aW5ncy9hY2NvdW50L2FwaS9hdXRoLXRva2Vucy9cclxuICAgICAgLy8gICAvLyBhbmQgbmVlZHMgdGhlIGBwcm9qZWN0OnJlbGVhc2VzYCBhbmQgYG9yZzpyZWFkYCBzY29wZXNcclxuICAgICAgLy8gICBhdXRoVG9rZW46IGVudi5WSVRFX1NFTlRSWV9BVVRIX1RPS0VOLFxyXG5cclxuICAgICAgLy8gICAvLyBPcHRpb25hbGx5IHVuY29tbWVudCB0aGUgbGluZSBiZWxvdyB0byBvdmVycmlkZSBhdXRvbWF0aWMgcmVsZWFzZSBuYW1lIGRldGVjdGlvblxyXG4gICAgICAvLyAgIC8vIHJlbGVhc2U6IGVudi5SRUxFQVNFLFxyXG4gICAgICAvLyB9KSxcclxuICAgICAgdmlzdWFsaXplcih7fSkgYXMgUGx1Z2luT3B0aW9uLFxyXG4gICAgXSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAyLFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgcG9ydDogNDAwMCxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAgLi4uQ29yZUFsaWFzLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdAcm91dGVyJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvcm91dGVyJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBmaW5kOiAnQHBhZ2VzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6ICdAc3R5bGVzJyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvc3R5bGVzJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyAvLyBGb3IgU2VudHJ5IENvbmZpZ1xyXG4gICAgICAvLyBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlXLE9BQU8sZUFBZTtBQUN2WCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQWtDO0FBSjNDLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsYUFBYSxNQUFNO0FBS2hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWdCTixXQUFXLENBQUMsQ0FBQztBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsR0FBRztBQUFBLFFBQ0g7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxLQUFLLGtDQUFXLGNBQWM7QUFBQSxRQUNsRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxLQUFLLGtDQUFXLGFBQWE7QUFBQSxRQUNqRDtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsS0FBSyxLQUFLLGtDQUFXLGNBQWM7QUFBQSxRQUNsRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBLElBR1A7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
