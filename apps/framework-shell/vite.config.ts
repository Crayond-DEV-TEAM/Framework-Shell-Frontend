import CoreAlias from '@core/alias';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, PluginOption } from 'vite';

// //For Sentry Config
// import { sentryVitePlugin } from '@sentry/vite-plugin';
// import { loadEnv  } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // //For Sentry Config
  // const env = loadEnv(mode, process.cwd(), '');
  // //Get the mode from the above callback function like ({mode})=>

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
      visualizer({}) as PluginOption,
    ],
    server: {
      port: 3000,
    },
    preview: {
      port: 4000,
    },
    resolve: {
      alias: [
        ...CoreAlias,
        {
          find: '@router',
          replacement: path.join(__dirname, './src/router'),
        },
        {
          find: '@pages',
          replacement: path.join(__dirname, './src/pages'),
        },
        {
          find: '@styles',
          replacement: path.join(__dirname, './src/styles'),
        },
      ],
    },
    build: {
      // // For Sentry Config
      // sourcemap: true,
    },
  };
});
